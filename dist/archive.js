(() => {
  const modal=document.querySelector('#gameArchiveModal'),button=document.querySelector('#gameArchiveButton');
  if(!modal||!button)return;
  const search=document.querySelector('#archiveSearch'),platform=document.querySelector('#archivePlatform'),presence=document.querySelector('#archivePresence');
  const rows=document.querySelector('#archiveRows'),prev=document.querySelector('#archivePrev'),next=document.querySelector('#archiveNext');
  const labels={switch1:'Switch 1 日服',switch2:'Switch 2 日服',switch1_hk:'Switch 1 港服',switch2_hk:'Switch 2 港服',
    ps5_hk:'PlayStation 港服',ps5_jp:'PlayStation 日服',steam:'Steam 中国区',steam_global:'Steam 全球'};
  const cache=new Map(),tabs=[...modal.querySelectorAll('[data-archive-platform]')];
  const regions={switch:['switch1','switch1_hk','switch2','switch2_hk'],ps5:['ps5_hk','ps5_jp'],steam:['steam','steam_global']};
  let page=1,pages=1,games=[],request,debounce,initialized=false;
  function selectPlatform(group,region) {
    tabs.forEach(tab=>tab.setAttribute('aria-selected',String(tab.dataset.archivePlatform===group)));
    platform.innerHTML=regions[group].map(key=>`<option value="${key}">${labels[key]}</option>`).join('');
    if(regions[group].includes(region))platform.value=region;
    page=1;
  }
  async function load() {
    request?.abort();const controller=new AbortController();request=controller;
    const params=new URLSearchParams({page:String(page),platform:platform.value,status:presence.value,q:search.value.trim()});
    rows.setAttribute('aria-busy','true');prev.disabled=true;next.disabled=true;
    try {
      const key=params.toString(),cached=cache.get(key);
      let data=cached&&Date.now()-cached.time<60000?cached.data:null;
      if(!data){
        const response=await fetch(`${apiBase}/api/games/archive?${params}`,{cache:'no-store',signal:AbortSignal.any([controller.signal,AbortSignal.timeout(10000)])});
        if(!response.ok)throw new Error('Archive unavailable');
        data=await response.json();
        if(cache.size>=24)cache.delete(cache.keys().next().value);
        cache.set(key,{data,time:Date.now()});
      }
      if(request!==controller)return;
      games=data.games;page=data.page;pages=data.pages;
      document.querySelector('#archiveStats').textContent=`累计 ${data.stats.total} 条平台 / 区服记录 · 在榜 ${data.stats.current} · 已退榜 ${data.stats.exited}`;
      rows.innerHTML=games.length?games.map((game,index)=>{
        const title=game.cn||game.name,original=title!==game.name?`<span class="archive-original">${escapeHtml(game.name)}</span>`:'';
        return `<article class="archive-game${game.historyPlatform?.startsWith('steam')?' archive-game-steam':''}"><div class="archive-cover">${game.image?`<img ${coverImageAttributes(game.image)} alt="${escapeHtml(title)}" loading="lazy" onerror="this.remove()">`:''}</div>
          <div class="archive-copy"><strong title="${escapeHtml(title)}">${escapeHtml(title)}</strong>${original}
            <span class="archive-meta">${escapeHtml(labels[game.historyPlatform]||game.historyPlatform)} · <span class="${game.inRanking?'archive-current':''}">${game.inRanking?'在榜':'已退榜'}</span></span>
            <small>建档 ${formatSourceTime(game.firstSeen)} · 最后记录 ${formatSourceTime(game.lastSeen)}</small></div>
          <div class="archive-price"><small>最近记录</small><b>${escapeHtml(gameRecordMoney(game,game.price))}</b><button type="button" data-archive-index="${index}" ${game.recordCount?'':'disabled'}>${game.recordCount?'走势 ↗':'暂无价格记录'}</button></div></article>`;
      }).join(''):'<p class="archive-empty">没有匹配的记录</p>';
      document.querySelector('#archiveSummary').textContent=`共 ${data.total} 条记录`;
      document.querySelector('#archivePage').textContent=`${page} / ${pages}`;
      rows.scrollTop=0;prev.disabled=page<=1;next.disabled=page>=pages;
    } catch(error) {
      if(controller.signal.aborted||request!==controller)return;
      rows.innerHTML='<p class="archive-empty">暂时无法读取游戏档案，请稍后重新打开。</p>';
    } finally {if(request===controller)rows.removeAttribute('aria-busy');}
  }
  function close() {
    if(modal.hidden)return;
    modal.hidden=true;request?.abort();clearTimeout(debounce);
    document.body.style.overflow=document.querySelector('#priceHistoryModal').hidden?'':'hidden';button.focus();
  }
  button.addEventListener('click',()=>{
    if(!initialized){const region=activeHistoryKey();selectPlatform(region.startsWith('steam')?'steam':region.startsWith('ps5')?'ps5':'switch',region);initialized=true;}
    modal.hidden=false;document.body.style.overflow='hidden';
    // 手机上先展示档案，避免自动打开键盘并触发输入框聚焦放大。
    const mobile=window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
    (mobile?document.querySelector('#archiveClose'):search).focus({preventScroll:true});load();
  });
  tabs.forEach(tab=>tab.addEventListener('click',()=>{selectPlatform(tab.dataset.archivePlatform);load();}));
  document.querySelector('#archiveClose').addEventListener('click',close);
  document.querySelector('#archiveBackdrop').addEventListener('click',close);
  search.addEventListener('input',()=>{clearTimeout(debounce);request?.abort();page=1;debounce=setTimeout(load,250);});
  for(const input of [platform,presence])input.addEventListener('change',()=>{page=1;load();});
  prev.addEventListener('click',()=>{if(page>1){page--;load();}});
  next.addEventListener('click',()=>{if(page<pages){page++;load();}});
  rows.addEventListener('click',event=>{const target=event.target.closest('[data-archive-index]');if(target&&!target.disabled){const game=games[Number(target.dataset.archiveIndex)];if(game)openPriceModal(game);}});
  modal.addEventListener('keydown',event=>{
    if(event.key!=='Tab'||!document.querySelector('#priceHistoryModal').hidden)return;
    const controls=[...modal.querySelectorAll('button:not(:disabled),input,select')],first=controls[0],last=controls.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  window.GameArchive={close};
})();
