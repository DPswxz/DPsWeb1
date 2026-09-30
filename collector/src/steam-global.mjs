import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const CHART_URL = 'https://store.steampowered.com/charts/topselling/global?l=english';
const COLORS = ['#1b5f82', '#2a475e', '#1976d2', '#0097a7', '#00796b', '#388e3c', '#512da8', '#c2185b'];

export function parseGlobalChart(html) {
  const $ = load(html);
  const games = [];
  $('table tr').each((_index, row) => {
    const cells = $(row).find('td');
    if (cells.length < 4) return;
    const rank = Number($(cells[1]).text().trim());
    const link = $(cells[2]).find('a[href*="/app/"]').first();
    const id = link.attr('href')?.match(/\/app\/(\d+)/)?.[1];
    const name = link.text().trim();
    if (!id || !name || !Number.isInteger(rank)) return;
    const priceText = $(cells[3]).text().trim();
    games.push({
      id,
      rank,
      name,
      image: link.find('img').attr('src') || '',
      url: `https://store.steampowered.com/app/${id}/`,
      isFree: /free to play|free|免费|免費/i.test(priceText)
    });
  });
  return games;
}

export class SteamGlobalCollector {
  constructor({ cacheFile, refreshMinutes = 15 } = {}) {
    this.cacheFile = cacheFile || path.resolve('data/steam-global-cache.json');
    this.refreshMinutes = Math.max(5, Number(refreshMinutes) || 15);
    this.cache = null;
    this.refreshing = null;
  }

  async init() {
    await mkdir(path.dirname(this.cacheFile), { recursive: true });
    try {
      this.cache = JSON.parse(await readFile(this.cacheFile, 'utf8'));
    } catch {
      this.cache = null;
    }
  }

  get() {
    return this.cache;
  }

  async refresh({ force = false } = {}) {
    if (this.refreshing) return this.refreshing;
    const updated = Date.parse(this.cache?.updatedAt || 0);
    if (!force && this.cache?.games?.length && Date.now() - updated < this.refreshMinutes * 60 * 1000) {
      return this.cache;
    }
    this.refreshing = this.#collect().finally(() => { this.refreshing = null; });
    return this.refreshing;
  }

  async #collect() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(CHART_URL, { signal: controller.signal });
      if (!response.ok) throw new Error(`Steam 全球榜返回 HTTP ${response.status}`);
      const chart = parseGlobalChart(await response.text());
      if (chart.length < 50) throw new Error(`Steam 全球榜仅解析到 ${chart.length} 条`);

      const prices = new Map();
      const paidIds = chart.filter(game => !game.isFree).map(game => game.id);
      const chunks = [];
      for (let i = 0; i < paidIds.length; i += 20) chunks.push(paidIds.slice(i, i + 20));
      await Promise.all(chunks.map(async ids => {
        const url = `https://store.steampowered.com/api/appdetails?appids=${ids.join(',')}&cc=cn&l=schinese&filters=price_overview`;
        const result = await fetch(url, { signal: controller.signal });
        if (!result.ok) throw new Error(`Steam 中国区价格接口返回 HTTP ${result.status}`);
        const payload = await result.json();
        for (const id of ids) {
          const price = payload[id]?.data?.price_overview;
          if (price?.currency === 'CNY' && Number.isFinite(price.final)) prices.set(id, price);
        }
      }));

      const previousRanks = new Map((this.cache?.games || []).map(game => [game.id, game.rank]));
      const games = chart.map((game, index) => {
        const price = prices.get(game.id);
        const previousRank = previousRanks.get(game.id);
        return {
          ...game,
          cn: game.name,
          meta: 'Steam · 全球热销排名',
          platform: 'PC',
          price: game.isFree ? 0 : price ? price.final / 100 : null,
          old: price && price.initial > price.final ? price.initial / 100 : null,
          discount: price?.discount_percent || 0,
          priceAvailable: game.isFree || Boolean(price),
          trend: !previousRank || previousRank === game.rank ? 'same' : previousRank > game.rank ? 'up' : 'down',
          cover: game.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '').slice(0, 2).toUpperCase() || 'ST',
          color: COLORS[index % COLORS.length]
        };
      });

      this.cache = {
        platform: 'steam_global',
        label: 'Steam 全球热销榜',
        source: CHART_URL,
        sourceType: 'Steam 官方全球排名 · 中国区价格',
        officialLimit: chart.length,
        count: games.length,
        updatedAt: new Date().toISOString(),
        stale: false,
        games
      };
      await writeFile(`${this.cacheFile}.tmp`, `${JSON.stringify(this.cache, null, 2)}\n`, 'utf8');
      await rename(`${this.cacheFile}.tmp`, this.cacheFile);
      return this.cache;
    } catch (error) {
      if (this.cache) {
        this.cache.stale = true;
        this.cache.lastError = error.message;
        return this.cache;
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
