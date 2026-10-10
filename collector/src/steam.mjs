import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { storeFetch } from './polite-fetch.mjs';

const COLORS = ['#1b5f82', '#2a475e', '#1976d2', '#0097a7', '#00796b', '#388e3c', '#512da8', '#c2185b'];

function cleanTitle(raw) {
  return raw ? raw.trim() : 'Steam Game';
}

function parsePrice(priceText) {
  if (!priceText) return 0;
  if (/免费|free/i.test(priceText)) return 0;
  const match = priceText.match(/[\d,]+(?:\.\d+)?/);
  if (!match) return 0;
  return parseFloat(match[0].replace(/,/g, '')) || 0;
}

export function steamDiscount(row,price,old){
  const explicit=row.match(/\bdata-discount=["'](\d+)["']/)?.[1]||row.match(/<div\b[^>]*class=["'][^"']*\bdiscount_pct\b[^"']*["'][^>]*>\s*-?(\d+)\s*%/i)?.[1];
  if(explicit!==undefined)return Math.max(0,Math.min(100,Number(explicit)));
  return old>price&&price>0?Math.round((1-price/old)*100):0;
}

export class SteamCollector {
  constructor({ cacheFile, refreshMinutes = 15 } = {}) {
    this.cacheFile = cacheFile || path.resolve('data/steam-cache.json');
    this.refreshMinutes = Math.max(5, Number(refreshMinutes) || 15);
    this.cache = null;
    this.refreshing = null;
  }

  async init() {
    await mkdir(path.dirname(this.cacheFile), { recursive: true });
    try {
      this.cache = JSON.parse(await readFile(this.cacheFile, 'utf8'));
      // 旧解析漏掉折扣属性时，使用已记录的原价/售价恢复，不伪造采集时间。
      let repaired=false;
      for(const game of this.cache.games||[]){if(!game.discount&&game.old>game.price&&game.price>0){game.discount=steamDiscount('',game.price,game.old);repaired=true;}}
      if(repaired)await this.#save();
    } catch {
      this.cache = null;
    }
  }

  get() {
    return this.cache;
  }

  async refresh({ force = false } = {}) {
    if (this.refreshing) return this.refreshing;
    const maxAge = this.refreshMinutes * 60 * 1000;
    const updated = Date.parse(this.cache?.updatedAt || 0);
    const isFresh = this.cache?.games?.length && (Date.now() - updated < maxAge);

    if (!force && isFresh) return this.cache;

    this.refreshing = this.#collect().finally(() => {
      this.refreshing = null;
    });
    return this.refreshing;
  }

  async #collect() {
    const baseUrl = 'https://store.steampowered.com/search/results/?query&count=100&dynamic_data=&sort_by=_ASC&snr=1_7_7_7000_7&filter=topsellers&os=win&cc=cn&l=schinese&infinite=1';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);

    try {
      const responses = await Promise.all([0, 100].map(start => storeFetch(`${baseUrl}&start=${start}`, {
        signal: controller.signal,
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
          'accept-language': 'zh-CN,zh;q=0.9',
          'accept': 'application/json'
        }
      })));
      const badResponse = responses.find(response => !response.ok);
      if (badResponse) {
        throw new Error(`Steam 榜单接口返回 HTTP ${badResponse.status}`);
      }
      const payloads = await Promise.all(responses.map(response => response.json()));
      const html = payloads.map(data => data.results_html || '').join('');
      const rows = html.split('<a href="https://store.steampowered.com/app/').slice(1);

      if (!rows.length) {
        throw new Error('Steam 未返回热销榜单内容');
      }

      const previousRanks = new Map((this.cache?.games || []).map((g) => [g.id, g.rank]));
      const games = [];

      for (let i = 0; i < Math.min(200, rows.length); i++) {
        const row = rows[i];
        const appId = row.match(/^(\d+)/)?.[1];
        if (!appId) continue;

        const titleMatch = row.match(/<span class="title">([^<]+)<\/span>/);
        const title = cleanTitle(titleMatch ? titleMatch[1] : `Steam App ${appId}`);

        const imgMatch = row.match(/<img[^>]+src="([^">]+)"/);
        const image = imgMatch ? imgMatch[1] : '';

        let discount = 0;

        let price = 0;
        let oldPrice = null;
        let isFree = false;

        const origMatch = row.match(/<div class="discount_original_price">([^<]+)<\/div>/);
        const finalMatch = row.match(/<div class="discount_final_price[^"]*">([^<]+)<\/div>/) ||
                           row.match(/<div class="search_price[^"]*">([\s\S]*?)<\/div>/);
        const priceText = finalMatch ? finalMatch[1].replace(/<[^>]+>/g, '').trim() : '';

        if (/免费|free/i.test(priceText) || /免费/i.test(row)) {
          isFree = true;
          price = 0;
        } else {
          price = parsePrice(priceText);
          if (origMatch) {
            oldPrice = parsePrice(origMatch[1]) || null;
          }
        }

        if (price === 0 && !priceText.includes('¥')) {
          isFree = true;
        }
        discount=steamDiscount(row,price,oldPrice);

        const rank = i + 1;
        const prevRank = previousRanks.get(appId);
        const trend = !prevRank || prevRank === rank
          ? 'same'
          : prevRank > rank ? 'up' : 'down';

        const coverLetters = title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '').slice(0, 2).toUpperCase() || 'ST';

        games.push({
          id: appId,
          rank,
          name: title,
          cn: title,
          meta: 'Steam · 中国区热销',
          platform: 'PC',
          price,
          old: oldPrice,
          discount,
          trend,
          cover: coverLetters,
          color: COLORS[i % COLORS.length],
          image,
          url: `https://store.steampowered.com/app/${appId}/?snr=1_7_7_7000_150_1`,
          isFree
        });
      }

      this.cache = {
        platform: 'steam',
        label: 'Steam',
        source: 'https://store.steampowered.com/charts/topselling/CN',
        sourceType: 'Steam Store 中国区官方榜单',
        officialLimit: 200,
        count: games.length,
        updatedAt: new Date().toISOString(),
        stale: false,
        games
      };

      await this.#save();
      return this.cache;
    } catch (error) {
      if (this.cache) {
        this.cache.stale = true;
        this.cache.lastError = error.message;
        await this.#save().catch(() => {});
        return this.cache;
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  async #save() {
    if (!this.cache) return;
    const temporary = `${this.cacheFile}.tmp`;
    await writeFile(temporary, `${JSON.stringify(this.cache, null, 2)}\n`, 'utf8');
    await rename(temporary, this.cacheFile);
  }
}
