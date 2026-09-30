import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const collectorRoot = path.resolve(currentDir, '..');

// Nintendo export
try {
  const nintendoCacheFile = process.env.CACHE_FILE || path.join(collectorRoot, 'data', 'nintendo-cache.json');
  const nintendoOutputFile = path.resolve(collectorRoot, '..', 'dist', 'nintendo-data.js');
  const nintendoCache = JSON.parse(await readFile(nintendoCacheFile, 'utf8'));
  await writeFile(
    nintendoOutputFile,
    `window.NINTENDO_RANKINGS = ${JSON.stringify(nintendoCache, null, 2)};\n`,
    'utf8'
  );
  console.log(`已生成任天堂静态快照：${nintendoOutputFile}`);
} catch (e) {
  console.warn('任天堂静态导出跳过：', e.message);
}

// PS5 export
try {
  const ps5CacheFile = path.join(collectorRoot, 'data', 'ps5-cache.json');
  const ps5OutputFile = path.resolve(collectorRoot, '..', 'dist', 'ps5-data.js');
  const ps5Cache = JSON.parse(await readFile(ps5CacheFile, 'utf8'));
  const games = ps5Cache.games || [];
  await writeFile(
    ps5OutputFile,
    `window.PS5_HK_GAMES = ${JSON.stringify(games, null, 2)};\n`,
    'utf8'
  );
  console.log(`已生成 PS5 港服静态快照：${ps5OutputFile}`);
} catch (e) {
  console.warn('PS5 静态导出跳过：', e.message);
}

// Steam export
try {
  const steamCacheFile = path.join(collectorRoot, 'data', 'steam-cache.json');
  const steamOutputFile = path.resolve(collectorRoot, '..', 'dist', 'steam-data.js');
  const steamCache = JSON.parse(await readFile(steamCacheFile, 'utf8'));
  const games = (steamCache.games || []).map((g) => ({
    id: g.id,
    title: g.name,
    image: g.image,
    url: g.url,
    price: g.price,
    old: g.old,
    discount: g.discount
  }));
  await writeFile(
    steamOutputFile,
    `window.STEAM_CN_GAMES = ${JSON.stringify(games, null, 2)};\n`,
    'utf8'
  );
  console.log(`已生成 Steam 国区静态快照：${steamOutputFile}`);
} catch (e) {
  console.warn('Steam 静态导出跳过：', e.message);
}

try {
  const cacheFile = path.join(collectorRoot, 'data', 'steam-global-cache.json');
  const outputFile = path.resolve(collectorRoot, '..', 'dist', 'steam-global-data.js');
  const cache = JSON.parse(await readFile(cacheFile, 'utf8'));
  await writeFile(outputFile, `window.STEAM_GLOBAL_GAMES = ${JSON.stringify(cache.games || [], null, 2)};\n`, 'utf8');
  console.log(`已生成 Steam 全球榜静态快照：${outputFile}`);
} catch (e) {
  console.warn('Steam 全球榜静态导出跳过：', e.message);
}
