const datasets = {
  switch: [
    {rank:1,name:'マリオカート ワールド',meta:'Nintendo · 竞速',platform:'Switch 2',price:8980,old:null,discount:0,trend:'same',cover:'MW',color:'#dc3d5a'},
    {rank:2,name:'ドンキーコング バナンザ',meta:'Nintendo · 动作',platform:'Switch 2',price:7980,old:null,discount:0,trend:'up',cover:'DK',color:'#b47732'},
    {rank:3,name:'Minecraft',meta:'Mojang · 冒险',platform:'Switch',price:3960,old:null,discount:0,trend:'up',cover:'MC',color:'#538a4b'},
    {rank:4,name:'スーパー マリオパーティ ジャンボリー',meta:'Nintendo · 聚会',platform:'Switch',price:7100,old:null,discount:0,trend:'down',cover:'MP',color:'#de593e'},
    {rank:5,name:'MONSTER HUNTER RISE',meta:'CAPCOM · 动作 RPG',platform:'Switch',price:998,old:3990,discount:75,trend:'up',cover:'MH',color:'#5f6ea4'},
    {rank:6,name:'ゼルダの伝説 ティアーズ オブ ザ キングダム',meta:'Nintendo · 冒险',platform:'Switch',price:7900,old:null,discount:0,trend:'down',cover:'ZL',color:'#6a9a8b'},
    {rank:7,name:'HADES',meta:'Supergiant · 动作',platform:'Switch',price:1400,old:2800,discount:50,trend:'up',cover:'HD',color:'#ad3b45'},
    {rank:8,name:'Stardew Valley',meta:'ConcernedApe · 模拟',platform:'Switch',price:1480,old:null,discount:0,trend:'same',cover:'SV',color:'#b78642'},
    {rank:9,name:'オーバークック 王国のフルコース',meta:'Team17 · 聚会',platform:'Switch',price:1640,old:4100,discount:60,trend:'up',cover:'OC',color:'#df6e39'},
    {rank:10,name:'ホロウナイト',meta:'Team Cherry · 动作',platform:'Switch',price:740,old:1480,discount:50,trend:'same',cover:'HK',color:'#506677'},
    {rank:11,name:'ペルソナ５ ザ・ロイヤル',meta:'ATLUS · RPG',platform:'Switch',price:3839,old:7678,discount:50,trend:'down',cover:'P5',color:'#d5363f'},
    {rank:12,name:'ぷよぷよ™テトリス®２',meta:'SEGA · 益智',platform:'Switch',price:2303,old:3840,discount:40,trend:'same',cover:'PT',color:'#4b78c5'}
  ],
  ps5: [
    {rank:1,name:'FINAL FANTASY VII REBIRTH',meta:'SQUARE ENIX · RPG',platform:'PS5',price:95.4,old:318,discount:70,trend:'up',cover:'FF',color:'#365d83'},
    {rank:2,name:'Forza Horizon 5 Premium Edition',meta:'Xbox Game Studios · 竞速',platform:'PS5',price:186.4,old:466,discount:60,trend:'up',cover:'FH',color:'#b13a84'},
    {rank:3,name:'Gran Turismo 7 豪华版',meta:'PlayStation · 竞速',platform:'PS5 / PS4',price:307.12,old:698,discount:56,trend:'same',cover:'GT',color:'#3163b5'},
    {rank:4,name:'Stellar Blade™ Complete Edition',meta:'PlayStation · 动作',platform:'PS5',price:398,old:568,discount:30,trend:'down',cover:'SB',color:'#8b5689'},
    {rank:5,name:'Resident Evil 4 Gold Edition',meta:'CAPCOM · 动作',platform:'PS5 / PS4',price:186.4,old:466,discount:60,trend:'up',cover:'RE',color:'#705137'},
    {rank:6,name:'EA SPORTS FC™ 26',meta:'EA · 体育',platform:'PS5 / PS4',price:164.7,old:549,discount:70,trend:'up',cover:'FC',color:'#7768d8'},
    {rank:7,name:'It Takes Two',meta:'EA · 冒险',platform:'PS5 / PS4',price:119.6,old:398,discount:70,trend:'same',cover:'IT',color:'#c76546'},
    {rank:8,name:'Grand Theft Auto V',meta:'Rockstar Games · 动作',platform:'PS5',price:148,old:298,discount:50,trend:'down',cover:'V',color:'#4c8550'},
    {rank:9,name:'GUNDAM BREAKER 4 Ultimate',meta:'Bandai Namco · 动作',platform:'PS5 / PS4',price:219,old:438,discount:50,trend:'same',cover:'GB',color:'#4a79ad'},
    {rank:10,name:'TEKKEN 8',meta:'Bandai Namco · 格斗',platform:'PS5',price:159.2,old:398,discount:60,trend:'up',cover:'T8',color:'#b74752'}
  ]
};

const state={platform:'switch',view:'ranking',query:'',sort:'rank',auto:true,interval:15,remaining:899};
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const money=n=>state.platform==='switch'?`¥ ${Math.round(n).toLocaleString('ja-JP')}`:`HK$ ${Number(n).toFixed(n%1?2:0)}`;
function currentData(){let data=[...datasets[state.platform]];if(state.view==='deals')data=data.filter(x=>x.discount>0);if(state.query)data=data.filter(x=>(x.name+x.meta+x.platform).toLowerCase().includes(state.query));if(state.sort==='priceAsc')data.sort((a,b)=>a.price-b.price);else if(state.sort==='discount')data.sort((a,b)=>b.discount-a.discount||a.rank-b.rank);else data.sort((a,b)=>a.rank-b.rank);return data}
function render(){const all=datasets[state.platform],data=currentData();$('#gameRows').innerHTML=data.map((g,i)=>`<tr><td><span class="rank ${g.rank<=3?'top':''}">${String(g.rank).padStart(2,'0')}</span></td><td><div class="game-cell"><span class="cover" style="background:linear-gradient(135deg,${g.color},#172128)">${g.cover}</span><div><span class="game-name">${g.name}</span><span class="game-meta">${g.meta}</span></div></div></td><td><span class="platform-chip">${g.platform}</span></td><td><span class="price-main">${money(g.price)}</span>${g.old?`<span class="price-old">${money(g.old)}</span>`:''}</td><td>${g.discount?`<span class="discount">-${g.discount}%</span>`:`<span class="trend ${g.trend}">${g.trend==='up'?'↑ 上升':g.trend==='down'?'↓ 下降':'— 持平'}</span>`}</td><td><a class="store-link" href="${state.platform==='switch'?'https://store-jp.nintendo.com/software/ranking/':'https://store.playstation.com/zh-hant-hk/pages/deals'}" target="_blank" rel="noopener" aria-label="前往官方商店">↗</a></td></tr>`).join('');
  $('#emptyState').hidden=data.length>0;$('.table-scroll').hidden=data.length===0;$('#gameCount').textContent=all.length;$('#lowestPrice').textContent=money(Math.min(...all.map(x=>x.price)));$('#resultSummary').textContent=`显示 ${data.length} 款游戏`;$('#dealBadge').textContent=all.filter(x=>x.discount).length;
  const deals=all.filter(x=>x.discount).sort((a,b)=>b.discount-a.discount),best=deals[0];$('#bestDiscount').textContent=best?`-${best.discount}%`:'—';$('#bestDealName').textContent=best?.name||'暂无折扣';$('#bestDealPrice').innerHTML=best?`<del>${money(best.old)}</del> ${money(best.price)}`:'等待更新';$('#averagePrice').textContent=money(all.reduce((s,x)=>s+x.price,0)/all.length);$('#discountedCount').innerHTML=`${deals.length} <small>款</small>`;
  const ps=state.platform==='ps5';$('#tableKicker').textContent=ps?'PLAYSTATION STORE · 香港':'NINTENDO eSHOP · 日本';$('#tableTitle').textContent=ps?'PS5 港服价格与折扣榜':'Switch 1 / 2 数字版销量榜';$('#regionPill').textContent=ps?'HK · HKD':'JP · JPY';$('.table-card').classList.add('flash');setTimeout(()=>$('.table-card').classList.remove('flash'),500)
}
function refresh(){const btn=$('#refreshButton');if(btn.disabled)return;btn.disabled=true;btn.classList.add('loading');$('#sourceStatus').textContent='正在检查价格…';setTimeout(()=>{datasets[state.platform].forEach((g,i)=>{if(Math.random()>.82)g.trend=Math.random()>.5?'up':'down'});state.remaining=state.interval*60;btn.disabled=false;btn.classList.remove('loading');$('#sourceStatus').textContent='预览数据已更新';$('#lastUpdated').textContent=new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})+' 更新';render();const t=$('#toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)},850)}
$$('.platform-tab').forEach(b=>b.addEventListener('click',()=>{$$('.platform-tab').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',x===b)});state.platform=b.dataset.platform;render()}));
$$('.subtab').forEach(b=>b.addEventListener('click',()=>{$$('.subtab').forEach(x=>x.classList.toggle('active',x===b));state.view=b.dataset.view;render()}));
$('#searchInput').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();render()});$('#sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});$('#refreshButton').addEventListener('click',refresh);$('#autoToggle').addEventListener('click',e=>{state.auto=!state.auto;e.currentTarget.classList.toggle('active',state.auto);e.currentTarget.setAttribute('aria-checked',state.auto)});$('#intervalSelect').addEventListener('change',e=>{state.interval=+e.target.value;state.remaining=state.interval*60});
setInterval(()=>{if(!state.auto)return;state.remaining--;if(state.remaining<=0)refresh();const m=Math.floor(state.remaining/60),s=state.remaining%60;$('#countdown').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`},1000);render();
