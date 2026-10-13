import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../../dist/cover-cache.js',import.meta.url),'utf8');
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function client(records,fetcher,{images=[],stalled=false}={}){
 const data=new Map(records.map(record=>[record.url,record]));
 const database={transaction(){const tx={};tx.objectStore=()=>({get(url){const request={};if(!stalled)setTimeout(()=>{request.result=data.get(url);request.onsuccess?.();},0);return request;},put(record){data.set(record.url,record);setTimeout(()=>tx.oncomplete?.(),0);},clear(){data.clear();setTimeout(()=>tx.oncomplete?.(),0);}});return tx;}};
 class ObjectURL extends URL {static createObjectURL(){return 'blob:test-'+Math.random();}static revokeObjectURL(){}}
 const window={},context={window,URL:ObjectURL,location:{protocol:'https:',origin:'https://radar.test',href:'https://radar.test/'},document:{documentElement:{},querySelectorAll:()=>images},MutationObserver:class{observe(){}disconnect(){}},indexedDB:{open(){const request={};setTimeout(()=>{request.result=database;request.onsuccess?.();},0);return request;}},fetch:fetcher,AbortSignal,setTimeout,clearTimeout};
 vm.runInNewContext(source,context);return {cache:window.GameCoverCache,data};
}

test('本地缓存读取卡住仍可下载，首次失败后自动重试并写入本地缓存',async()=>{
 const url='https://image.api.playstation.com/retry.jpg',img={dataset:{coverUrl:url},isConnected:true,closest:()=>null};let calls=0;
 const {data}=client([],async()=>{calls++;if(calls===1)throw Error('Transient failure');return new Response(new Blob(['recovered']),{headers:{'content-type':'image/jpeg'}});},{images:[img],stalled:true});
 for(let i=0;i<250&&!img.src;i++)await pause(10);
 assert.equal(calls,2);assert.match(img.src,/^blob:/);assert.ok(data.has(url));
});
test('已缓存封面绕过满载下载队列，过期检查不阻塞显示',async()=>{
 const url='https://image.api.playstation.com/cached.jpg',waiting=[],calls=[];
 const {cache}=client([{url,blob:new Blob(['cached']),etag:'"old"',checkedAt:0}],async(endpoint,options)=>{
  const source=new URL(endpoint).searchParams.get('url');calls.push(source);
  if(source===url){assert.equal(options.headers['If-None-Match'],'"old"');return new Response(null,{status:304});}
  return new Promise(resolve=>waiting.push(()=>resolve(new Response(new Blob(['new']),{headers:{'content-type':'image/jpeg',etag:'"new"'}}))));
 });
 const downloads=[0,1,2,3].map(i=>cache.get(`https://image.api.playstation.com/slow${i}.jpg`));
 for(let i=0;waiting.length<4&&i<50;i++)await pause(5);
 assert.equal(waiting.length,4);
 const src=await Promise.race([cache.get(url),pause(150).then(()=>{throw new Error('Cached image blocked by downloads');})]);
 assert.match(src,/^blob:/);assert.equal(calls.includes(url),false);
 waiting.forEach(finish=>finish());await Promise.all(downloads);await pause(20);
 assert.equal(calls.filter(value=>value===url).length,1);
 assert.equal(await cache.get(url),src,'304 retains the existing blob');
});
test('本页未缓存封面全部下载完之后才开始其他平台预加载',async()=>{
 const calls=[];
 const {cache}=client([],async endpoint=>{calls.push(new URL(endpoint).searchParams.get('url'));await pause(30);return new Response(new Blob(['new']),{headers:{'content-type':'image/jpeg',etag:'"new"'}});});
 cache.preload(['https://image.api.playstation.com/other-platform.jpg']);
 const current=Array.from({length:12},(_,i)=>cache.get(`https://image.api.playstation.com/page${i}.jpg`));
 await Promise.all(current);assert.equal(calls.length,12);
 await pause(650);assert.equal(calls.at(-1),'https://image.api.playstation.com/other-platform.jpg');
});

test('主榜四个慢请求不会堵住档案弹窗封面，已排队的图片可升级优先级',async()=>{
 const waiting=[],url='https://image.api.playstation.com/archive.jpg';
 const {cache}=client([],async endpoint=>{
  if(new URL(endpoint).searchParams.get('url')===url)return new Response(new Blob(['archive']),{headers:{'content-type':'image/jpeg'}});
  return new Promise(resolve=>waiting.push(()=>resolve(new Response(new Blob(['main']),{headers:{'content-type':'image/jpeg'}}))));
 });
 const main=[0,1,2,3].map(i=>cache.get(`https://image.api.playstation.com/main${i}.jpg`));
 for(let i=0;waiting.length<4&&i<50;i++)await pause(5);
 assert.equal(waiting.length,4);
 const queued=cache.get(url,{priority:false});await pause(10);
 const src=await Promise.race([cache.get(url,{dialog:true}),pause(150).then(()=>{throw Error('Archive blocked by main covers');})]);
 assert.match(src,/^blob:/);assert.equal(await queued,src);
 waiting.forEach(finish=>finish());await Promise.all(main);
});

test('港服官方地址缓存可通过代理地址离线显示，跨代理来源共用缓存',async()=>{
 const url='https://store.nintendo.com.hk/media/catalog/product/game.jpg';
 const img={dataset:{coverUrl:`https://radar.test/api/nintendo/image?url=${encodeURIComponent(url)}`},isConnected:true,closest:()=>null};
 let calls=0;
 const {cache}=client([{url,blob:new Blob(['hk']),checkedAt:Date.now()}],async()=>{calls++;throw Error('Offline');},{images:[img]});
 const src=await cache.get(`https://old.test/api/covers/image?url=${encodeURIComponent(url)}`);
 for(let i=0;i<50&&!img.src;i++)await pause(5);
 assert.equal(img.src,src);assert.match(src,/^blob:/);assert.equal(calls,0);
});

test('旧版港服代理缓存离线迁移到官方地址，后续读取不依赖代理',async()=>{
 const url='https://store.nintendo.com.hk/media/catalog/product/legacy.jpg';
 const proxy=`https://radar.test/api/nintendo/image?url=${encodeURIComponent(url)}`;
 let calls=0;
 const {cache,data}=client([{url:proxy,blob:new Blob(['legacy']),checkedAt:Date.now()}],async()=>{calls++;throw Error('Offline');});
 const src=await cache.get(url);
 assert.equal(await cache.get(proxy),src);assert.ok(data.has(url));assert.equal(calls,0);
});
