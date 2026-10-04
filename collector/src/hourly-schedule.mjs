const HOUR_MS = 60 * 60 * 1000;

// 北京时间为 UTC+8，整点与 UTC 的整小时边界一致。
export function nextHourlyRefresh(now = Date.now()) {
  return (Math.floor(now / HOUR_MS) + 1) * HOUR_MS;
}
