(() => {
  if (!location.protocol.startsWith('http')) return;
  let loadedVersion = document.querySelector('meta[name="game-pulse-version"]')?.content || null;
  let checking = false;
  async function checkVersion() {
    if (checking || document.hidden) return;
    checking = true;
    try {
      const response = await fetch(`version.json?t=${Date.now()}`, {
        cache: 'no-store', signal: AbortSignal.timeout(10000)
      });
      if (!response.ok) return;
      const { version } = await response.json();
      if (typeof version !== 'string' || !version) return;
      if (loadedVersion && loadedVersion !== version) {
        const target = new URL(location.href);
        target.searchParams.set('v', version);
        location.replace(target.href);
        return;
      }
      loadedVersion = version;
    } catch {
      // 部署或网络恢复后继续检查。
    } finally {
      checking = false;
    }
  }
  checkVersion();
  setInterval(checkVersion, 15000);
  document.addEventListener('visibilitychange', checkVersion);
})();
