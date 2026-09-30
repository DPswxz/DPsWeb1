import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const appPath = path.resolve(import.meta.dirname, '../../dist/app.js');
const app = await readFile(appPath, 'utf8');
const start = app.indexOf('/* ================= PS5 游戏同款多版本合并与解析');
const end = app.indexOf('const PS5_STORAGE_KEY', start);
assert.ok(start >= 0 && end > start);
const context = {
  chineseTitleMap: {},
  datasets: {},
  normalizePsGame: value => value,
  normalizePsJpGame: value => value
};
vm.runInNewContext(`${app.slice(start, end)}\nthis.groupPs5Games = groupPs5Games; this.preparePsDatasets = preparePsDatasets;`, context);

function game(name, platform, price, id, rank = 1) {
  return { id, name, rawName: name, platform, price, rank, image: `${id}.png`, url: `https://example.com/${id}` };
}

test('PS5 shows one ordinary edition and prefers PS5 over PS4', () => {
  const groups = context.groupPs5Games([
    game('红色沙漠：增强豪华版', 'PS5', 638, 'desert-deluxe', 37),
    game('红色沙漠：增强版', 'PS5', 558, 'desert-standard', 37),
    game('《赛博朋克 2077》', 'PS4', 398, 'cyber-ps4', 35),
    game('《赛博朋克 2077》', 'PS5', 568, 'cyber-ps5', 35),
    game('《赛博朋克 2077：终极版》', 'PS5', 638, 'cyber-ultimate', 35),
    game('潜水员戴夫 戴夫 & 一番捆绑包', 'PS5', 156, 'dave-bundle', 28),
    game('潜水员戴夫', 'PS5', 59.4, 'dave-standard', 28)
  ]);

  assert.equal(groups.length, 3);
  assert.deepEqual(Array.from(groups, ({ id, platform, price, editions }) => ({
    id, platform, price, editionCount: editions.length
  })), [
    { id: 'dave-standard', platform: 'PS5', price: 59.4, editionCount: 1 },
    { id: 'cyber-ps5', platform: 'PS5', price: 568, editionCount: 1 },
    { id: 'desert-standard', platform: 'PS5', price: 558, editionCount: 1 }
  ]);
});

test('nonstandard paid editions alone do not enter the ordinary game list', () => {
  const groups = context.groupPs5Games([game('潜水员戴夫 戴夫 & 一番捆绑包', 'PS5', 156, 'bundle')]);
  assert.equal(groups.length, 0);
});

test('PS4-only view excludes games that also have a PS5 version', () => {
  context.preparePsDatasets([
    game('《赛博朋克 2077》', 'PS4', 398, 'cyber-ps4'),
    game('《赛博朋克 2077》', 'PS5', 568, 'cyber-ps5'),
    game('PS4 Exclusive', 'PS4', 99, 'exclusive')
  ]);
  assert.deepEqual(Array.from(context.datasets.ps4, g => g.id), ['exclusive']);
  assert.deepEqual(Array.from(context.datasets.ps5_with_ps4, g => g.id), ['cyber-ps5', 'exclusive']);
});
