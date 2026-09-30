import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

const COLORS = ['#365d83', '#b13a84', '#3163b5', '#8b5689', '#705137', '#7768d8', '#4c8550', '#b74752', '#0d6978', '#990000'];

const DEFAULT_GRAPHQL_ENDPOINT = 'https://web.np.playstation.com/api/graphql/v1//op';
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
  if (/免費|無料|free/i.test(str)) return 0;
  const match = String(str).match(/[\d,]+(?:\.\d+)?/);
  if (!match) return 0;
  return parseFloat(match[0].replace(/,/g, '')) || 0;
}

function parseDiscountNumber(str) {
  if (!str) return 0;
  const match = String(str).match(/(\d+)\s*%/);
  return match ? parseInt(match[1], 10) : 0;
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

const JP_CHINESE_MAP = {
  'PRAGMATA': '识质存在',
  'PRAGMATA Deluxe Edition': '识质存在 豪华版',
  'Forza Horizon 5': '极限竞速：地平线 5',
  'Forza Horizon 5 Premium Edition': '极限竞速：地平线 5 顶级版',
  'Forza Horizon 5 Standard Edition': '极限竞速：地平线 5 标准版',
  'モンスターハンターワイルズ': '怪物猎人 荒野',
  'モンスターハンターストーリーズ3　～運命の双竜～': '怪物猎人物语3 ～命运之双龙～',
  'SILENT HILL f': '寂静岭 f',
  'CODE VEIN II': '噬血代码 II',
  'FINAL FANTASY VII REBIRTH': '最终幻想VII 重生',
  'DEATH STRANDING 2: ON THE BEACH': '死亡搁浅2：冥滩之上',
  'METAL GEAR SOLID Δ: SNAKE EATER': '合金装备Δ：食蛇者',
  'METAL GEAR SOLID Δ: SNAKE EATER Digital Deluxe Edition': '合金装备Δ：食蛇者 数字豪华版',
  '龍が如く 極３ / 龍が如く３外伝 Dark Ties': '人中之龙 极3 / 人中之龙3外传 Dark Ties',
  '龍が如く 極３ / 龍が如く３外伝 Dark Ties PS4 & PS5': '人中之龙 极3 / 人中之龙3外传 Dark Ties',
  'Clair Obscur: Expedition 33': '光与影：33号远征队',
  'Clair Obscur: Expedition 33 – Deluxe Edition': '光与影：33号远征队 豪华版',
  'Starfield': '星空',
  'Starfield Premium Edition': '星空 高级版',
  'デジモンストーリー タイムストレンジャー': '数码宝贝故事 时空异客',
  'デジモンストーリー タイムストレンジャー デラックスエディション': '数码宝贝故事 时空异客 豪华版',
  '鉄拳8': '铁拳8',
  '鉄拳8 Advanced Edition': '铁拳8 进阶版',
  'Battlefield™ 6': '战地风云6',
  'Battlefield™ 6 ファントムエディション': '战地风云6 魅影版',
  '歧路旅人0': '歧路旅人0',
  'OCTOPATH TRAVELER 0': '歧路旅人0',
  'OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4 & PS5': '歧路旅人0 数字豪华版',
  'Echoes of Aincrad': '艾恩葛朗特的回响',
  'ドラゴンボール Sparking! ZERO': '七龙珠 电光炸裂！ZERO',
  '龍が如く８外伝 Pirates in Hawaii': '人中之龙8外传 夏威夷海盗',
  '龍が如く８外伝 Pirates in Hawaii PS4 & PS5': '人中之龙8外传 夏威夷海盗',
  'スーパーロボット大戦Y': '超级机器人大战Y',
  'REANIMAL': '动物之魂 REANIMAL',
  'REANIMAL – Digital Deluxe Edition': '动物之魂 REANIMAL 数字豪华版',
  'The Elder Scrolls IV: Oblivion Remastered': '上古卷轴IV：湮没 复刻版',
  'The Elder Scrolls IV: Oblivion Remastered - Deluxe Edition': '上古卷轴IV：湮没 复刻版 豪华版',
  '007 First Light': '007 初道曙光',
  '007 First Light - デラックスエディション': '007 初道曙光 豪华版',
  '幻想水滸伝 I&II HDリマスター 門の紋章戦争 / デュナン統一戦争': '幻想水浒传 I&II HD复刻版',
  '幻想水滸伝 I&II HDリマスター 門の紋章戦争 / デュナン統一戦争 PS4 & PS5': '幻想水浒传 I&II HD复刻版',
  'テイルズ オブ エクシリア リマスター': '无尽传奇 复刻版',
  'Avowed': '宣誓',
  '『ボーダーランズ® 4』': '无主之地4',
  'ボーダーランズ® 4': '无主之地4',
  '真・三國無双 ORIGINS': '真·三国无双 起源',
  'FINAL FANTASY VII REMAKE': '最终幻想VII 重制版',
  'FINAL FANTASY VII REMAKE INTERGRADE': '最终幻想VII 重制版 Intergrade',
  'フロストパンク2': '冰汽时代2',
  'NINJA GAIDEN 4': '忍者龙剑传4',
  'NINJA GAIDEN\u00a04': '忍者龙剑传4',
  '『スター・ウォーズ 無法者たち』': '星球大战：亡命之徒',
  'スター・ウォーズ 無法者たち': '星球大战：亡命之徒',
  'スーパーロボット大戦30': '超级机器人大战30',
  'The Outer Worlds 2': '天外世界2',
  'テイルズ オブ グレイセス エフ リマスター': '圣恩传奇 F 复刻版',
  '零 ～紅い蝶～ REMAKE': '零 ～红蝶～ 重制版',
  'ジュラシック・ワールド・エボリューション3': '侏罗纪世界：进化3',
  'プラネットコースター 2': '过山车之星2',
  'Rust Console Edition': '腐蚀 Rust 主机版',
  'STAR WARS ジェダイ：フォールン・オーダー™': '星球大战 绝地：陨落的武士团',
  'STAR WARS ジェダイ：フォールン・オーダー': '星球大战 绝地：陨落的武士团',
  'STAR WARS ジェダイ：フォールン・オーダー™ デラックス エディション': '星球大战 绝地：陨落的武士团 豪华版',
  'STAR WARS ジェダイ：サバイバー™': '星球大战 绝地：幸存者',
  'STAR WARS ジェダイ：サバイバー': '星球大战 绝地：幸存者',
  'STAR WARS ジェダイ：サバイバー™ デラックス エディション': '星球大战 绝地：幸存者 豪华版',
  'テイルズ オブ シンフォニア リマスター': '仙乐传说 复刻版',
  'The Elder Scrolls Online': '上古卷轴OL',
  'The Elder Scrolls Online: Standard Edition': '上古卷轴OL 标准版',
  'ガンダムブレイカー４': '高达破坏者4',
  '聖剣伝説 VISIONS of MANA': '圣剑传说 玛娜视界',
  'Cult of the Lamb': '咩咩启示录',
  'Cult of the Lamb: Heretic Edition': '咩咩启示录：异教徒版',
  '龍が如く７外传 名を消した男': '人中之龙7外传 无名之龙',
  '龍が如く７外传 名を消した男　PS4 & PS5': '人中之龙7外传 无名之龙',
  'ロマンシング サガ2 リベンジオブザセブン': '浪漫沙加2 七英雄的复仇',
  'ロマンシング サガ -ミンストレルソング- リマスター': '浪漫沙加 吟游诗人之歌 复刻版',
  'ロマンシング サガ -ミンストレルソング- リマスター PS4 & PS5': '浪漫沙加 吟游诗人之歌 复刻版',
  'サガ フロンティア２ リマスター': '沙加开拓者2 复刻版',
  'サガ フロンティア２ リマスター PS4 & PS5': '沙加开拓者2 复刻版',
  'サガ フロンティア リマスター': '沙加开拓者 复刻版',
  'SAND LAND': '沙漠大冒险',
  'SAND LAND PS4® & PS5®': '沙漠大冒险',
  'トワと神樹の祈り子たち': '永远与神树的祈愿之子',
  'BLEACH Rebirth of Souls': '死神 魂魄觉醒',
  '龍が如く７　光と闇の行方　インターナショナル': '人中之龙7 光与暗的去向 国际版',
  'Lost Soul Aside™': '失落之魂',
  'Lost Soul Aside': '失落之魂',
  '僕のヒーローアカデミア All\'s Justice': '我的英雄学院 All\'s Justice',
  'Sea of Thieves: 2026': '盗贼之海',
  'Sea of Thieves': '盗贼之海',
  'Sea of Thieves: 2026 Premium Edition': '盗贼之海 高级版',
  'CHRONO CROSS: THE RADICAL DREAMERS EDITION': '超时空之轮 狂飙梦想家版',
  'DAEMON X MACHINA TITANIC SCION': '机甲战魔 泰坦之裔',
  'ハッピーダンガンロンパＳ 超高校級の南国サイコロ合宿': '幸福枪弹辩驳S 超高中级的南国掷骰合宿',
  'DREDGE': '渔帆暗涌',
  'DREDGE - Digital Deluxe Edition': '渔帆暗涌 数字豪华版',
  'DREDGE: Expansion Bundle': '渔帆暗涌 扩展捆绑包',
  'ファークライ6': '孤岛惊魂6',
  'Moving Out 2': '胡闹搬家2',
  'Neon Abyss': '霓虹深渊',
  '龍の国 ルーンファクトリー': '龙之国 符文工厂',
  '天穂のサクナヒメ': '天穗之咲稻姬',
  'SCARLET NEXUS': '绯红结系',
  'SCARLET NEXUS PS4 & PS5': '绯红结系',
  'SDガンダム バトルアライアンス': 'SD高达 激斗同盟',
  'Shadow Labyrinth (シャドウラビリンス)': '暗影迷宫',
  'Shadow Labyrinth': '暗影迷宫',
  'Sifu': '师父',
  'ソニックレーシング クロスワールド': '索尼克赛车 跨界世界',
  'ソニックレーシング クロスワールド PS4 & PS5': '索尼克赛车 跨界世界',
  '牧場物語 Let\'s！風のグランドバザール': '牧场物语 来吧！风之繁华市集',
  'NARUTO X BORUTO ナルティメットストームコネクションズ': '火影忍者 终极风暴羁绊',
  'アサシン クリード ヴァルハラ': '刺客信条：英灵殿',
  'ASTRONEER': '异星探险家',
  'ASTRONEER - Ultimate Edition': '异星探险家 终极版',
  'アバター：フロンティア・オブ・パンドラ': '阿凡达：潘多拉边境'
};

function getJpChineseTitle(name) {
  if (JP_CHINESE_MAP[name]) return JP_CHINESE_MAP[name];
  for (const [k, v] of Object.entries(JP_CHINESE_MAP)) {
    if (name.startsWith(k)) {
      const remainder = name.slice(k.length).trim();
      return `${v} ${remainder}`.trim();
    }
  }
  return name;
}

export class PlayStationJpCollector {
  constructor({ cacheFile, langCacheFile, refreshMinutes = 15 } = {}) {
    this.cacheFile = cacheFile || path.resolve('data/ps5-jp-cache.json');
    this.langCacheFile = langCacheFile || path.resolve('data/ps5-jp-lang-cache.json');
    this.refreshMinutes = Math.max(5, Number(refreshMinutes) || 15);
    this.cache = null;
    this.langCache = {};
    this.refreshing = null;
  }

  async init() {
    await mkdir(path.dirname(this.cacheFile), { recursive: true });
    try {
      this.cache = JSON.parse(await readFile(this.cacheFile, 'utf8'));
    } catch {
      this.cache = null;
    }
    try {
      this.langCache = JSON.parse(await readFile(this.langCacheFile, 'utf8'));
    } catch {
      this.langCache = {};
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

  async #detectChinese(productId) {
    if (!productId) return false;
    if (typeof this.langCache[productId] === 'boolean') {
      return this.langCache[productId];
    }
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      const url = `https://store.playstation.com/ja-jp/product/${productId}`;
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
          'accept-language': 'ja-JP'
        }
      });
      clearTimeout(timer);
      if (!res.ok) {
        return false;
      }
      const html = await res.text();
      const langSection = html.match(/(?:表示言語|音声)[\s\S]*?<\/dd>/gi)?.join(' ') || '';
      const hasChinese = /中国語|簡体字|繁体字|Traditional Chinese|Simplified Chinese/i.test(langSection);
      this.langCache[productId] = hasChinese;
      return hasChinese;
    } catch {
      return false;
    }
  }

  async #collect() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000);

    async function fetchPage(offset, size) {
      const variables = {
        id: DEFAULT_CATEGORY_ID,
        pageArgs: { size, offset },
        sortBy: null,
        filterBy: [],
        facetOptions: []
      };
      const url = `${DEFAULT_GRAPHQL_ENDPOINT}?operationName=categoryGridRetrieve&variables=${encodeURIComponent(JSON.stringify(variables))}&extensions=${encodeURIComponent(JSON.stringify({ persistedQuery: { version: 1, sha256Hash: DEFAULT_SHA256 } }))}`;
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          'x-apollo-operation-name': 'categoryGridRetrieve',
          'x-psn-store-locale-override': 'ja-JP',
          'x-psn-app-ver': '@sie-ppr-web-store/app/0.114.0-',
          'referer': 'https://store.playstation.com/',
          'accept-language': 'ja-JP',
          'accept': 'application/json',
          'apollographql-client-version': '0.114.0',
          'apollographql-client-name': '@sie-ppr-web-store/app',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
        }
      });
      if (!response.ok) {
        throw new Error(`PlayStation Japan GraphQL 返回 HTTP ${response.status}`);
      }
      const payload = await response.json();
      const grid = payload.data?.categoryGridRetrieve;
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
        throw new Error('PlayStation Japan Store 未返回榜单商品');
      }

      const previousRanks = new Map((this.cache?.games || []).map((g) => [g.id || g.name, g.rank]));

      // 映射初版商品数据
      const candidateList = [];
      for (let index = 0; index < rawProducts.length; index++) {
        const product = rawProducts[index];
        const cleanName = cleanGameName(product.name);
        const discountedStr = product.price?.discountedPrice || product.price?.basePrice || '';
        const baseStr = product.price?.basePrice || '';
        const isFree = Boolean(product.price?.isFree || /無料|free/i.test(discountedStr));
        const isUnavailable = /利用不可|購入不可|not available/i.test(discountedStr) || /利用不可|not available/i.test(baseStr);
        const price = parsePriceNumber(discountedStr);
        if (!isFree && (isUnavailable || price === 0)) {
          continue;
        }
        const rawOld = parsePriceNumber(baseStr);
        const discount = parseDiscountNumber(product.price?.discountText) || (rawOld > price && price > 0 ? Math.round((1 - price / rawOld) * 100) : 0);
        const oldPrice = discount > 0 && rawOld > price ? rawOld : (discount > 0 ? Math.round(price / (1 - discount / 100)) : null);

        const platforms = Array.isArray(product.platforms) && product.platforms.length
          ? product.platforms.join(' / ')
          : 'PS5';

        const previousRank = previousRanks.get(product.id || cleanName);
        const trend = !previousRank || previousRank === candidateList.length + 1
          ? 'same'
          : previousRank > candidateList.length + 1 ? 'up' : 'down';

        const image = pickCoverImage(product);
        const coverLetters = cleanName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'PS';

        candidateList.push({
          id: product.id || `ps5-jp-${candidateList.length + 1}`,
          rawName: product.name,
          name: cleanName,
          cn: getJpChineseTitle(cleanName),
          meta: `PlayStation · ${product.storeDisplayClassification?.replace(/_/g, ' ') || '热门推荐'}`,
          platform: platforms,
          price,
          old: oldPrice,
          discount,
          trend,
          cover: coverLetters,
          color: COLORS[candidateList.length % COLORS.length],
          image,
          url: product.id ? `https://store.playstation.com/ja-jp/product/${product.id}` : 'https://store.playstation.com/ja-jp/pages/browse'
        });

        if (candidateList.length >= 200) {
          break;
        }
      }

      // 批量并发检测中文支持 (按 10 个一批)
      const BATCH_SIZE = 10;
      for (let i = 0; i < candidateList.length; i += BATCH_SIZE) {
        const batch = candidateList.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (item) => {
          // 页面语言接口偶尔会被商店 CDN 拦截；已有中文译名时仍可可靠显示支持中文提示。
          item.hasChinese = (getJpChineseTitle(item.name) !== item.name) || await this.#detectChinese(item.id);
        }));
      }

      const games = candidateList.map((g, idx) => ({
        ...g,
        rank: idx + 1
      }));

      this.cache = {
        platform: 'ps5_jp',
        label: 'PlayStation 5 日服',
        source: 'https://store.playstation.com/ja-jp/pages/browse',
        sourceType: 'PlayStation Store 日服官方商店',
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

    try {
      const langTemp = `${this.langCacheFile}.tmp`;
      await writeFile(langTemp, `${JSON.stringify(this.langCache, null, 2)}\n`, 'utf8');
      await rename(langTemp, this.langCacheFile);
    } catch {}
  }
}
