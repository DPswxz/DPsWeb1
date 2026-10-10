# 游戏名称核对记录

## 2026-10-10 再次全量核对

扫描当前缓存和全部有效历史档案，共 4,104 个不同原名。逐项结果写入 `title-audit.csv`，依据包括已保存的官方商品网页资料、同一商品 ID 对照、此前有来源的人工规则及本次联网复核。不能把全量扫描等同于每个原名均已单独重新搜索、确认正式中文名；未确认项在 `title-review-originals.json`，继续保留原名。

本次检索核实的作品及来源保存在 `title-web-review-2026-10-10.json`，通行译名与官方名称分开标记。修正 Dragon's Dogma 2 为“龙之信条2”，Dark Arisen 为“龙之信条2：黑暗觉者”，Expansion 与角色编辑器保留各自商品身份；修正索尼克赛车“交叉世界”、Returnal“死亡回归”等名称。撤回不能确认的机器猜译，原名可继续搜索。未调用 Google 翻译 API。

Steam 付费榜与免费榜分别从 1 开始编号，搜索、折扣筛选及价格排序继续沿用所属总榜序号。原始商店排名和历史价格数据保持保存。

## 2026-10-05 当前榜单及退榜档案全量复核

扫描当前五份缓存及 SQLite 的全部有效商品档案，共 2,060 个不同原名。按商品 ID 查询 Steam 简体资料，并访问 336 个 PlayStation 香港简体商品概念页；取得 1,312 条商品名称资料（Steam 359 条，PlayStation 953 条）。来源、商品编号及核对时间保存在 `title-official-localizations.json`，逐项结果在 `title-audit.csv`。本次没有调用 Google 翻译 API；无法确认可靠中文名的条目保留原名，不能声称每个商品均已确认正式中文名。

“柏德之門3”是繁体区服名称，简体区服使用“博德之门3”。补齐繁体、英文和语言后缀别名，豪华版仍保留版本身份。香港 PS 后续采集改用官方 `zh-hans-hk` 页面；已核对商品通过精确 SKU 映射名称，不将其他版本名称套用到未确认商品。用户此前指定的“哈迪斯 II”“暗喻幻想”“火焰纹章 万紫千紅”等优先保留。

档案启动时同步已核对译名及搜索索引，原始名称、价格记录、建档时间和退榜状态保留。只做字形转换不足以解决专名差异，因此 OpenCC 用于简体字形，作品名称使用官方商品资料或人工核对规则。

## 2026-10-04 逐项联网补核

对上次保留原名的 88 个商品名称（含不同版本）逐项按作品分组搜索，并检查对应来源。运行期间榜单更新，又发现 2 个名称，共记录 90 个商品名称的结果于 [联网核对记录](title-web-review.json)。其中 66 个采用已查到的官方或通行中文基础名，24 个未找到可靠中文名，继续保留原名。版本后缀保留或人工按版本内容转换；通行译名不标成官方中文名。本次没有调用 Google 翻译 API。

新增确认示例：Leafy Corner → 绿植小筑；Viractal → 维拉克塔尔；Well Dweller → 黯井微光；Graveyard Keeper 2 → 守墓人2；神貌のクリファ → 神貌之树逆卡巴拉；三國志14 with パワーアップキット Complete Edition → 三国志14 威力加强传承版套装；Destiny 2: Renegades → 命运2：反叛。

## 2026-10-04 任天堂排行榜来源

用户确认对照的是 Switch 主机 eShop 排行榜。当前收集器的香港来源是 Nintendo Store 网页商店榜单，实际返回 30 条，包含 DLC / 扩充票；日本网页 Switch 1 返回 50 条。它们不等同于主机榜单，页面和 API 现明确标注“网页排行榜”与实际数量。

[任天堂主机 eShop 说明](https://support.nintendo.com/jp/switch/eshop/index.html?scid=su_795)介绍主机排行榜近3天销售额统计前100名。2026-10-04 实测公开 `ec.nintendo.com/api/{JP/ja,HK/zh}/search/ranking?count=100&offset=0` 返回 HTTP 403 AccessDenied，普通浏览器访问商品页同样拒绝，故尚未取得主机前100名。日服收集上限已支持100个实际返回的商品，但当前来源仍只有50条；没有用其他区服或其他排序补满数量，也没有声称完成主机榜单切换。

## 2026-10-03 全量核对

覆盖当前五份平台缓存的 **1,267 个不同商品名称**，包含各区服、版本、试玩和组合包。每个条目都记录在 [全量核对表](title-audit.csv)；其中 **88 个名称未确认可靠中文名**，列于 [保留原名清单](title-review-originals.json)。不能将本次检查描述成每个名称均已由官方网站单独验证。

核对方式：

- 官方中文商品名直接保留；Steam 使用相同应用 ID、PlayStation 使用相同概念 ID 对照中文区商品，避免依靠英文直译。
- 人工核对发行商、开发商和官方商店资料；已确认的中文名优先。既有用户指定名称继续保留。
- 有稳定玩家通行译名的作品采用人工复核名称，记录与官方中文名称分开。相关商品链接用于确认作品身份，不能当作官方认可该中文译名的证明。
- 无法确认的作品保留原名，撤回机器猜译；未知资料片和组合包可保留原文后缀，避免混淆作品。
- 数字、罗马数字、版本和资料片独立辨认；例如英文 DYNASTY WARRIORS 3 对应中文真・三国无双2，Chrono Cross 也不能当成 Chrono Trigger。

人工来源和别名在 [title-review-rules.json](src/title-review-rules.json)，原始人工映射保存在 title-review-seed.json；脚本 scripts/review-game-titles.mjs 可再次扫描全量缓存，且不会把上一次自动生成的结果当作新的人工证据。机器缓存只用于显示旧名称，不作为核对依据。

本次典型修正：

| 原名 | 核对后显示 | 依据 |
| --- | --- | --- |
| Palworld / パルワールド | 幻兽帕鲁 | [Pocketpair](https://www.pocketpair.jp/zh/games-zh/palworld-zh/) |
| Grounded 2 | 禁闭求生2 | 官方中文商店名称 |
| Once Human | 七日世界 | [Steam](https://store.steampowered.com/app/2139460/?l=schinese) |
| REANIMAL | 生灵重塑 | [Steam](https://store.steampowered.com/app/2129530/?l=schinese) |
| 007 First Light | 007 初露锋芒 | [亚洲发行商](https://asia.gamesource-ent.com/zh-Hans-HK/detail/844) |
| FATAL FURY: City of the Wolves | 饿狼传说：群狼之城 | [SNK](https://www.snkchina.com.cn/general/game/20250314/60089.html) |
| Tales of ARISE | 破晓传奇 | [Steam 中文支持页](https://help.steampowered.com/zh-cn/wizard/HelpWithGameTechnicalIssue?appid=740130) |
| A Way Out | 逃出生天 | [EA](https://help.ea.com/zh/games/a-way-out/a-way-out/) |
| Ratchet & Clank: Rift Apart | 瑞奇与叮当：时空跳转 | [PlayStation](https://www.playstation.com/zh-hans-cn/games/ratchet-and-clank-rift-apart/) |
| THE FINALS / R.E.P.O. | 保留官方原名 | 不显示“决赛”“收回”等直译 |

启动时将核对结果一次事务写入 SQLite，覆盖旧机器译名；官方收集器名称优先于机器结果，人工指定名称优先级最高。HTML 实体、弯引号和商标归一化，跨区编码差异共用缓存。本次核对不请求 Google 翻译 API，现有一次调用规则继续生效。

## 既有核对记录

2026-10-02：检查当前机器翻译缓存，修正用户指定名称和已核实的明显错译。人工译名保存在 `src/title-overrides.json`，启动时覆盖旧机器译名，不调用翻译 API。未逐项确认所有机器译名。

## 用户指定

| 名称 | 显示译名 |
| --- | --- |
| SEKIRO: SHADOWS DIE TWICE | 只狼 影逝二度 |
| Ghost of Yōtei / Ghost of Yotei | 羊蹄山之魂 |
| Overcooked! | 胡闹厨房 |
| Overcooked! 2 | 胡闹厨房2 |
| Hades II | 哈迪斯 II |
| Fire Emblem: Fortune's Weave / ファイアーエムブレム 万紫千紅 | 火焰纹章 万紫千紅 |
| Balatro | 小丑牌 |
| Figment | 虚构世界 |
| Figment 2: Creed Valley | 虚构世界2：信念之谷 |
| Figment 1 + Figment 2 | 虚构世界1 + 虚构世界2 |
| BIOHAZARD | 生化危机 |
| Metaphor: ReFantazio / メタファー：リファンタジオ | 暗喻幻想 |

用户指定的 Fire Emblem 名称采用日文副标题“万紫千紅”；[任天堂中文页面](https://www.nintendo.com/tw/topics/article/6TmiV6zUXU8YEQzNj5NvgQ)使用“萬縷千絲”。暗喻幻想的完整官方中文名为[暗喻幻想：ReFantazio](https://asia.sega.com/metaphor/cn/)，页面按用户指定显示简称。

## 其他已修正的译名

| 原名 | 旧机器译名 | 修正 | 核对来源 |
| --- | --- | --- | --- |
| It Takes Two | 需要两个人 | 双人成行 | [PlayStation](https://www.playstation.com/zh-hans-hk/games/it-takes-two/) |
| Split Fiction | 分裂小说 | 双影奇境 | [EA](https://www.ea.com/zh-hans/games/split-fiction/split-fiction) |
| ELDEN RING | 火环 | 艾尔登法环 | [PlayStation](https://www.playstation.com/zh-hans-hk/games/elden-ring/) |
| Stellar Blade | 星刃 | 剑星 | [PlayStation](https://www.playstation.com/zh-hans-hk/games/stellar-blade/) |
| Cyberpunk 2077: Phantom Liberty | 赛博朋克2077：幻影自由 | 赛博朋克2077 往日之影 | [CD PROJEKT RED](https://www.cyberpunk.net/zh-cn/news/49162/sai-bo-peng-ke-2077-wang-ri-zhi-ying-xian-yi-tui-chu) |
| Grounded | 接地 | 禁闭求生 | [Steam](https://store.steampowered.com/app/962130/Grounded/?l=schinese) |
| Wuthering Waves | 呼啸海 | 鸣潮 | [PlayStation](https://www.playstation.com/zh-hans-hk/games/wuthering-waves/) |
| インフィニティニキ | 无限尼基 | 无限暖暖 | [PlayStation](https://www.playstation.com/zh-hans-hk/games/infinity-nikki/) |
| 崩壊：スターレイル | 崩溃：星轨 | 崩坏：星穹铁道 | [米哈游](https://sr.mihoyo.com/) |
| アークナイツ：エンドフィールド | 明日方舟：终局 | 明日方舟：终末地 | [鹰角](https://endfield.hypergryph.com/news/7231) |
| ARK: Survival Ascended | ARK：生存进化 | 方舟：生存飞升 | [Steam](https://store.steampowered.com/app/2399830/ARK_Survival_Ascended/?l=schinese) |
| Squad | 队 | 战术小队 | [Steam](https://store.steampowered.com/app/393380/Squad/?l=schinese) |
| Last Epoch | 末世 | 最后纪元 | [Steam游戏页](https://steamcommunity.com/app/899770?l=schinese) |
| Steep | 陡 | 极限巅峰 | [育碧](https://zh-cn.ubisoft.com/games/steep) |
| ICEY | 冰 | 艾希 | [Steam](https://store.steampowered.com/app/553640/ICEY/?l=tchinese) |

数字、罗马数字、资料片和版本后缀分别保留，避免把不同作品统一成同一个名称。PS 列表独立筛选基础版；任天堂和 Steam 的版本展示规则保持不变。
