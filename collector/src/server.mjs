import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NintendoCollector, PLATFORM_CONFIG, HK_IMAGE_DIR } from './nintendo.mjs';
import { PlayStationCollector } from './ps5.mjs';
import { PlayStationJpCollector } from './ps5-jp.mjs';
import { SteamCollector } from './steam.mjs';
import { SteamGlobalCollector } from './steam-global.mjs';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const collectorRoot = path.resolve(currentDir, '..');
const app = express();
const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || '0.0.0.0';
let refreshMinutes = Math.max(5, Number(process.env.REFRESH_MINUTES) || 60);
let refreshTimer;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*').split(',').map((item) => item.trim());

const nintendoCollector = new NintendoCollector({
  cacheFile: process.env.CACHE_FILE || path.join(collectorRoot, 'data', 'nintendo-cache.json'),
  refreshMinutes
});

const ps5Collector = new PlayStationCollector({
  cacheFile: process.env.PS5_CACHE_FILE || path.join(collectorRoot, 'data', 'ps5-cache.json'),
  refreshMinutes
});

const ps5JpCollector = new PlayStationJpCollector({
  cacheFile: process.env.PS5_JP_CACHE_FILE || path.join(collectorRoot, 'data', 'ps5-jp-cache.json'),
  langCacheFile: process.env.PS5_JP_LANG_CACHE_FILE || path.join(collectorRoot, 'data', 'ps5-jp-lang-cache.json'),
  refreshMinutes
});

const steamCollector = new SteamCollector({
  cacheFile: process.env.STEAM_CACHE_FILE || path.join(collectorRoot, 'data', 'steam-cache.json'),
  refreshMinutes
});
const steamGlobalCollector = new SteamGlobalCollector({
  cacheFile: process.env.STEAM_GLOBAL_CACHE_FILE || path.join(collectorRoot, 'data', 'steam-global-cache.json'),
  refreshMinutes
});

app.disable('x-powered-by');
app.use(cors({
  origin: allowedOrigins.includes('*') ? true : allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS']
}));
app.use(express.json({ limit: '32kb' }));

app.post('/api/settings', (request, response) => {
  const next = Number(request.body?.refreshMinutes);
  if (![5, 15, 30, 60].includes(next)) {
    return response.status(400).json({ ok: false, error: 'refreshMinutes 只能是 5、15、30 或 60' });
  }
  refreshMinutes = next;
  for (const collector of [nintendoCollector, ps5Collector, ps5JpCollector, steamCollector, steamGlobalCollector]) {
    collector.refreshMinutes = next;
  }
  scheduleRefresh();
  return response.json({ ok: true, refreshMinutes });
});

app.get('/health', (_request, response) => {
  const platforms = Object.fromEntries(Object.keys(PLATFORM_CONFIG).map((platform) => {
    const data = nintendoCollector.get(platform);
    return [platform, { count: data?.count || 0, updatedAt: data?.updatedAt || null, stale: data?.stale ?? true }];
  }));
  const ps5Data = ps5Collector.get();
  platforms.ps5 = { count: ps5Data?.count || 0, updatedAt: ps5Data?.updatedAt || null, stale: ps5Data?.stale ?? true };
  const ps5JpData = ps5JpCollector.get();
  platforms.ps5_jp = { count: ps5JpData?.count || 0, updatedAt: ps5JpData?.updatedAt || null, stale: ps5JpData?.stale ?? true };
  const steamData = steamCollector.get();
  platforms.steam = { count: steamData?.count || 0, updatedAt: steamData?.updatedAt || null, stale: steamData?.stale ?? true };
  const steamGlobalData = steamGlobalCollector.get();
  platforms.steam_global = { count: steamGlobalData?.count || 0, updatedAt: steamGlobalData?.updatedAt || null, stale: steamGlobalData?.stale ?? true };

  response.json({ ok: true, service: 'game-pulse-nintendo-collector', refreshMinutes, platforms });
});

// Nintendo API
app.get('/api/nintendo/rankings', async (request, response) => {
  const platform = request.query.platform || 'switch1';
  if (!PLATFORM_CONFIG[platform]) {
    return response.status(400).json({ ok: false, error: 'platform 只能是 switch1、switch2、switch1_hk 或 switch2_hk' });
  }
  try {
    if (request.query.refresh === '1' || !nintendoCollector.get(platform)) {
      await nintendoCollector.refreshAll({ force: request.query.refresh === '1' });
    }
    const data = nintendoCollector.get(platform);
    response.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=900');
    return response.json({ ok: true, ...data });
  } catch (error) {
    const fallback = nintendoCollector.get(platform);
    if (fallback) return response.status(206).json({ ok: true, ...fallback, stale: true, lastError: error.message });
    return response.status(503).json({ ok: false, error: error.message });
  }
});

app.post('/api/nintendo/refresh', async (_request, response) => {
  try {
    const result = await nintendoCollector.refreshAll({ force: true });
    response.json({
      ok: true,
      platforms: Object.fromEntries(Object.entries(result).map(([key, value]) => [key, {
        count: value.count,
        updatedAt: value.updatedAt,
        stale: value.stale
      }]))
    });
  } catch (error) {
    response.status(503).json({ ok: false, error: error.message });
  }
});

// PS5 API
app.get('/api/ps5/rankings', async (request, response) => {
  try {
    if (request.query.refresh === '1' || !ps5Collector.get()) {
      await ps5Collector.refresh({ force: request.query.refresh === '1' });
    }
    const data = ps5Collector.get();
    response.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=900');
    return response.json({ ok: true, ...data });
  } catch (error) {
    const fallback = ps5Collector.get();
    if (fallback) return response.status(206).json({ ok: true, ...fallback, stale: true, lastError: error.message });
    return response.status(503).json({ ok: false, error: error.message });
  }
});

app.post('/api/ps5/refresh', async (_request, response) => {
  try {
    const result = await ps5Collector.refresh({ force: true });
    response.json({
      ok: true,
      platform: 'ps5',
      count: result.count,
      updatedAt: result.updatedAt,
      stale: result.stale
    });
  } catch (error) {
    response.status(503).json({ ok: false, error: error.message });
  }
});

// PS5 JP API
app.get('/api/ps5-jp/rankings', async (request, response) => {
  try {
    if (request.query.refresh === '1' || !ps5JpCollector.get()) {
      await ps5JpCollector.refresh({ force: request.query.refresh === '1' });
    }
    const data = ps5JpCollector.get();
    response.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=900');
    return response.json({ ok: true, ...data });
  } catch (error) {
    const fallback = ps5JpCollector.get();
    if (fallback) return response.status(206).json({ ok: true, ...fallback, stale: true, lastError: error.message });
    return response.status(503).json({ ok: false, error: error.message });
  }
});

app.post('/api/ps5-jp/refresh', async (_request, response) => {
  try {
    const result = await ps5JpCollector.refresh({ force: true });
    response.json({
      ok: true,
      platform: 'ps5_jp',
      count: result.count,
      updatedAt: result.updatedAt,
      stale: result.stale
    });
  } catch (error) {
    response.status(503).json({ ok: false, error: error.message });
  }
});

// Steam API
app.get('/api/steam/rankings', async (request, response) => {
  try {
    if (request.query.refresh === '1' || !steamCollector.get()) {
      await steamCollector.refresh({ force: request.query.refresh === '1' });
    }
    const data = steamCollector.get();
    response.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=900');
    return response.json({ ok: true, ...data });
  } catch (error) {
    const fallback = steamCollector.get();
    if (fallback) return response.status(206).json({ ok: true, ...fallback, stale: true, lastError: error.message });
    return response.status(503).json({ ok: false, error: error.message });
  }
});

app.post('/api/steam/refresh', async (_request, response) => {
  try {
    const result = await steamCollector.refresh({ force: true });
    response.json({
      ok: true,
      platform: 'steam',
      count: result.count,
      updatedAt: result.updatedAt,
      stale: result.stale
    });
  } catch (error) {
    response.status(503).json({ ok: false, error: error.message });
  }
});

app.get('/api/steam-global/rankings', async (request, response) => {
  try {
    if (request.query.refresh === '1' || !steamGlobalCollector.get()) {
      await steamGlobalCollector.refresh({ force: request.query.refresh === '1' });
    }
    const data = steamGlobalCollector.get();
    response.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=900');
    return response.json({ ok: true, ...data });
  } catch (error) {
    const fallback = steamGlobalCollector.get();
    if (fallback) return response.status(206).json({ ok: true, ...fallback, stale: true, lastError: error.message });
    return response.status(503).json({ ok: false, error: error.message });
  }
});

app.post('/api/steam-global/refresh', async (_request, response) => {
  try {
    const result = await steamGlobalCollector.refresh({ force: true });
    response.json({ ok: true, platform: 'steam_global', count: result.count, updatedAt: result.updatedAt, stale: result.stale });
  } catch (error) {
    response.status(503).json({ ok: false, error: error.message });
  }
});

app.use('/api', (_request, response) => response.status(404).json({ ok: false, error: '接口不存在' }));
app.use('/assets/nintendo-hk', express.static(HK_IMAGE_DIR));

if (process.env.SERVE_FRONTEND !== '0') {
  const frontend = path.resolve(collectorRoot, '..', 'dist');
  app.use(express.static(frontend));
  app.get('*path', (_request, response) => response.sendFile(path.join(frontend, 'index.html')));
}

await Promise.all([nintendoCollector.init(), ps5Collector.init(), ps5JpCollector.init(), steamCollector.init(), steamGlobalCollector.init()]);

const server = app.listen(port, host, () => console.log(`Game Pulse collector listening on http://${host}:${server.address().port}`));

// 首次采集
if (process.env.COLLECT_ON_START !== '0') {
  nintendoCollector.refreshAll().catch((error) => console.error('任天堂首次采集失败，将使用缓存：', error.message));
  ps5Collector.refresh().catch((error) => console.error('PS5 港服首次采集失败，将使用缓存：', error.message));
  ps5JpCollector.refresh().catch((error) => console.error('PS5 日服首次采集失败，将使用缓存：', error.message));
  steamCollector.refresh().catch((error) => console.error('Steam 首次采集失败，将使用缓存：', error.message));
  steamGlobalCollector.refresh().catch((error) => console.error('Steam 全球榜首次采集失败，将使用缓存：', error.message));
}

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    clearTimeout(refreshTimer);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 10_000).unref();
  });
}

process.stdout?.on('error', () => {});
process.stderr?.on('error', () => {});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// 每批完成后安排下一次检查，设置变化时立即重新计时。
function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(async () => {
    console.log(`[${new Date().toLocaleTimeString()}] 检查数据缓存（有效期 ${refreshMinutes} 分钟）...`);
    const tasks = [
      ['任天堂', nintendoCollector.refreshAll()],
      ['PS5 港服', ps5Collector.refresh()],
      ['PS5 日服', ps5JpCollector.refresh()],
      ['Steam', steamCollector.refresh()],
      ['Steam 全球榜', steamGlobalCollector.refresh()]
    ];
    const results = await Promise.allSettled(tasks.map(([, task]) => task));
    results.forEach((result, index) => {
      if (result.status === 'rejected') console.error(`${tasks[index][0]}定时采集失败：`, result.reason);
    });
    scheduleRefresh();
  }, refreshMinutes * 60 * 1000);
}
scheduleRefresh();
