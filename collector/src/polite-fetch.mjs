import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 同一商店串行请求；港服、日服共享额度。冷却期落盘，重启不会立即重试。
export function createPoliteFetch({ gapMs = 2000, fetchImpl = (...args) => fetch(...args),
  now = Date.now, sleep = delay, stateFile } = {}) {
  const queues = new Map();
  let state = {};
  const ready = stateFile ? readFile(stateFile, 'utf8').then(text => { state = JSON.parse(text); }).catch(() => {}) : Promise.resolve();
  let saving = Promise.resolve();
  function save() {
    if (!stateFile) return;
    const text = JSON.stringify(state);
    saving = saving.catch(() => {}).then(async () => {
      await mkdir(path.dirname(stateFile), { recursive: true });
      await writeFile(stateFile, text);
    });
    return saving;
  }
  return async function politeFetch(url, options = {}) {
    const host = new URL(url).hostname;
    const key = host.endsWith('playstation.com') ? 'playstation' : host;
    const previous = queues.get(key) || Promise.resolve();
    const task = previous.catch(() => {}).then(async () => {
      await ready;
      const entry = state[key] ||= { nextAt: 0, until: 0, failures: 0 };
      options.signal?.throwIfAborted();
      if (entry.until > now()) {
        if(entry.failures>0)throw new Error(`商店请求暂停至 ${new Date(entry.until).toISOString()}，继续使用缓存`);
        // A short network timeout pauses the queue; it must not fail every later SKU.
        await sleep(entry.until-now(),undefined,{signal:options.signal});
        options.signal?.throwIfAborted();
      }
      const wait = Math.max(0, entry.nextAt - now());
      if (wait) await sleep(wait, undefined, { signal: options.signal });
      const timeoutSignal = AbortSignal.timeout(15000);
      const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal;
      try {
        const response = await fetchImpl(url, { ...options, signal });
        if ([403, 429, 503].includes(response.status)) {
          entry.failures++;
          const retry = response.headers?.get('retry-after');
          const seconds = retry && /^\d+$/.test(retry) ? Number(retry) * 1000 : Date.parse(retry) - now();
          entry.until = now() + Math.max(Number.isFinite(seconds) ? seconds : 0,
            Math.min(6 * 60 * 60 * 1000, 60 * 60 * 1000 * 2 ** Math.min(3, entry.failures - 1)));
          await response.body?.cancel().catch(() => {});
          await save();
          throw new Error(`商店返回 HTTP ${response.status}，已暂停请求并保留缓存`);
        }
        // 读取完响应体再释放队列，避免多个下载同时进行。
        if (response.ok && typeof response.text === 'function') {
          const body = await response.text();
          entry.failures = 0;
          return new Response(body, { status: response.status, headers: response.headers });
        }
        return response;
      } catch (error) {
        if (entry.until <= now() && !options.signal?.aborted) {
          entry.until = now() + 60_000;
          await save();
        }
        throw error;
      } finally {
        entry.nextAt = now() + gapMs;
      }
    });
    queues.set(key, task);
    if (!options.signal) return task;
    // 总采集超时不应等到前面的另一地区请求结束才生效。
    return new Promise((resolve, reject) => {
      const abort = () => reject(options.signal.reason);
      options.signal.addEventListener('abort', abort, { once: true });
      if (options.signal.aborted) abort();
      task.then(resolve, reject).finally(() => options.signal.removeEventListener('abort', abort));
    });
  };
}

export const storeFetch = createPoliteFetch({ stateFile: fileURLToPath(new URL('../data/request-backoff.json', import.meta.url)) });
