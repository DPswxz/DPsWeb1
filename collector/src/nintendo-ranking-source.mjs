// 网页商店排行榜与主机 eShop 排行榜不是同一数据源。
// 容量必须使用已取得的条数，不能用主机的 100 名补写网页容量。
export function describeNintendoRanking(payload, platform) {
  if (!payload) return payload;
  const hk = platform.endsWith('_hk');
  const count = payload.games?.length || 0;
  return {
    ...payload,
    count,
    officialLimit: count,
    sourceKind: 'web-store-ranking',
    sourceType: `Nintendo Store ${hk ? '香港' : '日本'}网页排行榜`,
    sourceNote: hk
      ? '网页商店排行榜，含游戏与追加内容；与主机 eShop 前100名不同。'
      : `日服网页排行榜当前提供 ${count} 条；与主机 eShop 前100名不同。`
  };
}
