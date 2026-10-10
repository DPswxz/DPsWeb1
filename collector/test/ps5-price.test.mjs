import test from 'node:test';
import assert from 'node:assert/strict';
import {extractProductPrice,extractPsProductNames} from '../src/ps5.mjs';
import {PlayStationJpCollector} from '../src/ps5-jp.mjs';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';

test('官方名称分散在多个页面片段，后续无名称片段不会抹掉基础版名称',()=>{
 const script=cache=>'<script type="application/json">'+JSON.stringify({cache})+'</script>';
 const html=script({'Product:base':{name:'博德之门3 (日语, 简体中文, 英语)'}})+script({'Product:base':{activeCtaId:'BUY'},'Product:deluxe':{name:'博德之门3 - 数字豪华版 (英语)'}});
 assert.deepEqual([...extractPsProductNames(html)],[['base','博德之门3'],['deluxe','博德之门3 - 数字豪华版']]);
});

test('会员试玩和目录不能当免费游戏，购买价格必须属于当前商品',()=>{
  const id='HP-GAME';
  const html='<script type="application/json">'+JSON.stringify({cache:{
    [`Product:${id}`]:{activeCtaId:`UPSELL:${id}-H001`},
    [`GameCTA:UPSELL:${id}-H001`]:{type:'UPSELL_PS_PLUS_TRIAL',price:{discountedPrice:'游戏试玩',isFree:true,isTiedToSubscription:true,currencyCode:'HKD'}},
    'GameCTA:ADD_TO_CART:OTHER-GAME-H001':{price:{discountedPrice:'HK$99',currencyCode:'HKD'}},
    [`GameCTA:ADD_TO_CART:${id}-H002:OUTRIGHT`]:{type:'ADD_TO_CART',price:{discountedPrice:'HK$327.60',basePrice:'HK$468.00',isFree:false,currencyCode:'HKD'}}
  }})+'</script>';
  assert.deepEqual(extractProductPrice(html,id),{discountedPrice:'HK$327.60',basePrice:'HK$468.00',discountText:'',isFree:false});
});
test('只有会员包含而没有独立购买价格时，不虚构免费价格',()=>{
  const html='<script type="application/json">'+JSON.stringify({cache:{'Product:GAME':{activeCtaId:'CATALOG:GAME-H001'},'GameCTA:CATALOG:GAME-H001':{type:'UPSELL_PS_PLUS_GAME_CATALOG',price:{discountedPrice:'包含',isFree:true,isTiedToSubscription:true}}}})+'</script>';
  assert.equal(extractProductPrice(html,'GAME'),null);
});
test('真正免费本体的非会员购买信息仍返回免费',()=>{
  const html='<script type="application/json">'+JSON.stringify({cache:{'Product:FREE':{activeCtaId:'ADD_TO_CART:FREE-H001'},'GameCTA:ADD_TO_CART:FREE-H001':{type:'ADD_TO_CART',price:{discountedPrice:'免费',basePrice:'免费',currencyCode:'HKD',isFree:true,isTiedToSubscription:false}}}})+'</script>';
  assert.equal(extractProductPrice(html,'FREE').isFree,true);
});

test('日服收集同样使用独立购买价格，保留日元、日服链接及正确平台',async()=>{
  const dir=await mkdtemp(path.join(tmpdir(),'game-jp-price-'));
  try {
    const id='JP9000-PPSA00001_00-GAME';
    const request=async(url,options)=>{
      if(String(url).includes('categoryGridRetrieve')) {
        assert.equal(options.headers['x-psn-store-locale-override'],'ja-JP');
        const offset=JSON.parse(new URL(url).searchParams.get('variables')).pageArgs.offset;
        return {ok:true,json:async()=>({data:{categoryGridRetrieve:{concepts:offset?[]:[{id:'123',name:'Test',price:{isFree:true,discountedPrice:'無料'},products:[{id}],platforms:['PS4','PS5']}]}}})};
      }
      assert.equal(url,`https://store.playstation.com/ja-jp/product/${id}`);
      return {ok:true,text:async()=>'<title>Test</title><script type="application/json">'+JSON.stringify({cache:{
        [`Product:${id}`]:{activeCtaId:`UPSELL:${id}-H001`,screenLanguages:['zh']},
        [`GameCTA:UPSELL:${id}-H001`]:{type:'UPSELL_PS_PLUS_GAME_CATALOG',price:{discountedPrice:'含まれます',isFree:true,isTiedToSubscription:true,currencyCode:'JPY'}},
        [`GameCTA:ADD_TO_CART:${id}-H002:OUTRIGHT`]:{type:'ADD_TO_CART',price:{discountedPrice:'¥3,980',basePrice:'¥7,960',currencyCode:'JPY',isFree:false}}
      }})+'</script>'};
    };
    const collector=new PlayStationJpCollector({cacheFile:path.join(dir,'cache.json'),langCacheFile:path.join(dir,'langs.json'),request});
    await collector.init();collector.langCache[id]=false;
    const result=await collector.refresh({force:true});
    assert.equal(result.platform,'ps5_jp');
    assert.equal(result.games.length,1);
    assert.equal(result.games[0].price,3980);
    assert.equal(result.games[0].discount,50);
    assert.equal(result.games[0].platform,'PS5');
    assert.equal(result.games[0].hasChinese,true);
    assert.equal(result.games[0].url,`https://store.playstation.com/ja-jp/product/${id}`);
    assert.equal(collector.progress.total,1);
    assert.equal(collector.progress.completed,1);
    assert.equal(collector.progress.verified,1);
  } finally {await rm(dir,{recursive:true,force:true});}
});

test('同一游戏详情页一次返回多个版本各自的购买价格，不逐个下载',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'ps-concept-price-'));
 try{
  const {PlayStationCollector}=await import('../src/ps5.mjs');const calls=[];
  const request=async url=>{
   calls.push(url);
   if(url.includes('categoryGridRetrieve')){const offset=JSON.parse(new URL(url).searchParams.get('variables')).pageArgs.offset;return {ok:true,json:async()=>({data:{categoryGridRetrieve:{concepts:offset?[]:[{id:'100',name:'Game',products:[{id:'BASE'},{id:'DELUXE'}]}]}}})};}
   assert.match(url,/concept\/100$/);
   return {ok:true,text:async()=>'<script type="application/json">'+JSON.stringify({cache:{'Product:BASE':{name:'Game',platforms:['PS5']},'Product:DELUXE':{name:'Game Deluxe Edition',platforms:['PS5']},'GameCTA:ADD_TO_CART:BASE-H001':{type:'ADD_TO_CART',price:{currencyCode:'HKD',discountedPrice:'HK$100'}},'GameCTA:ADD_TO_CART:DELUXE-H001':{type:'ADD_TO_CART',price:{currencyCode:'HKD',discountedPrice:'HK$150'}}}})+'</script>'};
  };
  const collector=new PlayStationCollector({cacheFile:path.join(dir,'cache.json'),fallbackFile:null,request});await collector.init();const result=await collector.refresh({force:true});
  assert.equal(calls.length,4);assert.deepEqual(calls.filter(url=>url.includes("categoryGridRetrieve")).map(url=>JSON.parse(new URL(url).searchParams.get("variables")).pageArgs.offset),[0,100,200]);assert.equal(calls.filter(url=>url.includes('/product/')).length,0);assert.deepEqual(result.games.map(game=>game.price),[100,150]);assert.equal(result.stale,false);
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('正常页面只有订阅报价时标记未提供售价，不当作请求失败或免费',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'ps-no-offer-'));
 try{
  const {PlayStationCollector}=await import('../src/ps5.mjs');const request=async url=>url.includes('categoryGridRetrieve')?{ok:true,json:async()=>({data:{categoryGridRetrieve:{concepts:JSON.parse(new URL(url).searchParams.get('variables')).pageArgs.offset?[]:[{id:'200',name:'Game',products:[{id:'BASE'}]}]}}})}:{ok:true,text:async()=>'<title>Game</title><script type="application/json">'+JSON.stringify({cache:{'Product:BASE':{name:'Game'},'GameCTA:CATALOG:BASE-H001':{type:'UPSELL_PS_PLUS_GAME_CATALOG',price:{isTiedToSubscription:true,isFree:true,discountedPrice:'內含'}}}})+'</script>'};
  const collector=new PlayStationCollector({cacheFile:path.join(dir,'cache.json'),fallbackFile:null,request});await collector.init();const result=await collector.refresh({force:true});assert.equal(result.stale,false);assert.equal(result.unavailableCount,1);assert.equal(result.games[0].priceAvailable,false);assert.equal(result.games[0].price,null);
 }finally{await rm(dir,{recursive:true,force:true});}
});
