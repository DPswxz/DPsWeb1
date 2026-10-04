import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
const source = await readFile(new URL('../../dist/app.js', import.meta.url), 'utf8');
const context = vm.createContext({});
vm.runInContext(source.slice(source.indexOf('const dailyHistoryCache'), source.indexOf('function renderMiniSparklineSvg')) + '\nthis.build = buildPriceChartModel; this.path = priceChartPath; this.snap = snapPriceChartPoint;', context);
test('图表按北京时间每天保留最后价格，缩略图和详情使用相同阶梯位置', () => {
  const model = context.build([
    { date: '2026-10-01T08:00:00Z', price: 298 },
    { date: '2026-10-01T10:00:00Z', price: 250 },
    { date: '2026-10-01T17:36:16Z', price: 89.4 }
  ], Date.parse('2026-10-02T04:00:00Z'));
  assert.equal(model.records.length, 2);
  assert.equal(model.records[0].price, 250);
  assert.equal(model.records[1].price, 89.4);
  const mini = context.path(model, 2, 70, 1, 15);
  const large = context.path(model, 12, 900, 18, 202);
  assert.ok(Math.abs((mini.x(model.records[1].time)-2)/68 - (large.x(model.records[1].time)-12)/888)<1e-12);
  assert.ok(mini.line.endsWith(' H 70'));
  assert.ok(large.line.endsWith(' H 900'));
  assert.equal(context.build([]), null);
});
test('6个月及12个月保留范围开始前的价格，全范围保留首次建档日期',()=>{
  const history=[{date:'2025-01-01T00:00:00Z',price:100},{date:'2026-07-01T00:00:00Z',price:50}];
  const now=Date.parse('2026-10-02T04:00:00Z');
  const six=context.build(history,now,6);
  assert.equal(six.first,Date.parse('2026-04-02T00:00:00+08:00'));
  assert.equal(six.records[0].price,100);
  assert.equal(six.records[0].time,six.first);
  assert.equal(context.build(history,now,12).first,Date.parse('2025-10-02T00:00:00+08:00'));
  assert.equal(context.build(history,now,0).first,Date.parse('2025-01-01T00:00:00+08:00'));
  assert.equal(context.build(history,now,6),six);
});
test('建档不足所选范围时，6个月12个月和全部均从建档日至今天',()=>{
  const history=[{date:'2026-10-01T08:00:00Z',price:298},{date:'2026-10-01T17:00:00Z',price:89.4}];
  for(const months of [6,12,0]){
    const model=context.build(history,Date.parse('2026-10-02T04:00:00Z'),months);
    assert.equal(model.first,Date.parse('2026-10-01T00:00:00+08:00'));
    assert.equal(model.end,Date.parse('2026-10-02T00:00:00+08:00'));
    assert.equal(context.snap(model,0.1).time,context.snap(model,0.4).time);
    assert.equal(context.snap(model,0.6).time,context.snap(model,1).time);
    assert.equal(context.snap(model,0.4).price,298);
    assert.equal(context.snap(model,0.6).price,89.4);
  }
});
test('每日吸附沿用最近历史价格，单日建档有有效路径',()=>{
  const model=context.build([{date:'2026-10-01T08:00:00Z',price:100}],Date.parse('2026-10-03T04:00:00Z'),6);
  assert.equal(context.snap(model,0.5).time,Date.parse('2026-10-02T00:00:00+08:00'));
  assert.equal(context.snap(model,0.5).price,100);
  const single=context.build([{date:'2026-10-03T08:00:00Z',price:100}],Date.parse('2026-10-03T10:00:00Z'),6);
  assert.equal(context.snap(single,1).time,single.first);
  assert.ok(!context.path(single,0,100,0,100).line.includes('NaN'));
});
