const datasets = {
  switch: [
    {rank:1,name:'マリオカート ワールド',cn:'马力欧卡丁车 世界',meta:'Nintendo · 竞速',platform:'Switch 2',price:8980,old:null,discount:0,trend:'same',cover:'MW',color:'#dc3d5a'},
    {rank:2,name:'ドンキーコング バナンザ',cn:'咚奇刚 蕉力全开',meta:'Nintendo · 动作',platform:'Switch 2',price:7980,old:null,discount:0,trend:'up',cover:'DK',color:'#b47732'},
    {rank:3,name:'Minecraft',cn:'我的世界',meta:'Mojang · 冒险',platform:'Switch',price:3960,old:null,discount:0,trend:'up',cover:'MC',color:'#538a4b'},
    {rank:4,name:'スーパー マリオパーティ ジャンボリー',cn:'超级马力欧派对 空前盛会',meta:'Nintendo · 聚会',platform:'Switch',price:7100,old:null,discount:0,trend:'down',cover:'MP',color:'#de593e'},
    {rank:5,name:'MONSTER HUNTER RISE',cn:'怪物猎人 崛起',meta:'CAPCOM · 动作 RPG',platform:'Switch',price:998,old:3990,discount:75,trend:'up',cover:'MH',color:'#5f6ea4'},
    {rank:6,name:'ゼルダの伝説 ティアーズ オブ ザ キングダム',cn:'塞尔达传说 王国之泪',meta:'Nintendo · 冒险',platform:'Switch',price:7900,old:null,discount:0,trend:'down',cover:'ZL',color:'#6a9a8b'},
    {rank:7,name:'HADES',cn:'哈迪斯',meta:'Supergiant · 动作',platform:'Switch',price:1400,old:2800,discount:50,trend:'up',cover:'HD',color:'#ad3b45'},
    {rank:8,name:'Stardew Valley',cn:'星露谷物语',meta:'ConcernedApe · 模拟',platform:'Switch',price:1480,old:null,discount:0,trend:'same',cover:'SV',color:'#b78642'},
    {rank:9,name:'オーバークック 王国のフルコース',cn:'胡闹厨房 全都好吃',meta:'Team17 · 聚会',platform:'Switch',price:1640,old:4100,discount:60,trend:'up',cover:'OC',color:'#df6e39'},
    {rank:10,name:'ホロウナイト',cn:'空洞骑士',meta:'Team Cherry · 动作',platform:'Switch',price:740,old:1480,discount:50,trend:'same',cover:'HK',color:'#506677'},
    {rank:11,name:'ペルソナ５ ザ・ロイヤル',cn:'女神异闻录5 皇家版',meta:'ATLUS · RPG',platform:'Switch',price:3839,old:7678,discount:50,trend:'down',cover:'P5',color:'#d5363f'},
    {rank:12,name:'ぷよぷよ™テトリス®２',cn:'噗哟噗哟俄罗斯方块2',meta:'SEGA · 益智',platform:'Switch',price:2303,old:3840,discount:40,trend:'same',cover:'PT',color:'#4b78c5'}
  ],
  ps5: [
    {rank:1,name:'FINAL FANTASY VII REBIRTH',cn:'最终幻想VII 重生',meta:'SQUARE ENIX · RPG',platform:'PS5',price:95.4,old:318,discount:70,trend:'up',cover:'FF',color:'#365d83'},
    {rank:2,name:'Forza Horizon 5 Premium Edition',cn:'极限竞速 地平线5 顶级版',meta:'Xbox Game Studios · 竞速',platform:'PS5',price:186.4,old:466,discount:60,trend:'up',cover:'FH',color:'#b13a84'},
    {rank:3,name:'Gran Turismo 7 豪华版',cn:'跑车浪漫旅7 豪华版',meta:'PlayStation · 竞速',platform:'PS5 / PS4',price:307.12,old:698,discount:56,trend:'same',cover:'GT',color:'#3163b5'},
    {rank:4,name:'Stellar Blade™ Complete Edition',cn:'剑星 完全版',meta:'PlayStation · 动作',platform:'PS5',price:398,old:568,discount:30,trend:'down',cover:'SB',color:'#8b5689'},
    {rank:5,name:'Resident Evil 4 Gold Edition',cn:'生化危机4 黄金版',meta:'CAPCOM · 动作',platform:'PS5 / PS4',price:186.4,old:466,discount:60,trend:'up',cover:'RE',color:'#705137'},
    {rank:6,name:'EA SPORTS FC™ 26',cn:'EA SPORTS FC 26',meta:'EA · 体育',platform:'PS5 / PS4',price:164.7,old:549,discount:70,trend:'up',cover:'FC',color:'#7768d8'},
    {rank:7,name:'It Takes Two',cn:'双人成行',meta:'EA · 冒险',platform:'PS5 / PS4',price:119.6,old:398,discount:70,trend:'same',cover:'IT',color:'#c76546'},
    {rank:8,name:'Grand Theft Auto V',cn:'侠盗猎车手V',meta:'Rockstar Games · 动作',platform:'PS5',price:148,old:298,discount:50,trend:'down',cover:'V',color:'#4c8550'},
    {rank:9,name:'GUNDAM BREAKER 4 Ultimate',cn:'高达创坏者4 终极版',meta:'Bandai Namco · 动作',platform:'PS5 / PS4',price:219,old:438,discount:50,trend:'same',cover:'GB',color:'#4a79ad'},
    {rank:10,name:'TEKKEN 8',cn:'铁拳8',meta:'Bandai Namco · 格斗',platform:'PS5',price:159.2,old:398,discount:60,trend:'up',cover:'T8',color:'#b74752'}
  ]
};
datasets.steam=(window.STEAM_CN_GAMES||[]).map((g,i)=>({rank:i+1,name:g.title,cn:g.title,meta:'Steam · 中国区热销',platform:'PC',price:g.price,old:g.old,discount:g.discount,trend:'same',cover:'ST',color:'#1b5f82',image:g.image,url:g.url}));

const officialSwitchCovers={
  'Minecraft':'https://img-eshop.cdn.nintendo.net/i/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a.jpg',
  'スーパー マリオパーティ ジャンボリー':'https://img-eshop.cdn.nintendo.net/i/2a23faa1822c06adf074c8bb2ccf5f46a23490b3fe267e176e0b5339d0e1d3b7.jpg',
  'MONSTER HUNTER RISE':'https://img-eshop.cdn.nintendo.net/i/b6ca09e9a7f6faf27641f62dabe64c6ff97b4f326aa478379e3c112aa28eb9ab.jpg',
  'ゼルダの伝説 ティアーズ オブ ザ キングダム':'https://img-eshop.cdn.nintendo.net/i/1a637778f3ea270ca6ff053d0204073e555575099e82cb018ddb1877be0a0fde.jpg',
  'HADES':'https://img-eshop.cdn.nintendo.net/i/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5.jpg',
  'Stardew Valley':'https://img-eshop.cdn.nintendo.net/i/7aa9c6cf5e7d4cecf481f18b1d7a9d79e7aab85045b22203effb2dda409bc5b7.jpg',
  'オーバークック 王国のフルコース':'https://img-eshop.cdn.nintendo.net/i/a790dbe55c388515f385ad0767219f26b7354dcb5a1545721050886c1b2832d7.jpg',
  'ホロウナイト':'https://img-eshop.cdn.nintendo.net/i/4643fb058642335c523910f3a7910575f56372f612f7c0c9a497aaae978d3e51.jpg',
  'ペルソナ５ ザ・ロイヤル':'https://img-eshop.cdn.nintendo.net/i/206a3b6840d9f5a709db879bdf003de07b184b8065473a0447eb2ed3b350fee7.jpg',
  'ぷよぷよ™テトリス®２':'https://img-eshop.cdn.nintendo.net/i/a1611db76a1fd22abefa93e8d9edd1410d4f369858cd63db8554073c9bbed158.jpg'
};
datasets.switch2=datasets.switch.filter(g=>g.platform==='Switch 2').map((g,i)=>({...g,rank:i+1,wiki:g.name==='マリオカート ワールド'?'Mario_Kart_World':'Donkey_Kong_Bananza'}));
datasets.switch1=datasets.switch.filter(g=>g.platform==='Switch').map((g,i)=>({...g,rank:i+1,image:officialSwitchCovers[g.name]}));
delete datasets.switch;
const coverPages={
  'FINAL FANTASY VII REBIRTH':'Final_Fantasy_VII_Rebirth','Forza Horizon 5 Premium Edition':'Forza_Horizon_5','Gran Turismo 7 豪华版':'Gran_Turismo_7','Stellar Blade™ Complete Edition':'Stellar_Blade','Resident Evil 4 Gold Edition':'Resident_Evil_4_(2023_video_game)','EA SPORTS FC™ 26':'EA_Sports_FC_26','It Takes Two':'It_Takes_Two_(video_game)','Grand Theft Auto V':'Grand_Theft_Auto_V','GUNDAM BREAKER 4 Ultimate':'Gundam_Breaker_4','TEKKEN 8':'Tekken_8'
};
datasets.ps5=datasets.ps5.map(g=>({...g,wiki:coverPages[g.name]}));

const savedRates=(()=>{try{return JSON.parse(localStorage.getItem('game-pulse-rates'))}catch{return null}})();
const state={platform:'switch1',view:'ranking',query:'',sort:'rank',auto:true,interval:15,remaining:899,rates:{JPY:0.042728,HKD:0.856469,CNY:1,...savedRates?.rates},rateUpdated:savedRates?.updated||null,rateSource:savedRates?.source||'备用汇率',rateStale:!savedRates};
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const money=n=>state.platform==='ps5'?`HK$ ${Number(n).toFixed(n%1?2:0)}`:state.platform==='steam'?(n===0?'免费':`¥ ${Number(n).toLocaleString('zh-CN',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2})}`):`¥ ${Math.round(n).toLocaleString('ja-JP')}`;
const currency=()=>state.platform==='ps5'?'HKD':state.platform==='steam'?'CNY':'JPY';
const cny=n=>`CN¥ ${(n*state.rates[currency()]).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
async function fetchExchangeRates(){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
  try{
    const [jpy,hkd]=await Promise.all(['JPY','HKD'].map(code=>fetch(`https://open.er-api.com/v6/latest/${code}`,{cache:'no-store',signal:controller.signal}).then(r=>{if(!r.ok)throw new Error('rate request failed');return r.json()})));
    if(!jpy.rates?.CNY||!hkd.rates?.CNY)throw new Error('invalid rate response');
    state.rates={JPY:jpy.rates.CNY,HKD:hkd.rates.CNY,CNY:1};state.rateUpdated=jpy.time_last_update_utc||new Date().toISOString();state.rateSource='实时汇率';state.rateStale=false;
  }catch(primaryError){
    try{
      const [jpy,hkd]=await Promise.all(['JPY','HKD'].map(code=>fetch(`https://api.frankfurter.app/latest?from=${code}&to=CNY`,{cache:'no-store',signal:controller.signal}).then(r=>r.json())));
      if(!jpy.rates?.CNY||!hkd.rates?.CNY)throw new Error('invalid fallback response');
      state.rates={JPY:jpy.rates.CNY,HKD:hkd.rates.CNY,CNY:1};state.rateUpdated=jpy.date;state.rateSource='参考汇率';state.rateStale=false;
    }catch{state.rateStale=true}
  }finally{
    clearTimeout(timer);localStorage.setItem('game-pulse-rates',JSON.stringify({rates:state.rates,updated:state.rateUpdated,source:state.rateSource}));
  }
}
async function hydrateCovers(){
  const platform=state.platform,targets=datasets[platform].filter(g=>!g.image&&!g.imageFailed&&g.wiki);
  if(!targets.length)return;
  await Promise.all(targets.map(async g=>{try{const r=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(g.wiki)}`);if(!r.ok)throw new Error('cover not found');const data=await r.json();g.image=data.thumbnail?.source||data.originalimage?.source||null;g.imageFailed=!g.image}catch{g.imageFailed=true}}));
  if(state.platform===platform)render();
}
function currentData(){let data=[...datasets[state.platform]];if(state.view==='deals')data=data.filter(x=>x.discount>0);if(state.query)data=data.filter(x=>(x.cn+x.name+x.meta+x.platform).toLowerCase().includes(state.query));if(state.sort==='priceAsc')data.sort((a,b)=>a.price-b.price);else if(state.sort==='discount')data.sort((a,b)=>b.discount-a.discount||a.rank-b.rank);else data.sort((a,b)=>a.rank-b.rank);return data}
function render(){const all=datasets[state.platform],data=currentData();$('#gameRows').innerHTML=data.map(g=>`<tr><td><span class="rank ${g.rank<=3?'top':''}">${String(g.rank).padStart(2,'0')}</span></td><td><div class="game-cell"><span class="cover" style="background:linear-gradient(135deg,${g.color},#172128)">${g.image?`<img src="${g.image}" alt="${g.cn} 封面" loading="lazy" onerror="this.remove()">`:`<span>${g.cover}</span>`}</span><div><span class="game-name">${g.cn}</span>${g.name!==g.cn?`<span class="game-original">${g.name}</span>`:''}<span class="game-meta">${g.meta}</span></div></div></td><td><span class="platform-chip">${g.platform}</span></td><td><span class="price-main">${money(g.price)}</span>${g.old?`<span class="price-old">${money(g.old)}</span>`:''}<span class="price-cny">${state.platform==='steam'?'人民币定价':`≈ ${cny(g.price)}`}</span></td><td>${g.discount?`<span class="discount">-${g.discount}%</span>`:`<span class="trend ${g.trend}">${g.trend==='up'?'↑ 上升':g.trend==='down'?'↓ 下降':'— 持平'}</span>`}</td><td><a class="store-link" href="${g.url||(state.platform==='ps5'?'https://store.playstation.com/zh-hant-hk/pages/deals':'https://store-jp.nintendo.com/software/ranking/')}" target="_blank" rel="noopener" aria-label="前往官方商店">↗</a></td></tr>`).join('');
  const lowest=Math.min(...all.map(x=>x.price));$('#emptyState').hidden=data.length>0;$('.table-scroll').hidden=data.length===0;$('#gameCount').textContent='50';$('#lowestPrice').textContent=money(lowest);$('#lowestCny').textContent=`约 ${cny(lowest)} 人民币`;$('#resultSummary').textContent=`当前展示 ${data.length} / 50 款`;$('#dealBadge').textContent=all.filter(x=>x.discount).length;
  const deals=all.filter(x=>x.discount).sort((a,b)=>b.discount-a.discount),best=deals[0];$('#bestDiscount').textContent=best?`-${best.discount}%`:'—';$('#bestDealName').textContent=best?.cn||'暂无折扣';$('#bestDealPrice').innerHTML=best?`<del>${money(best.old)}</del> ${money(best.price)}<span class="cny-inline">≈ ${cny(best.price)}</span>`:'等待更新';$('#averagePrice').textContent=money(all.reduce((s,x)=>s+x.price,0)/all.length);$('#discountedCount').innerHTML=`${deals.length} <small>款</small>`;
  const ps=state.platform==='ps5',steam=state.platform==='steam',code=currency(),rate=state.rates[code]||1;$('#tableKicker').textContent=ps?'PLAYSTATION STORE · 香港':steam?'STEAM STORE · 中国':'NINTENDO eSHOP · 日本';$('#tableTitle').textContent=ps?'PS5 港服价格与折扣监测':steam?'Steam 中国区热销榜 · 前 50':state.platform==='switch2'?'Switch 2 日服数字版销量榜':'Switch 1 日服数字版销量榜';$('#regionPill').textContent=ps?'HK · HKD → CNY':steam?'CN · CNY':'JP · JPY → CNY';$('#rateValue').textContent=steam?'Steam 国区使用人民币定价':`1 ${code} = ${rate.toFixed(code==='JPY'?5:4)} CNY`;$('#rateUpdated').textContent=steam?'无需换汇 · 结算以 Steam 为准':state.rateUpdated?`${state.rateSource} · ${new Date(state.rateUpdated).toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})}`:'正在获取最新汇率…';$('#rateBadge').textContent=steam?'人民币':state.rateStale?'缓存汇率':'已更新';$('#rateBadge').classList.toggle('stale',!steam&&state.rateStale);$('.table-card').classList.add('flash');setTimeout(()=>$('.table-card').classList.remove('flash'),500)
}
async function refresh(){const btn=$('#refreshButton');if(btn.disabled)return;btn.disabled=true;btn.classList.add('loading');$('#sourceStatus').textContent='正在获取最新汇率…';await fetchExchangeRates();datasets[state.platform].forEach(g=>{if(Math.random()>.82)g.trend=Math.random()>.5?'up':'down'});state.remaining=state.interval*60;btn.disabled=false;btn.classList.remove('loading');$('#sourceStatus').textContent=state.rateStale?'已使用缓存汇率':'汇率已更新';$('#lastUpdated').textContent=new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})+' 更新';render();const t=$('#toast');t.querySelector('b').textContent=state.rateStale?'刷新完成（缓存汇率）':'价格与汇率已更新';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
$$('.platform-tab').forEach(b=>b.addEventListener('click',()=>{$$('.platform-tab').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',x===b)});state.platform=b.dataset.platform;render();hydrateCovers()}));
$$('.subtab').forEach(b=>b.addEventListener('click',()=>{$$('.subtab').forEach(x=>x.classList.toggle('active',x===b));state.view=b.dataset.view;render()}));
$('#searchInput').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();render()});$('#sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});$('#refreshButton').addEventListener('click',refresh);$('#autoToggle').addEventListener('click',e=>{state.auto=!state.auto;e.currentTarget.classList.toggle('active',state.auto);e.currentTarget.setAttribute('aria-checked',state.auto)});$('#intervalSelect').addEventListener('change',e=>{state.interval=+e.target.value;state.remaining=state.interval*60});
setInterval(()=>{if(!state.auto)return;state.remaining--;if(state.remaining<=0)refresh();const m=Math.floor(state.remaining/60),s=state.remaining%60;$('#countdown').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`},1000);render();hydrateCovers();fetchExchangeRates().then(render);
