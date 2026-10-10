import {readFile,writeFile,rename} from 'node:fs/promises';import {DatabaseSync} from 'node:sqlite';import {storeFetch} from '../collector/src/polite-fetch.mjs';
const source=await readFile(new URL('../collector/src/ps5.mjs',import.meta.url),'utf8');
const constant=name=>source.match(new RegExp('const '+name+" = '([^']+)';"))[1];
const dataRoot=new URL(process.env.CANDIDATE_DATA_DIR||'../deploy/data/',import.meta.url);
const db=new DatabaseSync(new URL('price-history.sqlite',dataRoot).pathname.replace(/^\/([A-Za-z]:)/,'$1'),{readOnly:true});
for(const region of ['hk','jp']){
 const file=new URL((region==='hk'?'ps5':'ps5-jp')+'-cache.json',dataRoot),cache=JSON.parse(await readFile(file,'utf8'));
 const variables={id:constant('DEFAULT_CATEGORY_ID'),pageArgs:{size:100,offset:200},sortBy:null,filterBy:[],facetOptions:[]};
 const url=constant('DEFAULT_GRAPHQL_ENDPOINT')+'?operationName=categoryGridRetrieve&variables='+encodeURIComponent(JSON.stringify(variables))+'&extensions='+encodeURIComponent(JSON.stringify({persistedQuery:{version:1,sha256Hash:constant('DEFAULT_SHA256')}}));
 const response=await storeFetch(url,{headers:{'x-psn-store-locale-override':region==='hk'?'zh-Hans-HK':'ja-JP','x-apollo-operation-name':'categoryGridRetrieve'},signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('Official PS ranking '+response.status);
 const payload=await response.json(),concepts=payload.data?.categoryGridRetrieve?.concepts;if(!concepts?.length)throw Error('No official candidates');
 const ids=new Set(cache.games.map(g=>g.id));let added=0;
 const lookup=db.prepare('SELECT c.data,p.price,p.old,p.time FROM games g JOIN game_catalog c ON c.game=g.id JOIN prices p ON p.game=g.id WHERE g.key=? ORDER BY p.time DESC LIMIT 1');
 for(const [index,concept] of concepts.entries())for(const sku of concept.products||[]){
  if(ids.has(sku.id))continue;const row=lookup.get('ps5_'+region+':'+sku.id);if(!row||row.price<=0)continue;
  const old=JSON.parse(row.data),price=row.price/100,original=row.old===null?null:row.old/100;
  cache.games.push({...old,id:sku.id,conceptId:String(concept.id),rank:201+index,price,old:original,discount:original>price?Math.round((1-price/original)*100):0,priceUpdatedAt:new Date(row.time).toISOString(),verified:true,priceStale:true,priceAvailable:true});ids.add(sku.id);added++;
 }
 cache.count=cache.games.length;cache.stale=true;cache.lastError='新增候选商品沿用历史验证价格，等待后台校验';
 await writeFile(new URL(file.href+'.tmp'),JSON.stringify(cache,null,2)+'\n');await rename(new URL(file.href+'.tmp'),file);console.log(region,{officialCandidates:concepts.length,added,total:cache.count});
}
db.close();
