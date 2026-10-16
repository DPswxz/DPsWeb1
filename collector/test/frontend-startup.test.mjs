import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../../dist/app.js', import.meta.url), 'utf8');

test('Switch 首帧不等待其他平台，单个榜单更新不被慢平台阻塞', async () => {
  const frames = [], requests = [], finish = new Map();
  let renders = 0;
  const scope = {
    Map, Promise, console, startupDataReady:false,
    requestAnimationFrame:callback => frames.push(callback),
    render:() => renders++, hydrateCovers() {}, syncGameTitles() {},
    fetchExchangeRates:() => new Promise(() => {}),
    fetchNintendoRanking:platform => {
      requests.push(platform);
      return new Promise(resolve => finish.set(platform, resolve));
    }
  };
  vm.createContext(scope);
  vm.runInContext(source.slice(source.indexOf('const platformSnapshotLoads =')), scope);
  // 用永不完成的平台模拟网络卡住，保留实际首屏调度逻辑。
  vm.runInContext('loadOtherPlatform = () => new Promise(() => {});', scope);
  assert.equal(renders, 1);
  assert.deepEqual(requests, []);
  frames.shift()();
  assert.deepEqual(requests, []);
  frames.shift()();
  assert.equal(requests.length, 4);
  finish.get('switch1')();
  await Promise.resolve();
  assert.equal(renders, 2);
  assert.equal(scope.startupDataReady, false);
});
