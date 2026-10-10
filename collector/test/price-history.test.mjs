import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile, readFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import path from 'node:path';
import os from 'node:os';
import { PriceHistory } from '../src/price-history.mjs';

test('清理付费游戏未核实的缓存零价，真实免费和已核实促销零价保留并备份',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'invalid-zero-')),file=path.join(dir,'prices.sqlite');
 try{
  const zero={date:'2026-10-01T00:00:00Z',price:0,note:'缓存价格建档（原始采集时间未核实）'},paid={date:'2026-10-02T00:00:00Z',price:100};
  await writeFile(file.replace('.sqlite','.json'),JSON.stringify({'ps5_hk:paid':[zero,paid],'steam:free':[zero],'steam:promo':[{...zero,note:'首次建档'},paid]}));
  const store=new PriceHistory(file);await store.init();const data=store.query({keys:['ps5_hk:paid','steam:free','steam:promo']});
  assert.deepEqual(data['ps5_hk:paid'].map(r=>r.price),[100]);assert.equal(data['steam:free'][0].price,0);assert.deepEqual(data['steam:promo'].map(r=>r.price),[0,100]);
  const backup=JSON.parse(gunzipSync(await readFile(file+'.invalid-zero-backup.json.gz')));assert.equal(backup.length,1);assert.equal(backup[0].key,'ps5_hk:paid');store.close();
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('退榜间隔独立持久化，回榜同价不增加价格记录，失败和旧缓存不制造间隔',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'ranking-gaps-')),file=path.join(dir,'prices.sqlite');let store=new PriceHistory(file);await store.init();
 const game={id:'a',name:'Game',price:100};
 const capture=(day,games,stale=false)=>store.capture({steam:{updatedAt:`2026-10-${String(day).padStart(2,'0')}T00:00:00Z`,games,stale}});
 try{
  await capture(1,[game]);await capture(2,[],true);assert.deepEqual(store.rankingGaps(['steam:a'])['steam:a'],[]);
  await capture(3,[]);await capture(4,[]);assert.deepEqual(store.rankingGaps(['steam:a'])['steam:a'],[{from:'2026-10-03T00:00:00.000Z',to:null}]);
  await capture(4,[game],true);assert.equal(store.rankingGaps(['steam:a'])['steam:a'][0].to,null);
  await capture(4,[]);assert.equal(store.rankingGaps(['steam:a'])['steam:a'].length,1);
  await capture(5,[game]);assert.equal(store.rankingGaps(['steam:a'])['steam:a'][0].to,'2026-10-05T00:00:00.000Z');
  assert.equal(store.query({keys:['steam:a']})['steam:a'].length,1);
  store.close();store=new PriceHistory(file);await store.init();
  await capture(3,[]);assert.equal(store.catalog().games[0].inRanking,true);
  await capture(6,[]);await capture(7,[{...game,price:90}]);
  assert.equal(store.rankingGaps(['steam:a'])['steam:a'].length,2);
  assert.equal(store.rankingGaps(['steam:a'])['steam:a'][1].to,'2026-10-07T00:00:00.000Z');
  assert.deepEqual(store.query({keys:['steam:a']})['steam:a'].map(row=>row.price),[100,90]);
 }finally{store.close();await rm(dir,{recursive:true,force:true});}
});

test('全量修正档案译名更新搜索索引，退榜状态和价格日期原样保留',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'archive-title-refresh-'));const store=new PriceHistory(path.join(dir,'history.sqlite'));await store.init();
 try{
  await store.capture({ps5_hk:{updatedAt:'2026-10-01T00:00:00Z',games:[{id:'sku',name:'柏德之門3',cn:'柏德之門3',price:100}]}});
  await store.capture({ps5_hk:{updatedAt:'2026-10-02T00:00:00Z',games:[]}});
  const before=store.query({keys:['ps5_hk:sku']});const archive=store.catalog().games[0];
  assert.equal(store.refreshCatalogTitles(()=> '博德之门3'),1);assert.equal(store.refreshCatalogTitles(()=> '博德之门3'),0);
  const after=store.catalog({query:'博德之门3'}).games[0];assert.equal(after.cn,'博德之门3');assert.equal(after.name,'柏德之門3');assert.equal(after.inRanking,false);
  assert.equal(after.firstSeen,archive.firstSeen);assert.equal(after.lastSeen,archive.lastSeen);assert.deepEqual(store.query({keys:['ps5_hk:sku']}),before);
  assert.equal(store.catalog({query:'柏德之門3'}).total,1);
 }finally{store.close();await rm(dir,{recursive:true,force:true});}
});

test('退榜、重新入榜和重启都保留游戏资料与价格历史，重复采集不增加条目',async()=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'game-archive-'));
  try{
    const file=path.join(dir,'prices.sqlite'),store=new PriceHistory(file);await store.init();
    const a={id:'a',name:'Stray',cn:'迷失',image:'https://example.com/a.jpg',url:'https://example.com/a',platform:'PS5',price:100,rank:1};
    await store.capture({ps5_hk:{updatedAt:'2026-10-01T00:00:00Z',games:[a]}});
    await store.capture({ps5_hk:{updatedAt:'2026-10-02T00:00:00Z',games:[{id:'b',name:'New Game',price:80,rank:1}]}});
    const exited=store.catalog({status:'exited'});assert.equal(exited.total,1);
    assert.equal(exited.games[0].name,'Stray');assert.equal(exited.games[0].image,a.image);
    assert.equal(exited.games[0].price,100);assert.equal(exited.games[0].recordCount,1);
    assert.equal(store.catalog({query:'迷失'}).total,1);assert.equal(store.catalog({query:'STRAY'}).total,1);
    assert.equal(store.catalog({platform:'ps5_jp'}).total,0);
    await store.capture({ps5_hk:{stale:true,updatedAt:'2026-10-03T00:00:00Z',games:[a]}});
    assert.equal(store.catalog({status:'current'}).total,2,'部分失败不误判其他商品退榜');
    const snapshot={updatedAt:'2026-10-04T00:00:00Z',games:[{...a,price:90}]};
    await store.capture({ps5_hk:snapshot});await store.capture({ps5_hk:snapshot});
    assert.equal(store.catalog().total,2);
    const returned=store.catalog({query:'Stray'}).games[0];
    assert.equal(returned.firstSeen,'2026-10-01T00:00:00.000Z');assert.equal(returned.inRanking,true);
    assert.equal(returned.recordCount,2);store.close();
    const restored=new PriceHistory(file);await restored.init();
    assert.equal(restored.catalog().total,2);assert.equal(restored.catalog({status:'exited'}).games[0].name,'New Game');
    assert.deepEqual(restored.query({keys:['ps5_hk:a']})['ps5_hk:a'].map(r=>r.price),[100,90]);restored.close();
  }finally{await rm(dir,{recursive:true,force:true});}
});

test('未定价游戏也保存档案，旧库历史补入目录而不丢失价格',async()=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'game-archive-migrate-'));
  try{
    const file=path.join(dir,'prices.sqlite'),legacy=file.replace('.sqlite','.json');
    await writeFile(legacy,JSON.stringify({'steam:old':[{date:'2026-10-01T00:00:00Z',price:20}]}));
    const store=new PriceHistory(file);await store.init();
    await store.capture({steam_global:{updatedAt:'2026-10-02T00:00:00Z',games:[{id:'new',name:'No regional price',price:0,priceAvailable:false}]}});
    assert.equal(store.catalog().total,1,'没有名称的旧记录不出现在公开档案');
    assert.equal(store.catalog({includeUnresolved:true}).total,2,'底层档案完整保留');
    const missing=store.catalog({platform:'steam_global'}).games[0];
    assert.equal(missing.name,'No regional price');assert.equal(missing.recordCount,0);assert.equal(missing.price,null);
    assert.equal(store.catalog({platform:'steam'}).total,0);
    assert.equal(store.catalog().stats.exited,0,'统计与可见记录一致');
    assert.equal(store.query({keys:['steam:old']})['steam:old'][0].price,20);
    store.restoreCatalogMetadata({steam:[{id:'old',name:'Archived Game',cn:'退榜游戏',price:999}]});
    const old=store.catalog({platform:'steam'}).games[0];
    assert.equal(old.name,'Archived Game');assert.equal(old.price,20);assert.equal(old.inRanking,false);
    assert.equal(old.lastSeen,'2026-10-01T00:00:00.000Z');assert.equal(store.catalog({query:'退榜游戏'}).total,1);
    assert.equal(store.catalog({limit:1,page:2}).games.length,1);store.close();
  }finally{await rm(dir,{recursive:true,force:true});}
});

test('price history persists same-day changes and separates regional prices', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'price-history-'));
  try {
    const file = path.join(directory, 'history.json');
    const history = new PriceHistory(file);
    await history.init();
    const snapshot = (price, minute) => ({ updatedAt: `2026-10-01T00:${minute}:00Z`, games: [{ id: 'a', price }] });
    await history.capture({ switch1: snapshot(100, '00'), switch1_hk: snapshot(50, '00') });
    await history.capture({ switch1: snapshot(80, '30') });
    await history.capture({ switch1: snapshot(100, '40') });
    await history.capture({ switch1: snapshot(100, '50') });
    await history.capture({ switch1: { ...snapshot(0, '59'), stale: true } });
    history.close();
    const restored = new PriceHistory(file);
    await restored.init();
    const records=restored.query({keys:['switch1:a','switch1_hk:a']});
    assert.deepEqual(records['switch1:a'].map(record => record.price), [100, 80, 100]);
    assert.equal(records['switch1_hk:a'][0].price, 50);
    restored.close();
  } finally { await rm(directory, { recursive: true, force: true }); }
});
test('JSON迁移保留毫秒和价格，压缩备份可恢复，按范围查询带起始价格',async()=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'price-migration-'));
  try{
    const file=path.join(dir,'history.json');
    const data={'ps5_hk:sku':[
      {date:'2026-01-01T00:00:00.123Z',price:123.45,old:199,note:'首次建档'},
      {date:'2026-07-01T00:00:00.234Z',price:99.9,old:199,note:''}
    ]};
    await writeFile(file,JSON.stringify(data));
    const store=new PriceHistory(file);await store.init();
    assert.deepEqual(store.query({keys:['ps5_hk:sku']}),data);
    assert.deepEqual(JSON.parse(gunzipSync(await readFile(file+'.gz')).toString()),data);
    const range=store.query({keys:['ps5_hk:sku'],since:Date.parse('2026-04-01')});
    assert.deepEqual(range,data);
    const plan=store.db.prepare('EXPLAIN QUERY PLAN SELECT * FROM prices WHERE game=? AND time>=? ORDER BY time').all(1,0);
    assert.ok(plan.some(row=>row.detail.includes('PRIMARY KEY')));
    store.close();
    const restored=new PriceHistory(file);await restored.init();
    assert.equal(restored.query({keys:['ps5_hk:sku']})['ps5_hk:sku'].length,2);
    restored.close();
  }finally{await rm(dir,{recursive:true,force:true});}
});
test('PS港服局部失败仍记录已验证价格，旧缓存不伪造新的价格变动',async()=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'price-partial-'));
  try{
    const store=new PriceHistory(path.join(dir,'history.sqlite'));await store.init();
    await store.capture({ps5_hk:{stale:true,updatedAt:'2026-10-01T00:00:00Z',games:[{id:'sku',price:100,verified:true}]}});
    await store.capture({ps5_hk:{stale:true,updatedAt:'2026-10-02T00:00:00Z',games:[{id:'sku',price:90,verified:true,priceStale:true,priceUpdatedAt:'2026-10-01T00:00:00Z'}]}});
    await store.capture({ps5_hk:{stale:true,updatedAt:'2026-10-03T00:00:00Z',games:[{id:'sku',price:80,verified:true,priceUpdatedAt:'2026-10-03T00:00:00Z'}]}});
    const history=store.query({keys:['ps5_hk:sku']})['ps5_hk:sku'];
    assert.deepEqual(history.map(record=>record.price),[100,80]);
    assert.match(history[0].note,/缓存/);store.close();
  }finally{await rm(dir,{recursive:true,force:true});}
});
test('历史分页不重复不遗漏，相邻毫秒价格变化完整保留',async()=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'price-pages-'));
  try{
    const store=new PriceHistory(path.join(dir,'history.sqlite'));await store.init();
    for(let i=0;i<7;i++)await store.capture({steam:{updatedAt:new Date(Date.parse('2026-10-01')+i).toISOString(),games:[{id:'a',price:i}]}});
    let after=null;const records=[];
    do{
      const page=store.query({keys:['steam:a'],after,limit:2});
      records.push(...page['steam:a']);
      const cursor=store.continuations(page)['steam:a'];
      after=cursor?Date.parse(cursor):null;
    }while(after!==null);
    assert.deepEqual(records.map(record=>record.price),[0,1,2,3,4,5,6]);
    store.close();
  }finally{await rm(dir,{recursive:true,force:true});}
});

test('同商品跨区服补资料保留退榜价格与日期，不混用其他平台编号',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'game-archive-shared-'));
 try{
  const file=path.join(dir,'prices.sqlite');await writeFile(file.replace('.sqlite','.json'),JSON.stringify({'steam:42':[{date:'2026-10-01T00:00:00Z',price:20}],'ps5_jp:42':[{date:'2026-10-01T00:00:00Z',price:200}]}));
  const store=new PriceHistory(file);await store.init();
  await store.capture({steam_global:{updatedAt:'2026-10-02T00:00:00Z',games:[{id:'42',name:'Stray',cn:'迷失',image:'https://shared.fastly.steamstatic.com/42.jpg',price:100}]}});
  assert.equal(store.restoreSharedMetadata(),1);
  const old=store.catalog({platform:'steam'}).games[0];assert.equal(old.name,'Stray');assert.equal(old.cn,'迷失');assert.ok(old.image);assert.equal(old.price,20);assert.equal(old.inRanking,false);assert.equal(old.lastSeen,'2026-10-01T00:00:00.000Z');
  assert.equal(store.catalog({platform:'ps5_jp'}).total,0);assert.equal(store.catalog({platform:'ps5_jp',includeUnresolved:true}).games[0].metadataMissing,true);assert.equal(store.restoreSharedMetadata(),0);store.close();
 }finally{await rm(dir,{recursive:true,force:true});}
});
