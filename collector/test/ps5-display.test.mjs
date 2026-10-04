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
  normalizePsJpGame: value => value
};
const normalizeStart = app.indexOf('function normalizePsGame(');
vm.runInNewContext(app.slice(normalizeStart, start), context);
vm.runInNewContext(`${app.slice(start, end)}\nthis.groupPs5Games = groupPs5Games; this.preparePsDatasets = preparePsDatasets;`, context);

function game(name, platform, price, id, rank = 1) {
  return { id, name, rawName: name, platform, price, rank, image: `${id}.png`, url: `https://example.com/${id}` };
}

test('display numbering follows filtering, sorting and pagination without changing source ranks', () => {
  const rows = Array.from({ length: 60 }, (_, i) => ({ ...game(`Game ${i}`, 'PS5', 60 - i, `g${i}`, i * 3 + 7), cn: '', meta: '' }));
  const state = { platform: 'ps5', psStore: 'hk', view: 'ranking', sort: 'default', page: 2, query: '' };
  const scope = { state, datasets: { ps5: rows }, chineseTitleMap: {} };
  const from = app.indexOf('function normalizeSearchText(');
  const to = app.indexOf('const priceCell=', from);
  vm.runInNewContext(app.slice(from, to) + '\nthis.currentData = currentData;', scope);
  assert.deepEqual(Array.from(scope.currentData(), g => g.displayRank), [51,52,53,54,55,56,57,58,59,60]);
  state.sort = 'priceAsc'; state.page = 1;
  assert.equal(scope.currentData()[0].id, 'g59');
  assert.equal(scope.currentData()[0].displayRank, 1);
  const unsearched = rows.slice().sort((a,b)=>a.price-b.price).map((g,i)=>({...g,displayRank:i+1}));
  state.query = 'game 5';
  assert.deepEqual(Array.from(scope.currentData(), g => g.displayRank), unsearched.filter(g=>g.name.toLowerCase().includes('game 5')).map(g=>g.displayRank));
  assert.equal(rows[0].rank, 7);
});

test('Hong Kong grouping retains bases beyond the first 200 groups', () => {
  context.preparePsDatasets(Array.from({ length: 240 }, (_, i) => ({
    ...game(`Unique Game ${i}`, 'PS5', i < 200 ? 0 : 100, `unique-${i}`, i + 1), conceptId: `concept-${i}`
  })));
  assert.equal(context.datasets.ps5.filter(g => g.price > 0).length, 40);
});

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

test('截图中的战争雷霆捆绑包和高清材质商品被过滤，只保留基础免费游戏', () => {
  const names = ['War Thunder - German Starter Bundle (日语, 英语)',
    'War Thunder - US Starter Bundle (日语, 英语)',
    'War Thunder - "Be Prepared!" Bundle (日语, 英语)',
    'War Thunder - Senrai Maidens: Emily Bundle (日语, 英语)',
    'War Thunder - High-res Texture Edition (英语)'];
  const raw = names.map((name, index) => ({ ...game(name, 'PS4', index === 4 ? 0 : 38, `extra-${index}`, 38), conceptId: 'war-thunder' }));
  raw.push({ ...game('War Thunder (英语)', 'PS5', 0, 'war-base', 38), conceptId: 'war-thunder' });
  const groups = context.groupPs5Games(raw);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].id, 'war-base');
  assert.equal(groups[0].editions.length, 1);
  assert.equal(groups[0].freeGame.id, 'war-base');
});

test('截图中的语言基础版合并，Premium Plus和三部曲商品不冒充基础版', () => {
  const raw = [
    { ...game('FINAL FANTASY RESONANCE (中韩文版)', 'PS5', 399, 'res-zh', 44), conceptId: 'res' },
    { ...game('FINAL FANTASY RESONANCE (日语, 英语)', 'PS5', 399, 'res-en', 44), conceptId: 'res' },
    { ...game('FINAL FANTASY VII REVELATION Premium Plus Edition', 'PS5', 828, 'rev-plus', 45), conceptId: 'rev' },
    { ...game('FINAL FANTASY VII REVELATION', 'PS5', 528, 'rev-base', 45), conceptId: 'rev' },
    { ...game('FINAL FANTASY VII Remake Series Trilogy Edition', 'PS5', 628, 'rev-trilogy', 45), conceptId: 'rev' }
  ];
  assert.deepEqual(Array.from(context.groupPs5Games(raw), g => g.id), ['res-zh', 'rev-base']);
  // 旧缓存还没有 conceptId 时，也能按正确的名称和语言后缀合并。
  assert.deepEqual(Array.from(context.groupPs5Games(raw.map(({ conceptId, ...g }) => g)), g => g.id), ['res-zh', 'rev-base']);
  context.preparePsDatasets(raw);
  assert.deepEqual(Array.from(context.datasets.ps5, g => g.id), ['res-zh', 'rev-base']);
});
