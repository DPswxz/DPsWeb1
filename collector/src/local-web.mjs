// 保留旧本机地址和临时隧道，数据统一使用 Docker 收集器，避免重复采集及翻译。
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
const app = express();
const configuration = await readFile(new URL('../../.env', import.meta.url), 'utf8').catch(() => '');
const webPort = configuration.match(/^WEB_PORT=(\d+)\s*$/m)?.[1] || '8080';
const upstream = `http://127.0.0.1:${webPort}`;
app.use(['/api', '/health'], async (request, response) => {
  if (request.method !== 'GET') return response.status(405).json({ ok: false, error: '仅允许读取接口' });
  try {
    const result = await fetch(`${upstream}${request.originalUrl}`, {
      headers: request.headers['if-none-match'] ? {'If-None-Match':request.headers['if-none-match']} : {},
      signal: AbortSignal.timeout(120000) });
    for (const name of ['content-type', 'cache-control', 'etag']) if (result.headers.has(name)) response.set(name, result.headers.get(name));
    response.status(result.status).send(Buffer.from(await result.arrayBuffer()));
  } catch { response.status(502).json({ ok: false, error: 'Docker 收集器暂时不可用' }); }
});
app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist'), { etag: false, maxAge: 0 }));
app.listen(Number(process.env.PORT || 8787), process.env.HOST || '0.0.0.0', () => console.log('Game Pulse local frontend using Docker collector'));
