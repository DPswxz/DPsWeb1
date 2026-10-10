import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
const root = new URL('../dist/', import.meta.url);
const hash = createHash('sha256');
const htmlFile = new URL('index.html', root);
const normalizedHtml = (await readFile(htmlFile, 'utf8'))
  .replace(/\?v=[^"']+/g, '?v=BUILD')
  .replace(/\s*<meta name="game-pulse-version" content="[^"]*"\s*\/>/g, '');
for (const file of ['index.html', 'app.js', 'archive.js', 'styles.css', 'config.js', 'update-client.js', 'cover-cache.js', 'nintendo-data.js', 'ps5-data.js', 'ps5-jp-data.js', 'steam-data.js', 'steam-global-data.js']) {
  hash.update(file).update(file === 'index.html' ? normalizedHtml : await readFile(new URL(file, root)));
}
const backend = new URL('../collector/src/', import.meta.url);
for (const file of (await readdir(backend)).filter(file => file.endsWith('.mjs')).sort()) {
  hash.update(file).update(await readFile(new URL(file, backend)));
}
const version = hash.digest('hex').slice(0, 20);
await writeFile(htmlFile, normalizedHtml.replace(/\?v=BUILD/g, `?v=${version}`)
  .replace('<head>', `<head>\n  <meta name="game-pulse-version" content="${version}" />`));
await writeFile(new URL('version.json', root), JSON.stringify({ version }) + '\n');
console.log(`网站版本：${version}`);
