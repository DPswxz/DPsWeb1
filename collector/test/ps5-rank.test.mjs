import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { PlayStationCollector } from '../src/ps5.mjs';

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

  const collector = new PlayStationCollector({ cacheFile });
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
