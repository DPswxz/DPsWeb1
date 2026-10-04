import { readFile, writeFile, rename } from 'node:fs/promises';

export class BackgroundRefresh {
  constructor({ intervalMs = 60 * 60 * 1000, now = Date.now, stateFile } = {}) {
    this.intervalMs = intervalMs;
    this.now = now;
    this.tasks = new Map();
    this.lastAttempts = new Map();
    this.records = new Map();
    this.stateFile = stateFile;
    this.pendingSave = Promise.resolve();
  }
  async init() {
    if (!this.stateFile) return;
    try {
      this.records = new Map(Object.entries(JSON.parse(await readFile(this.stateFile, 'utf8'))));
      for (const record of this.records.values()) {
        if (!record.completedAt) {
          record.interrupted = true;
          record.lastError = '后台采集因服务重启中断，本次未完成';
        }
      }
      await this.save();
    } catch {}
  }
  save() {
    if (!this.stateFile) return Promise.resolve();
    this.pendingSave = this.pendingSave.catch(() => {}).then(async () => {
      await writeFile(`${this.stateFile}.tmp`, JSON.stringify(Object.fromEntries(this.records)), 'utf8');
      await rename(`${this.stateFile}.tmp`, this.stateFile);
    }).catch(error => console.error(`刷新状态保存失败：${error.message}`));
    return this.pendingSave;
  }
  status(key, data) {
    const record = this.records.get(key);
    const refreshing = this.tasks.has(key);
    const missed = record && Date.parse(data?.updatedAt || '') < Date.parse(record.lastAttemptAt);
    const interrupted = record?.interrupted && (missed || !data);
    const workError = record?.interrupted ? null : record?.lastError;
    const partial = !refreshing && !missed && !workError && !interrupted && Boolean(data?.stale && data?.lastError);
    const failed = !refreshing && !partial && Boolean(workError || data?.stale && data?.lastError || missed || record && !data);
    return {
      count: data?.count || 0, updatedAt: data?.updatedAt || null,
      stale: failed || partial || (data?.stale ?? true),
      lastAttemptAt: record?.lastAttemptAt || null,
      refreshState: refreshing ? 'refreshing' : interrupted ? 'interrupted' : partial ? 'partial' : failed ? 'failed' : data ? 'success' : 'missing',
      lastError: interrupted ? record.lastError : failed || partial ? (workError || data?.lastError || '本次未取得新数据') : null
    };
  }
  start(key, work, { scheduled = false } = {}) {
    if (this.tasks.has(key)) return false;
    if (!scheduled && this.now() - (this.lastAttempts.get(key) ?? -Infinity) < this.intervalMs) return false;
    this.lastAttempts.set(key, this.now());
    const record = { lastAttemptAt: new Date(this.now()).toISOString(), lastError: null };
    this.records.set(key, record);
    this.save();
    const task = Promise.resolve().then(work).catch(error => {
      record.lastError = error.message;
      console.error(`${key} 后台更新失败，继续使用缓存：${error.message}`);
    }).finally(async () => {
      this.tasks.delete(key);
      record.completedAt = new Date(this.now()).toISOString();
      await this.save();
    });
    this.tasks.set(key, task);
    return true;
  }
}
