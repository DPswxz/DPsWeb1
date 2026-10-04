// 全量离线核对：只使用已抓取的官方商品名称、商品编号和人工核对规则。
// 不请求翻译 API；机器缓存只用于“旧名称”对照，不能成为核对依据。
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { titleKey } from '../collector/src/title-translator.mjs';

const root = new URL('../', import.meta.url);
const read = file => fs.readFileSync(new URL(file, root), 'utf8');
const write = (file, text) => fs.writeFileSync(new URL(file, root), text);
const decode = text => text.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&amp;/g, '&').replace(/&apos;|&#39;/g, "'").replace(/&quot;/g, '"');
const clean = text => decode(text).replace(/[™®]/g, '').normalize('NFKC').replace(/[’‘]/g, "'")
  .replace(/\s*[（(](?:[^()（）]*(?:文版|英语|英語|日语|日語|韩语|韓語|TC\/SC|EN\/JP)[^()（）]*)[)）]/g, '')
  .replace(/[《》『』「」]/g, '').replace(/\s*:\s*/g, ': ').replace(/\s+/g, ' ').trim();
const key = text => clean(text).toLowerCase();
const chinese = text => (clean(text).match(/\p{Script=Han}/gu) || []).length >= 2 && !/(?:\p{Script=Hiragana}|\p{Script=Katakana})/u.test(clean(text));
const edition = /豪华|豪華|黄金|黃金|終極|终极|典藏|完整版|升级|升級|试玩|試玩|体验|體驗|擴充|扩充|季票|組合|组合|捆绑|同捆|Premium|Deluxe|Demo|Bundle|Edition|Collection|Pack|Trial|Remaster/i;
const rules = JSON.parse(read('collector/src/title-review-rules.json'));
const previous = JSON.parse(read('collector/src/title-review-seed.json'));
const source = read('dist/app.js');
const db = new DatabaseSync(new URL('deploy/data/title-translations.sqlite', root).pathname.replace(/^\/([A-Za-z]:)/, '$1'), { readOnly: true });
const cached = new Map(db.prepare('SELECT name,translated FROM titles').all().map(row => [row.name, row.translated]));
db.close();
const payloads = Object.fromEntries(['nintendo', 'ps5', 'ps5-jp', 'steam', 'steam-global'].map(p => [p, JSON.parse(read(`deploy/data/${p}-cache.json`))]));
const all = new Map();
const products = [];
function visit(value, platform) {
  if (!value || typeof value !== 'object') return;
  if (typeof value.name === 'string' && typeof value.price === 'number') {
    products.push({ ...value, platformSource: platform });
    let row = all.get(value.name);
    if (!row) {
      row = { name: value.name, before: cached.get(titleKey(value.name)) || previous[value.name] || value.cn || value.name, platforms: [], sources: [] };
      all.set(value.name, row);
    }
    if (!row.platforms.includes(platform)) row.platforms.push(platform);
    if (value.url && !row.sources.includes(value.url)) row.sources.push(value.url);
  }
  for (const child of Object.values(value)) if (child && typeof child === 'object') visit(child, platform);
}
for (const [platform, payload] of Object.entries(payloads)) visit(payload, platform);

const officialSteam = new Map(products.filter(g => g.platformSource === 'steam' && chinese(g.name)).map(g => [String(g.id), g]));
const officialPS = new Map();
for (const game of products.filter(g => g.platformSource === 'ps5' && chinese(g.name))) {
  let text = clean(game.name);
  const bilingual = text.match(/[（(]([^()]*\p{Script=Han}[^()]*)[)）]/u);
  if (/^[a-z]/i.test(text) && bilingual && !/[a-z]/i.test(bilingual[1])) text = bilingual[1];
  else text = text.replace(/\s*[(][A-Za-z][^)]*[)]/g, '').trim();
  if (!chinese(text) || edition.test(text)) continue;
  const existing = officialPS.get(String(game.conceptId || game.id));
  if (!existing || text.length < existing.text.length) officialPS.set(String(game.conceptId || game.id), { text, game });
}

const manual = new Map(Object.entries(previous).map(([name, cn]) => [key(name), { name, cn, method: '既有人工名称映射', source: 'collector/TITLE-REVIEW.md' }]));
// 这些旧人工/机器猜译未找到可信中文名；不继续把猜测显示为正式名称。
const uncertain = ['Le Mirage Mystique', 'ダービースタリオン２', 'ヴィラクタル(Viractal)', 'ほの暮しの庭'];
for (const name of uncertain) {
  for (const [k, value] of manual) if (key(value.name).startsWith(key(name))) manual.set(k, { ...value, cn: clean(value.name), method: '未确认中文名，保留原名' });
}
for (const rule of rules) for (const name of rule.aliases) manual.set(key(name), { name, cn: rule.cn, source: rule.source, method: rule.kind || (rule.cn === clean(name) ? '官方原名' : '人工核对来源') });
// 已抓取的同一商品中文名也可用于辨认该作品的明确版本后缀。
for (const game of products) {
  if (manual.has(key(game.name)) || chinese(game.name) || edition.test(clean(game.name))) continue;
  const steam = /^steam/.test(game.platformSource) && officialSteam.get(String(game.id));
  const ps = /^ps5/.test(game.platformSource) && officialPS.get(String(game.conceptId || game.id));
  if (steam || ps) manual.set(key(game.name), { name: game.name, cn: steam ? clean(steam.name) : ps.text,
    method: steam ? 'Steam同一商品ID官方中文名' : 'PS同一概念ID官方中文名', source: steam ? steam.url : ps.game.url });
}
const suffixMap = [
  [/Nintendo Switch 2 Edition/gi, 'Nintendo Switch 2 版'],
  [/Digital Deluxe Edition|デジタルデラックスエディション|デジタルデラックス版/gi, '数字豪华版'],
  [/Premium Plus Edition/gi, '高级加强版'], [/Premium Deluxe Edition/gi, '高级豪华版'],
  [/Deluxe Edition|デラックスエディション/gi, '豪华版'], [/Premium Edition/gi, '高级版'],
  [/Ultimate Edition/gi, '终极版'], [/Standard Edition/gi, '标准版'], [/Complete Edition/gi, '完整版'],
  [/Gold Edition/gi, '黄金版'], [/Gourmet Edition/gi, '美食版'], [/Royal Edition/gi, '皇家版'],
  [/Anniversary Edition/gi, '周年版'], [/Game [Oo]f [Tt]he Year Edition|GOTY Edition/gi, '年度版'],
  [/Year 1 Deluxe Edition/gi, '第1年豪华版'], [/Free Trial|DEMO VERSION|Demo|Trial/gi, '体验版'],
  [/マスターズ版/gi, '大师版'], [/Digital Deluxe/gi, '数字豪华版']
];
function resolveManual(name) {
  const normalized = key(name);
  const exact = manual.get(normalized);
  if (exact && exact.method !== '既有人工名称映射') return exact;
  for (const [base, value] of [...manual].sort((a, b) => b[0].length - a[0].length)) {
    if (!normalized.startsWith(base) || (exact && value.method === '既有人工名称映射')) continue;
    let suffix = clean(name).slice(clean(value.name).length).trim().replace(/^\s*[-–:]\s*/, '');
    if (!suffix || !/^(?:Nintendo Switch 2 Edition|Digital Deluxe Edition|Deluxe Edition|Premium Plus Edition|Premium Deluxe Edition|Premium Edition|Ultimate Edition|Standard Edition|Complete Edition|Gold Edition|Gourmet Edition|Royal Edition|Anniversary Edition|Game Of The Year Edition|GOTY Edition|Year 1 Deluxe Edition|Free Trial|DEMO VERSION|Demo|Trial|Digital Deluxe|デジタルデラックスエディション|デジタルデラックス版|デラックスエディション|マスターズ版)(?:\s*\(?PS4\s*[&＆]\s*PS5\)?)?$|^\(?PS4\s*[&＆]\s*PS5\)?$/i.test(suffix)) continue;
    for (const [pattern, replacement] of suffixMap) suffix = suffix.replace(pattern, replacement);
    return { ...value, cn: `${value.cn} ${suffix}`.trim(), method: `${value.method}；保留版本后缀` };
  }
  return exact;
}
const unresolved = [];
const output = Object.fromEntries(Object.entries(previous).map(([name, cn]) => [name, resolveManual(name)?.cn || cn]));
for (const rule of rules) for (const name of rule.aliases) output[name] = rule.cn;
for (const [name, row] of all) {
  let result = resolveManual(name);
  if (!result) {
    const related = products.filter(g => g.name === name);
    const steam = related.find(g => g.platformSource.startsWith('steam') && officialSteam.has(String(g.id)));
    const ps = !chinese(name) && !edition.test(clean(name)) && related.find(g => /^ps5/.test(g.platformSource) && officialPS.has(String(g.conceptId || g.id)));  
    if (steam) { const g = officialSteam.get(String(steam.id)); result = { cn: clean(g.name), method: 'Steam同一商品ID官方中文名', source: g.url }; }
    else if (ps) { const r = officialPS.get(String(ps.conceptId || ps.id)); result = { cn: r.text, method: 'PS同一概念ID官方中文名', source: r.game.url }; }
    else if (chinese(name)) result = { cn: clean(name), method: '保留官方中文商品名称', source: row.sources[0] };
    else {
      result = { cn: clean(name), method: '未确认中文名，保留原名', source: row.sources[0] };
      if (row.before !== name) unresolved.push({ name, before: row.before, sources: row.sources });
    }
  }
  row.after = result.cn;
  row.method = result.method;
  row.evidence = result.source || row.sources[0] || '';
  output[name] = result.cn;
}
write('collector/title-review-originals.json', JSON.stringify([...all.values()].filter(r => /未确认.*中文名/.test(r.method)), null, 2) + '\n');
const escape = value => `"${String(value).replace(/"/g, '""')}"`;
write('collector/title-audit.csv', '\uFEFF' + ['名称,旧显示,核对后显示,核对方式,依据,平台', ...[...all.values()].map(r => [r.name, r.before, r.after, r.method, r.evidence, r.platforms.join(' / ')].map(escape).join(','))].join('\n') + '\n');
write('collector/src/title-overrides.json', JSON.stringify(output, null, 2) + '\n');
const proxyStart = source.indexOf('}, {\n  normalize(title)');
if (proxyStart < 0) throw new Error('Cannot locate frontend title dictionary');
write('dist/app.js', 'const chineseTitleMap = new Proxy(' + JSON.stringify(output, null, 2) + source.slice(proxyStart + 1));
const counts = {};
for (const row of all.values()) counts[row.method] = (counts[row.method] || 0) + 1;
console.log(JSON.stringify({ totalNames: all.size, changedNames: [...all.values()].filter(r => r.before !== r.after).length, unresolved: unresolved.length, counts }, null, 2));
