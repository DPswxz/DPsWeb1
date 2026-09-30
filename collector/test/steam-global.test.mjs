import assert from 'node:assert/strict';
import test from 'node:test';
import { parseGlobalChart } from '../src/steam-global.mjs';

test('parses global ranks and free games from Steam chart rows', () => {
  const html = `
    <table><tbody>
      <tr><th>Rank</th><th>Price</th></tr>
      <tr><td></td><td>1</td><td><a href="https://store.steampowered.com/app/730/CounterStrike_2"><img src="cover.jpg">Counter-Strike 2</a></td><td>Free To Play</td></tr>
      <tr><td></td><td>2</td><td><a href="https://store.steampowered.com/app/12345/Paid_Game"><img src="paid.jpg">Paid Game</a></td><td>¥4,980</td></tr>
    </tbody></table>`;
  assert.deepEqual(parseGlobalChart(html), [
    { id: '730', rank: 1, name: 'Counter-Strike 2', image: 'cover.jpg', url: 'https://store.steampowered.com/app/730/', isFree: true },
    { id: '12345', rank: 2, name: 'Paid Game', image: 'paid.jpg', url: 'https://store.steampowered.com/app/12345/', isFree: false }
  ]);
});
