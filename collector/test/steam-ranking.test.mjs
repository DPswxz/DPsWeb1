import test from 'node:test';
import assert from 'node:assert/strict';
import {parseSteamSearch,selectSteamGames,collectSteamRanking} from '../src/steam-ranking.mjs';

const row=(id,price)=>`<a class="search_result_row" href="https://store.steampowered.com/app/${id}/"><span class="title">Game ${id}</span><div class="discount_final_price">${price}</div></a>`;
test('价格缺失不是免费，名称中的免费字样不影响收费，保留跨页名次',()=>{
 const games=parseSteamSearch(row(1,'Free To Play')+row(2,'')+row(3,'¥ 20.00'),100);
 assert.equal(games[0].isFree,true);assert.equal(games[1].isFree,false);assert.equal(games[1].price,null);assert.equal(games[2].rank,103);
});
test('两区分别分页凑满200款付费，仅保留综合前200名免费条目并去重',async()=>{
 for(const global of [false,true]){
  const calls=[];
  const games=await collectSteamRanking({global,fetcher:async address=>{
   const url=new URL(address),start=Number(url.searchParams.get('start'));calls.push(url);
   return Response.json({total_count:1000,results_html:Array.from({length:50},(_,i)=>row(start+i+1,(start+i)%4===0?'Free To Play':'¥ 20.00')).join('')});
  }});
  assert.equal(games.filter(g=>!g.isFree).length,200);assert.equal(games.filter(g=>g.isFree).length,50);
  assert.ok(games.filter(g=>g.isFree).every(g=>g.rank<=200));assert.equal(new Set(games.map(g=>g.id)).size,250);
  assert.equal(calls[0].searchParams.get('filter'),global?'globaltopsellers':'topsellers');
  assert.equal(calls[0].searchParams.get('cc'),global?'us':'cn');assert.ok(calls.length>4);
 }
});
test('分页重复或不足200付费条目时拒绝覆盖完整缓存',async()=>{
 await assert.rejects(collectSteamRanking({fetcher:async()=>Response.json({total_count:1000,results_html:row(1,'¥20')})}),/分页重复/);
 await assert.rejects(collectSteamRanking({fetcher:async()=>Response.json({total_count:1,results_html:row(1,'¥20')})}),/仅获得 1/);
});
