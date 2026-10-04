import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { storeFetch } from './polite-fetch.mjs';

const COLORS = ['#365d83', '#b13a84', '#3163b5', '#8b5689', '#705137', '#7768d8', '#4c8550', '#b74752', '#0d6978', '#990000'];

const DEFAULT_GRAPHQL_ENDPOINT = 'https://web.np.playstation.com/api/graphql/v1//op';
// PlayStation 港服「瀏覽」页分类，避免误抓成「優惠」折扣榜。
const DEFAULT_CATEGORY_ID = '28c9c2b2-cecc-415c-9a08-482a605cb104';
const DEFAULT_SHA256 = '88c0b9a1273c6d320c51cd73e390924e21ae28bf09f01cde8b84b1034b16cd03';

function cleanGameName(rawName) {
  if (!rawName) return 'PlayStation Game';
  return rawName
    .replace(/\s*\([^\)]*(中文|英文|日文|韓文|Chinese|English|Japanese)[^\)]*\)/gi, '')
    .trim() || rawName;
}

function parsePriceNumber(str) {
  if (!str) return 0;
  if (/免費|free/i.test(str)) return 0;
  const match = String(str).match(/[\d,]+(?:\.\d+)?/);
  if (!match) return 0;
  return parseFloat(match[0].replace(/,/g, '')) || 0;
}

function parseDiscountNumber(str) {
  if (!str) return 0;
  const match = String(str).match(/(\d+)\s*%/);
  return match ? parseInt(match[1], 10) : 0;
}

function decodeHtmlText(value) {
  return String(value || '')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

export function extractProductPrice(html, productId, { currency = 'HKD' } = {}) {
  for (const match of html.matchAll(/<script\b[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const cache = JSON.parse(match[1]).cache;
      const activeCtaId = cache?.[`Product:${productId}`]?.activeCtaId;
      // 默认按钮可能是会员试玩/游戏目录；只读取相同 SKU 的独立购买价格。
      const candidates = Object.entries(cache || {}).filter(([key, cta]) => {
        if (!key.startsWith('GameCTA:') || !key.includes(`:${productId}-`)) return false;
        const price = cta.price;
        return price && !price.isTiedToSubscription && !price.isExclusive
          && !/UPSELL|TRIAL|SUBSCRIBE|PS_PLUS/i.test(cta.type || key)
          && (price.currencyCode === currency || /免費|免费|無料|Free/i.test(price.discountedPrice || '')
            || (currency === 'HKD' ? /HK\$/ : /[¥￥]/).test(price.discountedPrice || ''));
      });
      candidates.sort(([a], [b]) => Number(b === `GameCTA:${activeCtaId}`) - Number(a === `GameCTA:${activeCtaId}`));
      const price = candidates[0]?.[1]?.price;
      if (price?.discountedPrice) {
        return {
          discountedPrice: price.discountedPrice,
          basePrice: price.basePrice || price.discountedPrice,
          discountText: price.displayDiscountText || '',
          isFree: Boolean(price.isFree)
        };
      }
    } catch {
      // 部分页面片段不是完整的商品缓存，继续查找当前商品的购买信息。
    }
  }
  return null;
}

async function fetchPsProductVersion(product, parent, signal, request, locale = 'zh-hans-hk', currency = 'HKD') {
  const id = product?.id;
  if (!id) return null;
  try {
    const response = await request(`https://store.playstation.com/${locale}/product/${id}`, {
      signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36',
        'accept-language': locale === 'ja-jp' ? 'ja-JP' : 'zh-HK'
      }
    });
    if (!response.ok) return null;
    const html = await response.text();
    const title = decodeHtmlText(html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1])
      .replace(/\s*[|｜].*$/, '').trim();
    const isDemo = /\bDEMO\b|試玩版|体验版|试玩版/i.test(title) || /DEMO|TRIAL|体験版/i.test(id);
    const price = isDemo
      ? { discountedPrice: '免费', basePrice: '免费', isFree: true }
      : extractProductPrice(html, id, { currency });
    if (!title || !price) return null;
    let languages = [];
    for (const match of html.matchAll(/<script\b[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const detail = JSON.parse(match[1]).cache?.[`Product:${id}`];
        if (detail?.screenLanguages) languages = detail.screenLanguages;
      } catch {}
    }
    return {
      ...parent,
      id,
      name: title || parent.name,
      rawName: title || parent.name,
      price,
      platforms: /-CUSA/i.test(id) ? ['PS4'] : /-PPSA/i.test(id) ? ['PS5'] : parent.platforms,
      hasChinese: languages.some(lang => /^(?:zh|ch|zh-hans|zh-hant)$/i.test(lang)),
      url: `https://store.playstation.com/${locale}/product/${id}`
    };
  } catch {
    return null;
  }
}

function pickCoverImage(product) {
  const allMedia = [
    ...(product.personalizedMeta?.media || []),
    ...(product.media || [])
  ];
  const preferredRoles = ['MASTER', 'GAMEHUB_COVER_ART', 'EDITION_KEY_ART', 'PORTRAIT_BANNER', 'FOUR_BY_THREE_BANNER'];
  for (const role of preferredRoles) {
    const item = allMedia.find((m) => m.role === role && m.type === 'IMAGE' && m.url);
    if (item?.url) return item.url;
  }
  const fallback = allMedia.find((m) => m.type === 'IMAGE' && m.url);
  return fallback?.url || '';
}

function mapPsProduct(product, index) {
  if (product.cachedGame) return { ...product.cachedGame, conceptId: product.conceptId || product.cachedGame.conceptId, priceStale:true, rank: product.storePosition, trend: 'same' };
  const cleanName = cleanGameName(product.name);
  const discountedStr = product.price?.discountedPrice || product.price?.basePrice || '';
  const baseStr = product.price?.basePrice || '';
  const isFree = Boolean(product.price?.isFree || /免費|free/i.test(discountedStr));
  const isUnavailable = /無法使用|not available/i.test(discountedStr) || /無法使用|not available/i.test(baseStr);
  const price = parsePriceNumber(discountedStr);
  if (!isFree && (isUnavailable || price === 0)) {
    return null;
  }
  const rawOld = parsePriceNumber(baseStr);
  const discount = parseDiscountNumber(product.price?.discountText) || (rawOld > price && price > 0 ? Math.round((1 - price / rawOld) * 100) : 0);
  const oldPrice = discount > 0 && rawOld > price ? rawOld : (discount > 0 ? Math.round(price / (1 - discount / 100)) : null);

  const platformText = [product.name, product.rawName, product.id].filter(Boolean).join(' ');
  const platforms = Array.isArray(product.platforms) && product.platforms.length
    ? product.platforms.join(' / ')
    : /PS4\s*(?:&|＆|\/|和)\s*PS5|PS5\s*(?:&|＆|\/|和)\s*PS4/i.test(platformText)
      ? 'PS4 / PS5'
      : /(?:^|-)CUSA/i.test(String(product.id || ''))
        ? 'PS4'
        : 'PS5';

  const image = pickCoverImage(product);
  const coverLetters = cleanName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'PS';

  return {
    id: product.id || `ps5-${index + 1}`,
    conceptId: product.conceptId,
    rawName: product.name,
    rank: product.storePosition || index + 1,
    name: cleanName,
    cn: cleanName,
    meta: `PlayStation · ${product.storeDisplayClassification?.replace(/_/g, ' ') || '热门推荐'}`,
    platform: platforms,
    price,
    old: oldPrice,
    discount,
    trend: 'same',
    cover: coverLetters,
    color: COLORS[index % COLORS.length],
    image,
    verified: true,
    hasChinese: Boolean(product.hasChinese),
    url: product.url || (product.id ? `https://store.playstation.com/zh-hans-hk/product/${product.id}` : 'https://store.playstation.com/zh-hans-hk/pages/browse')
  };
}

export class PlayStationCollector {
  constructor({ cacheFile, refreshMinutes = 60, fallbackFile = new URL('../../dist/ps5-data.js', import.meta.url), request = storeFetch, region = 'hk' } = {}) {
    this.cacheFile = cacheFile || path.resolve('data/ps5-cache.json');
    this.refreshMinutes = Math.max(5, Number(refreshMinutes) || 15);
    this.cache = null;
    this.refreshing = null;
    this.fallbackFile = fallbackFile;
    this.request = request;
    this.region = region;
  }

  async init() {
    await mkdir(path.dirname(this.cacheFile), { recursive: true });
    try {
      this.cache = JSON.parse(await readFile(this.cacheFile, 'utf8'));
      if (this.cache.sourceType === 'PlayStation Store 港服官方商店') {
        for (const game of this.cache.games || []) game.conceptId ||= `legacy-rank-${game.rank}`;
      }
    } catch {
      this.cache = null;
    }
    // 仅恢复有来源时间的已验证价格；实时缓存中的同一 SKU 优先。
    try {
      if (this.cache && this.cache.sourceType !== 'PlayStation Store 港服官方商店') return;
      const source = await readFile(this.fallbackFile, 'utf8');
      const seed = JSON.parse(source.replace(/^window\.PS5_HK_GAMES\s*=\s*/, '').replace(/;\s*$/, ''));
      const current = new Map((this.cache?.games || []).map(game => [game.id, game]));
      const concepts = new Map();
      for (const game of seed) {
        const live = current.get(game.id);
        if (live?.conceptId) concepts.set(game.conceptId || `legacy-rank-${game.rank}`, live.conceptId);
      }
      let restored = 0;
      for (const game of seed) {
        if (current.has(game.id) || game.verified !== true || !Number.isFinite(Date.parse(game.priceUpdatedAt))) continue;
        const legacy = game.conceptId || `legacy-rank-${game.rank}`;
        current.set(game.id, { ...game, conceptId: concepts.get(legacy) || legacy, priceStale: true });
        restored++;
      }
      if (restored) {
        this.cache = { ...this.cache, platform: 'ps5', sourceType: 'PlayStation Store 港服官方商店',
          games: [...current.values()], count: current.size, stale: true,
          lastError: `已恢复 ${restored} 条历史验证商品，待官方价格更新` };
        await this.#save();
      }
    } catch {
      // 静态快照缺失时继续使用运行缓存和官方采集。
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
    const timeout = setTimeout(() => controller.abort(), 35 * 60 * 1000);
    const request = this.request;
    const jp = this.region === 'jp';
    const locale = jp ? 'ja-jp' : 'zh-hans-hk';

    async function fetchPage(offset, size) {
      const variables = {
        id: DEFAULT_CATEGORY_ID,
        pageArgs: { size, offset },
        sortBy: null,
        filterBy: [],
        facetOptions: []
      };
      const url = `${DEFAULT_GRAPHQL_ENDPOINT}?operationName=categoryGridRetrieve&variables=${encodeURIComponent(JSON.stringify(variables))}&extensions=${encodeURIComponent(JSON.stringify({ persistedQuery: { version: 1, sha256Hash: DEFAULT_SHA256 } }))}`;
      const response = await request(url, {
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          'x-apollo-operation-name': 'categoryGridRetrieve',
          'x-psn-store-locale-override': jp ? 'ja-JP' : 'zh-Hant-HK',
          'x-psn-app-ver': '@sie-ppr-web-store/app/0.114.0-',
          'referer': 'https://store.playstation.com/',
          'accept-language': jp ? 'ja-JP' : 'zh-HK',
          'accept': 'application/json',
          'apollographql-client-version': '0.114.0',
          'apollographql-client-name': '@sie-ppr-web-store/app',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
        }
      });
      if (!response.ok) {
        throw new Error(`PlayStation GraphQL 返回 HTTP ${response.status}`);
      }
      const payload = await response.json();
      const grid = payload.data?.categoryGridRetrieve;
      // 瀏覽页返回的是 Concept；優惠页才主要使用 products。
      return grid?.concepts?.length ? grid.concepts : (grid?.products || []);
    }

    try {
      const [page1, page2, page3] = await Promise.all([
        fetchPage(0, 100),
        fetchPage(100, 100),
        fetchPage(200, 100)
      ]);
      const rawProducts = [...page1, ...page2, ...page3];

      if (!rawProducts.length) {
        throw new Error('PlayStation Store 未返回榜单商品');
      }

      // 浏览页以 Concept 返回商品；同一 Concept 下的多个 SKU（例如 GTA 6 标准版/终极版）补抓各自价格。
      const previousGames = new Map((this.cache?.games || []).map(game => [game.id, game]));
      const expandedByConcept = new Array(rawProducts.length);
      let nextIndex = 0;
      let missingVersions = 0;
      await Promise.all(Array.from({ length: 1 }, async () => {
        while (nextIndex < rawProducts.length) {
          const sourceIndex = nextIndex++;
          const concept = rawProducts[sourceIndex];
          const sourceConcept = { ...concept, conceptId: concept.id, storePosition: sourceIndex + 1,
            url: `https://store.playstation.com/${locale}/${/^\d+$/.test(concept.id) ? 'concept' : 'product'}/${concept.id}` };
          const versions = Array.isArray(concept.products) ? concept.products : [];
          if (!versions.length) {
            expandedByConcept[sourceIndex] = [sourceConcept];
            continue;
          }
          const versionProducts = [];
          for (const product of versions) versionProducts.push(await fetchPsProductVersion(product, sourceConcept, controller.signal, request, locale, jp ? 'JPY' : 'HKD'));
          const usable = versionProducts.map((item, index) => {
            if (item) return item;
            missingVersions++;
            const cachedGame = previousGames.get(versions[index].id);
            return cachedGame ? { cachedGame:{...cachedGame,priceUpdatedAt:cachedGame.priceUpdatedAt||this.cache.updatedAt}, conceptId: sourceConcept.conceptId, storePosition: sourceIndex + 1 } : null;
          }).filter(Boolean);
          expandedByConcept[sourceIndex] = usable;
        }
      }));
      const expandedProducts = expandedByConcept.flat();
      const games = expandedProducts
        .map((product, index) => mapPsProduct(product, index))
        .filter(Boolean).map(game=>({...game,priceUpdatedAt:game.priceUpdatedAt||new Date().toISOString()}));
      if (!games.length) throw new Error('PlayStation 商品页未返回可验证的游戏数据');
      if (this.cache?.games?.length && games.length < this.cache.games.length * 0.8) {
        throw new Error(`仅获得 ${games.length}/${this.cache.games.length} 条商品，保留完整缓存`);
      }

      this.cache = {
        platform: jp ? 'ps5_jp' : 'ps5',
        label: jp ? 'PlayStation 5 日服' : 'PlayStation 5',
        source: `https://store.playstation.com/${jp ? 'ja-jp' : 'zh-hant-hk'}/pages/browse`,
        sourceType: `PlayStation Store ${jp ? '日服' : '港服'}官方商店`,
        officialLimit: 200,
        count: games.length,
        updatedAt: new Date().toISOString(),
        stale: missingVersions > 0,
        ...(missingVersions ? { lastError: `${missingVersions} 个商品页未返回可验证价格` } : {}),
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
