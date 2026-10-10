import { DatabaseSync } from 'node:sqlite';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import {simplifiedDisplay} from './chinese-display.mjs';

const normalizedTitle = title => title
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/[™®]/g, '').normalize('NFKC').replace(/[’‘]/g, "'")
  .replace(/\s*[(（][^()（）]*(?:中文|英语|英語|英文|日语|日語|日文|韓文|韩语|韓語)[^()（）]*[)）]\s*$/g,'')
  .replace(/\s*:\s*/g, ': ').replace(/\s+/g, ' ').trim();
export const titleKey = title => normalizedTitle(title).toLowerCase();
const needsTranslation = title => /(?:\p{Script=Hiragana}|\p{Script=Katakana})/u.test(title) || (/[a-z]/i.test(title) && !/\p{Script=Han}/u.test(title));

export class TitleTranslator {
  constructor(file, { apiKey = '', fetchImpl = fetch } = {}) {
    this.file = file; this.apiKey = apiKey; this.fetch = fetchImpl; this.running = null;
  }
  async init() {
    await mkdir(path.dirname(this.file), { recursive: true });
    this.db = new DatabaseSync(this.file);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS titles(name TEXT PRIMARY KEY, translated TEXT, status TEXT NOT NULL, attempted_at INTEGER) WITHOUT ROWID;
      CREATE TABLE IF NOT EXISTS settings(name TEXT PRIMARY KEY, value TEXT) WITHOUT ROWID;`);
    const existing = this.db.prepare("SELECT * FROM titles ORDER BY CASE status WHEN 'known' THEN 0 WHEN 'translated' THEN 1 ELSE 2 END").all();
    if (existing.some(row => row.name !== titleKey(row.name))) {
      this.db.exec('BEGIN IMMEDIATE');
      try {
        this.db.exec('CREATE TEMP TABLE merged AS SELECT * FROM titles WHERE 0; CREATE UNIQUE INDEX merged_name ON merged(name)');
        const merge = this.db.prepare('INSERT OR IGNORE INTO merged VALUES(?,?,?,?)');
        for (const row of existing) merge.run(titleKey(row.name), row.translated, row.status, row.attempted_at);
        this.db.exec('DELETE FROM titles; INSERT INTO titles SELECT * FROM merged; DROP TABLE merged; COMMIT');
      } catch (error) { this.db.exec('ROLLBACK'); throw error; }
    }
    this.lookup = this.db.prepare('SELECT * FROM titles WHERE name=?');
    this.seed = this.db.prepare("INSERT INTO titles VALUES(?,?,'known',NULL) ON CONFLICT(name) DO UPDATE SET translated=excluded.translated,status='known'");
    this.reserve = this.db.prepare("INSERT OR IGNORE INTO titles VALUES(?,NULL,'attempted',?)");
    this.finish = this.db.prepare('UPDATE titles SET translated=?,status=? WHERE name=?');
    const known = JSON.parse(await readFile(new URL('./title-overrides.json', import.meta.url), 'utf8'));
    try{this.productNames=JSON.parse(await readFile(new URL('./title-product-overrides.json',import.meta.url),'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;this.productNames={};}
    this.reviewed = new Set(Object.keys(known).map(titleKey));
    this.db.exec('BEGIN IMMEDIATE');
    try {
      for (const [name, translated] of Object.entries(known)) this.seed.run(titleKey(name), translated);
      this.db.exec('COMMIT');
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  visit(value, action) {
    if (!value || typeof value !== 'object') return;
    if (typeof value.name === 'string' && ('price' in value || 'id' in value)) action(value);
    for (const child of Object.values(value)) if (child && typeof child === 'object') this.visit(child, action);
  }
  productName(game){
    if(!game.id)return null;
    const platform=game.historyPlatform||'',url=game.url||'';
    const family=platform.startsWith('steam')||game.platform==='PC'||url.includes('store.steampowered.com')?'steam':
      platform==='ps5_jp'||url.includes('store.playstation.com/ja-jp/')?'ps5_jp':
      platform==='ps5_hk'||url.includes('store.playstation.com/zh-')?'ps5_hk':'';
    return family?this.productNames[`${family}:${game.id}`]:null;
  }
  decorate(payload) {
    // 返回新对象，防止机器译名覆盖收集器的官方名称和缓存。
    const result = structuredClone(payload);
    this.visit(result, game => {
      const product=this.productName(game);if(product){game.cn=product;return;}
      const entry = this.lookup.get(titleKey(game.name));
      const official = game.cn && game.cn !== game.name && /\p{Script=Han}/u.test(game.cn) && !/(?:\p{Script=Hiragana}|\p{Script=Katakana})/u.test(game.cn);
      const preferred=entry?.status==='known'&&entry.translated;
      game.cn = (preferred&&(this.reviewed.has(titleKey(game.name))?preferred:simplifiedDisplay(preferred))) || simplifiedDisplay((official && game.cn) || entry?.translated || game.cn || game.name);
    });
    return result;
  }
  scan(payload) {
    // 中文原名与已有中文译名不消耗额度；不同平台共用名称缓存。
    const names = new Map();
    this.visit(payload, game => {
      const key = titleKey(game.name);
      const product=this.productName(game);if(product){if(this.lookup.get(key)?.status!=='known')this.seed.run(key,product);return;}
      if (this.lookup.get(key)?.status !== 'known' && game.cn && game.cn !== game.name && /\p{Script=Han}/u.test(game.cn) && !/(?:\p{Script=Hiragana}|\p{Script=Katakana})/u.test(game.cn)) this.seed.run(key, simplifiedDisplay(game.cn));
      if (key && key.length <= 500 && needsTranslation(key) && !this.lookup.get(key) && !names.has(key)) names.set(key, normalizedTitle(game.name));
    });
    return [...names.values()];
  }
  refresh(getPayload) {
    if (this.running) { this.rescan = true; return this.running; }
    this.running = (async () => {
      do { this.rescan = false; await this.translate(this.scan(getPayload())); } while (this.rescan);
    })().catch(() => console.error('游戏名翻译不可用，继续使用缓存或原名')).finally(() => { this.running = null; });
    return this.running;
  }
  async translate(names) {
    if (!this.apiKey) return;
    const cooldown = Number(this.db.prepare("SELECT value FROM settings WHERE name='cooldown'").get()?.value || 0);
    if (Date.now() < cooldown) return;
    for (let offset = 0; offset < names.length; offset += 20) {
      let batch = names.slice(offset, offset + 20).filter(name => !this.lookup.get(titleKey(name)));
      if (!batch.length) continue;
      // 先持久化调用记录。即使超时、进程重启或重复刷新，同一名称也不会再次付费调用。
      this.db.exec('BEGIN IMMEDIATE');
      try { batch = batch.filter(name => this.reserve.run(titleKey(name), Date.now()).changes > 0); this.db.exec('COMMIT'); }
      catch (error) { this.db.exec('ROLLBACK'); throw error; }
      if (!batch.length) continue;
      let status = 0, reason = '';
      try {
        const endpoint = new URL('https://translation.googleapis.com/language/translate/v2');
        endpoint.searchParams.set('key', this.apiKey);
        const response = await this.fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: batch, target: 'zh-CN', format: 'text' }), signal: AbortSignal.timeout(15000)
        });
        status = response.status;
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          const code = error.error?.details?.find(detail => detail.reason)?.reason || error.error?.status || '';
          reason = /^[A-Z_0-9]+$/.test(code) ? code : '';
          throw new Error('Translation request failed');
        }
        const translations = (await response.json()).data?.translations;
        if (!Array.isArray(translations) || translations.length !== batch.length) throw new Error('Invalid translation response');
        for (let index = 0; index < batch.length; index++) {
          const translated = translations[index]?.translatedText?.trim();
          if (!translated) throw new Error('Empty translation');
          this.finish.run(translated, 'translated', titleKey(batch[index]));
        }
      } catch {
        for (const name of batch) if (!this.lookup.get(titleKey(name))?.translated) this.finish.run(null, 'failed', titleKey(name));
        const pause = [400, 401, 403, 429].includes(status) ? 86400000 : 3600000;
        this.db.prepare("INSERT OR REPLACE INTO settings VALUES('cooldown',?)").run(String(Date.now() + pause));
        this.db.prepare("INSERT OR REPLACE INTO settings VALUES('last_error',?)").run(`${status || '连接失败'} ${reason}`.trim());
        console.error(`游戏名翻译暂停（HTTP ${status || '连接失败'} ${reason}），使用缓存或原名；已尝试名称不会自动重试`);
        break;
      }
    }
  }
  close() { this.db.close(); }
}
