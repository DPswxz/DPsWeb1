import test from 'node:test';
import assert from 'node:assert/strict';
import { describeNintendoRanking } from '../src/nintendo-ranking-source.mjs';

test('旧港服缓存改标网页榜单，不将100名容量用于30条网页结果', () => {
  const original = { officialLimit: 100, games: Array.from({length:30}, (_, i) => ({id:i, rank:i+1})), stale:true };
  const result = describeNintendoRanking(original, 'switch1_hk');
  assert.equal(result.officialLimit, 30);
  assert.equal(result.count, 30);
  assert.equal(result.sourceKind, 'web-store-ranking');
  assert.match(result.sourceNote, /与主机 eShop 前100名不同/);
  assert.equal(result.stale, true);
  assert.deepEqual(result.games, original.games);
  assert.equal(original.officialLimit, 100);
});

test('日服50条和实际取得100条均以实际数量显示，不拼接补足', () => {
  for (const count of [50, 100]) {
    const result = describeNintendoRanking({games:Array.from({length:count},(_,i)=>({id:i}))}, 'switch1');
    assert.equal(result.count, count);
    assert.equal(result.officialLimit, count);
    assert.match(result.sourceType, /日本网页/);
  }
  assert.equal(describeNintendoRanking(null,'switch1'), null);
});
