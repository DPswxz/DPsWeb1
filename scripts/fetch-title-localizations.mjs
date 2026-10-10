// 只核对官方商品资料，不调用翻译 API，也不改动价格或排名。
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {extractPsProductNames} from '../collector/src/ps5.mjs';
const root=new URL('../',import.meta.url),file=new URL('collector/title-official-localizations.json',root);
const db=new DatabaseSync(new URL('deploy/data/price-history.sqlite',root).pathname.replace(/^\/([A-Za-z]:)/,'$1'),{readOnly:true});
const games=db.prepare("SELECT platform,data FROM game_catalog WHERE COALESCE(json_extract(data,'$.metadataMissing'),0)=0").all().map(r=>({...JSON.parse(r.data),region:r.platform}));db.close();
let records=[];try{records=JSON.parse(fs.readFileSync(file,'utf8'));}catch{}
const saved=new Map(records.map(r=>[r.region+':'+r.id,r]));
const statusFile=new URL('collector/title-localization-status.json',root);
let checked={};try{checked=JSON.parse(fs.readFileSync(statusFile,'utf8'));}catch{}
// 最多四个页面处理中；请求开始仍相隔两秒，慢响应不会阻塞其他页面解析。
const gates=new Map(),starts=new Map();
async function request(url,options){
 const host=new URL(url).hostname;
 const turn=(gates.get(host)||Promise.resolve()).then(async()=>{
  const delay=Math.max(0,2000-(Date.now()-(starts.get(host)||0)));if(delay)await new Promise(r=>setTimeout(r,delay));starts.set(host,Date.now());
 });gates.set(host,turn.catch(()=>{}));await turn;
 return fetch(url,{...options,headers:{'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36','accept-language':'zh-CN,zh;q=0.9',...options.headers}});
}
let saving=Promise.resolve();
async function replaceFile(target,content){
 const temporary=new URL(target.href+'.tmp');
 for(let attempt=0;;attempt++){
  try{await fs.promises.writeFile(temporary,content);await fs.promises.rename(temporary,target);return;}
  catch(error){if(attempt>=5)throw error;await new Promise(resolve=>setTimeout(resolve,100*2**attempt));}
 }
}
function save(){
 const metadata=JSON.stringify([...saved.values()],null,2)+'\n',status=JSON.stringify(checked,null,2)+'\n';
 saving=saving.then(async()=>{await replaceFile(file,metadata);await replaceFile(statusFile,status);});return saving;
}
async function ps(){
 const concepts=new Map();for(const g of games.filter(g=>g.region==='ps5_hk'&&/^\d+$/.test(g.conceptId||''))){if(!concepts.has(g.conceptId))concepts.set(g.conceptId,[]);concepts.get(g.conceptId).push(g);}
 let done=0,found=0,paused=false;const jobs=[...concepts];
 async function worker(){while(jobs.length&&!paused){const [id,items]=jobs.shift();
  if(checked[id]?.version===2&&Date.now()-Date.parse(checked[id].checkedAt)<86400000){done++;continue;}
  const url=`https://store.playstation.com/zh-hans-hk/concept/${id}`;
  try{const r=await request(url,{signal:AbortSignal.timeout(15000)});if([403,429].includes(r.status)){console.log('PS paused',r.status);paused=true;break;}const names=r.ok?extractPsProductNames(await r.text()):new Map();
   for(const g of items){const name=names.get(g.id);if(!name)continue;saved.set(g.region+':'+g.id,{region:g.region,id:g.id,conceptId:id,original:g.name,name,source:url,checkedAt:new Date().toISOString()});found++;}
   checked[id]={version:2,checkedAt:new Date().toISOString(),status:r.status,found:names.size,source:url};
  }catch(e){console.log('PS lookup failed',id,e.message);}
  done++;await save();if(done%20===0)console.log('PS titles',done,'/',concepts.size,'SKU names',found);
 }}await Promise.all(Array.from({length:4},worker));console.log('PS complete',{done,total:concepts.size,found});await save();
}
async function steam(){
 const items=[...new Map(games.filter(g=>g.region.startsWith('steam')).map(g=>[g.id,g])).values()];let done=0;
 for(const g of items){
  if(saved.has('steam:'+g.id))continue;
  // 已有同一 Steam ID 的简体官方原名直接复用。
  const local=games.find(other=>other.region==='steam'&&other.id===g.id&&/\p{Script=Han}/u.test(other.name));
  if(local){saved.set('steam:'+g.id,{region:'steam',id:g.id,name:local.name,source:local.url,checkedAt:new Date().toISOString()});continue;}
  const url=`https://store.steampowered.com/api/appdetails?appids=${g.id}&l=schinese&cc=cn&filters=basic`;
  try{const r=await request(url,{signal:AbortSignal.timeout(15000)});if([403,429].includes(r.status)){console.log('Steam paused',r.status);break;}if(!r.ok)continue;const item=(await r.json())[g.id];if(item?.success&&item.data?.name)saved.set('steam:'+g.id,{region:'steam',id:g.id,name:item.data.name,source:`https://store.steampowered.com/app/${g.id}/?l=schinese`,checkedAt:new Date().toISOString()});}catch(e){console.log('Steam lookup failed',g.id,e.message);}done++;await save();if(done%20===0)console.log('Steam titles fetched',done);
 }console.log('Steam complete',{fetched:done,total:items.length});await save();
}
await Promise.all([ps(),steam()]);await save();console.log('Official metadata total',saved.size);
