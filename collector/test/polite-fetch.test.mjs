import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createPoliteFetch } from '../src/polite-fetch.mjs';

test('排队中的地区采集超时立即返回，不等待其他地区请求结束', async () => {
  let release, started, calls=0;
  const ready=new Promise(resolve=>{started=resolve;});
  const request=createPoliteFetch({gapMs:0,fetchImpl:async()=>{
    calls++;started();await new Promise(resolve=>{release=resolve;});
    return new Response('ok');
  }});
  const first=request('https://store.playstation.com/hk');
  await ready;
  const controller=new AbortController();
  const queued=request('https://store.playstation.com/jp',{signal:controller.signal});
  controller.abort(new Error('采集超时'));
  await assert.rejects(queued,/采集超时/);
  assert.equal(calls,1);
  release();await first;
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(calls,1,'已超时的排队任务不再发出网络请求');
});

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

test('短暂网络失败只暂停一分钟，后续排队任务恢复而不连续失败',async()=>{
 let now=0,calls=0;const request=createPoliteFetch({now:()=>now,sleep:async ms=>{now+=ms;},fetchImpl:async()=>{if(++calls===1)throw new Error('连接超时');return new Response('ok');}});
 await assert.rejects(request('https://store.playstation.com/first'),/连接超时/);
 assert.equal(await(await request('https://store.playstation.com/next')).text(),'ok');assert.equal(calls,2);assert.ok(now>=60000);
});
