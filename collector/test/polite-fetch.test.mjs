import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createPoliteFetch } from '../src/polite-fetch.mjs';

test('PS regional requests share one queue and leave two seconds between completed downloads', async () => {
  let now = 0, active = 0, maxActive = 0;
  const starts = [];
  const request = createPoliteFetch({ now: () => now, sleep: async ms => { now += ms; }, fetchImpl: async () => {
    starts.push(now); maxActive = Math.max(maxActive, ++active);
    return { ok: true, status: 200, text: async () => { await Promise.resolve(); active--; return 'ok'; } };
  } });
  await Promise.all(['https://store.playstation.com/hk', 'https://web.np.playstation.com/api', 'https://store.playstation.com/jp'].map(url => request(url)));
  assert.equal(maxActive, 1);
  assert.deepEqual(starts, [0, 2000, 4000]);
});

test('429 honors Retry-After, stops queued requests and preserves cooldown across restart', async t => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'game-polite-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  let calls = 0, now = 1000;
  const settings = { stateFile: path.join(dir, 'state.json'), now: () => now, sleep: async ms => { now += ms; }, fetchImpl: async () => {
    calls++;
    return new Response('', { status: 429, headers: { 'Retry-After': '7200' } });
  } };
  const request = createPoliteFetch(settings);
  await assert.rejects(request('https://store.playstation.com/hk'), /429/);
  await assert.rejects(request('https://store.playstation.com/jp'), /暂停/);
  await assert.rejects(createPoliteFetch(settings)('https://web.np.playstation.com/api'), /暂停/);
  assert.equal(calls, 1);
  now += 7200000;
  await assert.rejects(request('https://store.playstation.com/hk'), /429/);
  assert.equal(calls, 2);
});
