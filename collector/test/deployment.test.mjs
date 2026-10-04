import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const serverFile = fileURLToPath(new URL('../src/server.mjs', import.meta.url));

for (const serveFrontend of ['0', '1']) {
  test(`部署模式 SERVE_FRONTEND=${serveFrontend} 可读取全部缓存与封面地址`, { timeout: 30_000 }, async (t) => {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'game-pulse-deploy-'));
    const cached = {
      count: 1, updatedAt: new Date().toISOString(), stale: false,
      games: [{ id: 'fixture', name: '测试游戏', image: 'https://store.nintendo.com.hk/media/catalog/product/fixture.jpg' }]
    };
    const nintendoCache = Object.fromEntries(['switch1', 'switch2', 'switch1_hk', 'switch2_hk'].map(key => [key, cached]));
    const cacheVariables = ['CACHE_FILE', 'PS5_CACHE_FILE', 'PS5_JP_CACHE_FILE', 'PS5_JP_LANG_CACHE_FILE', 'STEAM_CACHE_FILE', 'STEAM_GLOBAL_CACHE_FILE'];
    const environment = { ...process.env, HOST: '127.0.0.1', PORT: '0', SERVE_FRONTEND: serveFrontend,
      COLLECT_ON_START: '0', ALLOWED_ORIGINS: 'https://frontend.example.com' };
    environment.PRICE_HISTORY_FILE=path.join(directory,'price-history.sqlite');
    for (const name of cacheVariables) {
      environment[name] = path.join(directory, `${name}.json`);
      await writeFile(environment[name], JSON.stringify(name === 'CACHE_FILE' ? nintendoCache : cached));
    }
    const child = spawn(process.execPath, [serverFile], { env: environment, stdio: ['ignore', 'pipe', 'pipe'] });
    let errors = '';
    child.stderr.on('data', chunk => { errors += chunk; });
    t.after(async () => {
      if (child.exitCode === null) {
        const exited = once(child, 'exit');
        child.kill();
        await exited;
      }
      await rm(directory, { recursive: true, force: true });
    });
    const base = await new Promise((resolve, reject) => {
      let output = '';
      child.stdout.on('data', chunk => {
        output += chunk;
        const match = output.match(/listening on (http:\/\/[^\s]+)/);
        if (match) resolve(match[1]);
      });
      child.once('error', reject);
      child.once('exit', code => reject(new Error(`服务提前退出 ${code}: ${errors}`)));
    });

    const health = await fetch(`${base}/health`).then(response => response.json());
    assert.equal(health.ok, true);
    assert.equal(health.refreshInProgress, false);
    const remaining = Date.parse(health.nextRefreshAt) - Date.parse(health.serverTime);
    assert.ok(remaining > 0 && remaining <= 60 * 60 * 1000);
    assert.equal(Date.parse(health.nextRefreshAt) % (60 * 60 * 1000), 0, '下次抓取固定整点');
    const secondHealth = await fetch(`${base}/health`).then(response => response.json());
    assert.equal(secondHealth.nextRefreshAt, health.nextRefreshAt, '读取状态不能重置服务器刷新时间');
    assert.equal(Object.keys(health.platforms).length, 8);
    for (const status of Object.values(health.platforms)) assert.equal(status.count, 1);
    for (const endpoint of ['/api/nintendo/rankings?platform=switch1_hk', '/api/ps5/rankings', '/api/ps5-jp/rankings', '/api/steam/rankings', '/api/steam-global/rankings']) {
      const response = await fetch(`${base}${endpoint}`, { headers: { Origin: 'https://frontend.example.com' } });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('access-control-allow-origin'), 'https://frontend.example.com');
      assert.equal((await response.json()).games[0].id, 'fixture');
    }
    const image = await fetch(`${base}/api/nintendo/image?url=https://example.com/test.jpg`);
    const queued = await fetch(`${base}/api/ps5/refresh`, { method: 'POST' });
    assert.equal(queued.status, 202);
    assert.equal((await queued.json()).cached, true);
    const immediate = await fetch(`${base}/api/ps5/rankings?refresh=1`);
    assert.equal(immediate.status, 200);
    assert.equal((await immediate.json()).games[0].id, 'fixture');
    assert.equal(image.status, 400);
    const missingApi = await fetch(`${base}/api/does-not-exist`);
    assert.equal(missingApi.status, 404);
    assert.equal((await missingApi.json()).ok, false);
    const frontend = await fetch(`${base}/`);
    assert.equal(frontend.status, serveFrontend === '1' ? 200 : 404);
    if (serveFrontend === '1') assert.match(await frontend.text(), /GAME PULSE/i);
    const settings = await fetch(`${base}/api/settings`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshMinutes: 30 })
    });
    assert.equal(settings.status, 403);
    assert.equal((await fetch(`${base}/health`).then(response => response.json())).refreshMinutes, 60);
  });
}
