import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../../dist/app.js', import.meta.url), 'utf8');
const baseStart = source.indexOf('const apiBase = (');
const baseEnd = source.indexOf('async function syncCollectorRefreshMinutes', baseStart);
const normalizeStart = source.indexOf('function normalizeGame(game)');
const normalizeEnd = source.indexOf('const initialNintendo=', normalizeStart);
assert.ok(baseStart >= 0 && baseEnd > baseStart && normalizeStart >= 0 && normalizeEnd > normalizeStart);

test('倒计时使用服务器剩余时间，重新打开和本地时钟偏差不会重置为30分钟', async () => {
  const syncSource = source.slice(baseEnd, normalizeStart);
  let serverNow = Date.parse('2026-10-02T00:00:00Z');
  const deadline = serverNow + 12 * 60 * 1000;
  const context = {
    AbortSignal,
    apiBase: '', state: { interval: 30 }, nextRefreshAt: null,
    serverRefreshInProgress: false, $: () => null, saveSettings() {},
    fetch: async () => ({ ok: true, json: async () => ({
      refreshMinutes: 30, serverTime: new Date(serverNow).toISOString(),
      nextRefreshAt: new Date(deadline).toISOString(), refreshInProgress: false
    }) })
  };
  vm.createContext(context);
  vm.runInContext(`${syncSource}\nthis.sync = syncCollectorRefreshMinutes;`, context);
  await context.sync();
  assert.ok(Math.abs(context.nextRefreshAt - Date.now() - 12 * 60 * 1000) < 1000);
  serverNow += 2 * 60 * 1000;
  context.nextRefreshAt = null;
  await context.sync();
  assert.ok(Math.abs(context.nextRefreshAt - Date.now() - 10 * 60 * 1000) < 1000);
  context.fetch = async () => ({ ok: true, json: async () => ({
    refreshMinutes: 30, serverTime: new Date(serverNow).toISOString(),
    nextRefreshAt: null, refreshInProgress: true
  }) });
  await context.sync();
  assert.equal(context.nextRefreshAt, null);
  assert.equal(context.serverRefreshInProgress, true);
});

test('网站域名、独立收集器和本地文件均使用正确的接口及图片地址', () => {
  for (const [protocol, origin, configured, expected] of [
    ['https:', 'https://radar.example.com', '', 'https://radar.example.com'],
    ['http:', 'http://192.168.1.10:8080', '', 'http://192.168.1.10:8080'],
    ['https:', 'https://radar.example.com', 'https://collector.example.com/', 'https://collector.example.com'],
    ['file:', 'null', '', 'http://localhost:8787']
  ]) {
    const context = { window: { GAME_PULSE_CONFIG: { apiBase: configured } }, location: { protocol, origin }, chineseTitleMap: {} };
    vm.runInNewContext(`${source.slice(baseStart, baseEnd)}\n${source.slice(normalizeStart, normalizeEnd)}\nthis.base = apiBase; this.normalize = normalizeGame;`, context);
    assert.equal(context.base, expected);
    for (const image of ['https://store.nintendo.com.hk/media/catalog/product/cover.jpg']) {
      assert.equal(context.normalize({ image }).image,
        `${expected}/api/nintendo/image?url=${encodeURIComponent(image)}`);
    }
    assert.equal(context.normalize({ image: 'https://official.example.com/cover.jpg' }).image, 'https://official.example.com/cover.jpg');
  }
});

test('published changes silently refresh once; an ongoing fetch does not lose later changes', async () => {
  let revision = 'old', calls = 0;
  const scope = { AbortSignal, apiBase: '', state: { auto: true }, nextRefreshAt: null,
    serverRefreshInProgress: false, lastRankingRevision: '', startupDataReady: true, refreshInProgress: false,
    $: () => null, saveSettings() {}, refresh(options) { assert.equal(options.silent, true); calls++; },
    fetch: async () => ({ ok: true, json: async () => ({ refreshMinutes: 60,
      serverTime: new Date().toISOString(), nextRefreshAt: null,
      platforms: { ps5: { updatedAt: revision } } }) }) };
  vm.runInNewContext(source.slice(baseEnd, normalizeStart) + '\nthis.sync = syncCollectorRefreshMinutes;', scope);
  await scope.sync(); await scope.sync(); assert.equal(calls, 0);
  revision = 'new'; scope.refreshInProgress = true;
  await scope.sync(); assert.equal(calls, 0);
  scope.refreshInProgress = false;
  await scope.sync(); await scope.sync(); assert.equal(calls, 1);
});
