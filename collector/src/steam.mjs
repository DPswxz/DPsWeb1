import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { collectSteamRanking } from './steam-ranking.mjs';

const COLORS = ['#1b5f82', '#2a475e', '#1976d2', '#0097a7', '#00796b', '#388e3c', '#512da8', '#c2185b'];

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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);
    try {
      const chart = await collectSteamRanking({signal:controller.signal});
      const previousRanks = new Map((this.cache?.games || []).map((g) => [g.id, g.rank]));
      const games = [];

      for (let i = 0; i < chart.length; i++) {
        const game=chart[i],appId=game.id,title=game.name,image=game.image;
        const {price,old:oldPrice,isFree,discount,rank}=game;
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
        source: 'https://store.steampowered.com/search/?filter=topsellers&cc=cn',
        sourceType: '国区热销前200款付费 + 综合前200名免费游戏',
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
