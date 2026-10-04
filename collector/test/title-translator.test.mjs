import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { TitleTranslator, titleKey } from '../src/title-translator.mjs';

test('联网人工核对名称覆盖旧机器缓存，全部已核对条目不消耗翻译API', async () => {
  const records = JSON.parse(await readFile(new URL('../title-web-review.json', import.meta.url), 'utf8'));
  const directory = await mkdtemp(path.join(os.tmpdir(), 'game-web-reviewed-'));
  let calls = 0;
  const translator = new TitleTranslator(path.join(directory, 'titles.sqlite'), {
    apiKey: 'test-key', fetchImpl: async () => { calls++; throw new Error('Must use reviewed names'); }
  });
  await translator.init();
  try {
    translator.db.prepare("UPDATE titles SET translated='旧错误机器译名',status='translated' WHERE name=?").run(titleKey('Leafy Corner'));
    translator.close();
    await translator.init();
    const payload = records.map(row => ({ name: row.name, cn: '旧错误机器译名', price: 1 }));
    await translator.refresh(() => payload);
    assert.equal(calls, 0);
    for (const [index, row] of records.entries()) {
      assert.equal(translator.decorate(payload[index]).cn, row.after, row.name);
    }
    assert.equal(translator.decorate({name:'Ship of Fools',price:1}).cn,'同舟共济');
    assert.equal(translator.decorate({name:'Destiny 2: Renegades',price:1}).cn,'命运2：反叛');
  } finally { translator.close(); await rm(directory, { recursive: true, force: true }); }
});

test('同名跨平台、并发刷新、重启和商标空格差异只翻译一次，已知译名不消耗API', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'game-titles-'));
  const file = path.join(directory, 'titles.sqlite');
  let calls = 0;
  const fetchImpl = async (_url, options) => {
    calls++;
    const { q, target, format } = JSON.parse(options.body);
    assert.deepEqual(q, ['New Unseen Game']);
    assert.equal(target, 'zh-CN'); assert.equal(format, 'text');
    return { ok: true, status: 200, json: async () => ({ data: { translations: [{ translatedText: '新的游戏' }] } }) };
  };
  let translator = new TitleTranslator(file, { apiKey: 'test-key', fetchImpl });
  await translator.init();
  const payload = { games: [{ name: 'New Unseen Game™', price: 10 }, { name: 'New  Unseen Game', price: 20 }, { name: 'PRAGMATA', price: 30 }, { name: '中文游戏', price: 40 }, { name: 'NEW UNSEEN GAME', price: 50 }] };
  try {
    await Promise.all([translator.refresh(() => payload), translator.refresh(() => payload)]);
    assert.equal(calls, 1);
    assert.equal(translator.decorate(payload).games[4].cn, '新的游戏');
    assert.equal(translator.decorate(payload).games[0].cn, '新的游戏');
    assert.equal(translator.decorate(payload).games[2].cn, '识质存在');
    assert.equal(translator.decorate({ name: 'STRAY™', price: 10 }).cn, '迷失');
    const corrected = translator.decorate([
      { name: 'SEKIRO™： SHADOWS DIE TWICE', price: 10 },
      { name: 'ghost of yotei', price: 10 },
      { name: 'Ghost of Yōtei', price: 10 },
      { name: 'Overcooked!', price: 10 },
      { name: 'Overcooked! 2', price: 10 },
      { name: 'Hades II', price: 10 },
      { name: "Fire Emblem: Fortune's Weave", price: 10 },
      { name: 'Balatro', price: 10 },
      { name: 'BIOHAZARD RE:4', price: 10 },
      { name: 'Metaphor :ReFantazio', price: 10 },
      { name: 'メタファー:リファンタジオ', price: 10 }
    ]);
    assert.deepEqual(corrected.map(game => game.cn), ['只狼 影逝二度', '羊蹄山之魂', '羊蹄山之魂', '胡闹厨房', '胡闹厨房2', '哈迪斯 II', '火焰纹章 万紫千紅', '小丑牌', '生化危机4 重制版', '暗喻幻想', '暗喻幻想']);
    assert.equal(payload.games[0].cn, undefined);
    translator.close();
    translator = new TitleTranslator(file, { apiKey: 'test-key', fetchImpl });
    await translator.init(); await translator.refresh(() => payload);
    assert.equal(calls, 1);
    assert.equal(translator.decorate(payload).games[1].cn, '新的游戏');
  } finally { translator.close(); await rm(directory, { recursive: true, force: true }); }
});

test('核对名称跨区和实体编码一致，保留作品编号，清除旧机器猜译', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'game-title-review-'));
  const translator = new TitleTranslator(path.join(directory, 'titles.sqlite'), {
    apiKey: 'test-key', fetchImpl: async () => { throw new Error('Reviewed titles must not call API'); }
  });
  await translator.init();
  try {
    const names = ['PALWORLD™', 'Palworld / パルワールド', 'Grounded 2', 'Once Human',
      'DYNASTY WARRIORS 3: Complete Edition Remastered', 'THE FINALS', 'R.E.P.O.',
      'FATAL FURY: City of the Wolves', 'Tales of ARISE', 'Mount &amp; Blade II: Bannerlord'];
    assert.deepEqual(translator.decorate(names.map(name => ({ name, price: 1, cn: '旧错误译名' }))).map(g => g.cn), [
      '幻兽帕鲁', '幻兽帕鲁', '禁闭求生2', '七日世界', '真・三国无双2 with 猛将传 Remastered',
      'THE FINALS', 'R.E.P.O.', '饿狼传说：群狼之城', '破晓传奇', '骑马与砍杀2：霸主'
    ]);
    assert.equal(titleKey('Marvel&#x27;s Spider-Man™ 2'), titleKey('Marvel’s Spider-Man 2'));
    assert.equal(translator.decorate({ name: 'Marvel&#x27;s Spider-Man™ 2', price: 1 }).cn, '漫威蜘蛛侠2');
    assert.equal(translator.scan(names.map(name => ({ name, price: 1 }))).length, 0);
    assert.notEqual(titleKey('Resident Evil 2'), titleKey('Resident Evil 4'));
    translator.db.prepare("UPDATE titles SET translated='错误机器译名',status='translated' WHERE name=?").run(titleKey('Palworld'));
    translator.close();
    await translator.init();
    assert.equal(translator.decorate({ name: 'Palworld', price: 1 }).cn, '幻兽帕鲁');
  } finally { translator.close(); await rm(directory, { recursive: true, force: true }); }
});

test('官方收集器中文名优先于机器结果，人工指定名称优先级最高', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'game-title-official-'));
  const translator = new TitleTranslator(path.join(directory, 'titles.sqlite'));
  await translator.init();
  try {
    translator.db.prepare("INSERT INTO titles VALUES(?,?,'translated',1)").run(titleKey('New Official Game'), '直译错误');
    const payload = { name: 'New Official Game', cn: '官方中文名称', price: 1 };
    assert.equal(translator.decorate(payload).cn, '官方中文名称');
    translator.scan(payload);
    assert.equal(translator.decorate({ name: payload.name, price: 1 }).cn, '官方中文名称');
    assert.equal(translator.decorate({ name: 'Palworld', cn: '帕尔沃德', price: 1 }).cn, '幻兽帕鲁');
  } finally { translator.close(); await rm(directory, { recursive: true, force: true }); }
});

for (const status of [429, 403, 0]) test(`API失败${status}时缓存可用、原名回退、重启不重试且暂停新请求`, async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'game-titles-fail-'));
  const file = path.join(directory, 'titles.sqlite');
  let calls = 0;
  const fetchImpl = async () => { calls++; if (!status) throw new Error('Offline'); return { ok: false, status }; };
  let translator = new TitleTranslator(file, { apiKey: 'test-key', fetchImpl });
  await translator.init();
  const payload = [{ name: 'Unknown Failed Game', price: 10 }, { name: 'PRAGMATA', price: 20 }];
  try {
    await translator.refresh(() => payload); await translator.refresh(() => payload);
    assert.equal(calls, 1);
    assert.equal(translator.decorate(payload)[0].cn, payload[0].name);
    assert.equal(translator.decorate(payload)[1].cn, '识质存在');
    translator.close(); translator = new TitleTranslator(file, { apiKey: 'test-key', fetchImpl });
    await translator.init(); await translator.refresh(() => [...payload, { name: 'Another New Game', price: 30 }]);
    assert.equal(calls, 1);
  } finally { translator.close(); await rm(directory, { recursive: true, force: true }); }
});
