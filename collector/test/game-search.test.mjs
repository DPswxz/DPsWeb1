import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../../dist/app.js', import.meta.url), 'utf8');
const start = source.indexOf('function normalizeSearchText(');
const end = source.indexOf('function currentData()', start);
const scope = {chineseTitleMap:{'Hades II':'哈迪斯 II','メタファー：リファンタジオ':'暗喻幻想',"Baldur's Gate 3":'博德之门3'}};
vm.runInNewContext(`${source.slice(start,end)};this.matches=matchesGameSearch`,scope);

test('原名和译名均可搜索，忽略大小写、全角、商标、空格及标点',()=>{
  const game={name:'SEKIRO™： SHADOWS DIE TWICE',cn:'只狼 影逝二度'};
  for(const query of ['sekiro','SEKIRO: shadows die twice','ＳＥＫＩＲＯ','只狼','只狼影逝二度'])
    assert.equal(scope.matches(game,query),true,query);
  assert.equal(scope.matches(game,'虚构世界'),false);
});
test('最新译名和日文原名可匹配，版本中也同时查找原名及译名',()=>{
  assert.equal(scope.matches({name:'博德之门3',cn:'博德之门3'},"baldur's gate 3"),true);
  assert.equal(scope.matches({name:'Hades II',cn:'Hades II'},'哈迪斯II'),true);
  const game={name:'メタファー：リファンタジオ',cn:'暗喻幻想',editions:[{name:'Metaphor: ReFantazio',cn:'暗喻幻想 豪华版'}]};
  for(const query of ['リファンタジオ','暗喻幻想','metaphor refantazio','暗喻幻想豪华版'])
    assert.equal(scope.matches(game,query),true,query);
});
