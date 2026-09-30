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
  test(`部署模式 SERVE_FRONTEND=${serveFrontend} 可读取全部缓存与持久化图片`, { timeout: 30_000 }, async (t) => {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'game-pulse-deploy-'));
    const imageDirectory = path.join(directory, 'assets');
    await mkdir(imageDirectory);
    await writeFile(path.join(imageDirectory, 'fixture.jpg'), 'persistent-image');
    const cached = {
      count: 1, updatedAt: new Date().toISOString(), stale: false,
      games: [{ id: 'fixture', name: '测试游戏', image: 'assets/nintendo-hk/fixture.jpg' }]
    };
    const nintendoCache = Object.fromEntries(['switch1', 'switch2', 'switch1_hk', 'switch2_hk'].map(key => [key, cached]));
    const cacheVariables = ['CACHE_FILE', 'PS5_CACHE_FILE', 'PS5_JP_CACHE_FILE', 'PS5_JP_LANG_CACHE_FILE', 'STEAM_CACHE_FILE', 'STEAM_GLOBAL_CACHE_FILE'];
    const environment = { ...process.env, HOST: '127.0.0.1', PORT: '0', SERVE_FRONTEND: serveFrontend,
      NINTENDO_IMAGE_DIR: imageDirectory, COLLECT_ON_START: '0', ALLOWED_ORIGINS: 'https://frontend.example.com' };
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
    assert.equal(Object.keys(health.platforms).length, 8);
    for (const status of Object.values(health.platforms)) assert.equal(status.count, 1);
    for (const endpoint of ['/api/nintendo/rankings?platform=switch1_hk', '/api/ps5/rankings', '/api/ps5-jp/rankings', '/api/steam/rankings', '/api/steam-global/rankings']) {
      const response = await fetch(`${base}${endpoint}`, { headers: { Origin: 'https://frontend.example.com' } });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('access-control-allow-origin'), 'https://frontend.example.com');
      assert.equal((await response.json()).games[0].id, 'fixture');
    }
    const image = await fetch(`${base}/assets/nintendo-hk/fixture.jpg`);
    assert.equal(image.status, 200);
    assert.equal(await image.text(), 'persistent-image');
    assert.equal(await readFile(path.join(imageDirectory, 'fixture.jpg'), 'utf8'), 'persistent-image');
    const missingApi = await fetch(`${base}/api/does-not-exist`);
    assert.equal(missingApi.status, 404);
    assert.equal((await missingApi.json()).ok, false);
    const frontend = await fetch(`${base}/`);
    assert.equal(frontend.status, serveFrontend === '1' ? 200 : 404);
    if (serveFrontend === '1') assert.match(await frontend.text(), /GAME PULSE/i);
    const settings = await fetch(`${base}/api/settings`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshMinutes: 30 })
    });
    assert.equal((await settings.json()).refreshMinutes, 30);
    assert.equal((await fetch(`${base}/health`).then(response => response.json())).refreshMinutes, 30);
  });
}
