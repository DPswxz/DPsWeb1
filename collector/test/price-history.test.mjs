import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile, readFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import path from 'node:path';
import os from 'node:os';
import { PriceHistory } from '../src/price-history.mjs';

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
