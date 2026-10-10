import {Converter} from 'opencc-js';
const convert=Converter({from:'tw',to:'cn'});
// 这里只转换中文字形。作品专名必须由已核对的名称映射决定。
export function simplifiedDisplay(value){
  return /\p{Script=Han}/u.test(value||'')&&!/[ぁ-ヿ]/.test(value||'')?convert(value):value;
}
