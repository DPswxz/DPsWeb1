import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
const source = await readFile(new URL('../../dist/app.js', import.meta.url), 'utf8');

test('后台采集和失败只显示真实成功时间，无成功记录时隐藏', () => {
  const notice={dataset:{}};
  const scope={Date, $:()=>notice, state:{platform:'ps5',psStore:'hk'},
    collectorStatusUnavailable:false, ps5Status:{}, ps5JpStatus:{},
    formatSourceTime:value=>value,
    collectorPlatformStatus:{
      ps5:{updatedAt:'港服新时间',refreshState:'partial',stale:true,lastError:'部分商品失败'},
      ps5_jp:{updatedAt:'日服旧时间',refreshState:'refreshing',lastAttemptAt:new Date(Date.now()-5*60000).toISOString(),progress:{total:100,completed:20,verified:18}}
    }};
  const start=source.indexOf('function renderRefreshNotice()');
  const end=source.indexOf('function normalizeGame',start);
  vm.runInNewContext(source.slice(start,end)+'\nthis.renderNotice=renderRefreshNotice;',scope);
  scope.renderNotice();
  assert.equal(notice.textContent,'上次成功获取：港服新时间');
  assert.equal(notice.title,'');
  assert.doesNotMatch(notice.textContent,/后台获取中/);
  scope.state.psStore='jp';scope.renderNotice();
  assert.equal(notice.hidden,false);
  assert.equal(notice.textContent,'上次成功获取：日服旧时间');
  scope.collectorPlatformStatus.ps5_jp={updatedAt:'日服旧时间',refreshState:'interrupted',stale:true,lastError:'采集因服务重启中断'};
  scope.renderNotice();
  assert.equal(notice.hidden,false);
  assert.equal(notice.textContent,'上次成功获取：日服旧时间');
  assert.equal(notice.title,'');
  scope.collectorPlatformStatus.ps5_jp={updatedAt:'日服旧时间',refreshState:'failed',stale:true,lastError:'HTTP 403',lastAttemptAt:'今天 10:00:10'};
  scope.renderNotice();
  assert.equal(notice.textContent,'上次成功获取：日服旧时间');
  assert.equal(notice.dataset.state,'success');
  assert.equal(notice.title,'');
  scope.collectorStatusUnavailable=true;
  scope.renderNotice();
  assert.equal(notice.textContent,'上次成功获取：日服旧时间');
  scope.collectorPlatformStatus.ps5_jp={refreshState:'failed',lastError:'连接超时'};
  scope.renderNotice();
  assert.equal(notice.hidden,true);
  assert.equal(notice.textContent,'');
});
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
