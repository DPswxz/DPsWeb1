import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {GameCoverProxy,gameCoverUrl} from '../src/game-cover.mjs';
import {NintendoCoverProxy} from '../src/nintendo-cover.mjs';

test('港服封面会话通过商店首页建立，不等待排行榜商品',async()=>{
 let closed=false,ready=false;
 const storage={cookies:[{name:'aws-waf-token',value:'session'}],origins:[]};
 const page={route:async()=>{},goto:async(url,options)=>{assert.equal(url,'https://store.nintendo.com.hk/');assert.ok(options.timeout<=15000);},
  waitForFunction:async()=>{ready=true;},context:()=>({storageState:async()=>storage}),evaluate:async()=> 'browser-agent'};
 const proxy=new NintendoCoverProxy({browserType:{launch:async()=>({newPage:async()=>page,close:async()=>{closed=true;}})},
  requestFactory:{newContext:async options=>{assert.ok(ready);assert.deepEqual(options.storageState,storage);return {ready:true};}}});
 assert.deepEqual(await proxy.context(),{ready:true});assert.ok(closed);
});

test('封面校验失败继续显示磁盘缓存，后续仍可发现换图',async()=>{
 const image=await sharp({create:{width:2,height:2,channels:3,background:'green'}}).png().toBuffer();
 let fail=false;
 const proxy=new GameCoverProxy({fetchImpl:async()=>{if(fail)throw Error('Temporary origin failure');return new Response(image,{headers:{'content-type':'image/png'}});}});
 const url='https://image.api.playstation.com/offline.png';const cached=await proxy.get(url);cached.expires=0;fail=true;
 const fallback=await proxy.get(url);assert.deepEqual(fallback.body,cached.body);assert.equal(fallback.etag,cached.etag);
 assert.ok(fallback.expires<=Date.now()+60000);
});

test('封面代理只接收指定官方图片域名，拒绝外部重定向目标',()=>{
  assert.equal(gameCoverUrl('https://image.api.playstation.com/test.jpg'),'https://image.api.playstation.com/test.jpg');
  for(const url of ['http://image.api.playstation.com/test.jpg','https://127.0.0.1/test.jpg',
    'https://image.api.playstation.com.evil.test/test.jpg','https://user:pass@image.api.playstation.com/test.jpg'])
    assert.throws(()=>gameCoverUrl(url));
});

test('相同封面请求去重，未改图条件验证，换图产生新内容指纹',async()=>{
  let calls=0,changed=false;
  const make=color=>sharp({create:{width:2,height:2,channels:3,background:color}}).png().toBuffer();
  const red=await make('red'),blue=await make('blue');
  const proxy=new GameCoverProxy({fetchImpl:async(url,options)=>{
    calls++;
    if(!changed&&options.headers['If-None-Match']==='"original-1"')return new Response(null,{status:304});
    return new Response(changed?blue:red,{headers:{'Content-Type':'image/png','ETag':changed?'"original-2"':'"original-1"'}});
  }});
  const url='https://image.api.playstation.com/test.jpg';
  const [a,b]=await Promise.all([proxy.get(url),proxy.get(url)]);
  assert.equal(calls,1);assert.equal(a.etag,b.etag);
  a.expires=0;
  const same=await proxy.get(url);assert.equal(calls,2);assert.equal(same.etag,a.etag);
  while(proxy.checking.size)await new Promise(resolve=>setTimeout(resolve,5));
  proxy.cache.get(url).expires=0;
  same.expires=0;changed=true;
  const immediate=await proxy.get(url);assert.equal(immediate.etag,a.etag);
  while(proxy.checking.size)await new Promise(resolve=>setTimeout(resolve,5));
  const updated=await proxy.get(url);assert.equal(calls,3);assert.notEqual(updated.etag,a.etag);
  assert.notDeepEqual(updated.body,a.body);
});

test('过期缓存立即显示，慢校验不阻塞首次下载且并发只校验一次',async()=>{
 const image=await sharp({create:{width:2,height:2,channels:3,background:'green'}}).png().toBuffer();
 let release,calls=0;const url='https://image.api.playstation.com/stale.png';
 const proxy=new GameCoverProxy({fetchImpl:async target=>{calls++;if(target===url)await new Promise(resolve=>{release=resolve;});return new Response(image,{headers:{'content-type':'image/png'}});}});
 proxy.cache.set(url,{body:image,etag:'"cached"',expires:0});
 const results=await Promise.all([proxy.get(url),proxy.get(url)]);assert.equal(results[0].etag,'"cached"');assert.equal(calls,1);
 const fresh=await proxy.get('https://image.api.playstation.com/new.png');assert.ok(fresh.body.length);assert.equal(calls,2);
 release();while(proxy.checking.size)await new Promise(resolve=>setTimeout(resolve,5));
 assert.notEqual((await proxy.get(url)).etag,'"cached"');
});

test('封面落盘后新代理实例复用图片，过期只发送条件请求',async()=>{
 const {mkdtemp,rm}=await import('node:fs/promises');const{tmpdir}=await import('node:os');const path=await import('node:path');const dir=await mkdtemp(path.join(tmpdir(),'game-covers-'));
 try{
  const image=await sharp({create:{width:8,height:8,channels:3,background:'green'}}).png().toBuffer();let calls=0;
  const url='https://image.api.playstation.com/persistent.png';
  const first=new GameCoverProxy({cacheDir:dir,fetchImpl:async()=>{calls++;return new Response(image,{headers:{'content-type':'image/png',etag:'"origin"'}});}});const a=await first.get(url);
  const second=new GameCoverProxy({cacheDir:dir,fetchImpl:async()=>{throw Error('Restart must use disk cache');}});const b=await second.get(url);assert.deepEqual(b.body,a.body);assert.equal(calls,1);
  b.expires=0;const third=new GameCoverProxy({cacheDir:dir,fetchImpl:async(_url,options)=>{assert.equal(options.headers['If-None-Match'],'"origin"');return new Response(null,{status:304});}});await third.saveDisk(url,b);const c=await third.get(url);assert.deepEqual(c.body,a.body);
 }finally{await rm(dir,{recursive:true,force:true});}
});
