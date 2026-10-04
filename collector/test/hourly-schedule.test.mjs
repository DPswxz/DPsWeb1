import test from 'node:test';
import assert from 'node:assert/strict';
import { nextHourlyRefresh } from '../src/hourly-schedule.mjs';
import { BackgroundRefresh } from '../src/background-refresh.mjs';

test('启动、完成和跨日期后均对齐北京时间下一整点', () => {
  for (const [now, expected] of [
    ['2026-10-03T09:27:15+08:00', '2026-10-03T10:00:00+08:00'],
    ['2026-10-03T10:00:00+08:00', '2026-10-03T11:00:00+08:00'],
    ['2026-10-03T10:36:42+08:00', '2026-10-03T11:00:00+08:00'],
    ['2026-10-03T23:59:59+08:00', '2026-10-04T00:00:00+08:00']
  ]) assert.equal(nextHourlyRefresh(Date.parse(now)), Date.parse(expected));
});

test('冷启动不推迟整点；跨整点未完成的任务不会重叠', async () => {
  let now = Date.parse('2026-10-03T09:40:00+08:00'), finish, calls = 0;
  const background = new BackgroundRefresh({ now: () => now });
  const work = async () => { calls++; await new Promise(resolve => { finish = resolve; }); };
  background.start('ps5', work);
  await Promise.resolve(); finish(); await Promise.all([...background.tasks.values()]);
  now = Date.parse('2026-10-03T10:00:00+08:00');
  assert.equal(background.start('ps5', work, { scheduled: true }), true);
  await Promise.resolve();
  now = Date.parse('2026-10-03T11:00:00+08:00');
  assert.equal(background.start('ps5', work, { scheduled: true }), false);
  assert.equal(calls, 2);
  finish(); await Promise.all([...background.tasks.values()]);
});
