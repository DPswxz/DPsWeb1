import path from 'node:path';
import { NintendoCollector } from './nintendo.mjs';
import { PlayStationCollector } from './ps5.mjs';
import { SteamCollector } from './steam.mjs';
import { SteamGlobalCollector } from './steam-global.mjs';

const nintendoCollector = new NintendoCollector({
  cacheFile: process.env.CACHE_FILE || path.resolve('data/nintendo-cache.json'),
  refreshMinutes: 15
});

const ps5Collector = new PlayStationCollector({
  cacheFile: process.env.PS5_CACHE_FILE || path.resolve('data/ps5-cache.json'),
  refreshMinutes: 15
});

const steamCollector = new SteamCollector({
  cacheFile: process.env.STEAM_CACHE_FILE || path.resolve('data/steam-cache.json'),
  refreshMinutes: 15
});
const steamGlobalCollector = new SteamGlobalCollector({
  cacheFile: process.env.STEAM_GLOBAL_CACHE_FILE || path.resolve('data/steam-global-cache.json'),
  refreshMinutes: 15
});

await Promise.all([nintendoCollector.init(), ps5Collector.init(), steamCollector.init(), steamGlobalCollector.init()]);

const [nintendoResult, ps5Result, steamResult, steamGlobalResult] = await Promise.all([
  nintendoCollector.refreshAll({ force: true }).catch((e) => ({ error: e.message })),
  ps5Collector.refresh({ force: true }).catch((e) => ({ error: e.message })),
  steamCollector.refresh({ force: true }).catch((e) => ({ error: e.message })),
  steamGlobalCollector.refresh({ force: true }).catch((e) => ({ error: e.message }))
]);

if (nintendoResult && !nintendoResult.error) {
  for (const [platform, data] of Object.entries(nintendoResult)) {
    console.log(`${platform}: ${data.count} 条，${data.updatedAt}${data.stale ? '（缓存）' : ''}`);
  }
} else {
  console.log('任天堂采集失败：', nintendoResult?.error);
}

if (ps5Result && !ps5Result.error) {
  console.log(`ps5: ${ps5Result.count} 条，${ps5Result.updatedAt}${ps5Result.stale ? '（缓存）' : ''}`);
} else {
  console.log('PS5 采集失败：', ps5Result?.error);
}

if (steamResult && !steamResult.error) {
  console.log(`steam: ${steamResult.count} 条，${steamResult.updatedAt}${steamResult.stale ? '（缓存）' : ''}`);
} else {
  console.log('Steam 采集失败：', steamResult?.error);
}

if (steamGlobalResult && !steamGlobalResult.error) {
  console.log(`steam_global: ${steamGlobalResult.count} 条，${steamGlobalResult.updatedAt}${steamGlobalResult.stale ? '（缓存）' : ''}`);
} else {
  console.log('Steam 全球榜采集失败：', steamGlobalResult?.error);
}
