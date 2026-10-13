import { load } from 'cheerio';
import { storeFetch } from './polite-fetch.mjs';

export function parseSteamSearch(html, offset=0) {
  const $=load(html),games=[];
  $('a.search_result_row').each((index,row)=>{
    const item=$(row),id=item.attr('href')?.match(/\/app\/(\d+)/)?.[1];
    if(!id)return;
    const name=item.find('.title').text().trim();
    if(!name)return;
    const priceText=item.find('.discount_final_price,.search_price').last().text().trim();
    const cents=item.find('[data-price-final]').attr('data-price-final') ?? item.attr('data-price-final');
    const amount=text=>{const match=text.replace(/,/g,'').match(/\d+(?:\.\d+)?/);return match?Number(match[0]):null;};
    const isFree=/^(free(?: to play)?|免费(?:开玩)?|免費(?:遊玩)?)$/i.test(priceText);
    const price=isFree?0:cents!==undefined&&/^\d+$/.test(cents)?Number(cents)/100:amount(priceText);
    const old=amount(item.find('.discount_original_price').text());
    const discount=Number(item.find('.discount_pct').text().match(/\d+/)?.[0]||0);
    games.push({id,name,rank:offset+index+1,isFree,price,priceAvailable:price!==null,old,discount,
      image:item.find('img').first().attr('src')||'',url:`https://store.steampowered.com/app/${id}/`});
  });
  return games;
}

// 付费取前200款；免费仅保留综合热销前200名，不用未知价格推断免费。
export function selectSteamGames(games) {
  const seen=new Set();let paid=0;
  return games.filter(game=>{
    if(seen.has(game.id))return false;seen.add(game.id);
    return game.isFree?game.rank<=200:game.priceAvailable&&game.price>0&&paid++<200;
  });
}

export async function collectSteamRanking({global=false,signal,fetcher=storeFetch}={}) {
  const games=[],seen=new Set();let paid=0;
  for(let start=0;start<2000;start+=50){
    const url=new URL('https://store.steampowered.com/search/results/');
    url.search=new URLSearchParams({filter:global?'globaltopsellers':'topsellers',cc:global?'us':'cn',l:global?'english':'schinese',count:'50',start:String(start),infinite:'1'}).toString();
    const response=await fetcher(url.href,{signal});
    if(!response.ok)throw Error(`Steam 热销列表返回 HTTP ${response.status}`);
    const payload=await response.json(),page=parseSteamSearch(payload.results_html||'',start);
    if(!page.length)break;
    let added=0;
    for(const game of page)if(!seen.has(game.id)){seen.add(game.id);games.push(game);added++;if(!game.isFree&&game.priceAvailable&&game.price>0)paid++;}
    if(paid>=200&&start+50>=200)break;
    if(!added)throw Error('Steam 热销分页重复，保留已有缓存');
    if(Number(payload.total_count)<=start+50)break;
  }
  if(paid<200)throw Error(`Steam 热销列表仅获得 ${paid} 款付费游戏，保留已有缓存`);
  return selectSteamGames(games);
}
