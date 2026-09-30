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
    for (const image of ['assets/nintendo-hk/cover.jpg', '/assets/nintendo-hk/cover.jpg']) {
      assert.equal(context.normalize({ image }).image, `${expected}/assets/nintendo-hk/cover.jpg`);
    }
    assert.equal(context.normalize({ image: 'https://official.example.com/cover.jpg' }).image, 'https://official.example.com/cover.jpg');
  }
});
