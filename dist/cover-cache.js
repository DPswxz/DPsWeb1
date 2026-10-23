(() => {
  if(!location.protocol.startsWith('http'))return;
  const DB='game-pulse-covers', STORE='images', DAY=86400000;
  const pending=new Map(), memory=new Map(), checking=new Set(), bound=new WeakSet();
  const dialogs=[],urgent=[],warm=[],background=[],foregroundPending=new Set();
  let active=0,backgroundActive=0,dialogActive=0;
  function pump(){
    while(true){
      // 弹窗保留两个下载位置，避免主榜尚未加载的封面堵住档案。
      const job=(dialogActive<2&&active<6?dialogs.shift():null) || (active<4?(urgent.shift() || (!foregroundPending.size&&backgroundActive<2?(warm.shift()||background.shift()):null)):null);
      if(!job)return;
      active++;if(!job.priority)backgroundActive++;if(job.dialog)dialogActive++;
      const wasBackground=!job.priority;
      Promise.resolve().then(job.work).then(job.resolve,job.reject).finally(()=>{
        active--;if(wasBackground)backgroundActive--;if(job.dialog)dialogActive--;pump();
      });
    }
  }
  function enqueue(work,priority=false,early=false,dialog=false){
    const job={work,priority,dialog};
    const promise=new Promise((resolve,reject)=>Object.assign(job,{resolve,reject}));
    promise.job=job;(dialog?dialogs:priority?urgent:early?warm:background).push(job);pump();return promise;
  }
  function promote(task,dialog=false){
    for(const queue of [urgent,warm,background]){
      if(queue===urgent&&!dialog)continue;
      const index=queue.indexOf(task?.job);if(index<0)continue;
      const [job]=queue.splice(index,1);job.priority=true;job.dialog=dialog;(dialog?dialogs:urgent).push(job);pump();break;
    }
  }
  let generation=0, database;
  const base=(window.GAME_PULSE_CONFIG?.apiBase || location.origin).replace(/\/$/,'');
  const official=new Set(['image.api.playstation.com','shared.fastly.steamstatic.com','shared.st.dl.eccdnx.com','cdn.akamai.steamstatic.com',
    'cdn.cloudflare.steamstatic.com','store-jp.nintendo.com','img-eshop.cdn.nintendo.net','upload.wikimedia.org','store.nintendo.com.hk']);
  // 代理只是传输方式；同一张官方封面始终使用相同的离线缓存标识。
  function coverKey(source) {
    const url=new URL(source,location.href);
    if(['/api/nintendo/image','/api/covers/image'].includes(url.pathname)&&url.searchParams.get('url'))
      return new URL(url.searchParams.get('url'),location.href).href;
    return url.href;
  }
  function imageEndpoint(source) {
    const url=new URL(source,location.href);
    if(url.pathname==='/api/nintendo/image'&&url.searchParams.get('url'))
      return `${base}/api/covers/image?url=${encodeURIComponent(url.searchParams.get('url'))}`;
    return official.has(url.hostname) ? `${base}/api/covers/image?url=${encodeURIComponent(url.href)}` : url.href;
  }
  function open() {
    if(!database) database=new Promise((resolve,reject)=>{
      const request=indexedDB.open(DB,1);
      request.onupgradeneeded=()=>request.result.createObjectStore(STORE,{keyPath:'url'});
      request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
    });
    return database;
  }
  async function read(url) {
    const db=await open();return new Promise((resolve,reject)=>{
      const request=db.transaction(STORE).objectStore(STORE).get(url);
      request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
    });
  }
  async function write(record,epoch) {
    const db=await open();if(epoch!==generation)return;
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(record);
      tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
    });
  }
  function publish(record) {
    const previous=memory.get(record.url);
    if(previous?.etag&&previous.etag===record.etag) {previous.checkedAt=record.checkedAt;return previous;}
    const value={...record,src:URL.createObjectURL(record.blob)};
    memory.set(record.url,value);
    if(previous)for(const img of document.querySelectorAll('img[data-cover-url]'))
      if(coverKey(img.dataset.coverUrl)===record.url&&img.getAttribute('src'))img.src=value.src;
    if(previous) URL.revokeObjectURL(previous.src);
    return value;
  }
  async function download(url,old,epoch) {
    const headers={};if(old?.etag)headers['If-None-Match']=old.etag;
    // 首次读取允许浏览器复用 HTTP 缓存；过期图片才向服务端验证。
    const response=await fetch(imageEndpoint(url),{headers,cache:old?'no-cache':'default',signal:AbortSignal.timeout(20000)});
    if(epoch!==generation)throw new Error('Cache cleared');
    if(response.status===304&&old) {
      const record={url,blob:old.blob,etag:old.etag,checkedAt:Date.now()};
      await write(record,epoch).catch(()=>{});
      const existing=memory.get(url);if(existing)existing.checkedAt=record.checkedAt;
      return existing || publish(record);
    }
    if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw new Error('Cover unavailable');
    const blob=await response.blob();if(epoch!==generation)throw new Error('Cache cleared');
    const record={url,blob,etag:response.headers.get('etag')||'',checkedAt:Date.now()};
    const value=publish(record);
    write(record,epoch).catch(()=>{});
    return value;
  }
  function recheck(url,record) {
    if(Date.now()-record.checkedAt<DAY||Date.now()<(record.retryAt||0)||checking.has(url))return;
    checking.add(url);
    const epoch=generation;
    enqueue(()=>epoch===generation?download(url,record,epoch):null).catch(()=>{record.retryAt=Date.now()+3600000;}).finally(()=>checking.delete(url));
  }
  async function get(url,{priority=true,early=false,dialog=false}={}) {
    const source=url;
    url=coverKey(url);
    const cached=memory.get(url);if(cached){recheck(url,cached);return cached.src;}
    if(pending.has(url)){
      const task=pending.get(url);task.early ||= early;
      if(priority){task.priority=true;task.dialog ||= dialog;foregroundPending.add(url);promote(task.downloadTask,dialog);}
      else if(early&&background.includes(task.downloadTask?.job)){
        const index=background.indexOf(task.downloadTask.job);warm.push(...background.splice(index,1));pump();
      }
      return task;
    }
    const epoch=generation;
    if(priority)foregroundPending.add(url);
    // Disk reads never wait for network slots: cached covers can show immediately.
    const task=(async()=>{
      if(epoch!==generation)throw new Error('Cache cleared');
      // 少数浏览器的本地数据库可能迟迟没有响应，不能拖住本页封面。
      const diskRead=(async()=>{
        let record=await read(url);
        if(!record?.blob){
          const aliases=new Set([source,`${base}/api/covers/image?url=${encodeURIComponent(url)}`]);
          if(new URL(url).hostname==='store.nintendo.com.hk')aliases.add(`${base}/api/nintendo/image?url=${encodeURIComponent(url)}`);
          aliases.delete(url);
          for(const alias of aliases){record=await read(alias);if(record?.blob)break;}
        }
        if(record?.blob&&record.url!==url){record={...record,url};write(record,epoch).catch(()=>{});}
        return record;
      })();
      const record=await Promise.race([diskRead.catch(()=>null),new Promise(resolve=>setTimeout(()=>resolve(null),500))]);
      if(epoch!==generation)throw new Error('Cache cleared');
      if(record?.blob){const value=publish(record);recheck(url,value);return value.src;}
      task.downloadTask=enqueue(()=>download(url,null,epoch),task.priority,task.early,task.dialog);
      return (await task.downloadTask).src;
    })();task.priority=priority;task.early=early;task.dialog=dialog;pending.set(url,task);
    const finished=()=>{pending.delete(url);foregroundPending.delete(url);pump();};
    task.then(finished,finished);return task;
  }
  let preloadTimer,preloadVersion=0;
  function preload(urls){
    // 只预热少量跨平台封面，避免成千上万次 IndexedDB 读取挤占首屏。
    const unique=[...new Set(urls.filter(Boolean).map(coverKey))].slice(0,32);
    clearTimeout(preloadTimer);
    const epoch=generation,version=++preloadVersion;
    preloadTimer=setTimeout(()=>{
      if(epoch!==generation)return;
      let index=0;
      const worker=async()=>{
        while(epoch===generation&&version===preloadVersion&&index<unique.length){
          const url=unique[index++];
          await get(url,{priority:false,early:true}).catch(()=>{});
        }
      };
      worker();worker();
    },600);
  }
  async function load(img,priority=true,attempt=0) {
    if(!img.isConnected)return;
    try {const src=await get(img.dataset.coverUrl,{priority,dialog:Boolean(img.closest?.('.price-modal'))});if(img.isConnected)img.src=src;}
    catch {
      if(!img.isConnected)return;
      if(attempt<2){const epoch=generation;setTimeout(()=>{if(epoch===generation&&img.isConnected)load(img,priority,attempt+1);},attempt?2000:500);}
      else img.src=img.dataset.coverUrl;
    }
  }
  const nearby=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){nearby.unobserve(entry.target);load(entry.target,true);}
  },{rootMargin:'500px 0px'}):null;
  function bind(root=document) {
    const images=[...(root.matches?.('img[data-cover-url]')?[root]:[]),...root.querySelectorAll('img[data-cover-url]')];
    for(const img of images)if(!bound.has(img)){
      bound.add(img);
      img.loading='eager';
      const key=coverKey(img.dataset.coverUrl),cached=memory.get(key);
      if(cached){img.src=cached.src;recheck(key,cached);}
      else if(nearby&&!img.closest?.('.price-modal'))nearby.observe(img);
      else load(img,true);
    }
  }
  const observer=new MutationObserver(entries=>{
    for(const entry of entries){
      for(const node of entry.removedNodes||[])if(node.nodeType===1){
        if(node.matches?.('img[data-cover-url]'))nearby?.unobserve(node);
        for(const img of node.querySelectorAll?.('img[data-cover-url]')||[])nearby?.unobserve(img);
      }
      for(const node of entry.addedNodes)
        if(node.nodeType===1&&node.namespaceURI==='http://www.w3.org/1999/xhtml')bind(node);
    }
  });
  async function clear() {
    generation++;preloadVersion++;observer.disconnect();nearby?.disconnect();clearTimeout(preloadTimer);
    for(const job of [...dialogs.splice(0),...urgent.splice(0),...warm.splice(0),...background.splice(0)])job.reject(new Error('Cache cleared'));
    const db=await open();await new Promise((resolve,reject)=>{
      const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).clear();
      tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
    });
    for(const value of memory.values())URL.revokeObjectURL(value.src);
    memory.clear();
  }
  window.GameCoverCache={get,preload,clear};
  observer.observe(document.documentElement,{childList:true,subtree:true});bind();
})();
