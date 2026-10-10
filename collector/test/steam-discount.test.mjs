import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import os from 'node:os';import path from 'node:path';
import {SteamCollector,steamDiscount} from '../src/steam.mjs';
test('Steam 折扣兼容新增属性、官方data-discount与原价回退',()=>{
 assert.equal(steamDiscount('<div class="discount_pct" aria-hidden="true">-56%</div>',98.56,224),56);
 assert.equal(steamDiscount('<div data-discount="75"></div>',69.75,279),75);
 assert.equal(steamDiscount('',69.75,279),75);assert.equal(steamDiscount('',100,null),0);
});
test('Steam旧缓存恢复折扣统计但保留价格与成功采集时间',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'steam-discount-'));const file=path.join(dir,'cache.json');
 try{const data={updatedAt:'2026-10-08T00:00:00Z',games:[{id:'1',price:69.75,old:279,discount:0},{id:'2',price:100,old:null,discount:0}]};await writeFile(file,JSON.stringify(data));
 const collector=new SteamCollector({cacheFile:file});await collector.init();assert.equal(collector.get().games[0].discount,75);assert.equal(collector.get().games[1].discount,0);
 assert.equal(collector.get().updatedAt,data.updatedAt);assert.equal(collector.get().games[0].price,69.75);assert.equal(JSON.parse(await readFile(file,'utf8')).games[0].discount,75);
 }finally{await rm(dir,{recursive:true,force:true});}
});
