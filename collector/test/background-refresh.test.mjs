import test from 'node:test';
import assert from 'node:assert/strict';
import { BackgroundRefresh } from '../src/background-refresh.mjs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

test('部分区服失败保留真实成功时间，恢复后清除失败状态', async () => {
  let now = Date.parse('2026-10-04T02:00:00Z'), finish;
  const queue = new BackgroundRefresh({now:()=>now});
  const old = {count:30, updatedAt:'2026-10-04T01:00:00Z', stale:false};
  queue.start('nintendo', async()=>new Promise(resolve=>{finish=resolve}));
  await Promise.resolve();
  assert.equal(queue.status('nintendo',old).refreshState,'refreshing');
  finish(); await Promise.all([...queue.tasks.values()]);
  assert.equal(queue.status('nintendo',old).refreshState,'failed');
  assert.equal(queue.status('nintendo',old).updatedAt,old.updatedAt);
  const fresh = {...old, updatedAt:'2026-10-04T02:01:00Z'};
  assert.equal(queue.status('nintendo',fresh).refreshState,'success');
  now += 3600000;
  queue.start('nintendo',async()=>{}, {scheduled:true});
  await Promise.all([...queue.tasks.values()]);
  assert.equal(queue.status('nintendo',fresh).refreshState,'failed');
  const recovered = {...fresh,updatedAt:'2026-10-04T03:01:00Z'};
  assert.equal(queue.status('nintendo',recovered).lastError,null);
});

test('异常退出后的失败记录持久保存，重启不能显示为更新成功', async () => {
  const dir = await mkdtemp(path.join(tmpdir(),'game-refresh-status-'));
  try {
    const stateFile = path.join(dir,'status.json');
    const queue = new BackgroundRefresh({stateFile, now:()=>Date.parse('2026-10-04T02:00:00Z')});
    queue.start('steam',async()=>{throw new Error('HTTP 403 AccessDenied')});
    await Promise.all([...queue.tasks.values()]);
    const restarted = new BackgroundRefresh({stateFile});
    await restarted.init();
    const status = restarted.status('steam',{updatedAt:'2026-10-04T01:00:00Z',stale:false});
    assert.equal(status.refreshState,'failed');
    assert.equal(status.lastError,'HTTP 403 AccessDenied');
    assert.equal(status.lastAttemptAt,'2026-10-04T02:00:00.000Z');
  } finally {await rm(dir,{recursive:true,force:true});}
});

test('background work is deduplicated and cannot be retriggered within the hour', async () => {
  let now = 0, finish, calls = 0;
  const queue = new BackgroundRefresh({ now: () => now });
  const cached = { price: 100 };
  const work = async () => { calls++; await new Promise(resolve => { finish = resolve; }); cached.price = 80; };
  assert.equal(queue.start('ps5', work), true);
  await Promise.resolve();
  assert.equal(queue.start('ps5', work), false);
  assert.equal(cached.price, 100);
  finish(); await Promise.all([...queue.tasks.values()]);
  assert.equal(cached.price, 80);
  assert.equal(queue.start('ps5', work), false);
  now += 60 * 60 * 1000;
  assert.equal(queue.start('ps5', work), true);
  await Promise.resolve(); finish(); await Promise.all([...queue.tasks.values()]);
  assert.equal(calls, 2);
});

test('重启识别未完成的采集，部分成功单独标注而非整次失败', async () => {
  const dir = await mkdtemp(path.join(tmpdir(),'game-interrupted-'));
  try {
    const stateFile=path.join(dir,'status.json');
    await writeFile(stateFile,JSON.stringify({ps5:{lastAttemptAt:'2026-10-04T01:00:12Z',lastError:null}}));
    const queue=new BackgroundRefresh({stateFile});await queue.init();
    const old={updatedAt:'2026-10-03T23:41:12Z',stale:true,lastError:'已恢复18条历史商品'};
    assert.equal(queue.status('ps5',old).refreshState,'interrupted');
    assert.match(queue.status('ps5',old).lastError,/服务重启中断/);
    queue.records.set('ps5',{lastAttemptAt:'2026-10-04T02:00:00Z',completedAt:'2026-10-04T02:20:00Z',lastError:null});
    assert.equal(queue.status('ps5',{...old,updatedAt:'2026-10-04T02:19:59Z',lastError:'2个商品页未返回价格'}).refreshState,'partial');
  }finally{await rm(dir,{recursive:true,force:true});}
});
