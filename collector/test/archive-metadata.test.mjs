import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchArchiveMetadata } from '../src/archive-metadata.mjs';
test('archive resolves official names and covers without returning prices',async()=>{
 let calls=0;
 const game=await fetchArchiveMetadata('steam_global','1180320',async url=>{calls++;assert.match(url,/appids=1180320/);return Response.json({'1180320':{success:true,data:{name:'三国杀',header_image:'https://shared.fastly.steamstatic.com/image.jpg',price_overview:{final:10000}}}});});
 assert.equal(game.name,'三国杀');assert.ok(game.image);assert.equal(game.price,undefined);assert.equal(calls,1);
 const ps=await fetchArchiveMetadata('ps5_jp','10002466',async()=>new Response('<script type="application/ld+json">{"@type":"Product","name":"Dreamlight Valley","image":"https://image.api.playstation.com/cover.png"}</script>'));
 assert.equal(ps.name,'Dreamlight Valley');assert.ok(ps.image);
 assert.equal(await fetchArchiveMetadata('ps5_jp','123',async()=>new Response('<title>PlayStation Store</title>')),null);
 assert.equal(await fetchArchiveMetadata('steam','123',async()=>Response.json({'123':{success:false}})),null);
});

test('港服档案按港服商品编号查询，不使用日服编号路径',async()=>{
 const game=await fetchArchiveMetadata('switch2_hk','70070000037587',async url=>{
  assert.equal(url,'https://store.nintendo.com.hk/70070000037587');
  return new Response('<meta property="og:title" content="歧路旅人 I＋II 合辑"><meta property="og:image" content="https://store.nintendo.com.hk/media/catalog/product/a/b/official.jpg">');
 });
 assert.equal(game.name,'歧路旅人 I＋II 合辑');assert.ok(game.image);assert.equal(game.price,undefined);
});
