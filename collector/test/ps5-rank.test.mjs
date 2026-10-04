import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { PlayStationCollector } from '../src/ps5.mjs';

test('restores verified missing SKUs without overwriting newer prices or their history timestamps', async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'game-pulse-ps5-seed-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const cacheFile = path.join(dir, 'cache.json');
  const fallbackFile = path.join(dir, 'seed.js');
  const time = '2026-10-02T09:54:00.949Z';
  await writeFile(cacheFile, JSON.stringify({ sourceType: 'PlayStation Store 港服官方商店', games: [{ id: 'a', conceptId: 'official', price: 50 }] }));
  await writeFile(fallbackFile, 'window.PS5_HK_GAMES = ' + JSON.stringify([
    { id: 'a', rank: 1, price: 100, verified: true, priceUpdatedAt: time },
    { id: 'b', rank: 1, price: 200, verified: true, priceUpdatedAt: time },
    { id: 'unsafe', rank: 2, price: 300 },
    { id: 'undated', rank: 3, price: 400, verified: true }
  ]) + ';');
  const collector = new PlayStationCollector({ cacheFile, fallbackFile });
  await collector.init();
  assert.equal(collector.get().games.length, 2);
  assert.equal(collector.get().games[0].price, 50);
  assert.deepEqual(collector.get().games[1], { id: 'b', rank: 1, price: 200, verified: true,
    priceUpdatedAt: time, priceStale: true, conceptId: 'official' });
  await collector.init();
  assert.equal(collector.get().games.length, 2);
});

test('keeps the source concept position and cached SKU data when product pages are blocked', async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'game-pulse-ps5-'));
  const cacheFile = path.join(dir, 'cache.json');
  const previous = {
    games: [
      { id: 'COD-BASE', name: 'Modern Warfare 4', price: 568, rank: 45 },
      { id: 'COD-VAULT', name: 'Modern Warfare 4 Vault', price: 778, rank: 46 }
    ]
  };
  await writeFile(cacheFile, JSON.stringify(previous));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes('categoryGridRetrieve')) {
      const offset = JSON.parse(new URL(url).searchParams.get('variables')).pageArgs.offset;
      const concepts = offset ? [] : [
        { id: 'other', name: 'Other', price: { discountedPrice: 'HK$100' } },
        { id: 'cod', name: 'Call of Duty', products: [{ id: 'COD-BASE' }, { id: 'COD-VAULT' }] }
      ];
      return { ok: true, json: async () => ({ data: { categoryGridRetrieve: { concepts } } }) };
    }
    return { ok: false, status: 403 };
  };
  t.after(() => { globalThis.fetch = originalFetch; });

  const collector = new PlayStationCollector({ cacheFile, fallbackFile: null, request: (...args) => fetch(...args) });
  await collector.init();
  const result = await collector.refresh({ force: true });
  assert.equal(result.stale, true);
  assert.deepEqual(result.games.filter(game => game.id.startsWith('COD-')).map(game => ({
    name: game.name,
    price: game.price,
    rank: game.rank
  })), [
    { name: 'Modern Warfare 4', price: 568, rank: 2 },
    { name: 'Modern Warfare 4 Vault', price: 778, rank: 2 }
  ]);
  assert.equal(JSON.parse(await readFile(cacheFile, 'utf8')).games.length, 3);
});
