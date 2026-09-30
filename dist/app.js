const chineseTitleMap = {
  'リズム天国 ミラクルスターズ': '节奏天国 奇迹明星',
  'トルネコの大冒険 不思議のダンジョン　ちょっとステキなリマスター': '特鲁尼克大冒险 不可思议的迷宫 精美复刻版',
  '不思議のダンジョン　風来のシレン６　とぐろ島探検録': '不可思议迷宫 风来的希炼6 蛇蜷岛探险录',
  '妖怪ウォッチ1 for Nintendo Switch': '妖怪手表1 for Nintendo Switch',
  'トモダチコレクション わくわく生活': '朋友收藏集 心动生活',
  '妖怪ウォッチ4++': '妖怪手表4++',
  'Little Witch in the Woods': '林中小女巫',
  '大乱闘スマッシュブラザーズ SPECIAL': '任天堂明星大乱斗 特别版',
  'マリオカート ワールド': '马力欧卡丁车 世界',
  'ドンキーコング バナンザ': '咚奇刚 蕉力全开',
  'Minecraft': '我的世界',
  '空の軌跡 the 2nd': '空之轨迹 the 2nd',
  'ドラゴンクエストモンスターズ３　魔族の王子とエルフの旅': '勇者斗恶龙怪兽篇3 魔族王子与精灵之旅',
  'パワフルプロ野球2026-2027': '实况力量棒球 2026-2027',
  'アナザーエデン ビギンズ': '另一个伊甸 起源',
  'スプラトゥーン3': '斯普拉遁3',
  'モンスターハンターライズ ＋ サンブレイク セット': '怪物猎人 崛起 + 曙光 套装',
  '世界のアソビ大全51': '世界游戏大全51',
  'ロマンシング サガ2 リベンジオブザセブン': '浪漫沙加2 七英雄的复仇',
  'Overcooked!® - オーバークック 王国のフルコース': '胡闹厨房 全都好吃',
  'ほの暮しの庭': '暖暖生活庭院',
  'がんばれゴエモン大集合！': '加油五右卫门 大合集',
  'パワフルプロ野球2026-2027 パワフルエディション': '实况力量棒球 2026-2027 强力版',
  'ドラゴンクエストIII　そして伝説へ…': '勇者斗恶龙III 接着迈向传说',
  'FINAL FANTASY I-VI Bundle': '最终幻想 I-VI 同捆包',
  'ホグワーツ・レガシー Hogwarts Legacy': '霍格沃茨之遗',
  'スーパー マリオパーティ ジャンボリー': '超级马力欧派对 空前盛会',
  'あつまれ どうぶつの森': '集合啦！动物森友会',
  'ファイアーエムブレム 風花雪月': '火焰之纹章 风花雪月',
  '魔法少女ノ魔女裁判': '魔法少女的魔女审判',
  'ポケットモンスター ファイアレッド': '宝可梦 火红',
  'マリオカート8 デラックス': '马力欧卡丁车8 豪华版',
  'Le Mirage Mystique': '神秘幻影',
  '東方紅魔郷：New Classic　～ the Embodiment of Scarlet Devil.': '东方红魔乡：New Classic',
  '桃太郎電鉄２ ～あなたの町も きっとある～ 東日本編＋西日本編': '桃太郎电铁2 东日本篇+西日本篇',
  'パラノマサイト FILE38 伊勢人魚物語': '灵异视界 FILE38 伊势人鱼物语',
  'モンスターハンターダブルクロス™ Nintendo Switch Ver.': '怪物猎人XX Nintendo Switch版',
  '太鼓の達人 ドンダフルフェスティバル 太鼓ミュージックパス 90日利用券セット': '太鼓之达人 咚咚雷音祭 音乐通行证90日套装',
  'ダンガンロンパ 希望の学園と絶望の高校生 Anniversary Edition': '弹丸论破 希望学园与绝望高中生 周年版',
  '空の軌跡 the 2nd デジタルデラックス版': '空之轨迹 the 2nd 数字豪华版',
  'ゼルダの伝説 ブレス オブ ザ ワイルド': '塞尔达传说 旷野之息',
  '都市伝説解体センター': '都市传说解体中心',
  'EA SPORTS FC™ 27': 'EA SPORTS FC 27',
  '『超探偵事件簿 レインコード』『ダンガンロンパ1・2・V3』バンドル': '超侦探事件簿 雾雨迷宫 + 弹丸论破合集',
  'Le Mirage Mystique ダウンロード版 デジタル特典版': '神秘幻影 数字特典版',
  '逆転裁判123 成歩堂セレクション': '逆转裁判123 成步堂精选集',
  'Pikmin 4 (ピクミン4)': '皮克敏4',
  'ドラゴンクエストI＆II': '勇者斗恶龙I＆II',
  'ポケットモンスター バイオレット': '宝可梦 紫',
  'NieR:Automata The End of YoRHa Edition': '尼尔：自动人形 The End of YoRHa Edition',
  'ファイアーエムブレム 万紫千紅 (ばんしせんこう)': '火焰之纹章 万紫千红',
  'めっちゃカメレオン': '超级变色龙',
  '空の軌跡 the 2nd Nintendo Switch 2 Edition': '空之轨迹 the 2nd Switch 2版',
  'ELDEN RING Tarnished Edition': '艾尔登法环 褪色者版',
  '「ディアブロ IV: 憎悪の時代」コレクション': '暗黑破坏神 IV 憎恨之躯 合集',
  'ロマンシング サガ2 リベンジオブザセブン Nintendo Switch 2 Edition': '浪漫沙加2 七英雄的复仇 Switch 2版',
  'アナザーエデン ビギンズ Nintendo Switch 2 Edition': '另一个伊甸 起源 Switch 2版',
  'ダービースタリオン２': '赛马大亨2',
  '鬼武者 Way of the Sword': '鬼武者 Way of the Sword',
  'FINAL FANTASY VII REBIRTH': '最终幻想VII 重生',
  'スプラトゥーン レイダース': '斯普拉遁 Raiders',
  'FINAL FANTASY VII REMAKE INTERGRADE': '最终幻想VII 重制版 Intergrade',
  '空の軌跡 the 1st Nintendo Switch 2 Edition': '空之轨迹 the 1st Switch 2版',
  'ぽこ あ ポケモン': '宝可梦 Pokopia',
  '桃太郎電鉄２ ～あなたの町も きっとある～ Nintendo Switch 2 Edition 東日本編＋西日本編': '桃太郎电铁2 Switch 2版 东日本篇+西日本篇',
  'ペルソナ３ リロード': '女神异闻录3 Reload',
  '東方紅魔郷：New Classic　～ the Embodiment of Scarlet Devil.　デラックス版': '东方红魔乡：New Classic 豪华版',
  'オービタルズ Orbitals': 'Orbitals 轨道星球',
  'Granblue Fantasy Versus: Rising Legendary Edition': '碧蓝幻想 Versus Rising 传奇版',
  'ゼルダの伝説 ブレス オブ ザ ワイルド Nintendo Switch 2 Edition': '塞尔达传说 旷野之息 Switch 2版',
  'PRAGMATA': '识质存在',
  'PRAGMATA Deluxe Edition': '识质存在 豪华版',
  'Forza Horizon 5 Premium Edition': '极限竞速：地平线 5 顶级版',
  'Forza Horizon 5 Standard Edition': '极限竞速：地平线 5 标准版',
  'モンスターハンターワイルズ': '怪物猎人 荒野',
  'モンスターハンターストーリーズ3　～運命の双竜～': '怪物猎人物语3 ～命运之双龙～',
  'モンスターハンターストーリーズ3　～運命の双竜～ デラックスエディション': '怪物猎人物语3 豪华版',
  'モンスターハンターストーリーズ3　～運命の双竜～ プレミアムデラックスエディション': '怪物猎人物语3 高级豪华版',
  'SILENT HILL f': '寂静岭 f',
  'CODE VEIN II': '噬血代码 II',
  'CODE VEIN II Ultimate Edition': '噬血代码 II 终极版',
  'DEATH STRANDING 2: ON THE BEACH': '死亡搁浅2：冥滩之上',
  'METAL GEAR SOLID Δ: SNAKE EATER Digital Deluxe Edition': '合金装备Δ：食蛇者 数字豪华版',
  '龍が如く 極３ / 龍が如く３外伝 Dark Ties PS4 & PS5': '人中之龙 极3 / 人中之龙3外传 Dark Ties',
  'Clair Obscur: Expedition 33 – Deluxe Edition': '光与影：33号远征队 豪华版',
  'Starfield Premium Edition': '星空 高级版',
  'デジモンストーリー タイムストレンジャー デラックスエディション': '数码宝贝故事 时空异客 豪华版',
  '鉄拳8 Advanced Edition': '铁拳8 进阶版',
  'Battlefield™ 6 ファントムエディション': '战地风云6 魅影版',
  'OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4 & PS5': '歧路旅人0 数字豪华版',
  'Echoes of Aincrad': '艾恩葛朗特的回响',
  'Echoes of Aincrad アルティメットエディション': '艾恩葛朗特的回响 终极版',
  'ドラゴンボール Sparking! ZERO': '七龙珠 电光炸裂！ZERO',
  '龍が如く８外伝 Pirates in Hawaii PS4 & PS5': '人中之龙8外传 夏威夷海盗',
  'ドラゴンクエストVII Reimagined　デジタルデラックス版': '勇者斗恶龙VII Reimagined 数字豪华版',
  'Valheim': '英灵神殿',
  'MONSTER HUNTER RISE': '怪物猎人 崛起',
  'ゼルダの伝説 ティアーズ オブ ザ キングダム': '塞尔达传说 王国之泪',
  'HADES': '哈迪斯',
  'Stardew Valley': '星露谷物语',
  'オーバークック 王国的フルコース': '胡闹厨房 全都好吃',
  'ホロウナイト': '空洞骑士',
  'ペルソナ５ ザ・ロイヤル': '女神异闻录5 皇家版',
  'ぷよぷよ™テトリス®２': '噗哟噗哟俄罗斯方块2',
  '真・三國無双 ORIGINS': '真·三国无双 起源',
  '『スター・ウォーズ 無法者たち』': '星球大战：亡命之徒',
  'スター・ウォーズ 無法者たち': '星球大战：亡命之徒',
  '零 ～紅い蝶～ REMAKE': '零 ～红蝶～ 重制版',
  'ファークライ6': '孤岛惊魂6',
  '龍の国 ルーンファクトリー': '龙之国 符文工厂',
  '牧場物語 Let\'s！風のグランドバザール': '牧场物语 来吧！风之繁华市集',
  'アサシン クリード ヴァルハラ': '刺客信条：英灵殿',
  'スーパーロボット大戦Y': '超级机器人大战Y',
  'スーパーロボット大戦30': '超级机器人大战30',
  '幻想水滸伝 I&II HDリマスター 門の紋章戦争 / デュナン統一戦争': '幻想水浒传 I&II HD复刻版',
  'テイルズ オブ エクシリア リマスター': '无尽传奇 复刻版',
  'テイルズ オブ グレイセス エフ リマスター': '圣恩传奇 F 复刻版',
  'テイルズ オブ シンフォニア リマスター': '仙乐传说 复刻版',
  '聖剣伝説 VISIONS of MANA': '圣剑传说 玛娜视界',
  'ガンダムブレイカー４': '高达破坏者4',
  'SDガンダム バトルアライアンス': 'SD高达 激斗同盟',
  '龍が如く７外传 名を消した男': '人中之龙7外传 无名之龙',
  '龍が如く７　光と闇の行方　インターナショナル': '人中之龙7 光与暗的去向 国际版',
  'ロマンシング サガ -ミンストレルソング- リマスター': '浪漫沙加 吟游诗人之歌 复刻版',
  'サガ フロンティア２ リマスター': '沙加开拓者2 复刻版',
  'サガ フロンティア リマスター': '沙加开拓者 复刻版',
  '天穂のサクナヒメ': '天穗之咲稻姬',
  'ハッピーダンガンロンパＳ 超高校級の南国サイコロ合宿': '幸福枪弹辩驳S 超高中级的南国掷骰合宿',
  '僕のヒーローアカデミア All\'s Justice': '我的英雄学院 All\'s Justice',
  'BLEACH Rebirth of Souls': '死神 魂魄觉醒',
  'ボーダーランズ® 4': '无主之地4',
  '『ボーダーランズ® 4』': '无主之地4',
  'フロストパンク2': '冰汽时代2',
  '007 First Light': '007 初道曙光',
  '007 First Light - デラックスエディション': '007 初道曙光 豪华版',
  'Rust Console Edition': '腐蚀 Rust 主机版',
  'Forza Horizon 5': '极限竞速：地平线 5',
  'Forza Horizon 5 Premium Edition': '极限竞速：地平线 5 顶级版',
  'Forza Horizon 5 Standard Edition': '极限竞速：地平线 5 标准版',
  'SILENT HILL f': '寂静岭 f',
  'CODE VEIN II': '噬血代码 II',
  'FINAL FANTASY VII REBIRTH': '最终幻想VII 重生',
  'DEATH STRANDING 2: ON THE BEACH': '死亡搁浅2：冥滩之上',
  'METAL GEAR SOLID Δ: SNAKE EATER': '合金装备Δ：食蛇者',
  'METAL GEAR SOLID Δ: SNAKE EATER Digital Deluxe Edition': '合金装备Δ：食蛇者 数字豪华版',
  '龍が如く 極３ / 龍が如く３外伝 Dark Ties': '人中之龙 极3 / 人中之龙3外传 Dark Ties',
  '龍が如く 極３ / 龍が如く３外伝 Dark Ties PS4 & PS5': '人中之龙 极3 / 人中之龙3外传 Dark Ties',
  'Clair Obscur: Expedition 33': '光与影：33号远征队',
  'Clair Obscur: Expedition 33 – Deluxe Edition': '光与影：33号远征队 豪华版',
  'Starfield': '星空',
  'Starfield Premium Edition': '星空 高级版',
  'デジモンストーリー タイムストレンジャー': '数码宝贝故事 时空异客',
  'デジモンストーリー タイムストレンジャー デラックスエディション': '数码宝贝故事 时空异客 豪华版',
  '鉄拳8': '铁拳8',
  '鉄拳8 Advanced Edition': '铁拳8 进阶版',
  'Battlefield™ 6': '战地风云6',
  'Battlefield™ 6 ファントムエディション': '战地风云6 魅影版',
  'OCTOPATH TRAVELER 0': '歧路旅人0',
  'OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4 & PS5': '歧路旅人0 数字豪华版',
  'Echoes of Aincrad': '艾恩葛朗特的回响',
  'ドラゴンボール Sparking! ZERO': '七龙珠 电光炸裂！ZERO',
  '龍が如く８外伝 Pirates in Hawaii': '人中之龙8外传 夏威夷海盗',
  '龍が如く８外伝 Pirates in Hawaii PS4 & PS5': '人中之龙8外传 夏威夷海盗',
  'スーパーロボット大戦Y': '超级机器人大战Y',
  'REANIMAL': '动物之魂 REANIMAL',
  'REANIMAL – Digital Deluxe Edition': '动物之魂 REANIMAL 数字豪华版',
  'The Elder Scrolls IV: Oblivion Remastered': '上古卷轴IV：湮没 复刻版',
  'The Elder Scrolls IV: Oblivion Remastered - Deluxe Edition': '上古卷轴IV：湮没 复刻版 豪华版',
  '幻想水滸伝 I&II HDリマスター 門の紋章戦争 / デュナン統一戦争 PS4 & PS5': '幻想水浒传 I&II HD复刻版',
  'Avowed': '宣誓',
  'FINAL FANTASY VII REMAKE': '最终幻想VII 重制版',
  'FINAL FANTASY VII REMAKE INTERGRADE': '最终幻想VII 重制版 Intergrade',
  'NINJA GAIDEN 4': '忍者龙剑传4',
  'NINJA GAIDEN\u00a04': '忍者龙剑传4',
  '『スター・ウォーズ 無法者たち』': '星球大战：亡命之徒',
  'スター・ウォーズ 無法者たち': '星球大战：亡命之徒',
  'The Outer Worlds 2': '天外世界2',
  '零 ～紅い蝶～ REMAKE': '零 ～红蝶～ 重制版',
  'ジュラシック・ワールド・エボリューション3': '侏罗纪世界：进化3',
  'プラネットコースター 2': '过山车之星2',
  'STAR WARS ジェダイ：フォールン・オーダー™': '星球大战 绝地：陨落的武士团',
  'STAR WARS ジェダイ：フォールン・オーダー': '星球大战 绝地：陨落的武士团',
  'STAR WARS ジェダイ：フォールン・オーダー™ デラックス エディション': '星球大战 绝地：陨落的武士团 豪华版',
  'STAR WARS ジェダイ：サバイバー™': '星球大战 绝地：幸存者',
  'STAR WARS ジェダイ：サバイバー': '星球大战 绝地：幸存者',
  'STAR WARS ジェダイ：サバイバー™ デラックス エディション': '星球大战 绝地：幸存者 豪华版',
  'The Elder Scrolls Online': '上古卷轴OL',
  'The Elder Scrolls Online: Standard Edition': '上古卷轴OL 标准版',
  'Cult of the Lamb': '咩咩启示录',
  'Cult of the Lamb: Heretic Edition': '咩咩启示录：异教徒版',
  '龍が如く７外传 名を消した男　PS4 & PS5': '人中之龙7外传 无名之龙',
  'ロマンシング サガ2 リベンジオブザセブン': '浪漫沙加2 七英雄的复仇',
  'ロマンシング サガ -ミンストレルソング- リマスター PS4 & PS5': '浪漫沙加 吟游诗人之歌 复刻版',
  'サガ フロンティア２ リマスター PS4 & PS5': '沙加开拓者2 复刻版',
  'SAND LAND': '沙漠大冒险',
  'SAND LAND PS4® & PS5®': '沙漠大冒险',
  'トワと神樹の祈り子たち': '永远与神树的祈愿之子',
  'Lost Soul Aside™': '失落之魂',
  'Lost Soul Aside': '失落之魂',
  'Sea of Thieves: 2026': '盗贼之海',
  'Sea of Thieves': '盗贼之海',
  'Sea of Thieves: 2026 Premium Edition': '盗贼之海 高级版',
  'CHRONO CROSS: THE RADICAL DREAMERS EDITION': '超时空之轮 狂飙梦想家版',
  'DAEMON X MACHINA TITANIC SCION': '机甲战魔 泰坦之裔',
  'DREDGE': '渔帆暗涌',
  'DREDGE - Digital Deluxe Edition': '渔帆暗涌 数字豪华版',
  'DREDGE: Expansion Bundle': '渔帆暗涌 扩展捆绑包',
  'ファークライ6': '孤岛惊魂6',
  'Moving Out 2': '胡闹搬家2',
  'Neon Abyss': '霓虹深渊',
  '龍の国 ルーンファクトリー': '龙之国 符文工厂',
  'SCARLET NEXUS': '绯红结系',
  'SCARLET NEXUS PS4 & PS5': '绯红结系',
  'Shadow Labyrinth (シャドウラビリンス)': '暗影迷宫',
  'Shadow Labyrinth': '暗影迷宫',
  'Sifu': '师父',
  'ソニックレーシング クロスワールド': '索尼克赛车 跨界世界',
  'ソニックレーシング クロスワールド PS4 & PS5': '索尼克赛车 跨界世界',
  '牧場物語 Let\'s！風のグランドバザール': '牧场物语 来吧！风之繁华市集',
  'NARUTO X BORUTO ナルティメットストームコネクションズ': '火影忍者 终极风暴羁绊',
  'アサシン クリード ヴァルハラ': '刺客信条：英灵殿',
  'ASTRONEER': '异星探险家',
  'ASTRONEER - Ultimate Edition': '异星探险家 终极版',
  'アバター：フロンティア・オブ・パンドラ': '阿凡达：潘多拉边境'
};

const datasets = {
  switch: [
    {rank:1,name:'マリオカート ワールド',cn:'马力欧卡丁车 世界',meta:'Nintendo · 竞速',platform:'Switch 2',price:8980,old:null,discount:0,trend:'same',cover:'MW',color:'#dc3d5a',hasChinese:true},
    {rank:2,name:'ドンキーコング バナンザ',cn:'咚奇刚 蕉力全开',meta:'Nintendo · 动作',platform:'Switch 2',price:7980,old:null,discount:0,trend:'up',cover:'DK',color:'#b47732',hasChinese:true},
    {rank:3,name:'Minecraft',cn:'我的世界',meta:'Mojang · 冒险',platform:'Switch',price:3960,old:null,discount:0,trend:'up',cover:'MC',color:'#538a4b',hasChinese:true},
    {rank:4,name:'スーパー マリオパーティ ジャンボリー',cn:'超级马力欧派对 空前盛会',meta:'Nintendo · 聚会',platform:'Switch',price:7100,old:null,discount:0,trend:'down',cover:'MP',color:'#de593e',hasChinese:true},
    {rank:5,name:'MONSTER HUNTER RISE',cn:'怪物猎人 崛起',meta:'CAPCOM · 动作 RPG',platform:'Switch',price:998,old:3990,discount:75,trend:'up',cover:'MH',color:'#5f6ea4',hasChinese:true},
    {rank:6,name:'ゼルダの伝説 ティアーズ オブ ザ キングダム',cn:'塞尔达传说 王国之泪',meta:'Nintendo · 冒险',platform:'Switch',price:7900,old:null,discount:0,trend:'down',cover:'ZL',color:'#6a9a8b',hasChinese:true},
    {rank:7,name:'HADES',cn:'哈迪斯',meta:'Supergiant · 动作',platform:'Switch',price:1400,old:2800,discount:50,trend:'up',cover:'HD',color:'#ad3b45',hasChinese:true},
    {rank:8,name:'Stardew Valley',cn:'星露谷物语',meta:'ConcernedApe · 模拟',platform:'Switch',price:1480,old:null,discount:0,trend:'same',cover:'SV',color:'#b78642',hasChinese:true},
    {rank:9,name:'オーバークック 王国のフルコース',cn:'胡闹厨房 全都好吃',meta:'Team17 · 聚会',platform:'Switch',price:1640,old:4100,discount:60,trend:'up',cover:'OC',color:'#df6e39',hasChinese:true},
    {rank:10,name:'ホロウナイト',cn:'空洞骑士',meta:'Team Cherry · 动作',platform:'Switch',price:740,old:1480,discount:50,trend:'same',cover:'HK',color:'#506677',hasChinese:true},
    {rank:11,name:'ペルソナ５ ザ・ロイヤル',cn:'女神异闻录5 皇家版',meta:'ATLUS · RPG',platform:'Switch',price:3839,old:7678,discount:50,trend:'down',cover:'P5',color:'#d5363f',hasChinese:false},
    {rank:12,name:'ぷよぷよ™テトリス®２',cn:'噗哟噗哟俄罗斯方块2',meta:'SEGA · 益智',platform:'Switch',price:2303,old:3840,discount:40,trend:'same',cover:'PT',color:'#4b78c5',hasChinese:true}
  ],
  ps5: [],
  ps4: [],
  ps5_jp: []
};
function normalizePsJpGame(g, i) {
  const id = g.id || '';
  const translatedTitle = chineseTitleMap[g.name];
  return {
    id,
    rawName: g.rawName || g.name || '',
    rank: g.rank || (i + 1),
    name: g.name,
    cn: translatedTitle || g.cn || g.name,
    meta: g.meta || 'PlayStation · 热门',
    platform: g.platform || 'PS5',
    price: Number(g.price || 0),
    old: g.old != null ? Number(g.old) : null,
    discount: Number(g.discount || 0),
    trend: g.trend || 'same',
    cover: g.cover || (g.name ? g.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() : 'PS'),
    color: g.color || '#3163b5',
    image: g.image || null,
    wiki: g.wiki || null,
     url: g.url || (id ? `https://store.playstation.com/ja-jp/product/${id}` : 'https://store.playstation.com/ja-jp/pages/browse'),
    hasChinese: Boolean(g.hasChinese || (translatedTitle && translatedTitle !== g.name))
  };
}
function normalizeSteamGame(g, i) {
  const title = g.name || g.title || '';
  return {
    id: g.id || `steam-${i + 1}`,
    rank: g.rank || (i + 1),
    name: title,
    cn: chineseTitleMap[title] || g.cn || g.title || g.name,
    meta: g.meta || 'Steam · 中国区热销',
    platform: 'PC',
    price: g.price == null ? null : Number(g.price),
    old: g.old != null ? Number(g.old) : null,
    discount: Number(g.discount || 0),
    trend: g.trend || 'same',
    cover: g.cover || (g.title || g.name || 'ST').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '').slice(0, 2).toUpperCase() || 'ST',
    color: g.color || '#1b5f82',
    image: g.image || '',
    url: g.url || (g.id ? `https://store.steampowered.com/app/${g.id}/?snr=1_7_7_7000_150_1` : 'https://store.steampowered.com/'),
    isFree: Boolean(g.isFree || (g.price === 0 && !g.old)),
    priceAvailable: g.priceAvailable !== false
  };
}

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
function normalizePsGame(g, i) {
  const id = g.id || (g.url ? (g.url.match(/(?:concept|product)\/([A-Z0-9_-]+)/i) || [])[1] : '') || '';
  let url = g.url || '';
  if (id) {
    url = `https://store.playstation.com/zh-hans-hk/product/${id}`;
  } else if (url && url.includes('/concept/')) {
    url = url.replace('/concept/', '/product/').replace('/zh-hant-hk/', '/zh-hans-hk/');
  } else if (!url) {
    url = 'https://store.playstation.com/zh-hant-hk/pages/browse';
  }
  return {
    id,
    rawName: g.rawName || g.name || '',
    rank: g.rank || (i + 1),
    name: g.name,
    cn: (typeof chineseTitleMap !== 'undefined' && chineseTitleMap[g.name]) ? chineseTitleMap[g.name] : (g.cn || g.name),
    meta: g.meta || 'PlayStation · 热门',
    platform: g.platform || 'PS5',
    price: Number(g.price || 0),
    old: g.old != null ? Number(g.old) : null,
    discount: Number(g.discount || 0),
    trend: g.trend || 'same',
    cover: g.cover || (g.name ? g.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() : 'PS'),
    color: g.color || '#3163b5',
    image: g.image || null,
    wiki: g.wiki || null,
    url
  };
}

/* ================= PS5 游戏同款多版本合并与解析 ================= */
const EDITION_KEYWORDS = [
  'PREMIUM DIGITAL DELUXE EDITION',
  'DIGITAL DELUXE EDITION',
  'プレミアムデジタルデラックスエディション',
  'デジタルアルティメットエディション',
  'サウンドアルティメットエディション',
  'デジタルデラックスエディション',
  'プレミアムデラックスエディション',
  'アルティメットエディション',
  'デラックス・エディション',
  'デラックス エディション',
  'デラックスエディション',
  'ファントムエディション',
  'ラグナロクエディション',
  'ゴールドエディション',
  'パワフルエディション',
  'デジタルデラックス版',
  'デジタル特典版',
  'オフィシャルブック＆原曲コンピレーションアルバム（デジタル版）',
  'Digital Deluxe Edition',
  'Digital Deluxe Upgrade',
  'Digital Deluxe',
  'Premium Edition',
  'Standard Edition',
  'Ultimate Edition',
  'Deluxe Edition',
  'Advanced Edition',
  'Complete Edition',
  'Heretic Edition',
  'Gold Edition',
  'Expansion Bundle',
  'Years 1-2 Fighters Edition',
  '25周年紀念數位豪華版',
  '25周年記念數位豪華版',
  '25周年記念デジタルデラックスエディション',
  '官方資料集（日文）＆音樂精選輯（數位版）',
  '官方資料集＆音樂精選輯（數位版）',
  '官方資料集',
  '數位豪華典藏版',
  '数位豪华典藏版',
  '雙重豪華組合包',
  '豪華組合包',
  '豪华组合包',
  'Double Deluxe Edition',
  '高级豪华版',
  '高級豪華版',
  '數位豪華版',
  '数位豪华版',
  '第 2 年終極版',
  '第2年终极版',
  '第 2 年黃金版',
  '第2年黄金版',
  '諸神黃昏版',
  '诸神黄昏版',
  '究極版',
  '究极版',
  '特別版',
  '特别版',
  'RL Definitive Edition',
  'Definitive Edition',
  'Deluxe',
  'Ultimate',
  '豪華版',
  '豪华版',
  '數位終極版',
  '数位终极版',
  '終極版',
  '终极版',
  '完全版',
  '黃金版',
  '黄金版',
  '標準版',
  '标准版',
  '魅影版',
  '追加內容',
  '追加内容',
  'DLC'
];

function stripLanguageParentheses(str) {
  if (!str) return '';
  return str
    .replace(/\s*[（\(][^）\)]*(?:中文|英文|日文|韓文|韩文|简中|繁中|中韓|中韩|日英|英日|中英|中日|Chinese|English|Japanese|Korean|TC|SC|KR|JP|EN)[^）\)]*[）\)]/gi, '')
    .trim();
}

function extractBaseGame(name) {
  let cleaned = String(name || '').trim();
  const normalizedName = cleaned.normalize('NFKC');
  if (/^原神(?:\s*[-－–—]\s*(?:6周年|六週年))?/i.test(cleaned)) {
    return { base: '原神', edition: '免费游玩', lang: '' };
  }
  if (/^《?EA SPORTS FC[™®]?\s*27》?/i.test(cleaned)) {
    return { base: 'EA SPORTS FC™ 27', edition: /Lite/i.test(cleaned) ? '免费游玩' : /终极|終極|Ultimate/i.test(cleaned) ? '终极版' : '标准版', lang: '' };
  }
  if (/^《?漫威金刚狼》?|^Marvel['’]?s Wolverine/i.test(cleaned)) {
    return { base: '《漫威金刚狼》', edition: /数字豪华|數位豪華|Digital Deluxe/i.test(cleaned) ? '数字豪华版' : '标准版', lang: '' };
  }
  if (/^eFootball™?/i.test(cleaned)) {
    let edition = '标准版';
    if (/免費|免费|free|demo/i.test(cleaned)) edition = '免费游玩';
    else if (/Leo Messi/i.test(cleaned)) edition = /Deluxe/i.test(cleaned) ? 'Leo Messi 豪华版' : 'Leo Messi 版';
    else if (/Lamine Yamal/i.test(cleaned)) edition = /Deluxe/i.test(cleaned) ? 'Lamine Yamal 豪华版' : 'Lamine Yamal 版';
    return { base: 'eFootball™', edition, lang: '' };
  }
  const demo = /(?:\bDEMO\b|体验版|體驗版|体験版|試玩版|试玩版)/i.test(cleaned);
  cleaned = cleaned.replace(/\s*(?:\bDEMO\b|体验版|體驗版|体験版|試玩版|试玩版)\s*$/i, '').trim();
  if (/真[・·]?三[國国][無无][雙双]\s*2/i.test(normalizedName)) {
    return { base: '真·三国无双2 with 猛将传 Remastered', edition: /数字|數位|Digital|豪华|豪華/i.test(normalizedName) ? '数字豪华版' : '标准版', lang: '' };
  }
  if (/使命召[唤喚]|決勝時刻|Call of Duty/i.test(normalizedName)) {
    const modern = normalizedName.match(/(?:现代战争|現代戰爭|Modern Warfare)[®™\s]*(4|IV|III|II)(?![IV\d])/i);
    const blackOps = normalizedName.match(/(?:黑色行动|黑色行動|Black Ops)[®™\s]*(7|6)(?!\d)/i);
    const base = modern?.[1]?.toUpperCase() === '4' || modern?.[1]?.toUpperCase() === 'IV'
      ? '《使命召唤：现代战争 4》'
      : modern?.[1]?.toUpperCase() === 'III' ? '《使命召唤：现代战争 III (2023)》'
      : modern?.[1]?.toUpperCase() === 'II' ? '《使命召唤：现代战争 II (2022)》'
      : blackOps ? `《使命召唤：黑色行动 ${blackOps[1]}》` : null;
    if (base) {
      const edition = /金库|金庫|宝库|寶庫|Vault/i.test(normalizedName) ? '金库版'
        : /跨越世代|跨世代|Cross.Gen/i.test(normalizedName) ? '跨世代版' : '标准版';
      return { base, edition, lang: '' };
    }
  }
  if (/空(?:の軌跡|之轨迹).*the 2nd/i.test(cleaned)) return { base: '空之轨迹 the 2nd', edition: demo ? 'Demo' : '标准版', lang: '' };
  if (/鬼武者.*Way of the Sword|鬼武者.*Way of the Sword/i.test(cleaned)) return { base: '鬼武者 Way of the Sword', edition: demo ? 'Demo' : '标准版', lang: '' };
  if (/暗黑破坏神|暗黑破壞神|Diablo.*IV/i.test(cleaned)) return { base: '《暗黑破坏神® IV》', edition: demo ? 'Demo' : (/(憎恨|時代|合集|合輯)/i.test(cleaned) ? '资料片合集' : '标准版'), lang: '' };
  if (/艾尔登法环|艾爾登法環|ELDEN RING/i.test(cleaned)) return { base: '艾尔登法环', edition: /黄金树|黃金樹/i.test(cleaned) ? (/(数字|數位|典藏|典藏包)/i.test(cleaned) ? '黄金树幽影数字典藏包' : '黄金树幽影版') : '标准版', lang: '' };
  if (/Phantom Blade Zero|影之刃零/i.test(cleaned)) return { base: 'Phantom Blade Zero', edition: demo ? 'Demo' : '标准版', lang: '' };
  if (/Resident Evil Requiem/i.test(cleaned)) return { base: 'Resident Evil Requiem', edition: demo ? 'Demo' : '标准版', lang: '' };
  if (/Resident Evil 4|Resident Evil Remake Trilogy/i.test(cleaned)) return { base: 'Resident Evil 4', edition: demo ? 'Demo' : (/Trilogy/i.test(cleaned) ? '三部曲合集' : '标准版'), lang: '' };
  if (/Gran Turismo 7|跑車浪漫旅\s*7/i.test(cleaned)) return { base: 'Gran Turismo 7', edition: demo ? 'Demo' : '标准版', lang: '' };
  if (/FINAL FANTASY VII REBIRTH|最终幻想VII 重生/i.test(cleaned)) return { base: 'FINAL FANTASY VII REBIRTH', edition: demo ? 'Demo' : '标准版', lang: '' };
  if (/Nioh\s*3|仁王\s*[3３]/i.test(cleaned)) return { base: '仁王3', edition: demo ? 'Demo' : (/(體驗版|体验版)/i.test(name) ? '体验版' : '标准版'), lang: '' };
  if (/三國志\s*14|三国志\s*14/i.test(cleaned)) return { base: '三国志14', edition: /威力加強|威力加强/i.test(cleaned) ? '威力加强版' : '标准版', lang: '' };
  if (/Forza Horizon 5|極限競速[：:]?\s*地平線\s*5|极限竞速[：:]?\s*地平线\s*5/i.test(cleaned)) return { base: 'Forza Horizon 5', edition: /Premium|頂級|顶级/i.test(cleaned) ? '高级版' : '标准版', lang: '' };
  if (/ACE COMBAT.?8|空戰奇兵\s*8|空战奇兵\s*8/i.test(cleaned)) return { base: 'ACE COMBAT 8: WINGS OF THEFT', edition: /Digital|數位|数字/i.test(cleaned) ? '数字版' : '标准版', lang: '' };
  if (/Gran Turismo\s*7|跑車浪漫旅\s*7|跑车浪漫旅\s*7/i.test(cleaned)) return { base: 'Gran Turismo 7', edition: /25周年|25周年紀念|数字豪华|數位豪華/i.test(cleaned) ? '25周年数字豪华版' : '标准版', lang: '' };
  if (/劍星|剑星|Stellar Blade/i.test(cleaned)) return { base: 'Stellar Blade', edition: /完整|Complete/i.test(cleaned) ? '完整版本' : '标准版', lang: '' };
  if (/真[・·]?三國?無雙\s*起源|真[・·]?三国?无双\s*起源/i.test(cleaned)) return { base: '真·三国无双 起源', edition: /數位|数字|Digital/i.test(cleaned) ? '数字版' : '标准版', lang: '' };
  if (/The Blood of Dawnwalker|黎明行者之血/i.test(cleaned)) return { base: 'The Blood of Dawnwalker', edition: /日蝕|日蚀/i.test(cleaned) ? '日蚀版' : '标准版', lang: '' };
  if (/Wo Long 2: Wings of Ember|臥龍2|卧龙2|鳳火連天|凤火连天/i.test(cleaned)) return { base: 'Wo Long 2: Wings of Ember', edition: '标准版', lang: '' };
  if (/赤血沙漠|紅色沙漠|红色沙漠|Crimson Desert/i.test(cleaned)) return {
    base: '红色沙漠',
    edition: /豪華|豪华|Deluxe/i.test(cleaned) ? '豪华版' : '标准版',
    lang: ''
  };
  if (/電馭叛客\s*2077|賽博朋克\s*2077|赛博朋克\s*2077|Cyberpunk\s*2077/i.test(cleaned)) return {
    base: '赛博朋克 2077',
    edition: /終極|终极|Ultimate/i.test(cleaned) ? '终极版' : '标准版',
    lang: ''
  };
  if (/潛水員戴夫|潜水员戴夫|DAVE THE DIVER/i.test(cleaned)) return {
    base: '潜水员戴夫',
    edition: /捆綁|捆绑|綑綁|Bundle|套裝|套装/i.test(cleaned) ? '捆绑包' : '标准版',
    lang: ''
  };
  if (/^Grand Theft Auto VI/i.test(cleaned)) {
    return {
      base: 'Grand Theft Auto VI',
      edition: /終極版|终极版|Ultimate/i.test(cleaned) ? '终极版' : '标准版',
      lang: ''
    };
  }
  // 1. 移除平台后缀，例如 PS4 & PS5, PS4® & PS5®, (PlayStation®5), PS5, PS4 等
  cleaned = cleaned.replace(/\s*(?:PS4\s*(?:&|＆|\/)\s*PS5|PS4[®™]?\s*(?:&|＆|\/)\s*PS5[®™]?|\(PS4\s*(?:&|＆|\/)\s*PS5\)|\(PlayStation[®™]?5\)|\(PS5\)|\(PS4\)|PlayStation[®™]?5|PS5[®™]?|PS4[®™]?)\s*$/gi, '').trim();

  // 2. 提取并移除语言后缀，支持多层括号嵌套
  let lang = '';
  const langMatches = cleaned.match(/[（\(][^）\)]*(?:中|英|日|韓|韩|語|语|文|TC|SC|KR|JP|EN|Chinese|English|Japanese|Korean)[^）\)]*[）\)]/gi);
  if (langMatches) {
    lang = langMatches.map(m => m.replace(/^[（\(]\s*/, '').replace(/\s*[）\)]$/, '').trim()).join(' ');
  }
  cleaned = stripLanguageParentheses(cleaned);
  // 移除常见的前缀修饰，如 "完整版 -"
  cleaned = cleaned.replace(/^(?:完整版|豪華版|终极版|終極版|黃金版|黄金版)\s*[-–—:\s]\s*/i, '').trim();

  // 1. FINAL FANTASY VII REMAKE (包含 PS4 标准版与 PS5 INTERGRADE 强化版)
  if (/^FINAL FANTASY VII REMAKE/i.test(cleaned)) {
    let edition = '标准版';
    if (/INTERGRADE/i.test(cleaned)) {
      edition = 'INTERGRADE';
    }
    return {
      base: 'FINAL FANTASY VII REMAKE',
      edition,
      lang
    };
  }

  // 2. 星球大战：亡命之徒 / 星際大戰：亡命之徒 (统一简繁译名合并为同款游戏)
  if (/星[球際]大[战戰][:：\s]*亡命之徒/i.test(cleaned) || /Star Wars.*Outlaws/i.test(cleaned)) {
    let edition = '标准版';
    if (/黃金|黄金|Gold/i.test(cleaned)) edition = '黄金版';
    else if (/豪華|豪华|Deluxe/i.test(cleaned)) edition = '豪华版';
    else if (/終極|终极|Ultimate/i.test(cleaned)) edition = '终极版';
    return {
      base: '《星球大战：亡命之徒》',
      edition,
      lang
    };
  }

  // 3. Monster Hunter Stories 1+2 (合并 1+2 组合包 与 1+2 豪华组合包)
  if (/Monster Hunter Stories.*1\+2/i.test(cleaned)) {
    let edition = '标准组合包';
    if (/豪華|豪华/i.test(cleaned)) edition = '豪华组合包';
    return {
      base: 'Monster Hunter Stories 1+2 組合包',
      edition,
      lang
    };
  }

  if (cleaned.includes('OCTOPATH TRAVELER 0') || cleaned.includes('歧路旅人0')) {
    return {
      base: '歧路旅人0',
      edition: '數位豪華版',
      lang
    };
  }

  if (/^Monster Hunter.*World/i.test(cleaned)) {
    let edition = '标准版';
    if (/Master Edition.*Digital Deluxe/i.test(cleaned)) edition = '大师版 數位豪華版';
    else if (/Master Edition/i.test(cleaned)) edition = '大师版 (Master Edition)';
    else if (/Iceborne.*Digital Deluxe/i.test(cleaned)) edition = 'Iceborne 數位豪華版 (追加內容)';
    else if (/Iceborne/i.test(cleaned)) edition = 'Iceborne (追加內容)';
    return { base: 'Monster Hunter: World', edition, lang };
  }

  if (/^Monster Hunter Rise/i.test(cleaned)) {
    let edition = '标准版';
    if (/Sunbreak.*雙重豪華/i.test(cleaned)) edition = '崛起 + 曙光 雙重豪華組合包';
    else if (/Sunbreak.*豪華版/i.test(cleaned)) edition = '曙光 豪華版 (追加內容)';
    else if (/Deluxe Edition/i.test(cleaned)) edition = 'Deluxe Edition 豪華版';
    return { base: 'Monster Hunter Rise', edition, lang };
  }

  if (/^ACE COMBAT.*7/i.test(cleaned)) {
    return { base: 'ACE COMBAT™ 7: SKIES UNKNOWN', edition: 'TOP GUN: Maverick 數位版', lang };
  }

  const bookMatch = cleaned.match(/^《([^》]+)》$/);
  if (bookMatch) {
    const inner = bookMatch[1];
    for (const kw of EDITION_KEYWORDS) {
      const idx = inner.toLowerCase().indexOf(kw.toLowerCase());
      if (idx !== -1) {
        const baseInner = inner.slice(0, idx).replace(/[:：\-\+–\s]+$/, '').trim();
        const edInner = inner.slice(idx).trim();
        return { base: `《${baseInner}》`, edition: edInner, lang };
      }
    }
  }

  let detectedEdition = '';
  for (const kw of EDITION_KEYWORDS) {
    const idx = cleaned.toLowerCase().indexOf(kw.toLowerCase());
    if (idx !== -1) {
      detectedEdition = cleaned.slice(idx).trim();
      cleaned = cleaned.slice(0, idx).trim();
      break;
    }
  }

  cleaned = cleaned.replace(/[:：\-\+–\s]+$/, '').trim();
  return { base: cleaned || name, edition: detectedEdition || '标准版', lang };
}

function getLanguageTag(game, lang) {
  const langStr = String(lang || '');
  const nameStr = [game?.rawName || '', game?.name || ''].join(' ');
  const parenMatches = (nameStr.match(/[（\(][^）\)]+[）\)]/g) || []).join(' ');
  const textToScan = [
    langStr,
    parenMatches,
    nameStr.match(/(?:中韓|中韩|日英|英日|中英|中日|簡體中文|繁體中文|中文|日文|英文|韓文|韩文)版?/g)?.join(' ') || ''
  ].join(' ');

  const hasZh = /中|繁體|簡體|繁中|简中|\b(tc|sc|chinese)\b/i.test(textToScan);
  const hasKr = /韓|韩|\b(kr|korean)\b/i.test(textToScan);
  const hasJp = /日|\b(jp|japanese)\b/i.test(textToScan);
  const hasEn = /英|\b(en|english)\b/i.test(textToScan);

  const id = String(game?.id || (game?.url ? (game.url.match(/(?:concept|product)\/([A-Z0-9_-]+)/i) || [])[1] : '') || '');

  // 4 语言组合
  if (hasZh && hasKr && hasJp && hasEn) {
    return { label: '中 / 韩 / 日 / 英版', type: 'zh' };
  }
  // 3 语言组合
  if (hasZh && hasKr && hasEn) {
    return { label: '中 / 韩 / 英版', type: 'zh' };
  }
  if (hasZh && hasJp && hasEn) {
    return { label: '中 / 日 / 英版', type: 'zh' };
  }
  if (hasZh && hasKr && hasJp) {
    return { label: '中 / 韩 / 日版', type: 'zh' };
  }
  if (hasJp && hasEn && hasKr) {
    return { label: '日 / 英 / 韩版', type: 'en' };
  }
  // 2 语言组合
  if ((hasZh && hasKr) || /中韓|中韩/i.test(textToScan)) {
    return { label: '中文 / 韓文版', type: 'zh' };
  }
  if (hasZh && hasEn) {
    return { label: '中文 / 英文版', type: 'zh' };
  }
  if (hasZh && hasJp) {
    return { label: '中文 / 日文版', type: 'zh' };
  }
  if ((hasJp && hasEn) || /日英|英日/i.test(textToScan)) {
    return { label: '日文 / 英文版', type: 'en' };
  }
  if (hasEn && hasKr) {
    return { label: '英文 / 韓文版', type: 'en' };
  }
  if (hasJp && hasKr) {
    return { label: '日文 / 韓文版', type: 'en' };
  }
  // 单语言
  if (hasZh) {
    return { label: '中文版', type: 'zh' };
  }
  if (hasJp) {
    return { label: '日文版', type: 'jp' };
  }
  if (hasEn) {
    return { label: '英文版', type: 'en' };
  }
  if (hasKr) {
    return { label: '韓文版', type: 'zh' };
  }

  // 根据官方商品 SKU 前缀直接标注具体包含的语言（不带港版/全球版等字样）
  if (id.startsWith('HP')) {
    return { label: '中文 / 韓文版', type: 'zh' };
  }
  if (id.startsWith('JP')) {
    return { label: '日文 / 英文版', type: 'en' };
  }
  if (id.startsWith('UP') || id.startsWith('EP')) {
    return { label: '日文 / 英文版', type: 'en' };
  }

  return null;
}

function translateEditionBadge(ed) {
  if (!ed) return '标准版';
  const clean = ed.trim();
  const map = {
    '通常版': '标准版',
    '標準版': '标准版',
    'Standard Edition': '标准版',
    'Deluxe Edition': '豪华版',
    'Digital Deluxe': '数字豪华版',
    'Digital Deluxe Edition': '数字豪华版',
    'Digital Deluxe Upgrade': '数字豪华升级包',
    'Premium Edition': '高级版',
    'Ultimate Edition': '终极版',
    'Advanced Edition': '进阶版',
    'Heretic Edition': '异教徒版',
    'Expansion Bundle': '扩展捆绑包',
    'プレミアムデジタルデラックスエディション': '高级数字豪华版',
    'デジタルアルティメットエディション': '数字终极版',
    'サウンドアルティメットエディション': '原声终极版',
    'デジタルデラックスエディション': '数字豪华版',
    'プレミアムデラックスエディション': '高级豪华版',
    'アルティメットエディション': '终极版',
    'デラックス・エディション': '豪华版',
    'デラックスエディション': '豪华版',
    'デラックス エディション': '豪华版',
    'ファントムエディション': '魅影版',
    'ラグナロクエディション': '诸神黄昏版',
    'ゴールドエディション': '黄金版',
    'パワフルエディション': '强力版',
    'デジタルデラックス版': '数字豪华版',
    'デジタル特典版': '数字特典版',
    'オフィシャルブック＆原曲コンピレーションアルバム（デジタル版）': '设定集与原声带数字版'
  };
  if (map[clean]) return map[clean];
  if (/premium.*deluxe/i.test(clean) || /プレミアム.*デラックス/i.test(clean)) return '高级数字豪华版';
  if (/digital.*deluxe/i.test(clean) || /デジタル.*デラックス/i.test(clean)) return '数字豪华版';
  if (/deluxe/i.test(clean) || /デラックス/i.test(clean)) return '豪华版';
  if (/ultimate/i.test(clean) || /アルティメット/i.test(clean)) return '终极版';
  if (/premium/i.test(clean) || /プレミアム/i.test(clean)) return '高级版';
  if (/standard/i.test(clean) || /通常版|標準版|标准版/i.test(clean)) return '标准版';
  return clean;
}

function groupPs5Games(rawGames, limit = null, isJp = false) {
  const groups = new Map();

  const canonicalGroupKey = value => String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[《》「」『』【】()（）［］\[\]®™:：·,，。!！?？\-–—_\s]/g, '');

  for (let i = 0; i < rawGames.length; i++) {
    const game = rawGames[i];
    const { base, edition, lang } = extractBaseGame(game.name || game.rawName);
    const groupKey = canonicalGroupKey(base);
    const langInfo = isJp ? null : getLanguageTag(game, lang);
    const editionBase = (game.price === 0 || game.isFree) ? '免费游玩' : (isJp ? translateEditionBadge(edition || '标准版') : (edition || (isJp ? '通常版' : '标准版')));
    const finalEdition = langInfo ? `${editionBase} (${langInfo.label})` : editionBase;
    const baseCn = chineseTitleMap[base] || (base === game.name ? (chineseTitleMap[game.name] || game.cn) : base) || base;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        groupId: (isJp ? 'grp-jp-' : 'grp-') + i,
        baseName: base,
        cn: baseCn,
        rank: game.rank,
        color: game.color,
        image: game.image,
        cover: game.cover,
        platform: game.platform,
        meta: game.meta,
        hasChinese: Boolean(game.hasChinese),
        editions: []
      });
    }

    const grp = groups.get(groupKey);
    if (!grp.image && game.image) grp.image = game.image;
    if (game.hasChinese) grp.hasChinese = true;
    if (isJp && (!grp.cn || grp.cn === base) && baseCn) grp.cn = baseCn;

    // 防止同一个商品 SKU 在同一个组内重复出现
    if (!grp.editions.some(e =>
      (e.id && game.id && e.id === game.id) ||
      (e.name === game.name && Number(e.price) === Number(game.price) && e.editionName === finalEdition)
    )) {
      const editionCn = chineseTitleMap[game.name] || game.cn || game.name;
      grp.editions.push({
        ...game,
        cn: editionCn,
        editionBadge: isJp ? translateEditionBadge(editionBase) : editionBase,
        editionName: finalEdition,
        langLabel: langInfo?.label || '',
        langType: langInfo?.type || '',
        hasChinese: Boolean(game.hasChinese)
      });
    }
  }

  let result = Array.from(groups.values()).map(grp => {
    // 每款游戏只选普通版；同有 PS5 和 PS4 商品时优先选 PS5。
    grp.editions.sort((a, b) => a.price - b.price);
    const freeEdition = grp.editions.find(e => Number(e.price) === 0 || e.isFree || /demo|体验版|體驗版|体験版|试玩版|試玩版/i.test(`${e.editionBadge || ''} ${e.editionName || ''}`));
    const paidEditions = grp.editions.filter(e => {
      const title = `${e.name || ''} ${e.editionBadge || ''}`;
      return e.price > 0 && /^(?:标准版|通常版|標準版|Standard Edition)$/i.test(e.editionBadge || '')
        && !/\b(?:Lite|Demo|Trial|DLC)\b|体验版|體驗版|体験版|试玩版|試玩版|追加内容|追加內容|原石|创世结晶|創世結晶/i.test(title);
    }).sort((a, b) => {
      const platformPriority = e => e.platform === 'PS5' ? 0 : e.platform?.includes('PS5') ? 1 : 2;
      return platformPriority(a) - platformPriority(b) || a.price - b.price || a.rank - b.rank;
    });
    const effectiveEditions = (grp.baseName === '原神' && freeEdition ? [] : paidEditions).slice(0, 1);
    const primaryEdition = effectiveEditions[0] || freeEdition || grp.editions[0];
    if (!effectiveEditions.length && !freeEdition) return null;
    const displayEditions = primaryEdition ? [primaryEdition] : [];
    const prices = (effectiveEditions.length ? effectiveEditions : displayEditions).map(e => e.price).filter(p => typeof p === 'number' && !isNaN(p));
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const maxDiscount = effectiveEditions.length ? Math.max(...effectiveEditions.map(e => e.discount || 0)) : 0;
    const bestDealEdition = effectiveEditions.find(e => e.discount === maxDiscount) || primaryEdition;
    const bestOld = effectiveEditions.map(e => e.old).filter(Boolean);
    const maxOld = bestOld.length ? Math.max(...bestOld) : null;
    const isDemoEdition = freeEdition && /\b(?:Demo|Trial)\b|体验版|體驗版|体験版|试玩版|試玩版/i.test(`${freeEdition.name || ''} ${freeEdition.rawName || ''} ${freeEdition.editionName || ''}`);
    const freeName = isDemoEdition ? `${grp.baseName} Demo` : /\bLite\b/i.test(freeEdition?.name || '') ? freeEdition.name : grp.baseName;
    const freeCn = isDemoEdition ? `${grp.cn || grp.baseName} Demo` : /\bLite\b/i.test(freeEdition?.name || '') ? freeEdition.cn : (grp.cn || grp.baseName);
    const freeGame = freeEdition ? {
      ...freeEdition,
      id: freeEdition.id,
      groupId: grp.groupId,
      name: freeName,
      cn: freeCn,
      rank: grp.rank,
      platform: freeEdition.platform || grp.platform,
      image: freeEdition.image || grp.image,
      cover: freeEdition.cover || grp.cover,
      color: freeEdition.color || grp.color,
      isFree: true,
      price: 0,
      discount: 0,
      old: null,
      url: freeEdition.url
    } : null;

    return {
      id: (bestDealEdition || primaryEdition).id,
      groupId: grp.groupId,
      editions: displayEditions,
      rank: Math.min(...grp.editions.map(e => e.rank)),
      name: grp.baseName,
      cn: grp.cn || grp.baseName,
      meta: (bestDealEdition || primaryEdition).meta || grp.meta,
      platform: (bestDealEdition || primaryEdition).platform || grp.platform,
      price: minPrice,
      maxPrice: maxPrice > minPrice ? maxPrice : null,
      old: maxOld,
      discount: maxDiscount,
      color: grp.color,
      cover: grp.cover,
      image: (bestDealEdition || primaryEdition).image || grp.image,
      trend: (bestDealEdition || primaryEdition).trend || 'same',
      url: (bestDealEdition || primaryEdition).url,
      isGroup: false,
      primaryGame: bestDealEdition || primaryEdition,
      hasFreeEdition: Boolean(freeGame),
      freeGame,
      isFree: Boolean((bestDealEdition || primaryEdition).isFree || Number((bestDealEdition || primaryEdition).price) === 0),
      editionBadge: (bestDealEdition || primaryEdition).editionBadge,
      hasChinese: grp.hasChinese || grp.editions.some(e => e.hasChinese)
    };
  }).filter(Boolean);

  // 按榜单自然排名（首次出现的最佳排名）排序
  result.sort((a, b) => a.rank - b.rank);

  // 如果指定了限制数量（如严格前100款游戏），在此截断
  if (typeof limit === 'number' && limit > 0) {
    result = result.slice(0, limit);
  }

  // 港服保留官方浏览页父项的位置；同一父项下的不同游戏可共享位置。
  return result.map((g, idx) => ({
    ...g,
    rank: isJp ? idx + 1 : g.rank
  }));
}

function preparePsDatasets(rawList) {
  const normalized = (rawList || []).map(normalizePsGame);
  datasets.ps5_all = normalized;
  const ps5Raw = normalized.filter(g => g.platform === 'PS5' || g.platform === 'PS4 / PS5');
  datasets.ps5 = groupPs5Games(ps5Raw, 200, false);
  datasets.ps5_with_ps4 = groupPs5Games(normalized, 200, false);
  datasets.ps4 = groupPs5Games(normalized, null, false).filter(g => g.platform === 'PS4');
}

function preparePsJpDatasets(rawList) {
  const normalized = (rawList || []).map(normalizePsJpGame);
  datasets.ps5_jp_all = normalized;
  const ps5Raw = normalized.filter(g => g.platform === 'PS5' || g.platform === 'PS4 / PS5' || !g.platform || g.platform.includes('PS5'));
  datasets.ps5_jp = groupPs5Games(ps5Raw, 200, true);
  datasets.ps5_jp_with_ps4 = groupPs5Games(normalized, 200, true);
  datasets.ps4_jp = groupPs5Games(normalized, null, true).filter(g => g.platform === 'PS4');
}

const PS5_STORAGE_KEY = 'game-pulse-ps5-v10';
try {
  // 彻底清理历史缓存
  localStorage.removeItem('game-pulse-ps5');
  localStorage.removeItem('game-pulse-ps5-v2');
  localStorage.removeItem('game-pulse-ps5-v3');
  localStorage.removeItem('game-pulse-ps5-v4');
  localStorage.removeItem('game-pulse-ps5-v5');
  localStorage.removeItem('game-pulse-ps5-v6');
  localStorage.removeItem('game-pulse-ps5-v7');
  localStorage.removeItem('game-pulse-ps5-v8');
  localStorage.removeItem('game-pulse-ps5-v9');
} catch {}

const savedPs5 = (() => {
  try {
    const cached = JSON.parse(localStorage.getItem(PS5_STORAGE_KEY));
    if (cached?.games?.some(g => g.image && g.image.includes('e0364b3089bbbad7e0a04f87cab6c273172515a134efdf88'))) {
      localStorage.removeItem(PS5_STORAGE_KEY);
      return null;
    }
    return cached;
  } catch { return null; }
})();

preparePsDatasets(savedPs5?.games?.length ? savedPs5.games : (window.PS5_HK_GAMES || window.PS5_GAMES || []));
let ps5Status = savedPs5?.status || {
  count: datasets.ps5.length,
  officialLimit: 200,
  updatedAt: new Date().toISOString(),
  stale: !savedPs5,
  sourceType: 'PlayStation Store 港服官方'
};

const PS5_JP_STORAGE_KEY = 'game-pulse-ps5-jp-v1';
const savedPs5Jp = (() => {
  try { return JSON.parse(localStorage.getItem(PS5_JP_STORAGE_KEY)); } catch { return null; }
})();
preparePsJpDatasets(savedPs5Jp?.games?.length ? savedPs5Jp.games : (window.PS5_JP_GAMES || []));
let ps5JpStatus = savedPs5Jp?.status || {
  count: datasets.ps5_jp.length,
  officialLimit: 200,
  updatedAt: new Date().toISOString(),
  stale: !savedPs5Jp,
  sourceType: 'PlayStation Store 日服官方'
};

const savedSteam = (() => {
  try { return JSON.parse(localStorage.getItem('game-pulse-steam')); } catch { return null; }
})();
datasets.steam = (savedSteam?.games?.length ? savedSteam.games : (window.STEAM_CN_GAMES || [])).map(normalizeSteamGame);
let steamStatus = savedSteam?.status || {
  count: datasets.steam.length,
  officialLimit: 200,
  updatedAt: new Date().toISOString(),
  stale: !savedSteam,
  sourceType: 'Steam 官方热销榜'
};
const savedSteamGlobal = (() => {
  try { return JSON.parse(localStorage.getItem('game-pulse-steam-global')); } catch { return null; }
})();
datasets.steam_global = (savedSteamGlobal?.games?.length ? savedSteamGlobal.games : (window.STEAM_GLOBAL_GAMES || [])).map(normalizeSteamGame);
let steamGlobalStatus = savedSteamGlobal?.status || {
  count: datasets.steam_global.length,
  officialLimit: 100,
  updatedAt: null,
  stale: true,
  sourceType: 'Steam 官方全球热销榜'
};

function formatSourceTime(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '';
  const now = new Date();
  const isToday = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const sec = String(d.getSeconds()).padStart(2, '0');
  if (isToday) {
    return `今天 ${h}:${min}:${sec}`;
  }
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}-${day} ${h}:${min}`;
}

const apiBase = (
  window.GAME_PULSE_CONFIG?.apiBase ||
  (location.protocol.startsWith('http') ? location.origin : 'http://localhost:8787')
).replace(/\/$/, '');
async function syncCollectorRefreshMinutes({ write = false } = {}) {
  try {
    const response = await fetch(`${apiBase}${write ? '/api/settings' : '/health'}`, {
      method: write ? 'POST' : 'GET',
      headers: write ? { 'content-type': 'application/json' } : undefined,
      body: write ? JSON.stringify({ refreshMinutes: state.interval }) : undefined,
      cache: 'no-store'
    });
    const payload = await response.json();
    if (!response.ok || ![5, 15, 30, 60].includes(Number(payload.refreshMinutes))) return;
    if (!write) {
      state.interval = Number(payload.refreshMinutes);
      scheduleNextRefresh();
      const select = $('#intervalSelect');
      if (select) select.value = String(state.interval);
      saveSettings();
    }
  } catch {}
}
function normalizeGame(game){
  const labelDiscount=Number(String(game.saleLabel||'').match(/(\d+)\s*%/)?.[1]||0),discount=game.discount||labelDiscount;
  const old=game.old||(discount&&game.price?Math.round(game.price/(1-discount/100)):null);
  return {
    ...game,
    image: /^(?:\/)?assets\/nintendo-hk\//.test(game.image || '')
      ? `${apiBase}/${game.image.replace(/^\//, '')}` : game.image,
    discount,
    old,
    cn: chineseTitleMap[game.name]||game.cn||game.name,
    meta: '数字版',
    editionBadge: '数字版'
  };
}
const initialNintendo=window.NINTENDO_RANKINGS||{};
for(const platform of ['switch1','switch2','switch1_hk','switch2_hk']){
  if(initialNintendo[platform]?.games?.length){
    datasets[platform]=initialNintendo[platform].games.map(normalizeGame);
  }
}
const nintendoStatus=Object.fromEntries(['switch1','switch2','switch1_hk','switch2_hk'].map(platform=>[
  platform,
  initialNintendo[platform]?{count:initialNintendo[platform].count,officialLimit:initialNintendo[platform].officialLimit,updatedAt:initialNintendo[platform].updatedAt,stale:true,sourceType:initialNintendo[platform].sourceType}:null
]));

async function fetchNintendoRanking(platform,{force=false}={}){
  const storageKey = platform.endsWith('_hk') ? 'game-pulse-' + platform + '-hd-v1' : 'game-pulse-' + platform;
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),force?120000:30000);
  try{
    const url=`${apiBase}/api/nintendo/rankings?platform=${platform}${force?'&refresh=1':''}`;
    const response=await fetch(url,{cache:'no-store',signal:controller.signal});
    const payload=await response.json();
    if(!response.ok||!payload.ok||!Array.isArray(payload.games)||!payload.games.length)throw new Error(payload.error||'榜单接口返回异常');
    datasets[platform]=payload.games.map(normalizeGame);
    if (!payload.stale) recordAllCurrentGames(platform);
    nintendoStatus[platform]={count:payload.count||payload.games.length,officialLimit:payload.officialLimit||payload.games.length,updatedAt:payload.updatedAt,stale:Boolean(payload.stale),sourceType:payload.sourceType};
    try{localStorage.setItem(storageKey,JSON.stringify({games:datasets[platform],status:nintendoStatus[platform]}))}catch{}
    return !payload.stale;
  }catch(error){
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey));
      if(saved?.games?.length){datasets[platform]=saved.games.map(normalizeGame);nintendoStatus[platform]={...saved.status,stale:true}}
    }catch{}
    console.warn(`${platform} 榜单刷新失败：`,error.message);
    return false;
  }finally{clearTimeout(timer)}
}

async function fetchPs5Ranking({force=false}={}){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),force?120000:15000);
  try{
    const url=`${apiBase}/api/ps5/rankings${force?'?refresh=1':''}`;
    const response=await fetch(url,{cache:'no-store',signal:controller.signal});
    const payload=await response.json();
    if(!response.ok||!payload.ok||!Array.isArray(payload.games)||!payload.games.length)throw new Error(payload.error||'PlayStation 榜单接口返回异常');
    preparePsDatasets(payload.games);
    if (!payload.stale) {
      recordAllCurrentGames('ps5');
      recordAllCurrentGames('ps4');
    }
    ps5Status={count:datasets.ps5.length,officialLimit:200,updatedAt:payload.updatedAt||new Date().toISOString(),stale:Boolean(payload.stale),sourceType:payload.sourceType||'PlayStation Store 港服官方'};
    try{localStorage.setItem(PS5_STORAGE_KEY,JSON.stringify({games:payload.games,status:ps5Status}))}catch{}
    return !payload.stale;
  }catch(error){
    try{
      const saved=JSON.parse(localStorage.getItem(PS5_STORAGE_KEY));
      preparePsDatasets(saved?.games?.length ? saved.games : (window.PS5_HK_GAMES || window.PS5_GAMES || []));
      ps5Status={...(saved?.status || ps5Status),stale:true};
    }catch{}
    console.warn('PS5 榜单刷新失败：',error.message);
    return false;
  }finally{clearTimeout(timer)}
}

async function fetchPs5JpRanking({force=false}={}){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),force?40000:15000);
  try{
    const url=`${apiBase}/api/ps5-jp/rankings${force?'?refresh=1':''}`;
    const response=await fetch(url,{cache:'no-store',signal:controller.signal});
    const payload=await response.json();
    if(!response.ok||!payload.ok||!Array.isArray(payload.games)||!payload.games.length)throw new Error(payload.error||'PlayStation 日服榜单接口返回异常');
    preparePsJpDatasets(payload.games);
    if (!payload.stale) recordAllCurrentGames('ps5_jp');
    ps5JpStatus={count:datasets.ps5_jp.length,officialLimit:200,updatedAt:payload.updatedAt||new Date().toISOString(),stale:Boolean(payload.stale),sourceType:payload.sourceType||'PlayStation Store 日服官方'};
    try{localStorage.setItem(PS5_JP_STORAGE_KEY,JSON.stringify({games:payload.games,status:ps5JpStatus}))}catch{}
    return !payload.stale;
  }catch(error){
    try{
      const saved=JSON.parse(localStorage.getItem(PS5_JP_STORAGE_KEY));
      preparePsJpDatasets(saved?.games?.length ? saved.games : (window.PS5_JP_GAMES || []));
      ps5JpStatus={...(saved?.status||ps5JpStatus),stale:true};
    }catch{}
    console.warn('PS5 日服榜单刷新失败：',error.message);
    return false;
  }finally{clearTimeout(timer)}
}

async function fetchSteamRanking({force=false,region='cn'}={}){
  const global=region==='global';
  const key=global?'steam_global':'steam';
  const storageKey=global?'game-pulse-steam-global':'game-pulse-steam';
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),force?40000:15000);
  try{
    const url=`${apiBase}${global?'/api/steam-global/rankings':'/api/steam/rankings'}${force?'?refresh=1':''}`;
    const response=await fetch(url,{cache:'no-store',signal:controller.signal});
    const payload=await response.json();
    if(!response.ok||!payload.ok||!Array.isArray(payload.games)||!payload.games.length)throw new Error(payload.error||'Steam 榜单接口返回异常');
    datasets[key]=payload.games.map(normalizeSteamGame);
    if (!payload.stale) recordAllCurrentGames(key);
    const status={count:payload.count||payload.games.length,officialLimit:payload.officialLimit||(global?100:200),updatedAt:payload.updatedAt||new Date().toISOString(),stale:Boolean(payload.stale),sourceType:payload.sourceType||(global?'Steam 官方全球热销榜':'Steam Store 中国区官方榜单')};
    if(global) steamGlobalStatus=status;
    else steamStatus=status;
    try{localStorage.setItem(storageKey,JSON.stringify({games:datasets[key],status}))}catch{}
    return !payload.stale;
  }catch(error){
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey));
      if(saved?.games?.length) datasets[key]=saved.games.map(normalizeSteamGame);
      if(global) steamGlobalStatus={...(saved?.status||steamGlobalStatus),stale:true};
      else steamStatus={...(saved?.status||steamStatus),stale:true};
    }catch{}
    console.warn(`Steam ${global?'全球':'中国区'}榜单刷新失败：`,error.message);
    return false;
  }finally{clearTimeout(timer)}
}

const SETTINGS_STORAGE_KEY = 'game-pulse-settings-v1';
const savedSettings = (() => {
  try { return JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY)); } catch { return null; }
})();
const initialAuto = typeof savedSettings?.auto === 'boolean' ? savedSettings.auto : true;
const initialInterval = [5, 15, 30, 60].includes(Number(savedSettings?.interval)) ? Number(savedSettings.interval) : 15;

const savedRates=(()=>{try{return JSON.parse(localStorage.getItem('game-pulse-rates'))}catch{return null}})();
const state={platform:'switch1',view:'ranking',nintendoStore:'jp',psStore:'hk',steamRegion:'cn',includePs4:true,includeFreeInDeals:false,page:1,filteredCount:0,pageTotal:1,query:'',sort:'rank',auto:initialAuto,interval:initialInterval,remaining:initialInterval*60,rates:{JPY:0.042728,HKD:0.856469,CNY:1,...savedRates?.rates},rateUpdated:savedRates?.updated||null,rateSource:savedRates?.source||'备用汇率',rateStale:!savedRates};
let nextRefreshAt = Date.now() + state.interval * 60 * 1000;
let refreshInProgress = false;
const toastQueue = [];
let toastShowing = false;
function showNextRefreshToast() {
  if (toastShowing || !toastQueue.length) return;
  const toast = $('#toast');
  if (!toast) return;
  toastShowing = true;
  const { title, detail } = toastQueue.shift();
  toast.querySelector('b').textContent = title;
  toast.querySelector('small').textContent = detail;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toastShowing = false;
      showNextRefreshToast();
    }, 350);
  }, 2600);
}
function queueRefreshToast(group, results) {
  const updated = results.filter(result => result.ok).length;
  const title = updated === results.length ? `${group} 已更新` : updated ? `${group} 部分更新` : `${group} 更新失败`;
  const detail = results.map(result => `${result.label}：${result.ok ? '已更新' : '缓存/失败'}`).join(' · ');
  toastQueue.push({ title, detail });
  showNextRefreshToast();
}
function scheduleNextRefresh() {
  nextRefreshAt = Date.now() + state.interval * 60 * 1000;
  state.remaining = state.interval * 60;
}
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const isPsPlatform = p => p === 'ps5' || p === 'ps4';
const isPsHk = () => (state.platform === 'ps5' && state.psStore === 'hk') || state.platform === 'ps4';
const isPsJp = () => state.platform === 'ps5' && state.psStore === 'jp';
const activeSteamKey = () => state.steamRegion === 'global' ? 'steam_global' : 'steam';
const activeNintendoKey = () => state.nintendoStore === 'hk' ? `${state.platform}_hk` : state.platform;
const isNintendoHk = () => state.platform.startsWith('switch') && state.nintendoStore === 'hk';
const activeHistoryKey = () => state.platform.startsWith('switch') ? activeNintendoKey() : state.platform === 'steam' ? activeSteamKey() : state.platform === 'ps5' ? `ps5_${state.psStore}` : state.platform;
const currency=()=>isPsHk()||isNintendoHk()?'HKD':state.platform==='steam'?'CNY':'JPY';
const money=n=>isPsHk()||isNintendoHk()?`HK$ ${Number(n).toFixed(n%1?2:0)}`:state.platform==='steam'?(n===0?'免费':`¥ ${Number(n).toLocaleString('zh-CN',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2})}`):`¥ ${Math.round(n).toLocaleString('ja-JP')}`;
const cny=n=>`CN¥ ${(n*state.rates[currency()]).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2})}`;

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
      auto: state.auto,
      interval: state.interval
    }));
  } catch (e) {
    console.warn('保存刷新设置失败：', e);
  }
}

/* ================= 历史价格存储与阶梯走势图逻辑 ================= */
/* ================= 真实价格追踪与变动记录逻辑 ================= */
const HISTORY_STORAGE_KEY = 'game-pulse-real-price-history-v1';

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function getGameKey(game, platform) {
  const plat = platform || (state.platform === 'ps5' ? `ps5_${state.psStore}` : state.platform) || 'unknown';
  const idOrName = game.id || game.name;
  return `${plat}:${idOrName}`;
}

function loadAllPriceHistory() {
  try {
    const data = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || {};
    let dirty = false;
    // 彻底清除之前因名字冲突混淆的错误记录
    if (data['ps5:《電馭叛客 2077》']) {
      delete data['ps5:《電馭叛客 2077》'];
      dirty = true;
    }
    if (data['ps5:Dead Island 2']) {
      delete data['ps5:Dead Island 2'];
      dirty = true;
    }
    for (const k of Object.keys(data)) {
      if (!Array.isArray(data[k])) continue;
      const hasPositive = data[k].some(r => Number(r?.price) > 0);
      const byDay = new Map();
      let keyDirty = false;
      for (const record of data[k]) {
        const day = String(record?.date || '').slice(0, 10);
        const price = Number(record?.price);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(price) || (hasPositive && price <= 0)) {
          keyDirty = true;
          continue;
        }
        if (byDay.has(day) || record.date !== day || record.price !== price) keyDirty = true;
        byDay.set(day, { ...record, date: day, price });
      }
      const cleanList = [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date));
      if (cleanList.length !== data[k].length || cleanList.some((record, index) => record.date !== data[k][index]?.date)) keyDirty = true;
      if (keyDirty) {
        data[k] = cleanList;
        dirty = true;
      }
    }
    if (dirty) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(data));
    }
    return data;
  } catch {
    return {};
  }
}

function saveAllPriceHistory(histories) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(histories));
  } catch (e) {
    console.warn('保存价格历史失败：', e);
  }
}

// 纯真实记录：不生成任何虚构历史。首次建档时，仅记录当前真实采集到的官方价格与当前年月日
function getGamePriceHistory(game, platform) {
  const all = loadAllPriceHistory();
  const key = getGameKey(game, platform);
  const today = new Date().toISOString().slice(0, 10);
  const currentPrice = Number(game.price) || 0;

  if (!Array.isArray(all[key]) || !all[key].length) {
    return [{
      date: today,
      price: currentPrice,
      old: game.old || currentPrice,
      note: '等待实时采集建档'
    }];
  }
  return all[key];
}

// 真实变动追踪：仅当检测到当前官方价格与上次记录的价格不同时，才向本地追加写入真实记录！
function recordGamePrice(game, platform) {
  if (game.price == null || game.priceAvailable === false) return;
  const all = loadAllPriceHistory();
  const key = getGameKey(game, platform);
  const today = new Date().toISOString().slice(0, 10);
  const currentPrice = Number(game.price) || 0;

  let changed = false;
  if (!all[key] || !Array.isArray(all[key]) || !all[key].length) {
    all[key] = [{
      date: today,
      price: currentPrice,
      old: game.old || currentPrice,
      note: '首次采集建档基准'
    }];
    changed = true;
  } else {
    const list = all[key];
    const last = list[list.length - 1];
    // 严格检测价格变动
    if (last.price !== currentPrice) {
      const record = {
        date: today,
        price: currentPrice,
        old: game.old || currentPrice,
        note: currentPrice < last.price ? '官方降价促销' : '价格上调/恢复原价'
      };
      if (last.date === today) list[list.length - 1] = record;
      else list.push(record);
      changed = true;
    }
  }
  if (changed) saveAllPriceHistory(all);
}

function recordAllCurrentGames(platform) {
  const list = datasets[platform] || [];
  for (const g of list) {
    recordGamePrice(g, platform);
  }
}

function renderMiniSparklineSvg(history) {
  if (!history || !history.length) {
    return `<svg class="mini-sparkline" viewBox="0 0 72 16"><line x1="2" y1="8" x2="70" y2="8" stroke="#31524b" stroke-width="1.8" stroke-dasharray="3 3"/></svg>`;
  }
  const prices = history.map(h => h.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;
  const w = 72, h = 14, pad = 1;

  // 刚开始真实建档（只有1个点）或价格未发生变动时，呈现平直监控基准线
  if (history.length < 2 || range === 0) {
    return `<svg class="mini-sparkline" viewBox="0 0 72 16" title="价格平稳监测中"><line x1="2" y1="8" x2="62" y2="8" stroke="#48c9a8" stroke-width="1.8"/><circle cx="66" cy="8" r="2.5" fill="#48c9a8"/></svg>`;
  }

  const step = w / (history.length - 1);
  let d = '';
  for (let i = 0; i < history.length; i++) {
    const x = i * step;
    const y = pad + (1 - (history[i].price - min) / range) * (h - pad * 2);
    if (i === 0) {
      d += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    } else {
      const prevY = pad + (1 - (history[i - 1].price - min) / range) * (h - pad * 2);
      d += ` L ${x.toFixed(1)} ${prevY.toFixed(1)} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  const isLowest = history[history.length - 1].price === min;
  const strokeColor = isLowest ? '#a2e005' : '#48c9a8';
  return `<svg class="mini-sparkline" viewBox="0 0 72 16"><path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

function trendCell(g) {
  if (g.priceAvailable === false) return '<span class="game-meta">暂无国区价格记录</span>';
  const history = getGamePriceHistory(g, activeHistoryKey());
  const sparkSvg = renderMiniSparklineSvg(history);
  const trendPill = g.discount
    ? `<span class="discount-pill">-${g.discount}%</span>`
    : isPsPlatform(state.platform) ? '<span class="trend-pill same">价格记录</span>'
    : `<span class="trend-pill ${g.trend}">${g.trend === 'up' ? '↑ 上升' : g.trend === 'down' ? '↓ 下降' : '— 持平'}</span>`;
  return `
    <div class="spark-cell" data-id="${escapeHtml(g.id || '')}" data-game="${escapeHtml(g.name)}" title="点击查看历史价格走势折线图与记录">
      <div class="spark-meta">
        ${trendPill}
        <span class="spark-hint">走势 ↗</span>
      </div>
      ${sparkSvg}
    </div>
  `;
}

function renderStepChart(history, game, container) {
  if (!container) return;
  if (!history || !history.length) {
    container.innerHTML = '<div style="display:grid;place-items:center;height:100%;color:#687a80">暂无价格监测数据</div>';
    return;
  }

  const svgW = 760;
  const svgH = 220;
  const padL = 25;
  const padR = 75;
  const padT = 24;
  const padB = 34;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const rightX = padL + chartW;

  const prices = history.map(h => h.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices, game.old || minP);
  const pMargin = (maxP - minP) * 0.2 || (minP * 0.12) || 20;
  const yMin = Math.max(0, Math.floor(minP - pMargin));
  const yMax = Math.ceil(maxP + pMargin);
  const pRange = yMax - yMin || 100;

  const getY = (p) => padT + (1 - (p - yMin) / pRange) * chartH;
  const yLowest = getY(minP);
  const gradId = 'chartGrad_' + Math.random().toString(36).slice(2, 7);

  // Horizontal price grid lines (4 ticks)
  let gridLines = '';
  for (let i = 0; i <= 3; i++) {
    const pVal = Math.round(yMin + (pRange * i) / 3);
    const yVal = getY(pVal);
    gridLines += `
      <line x1="${padL}" y1="${yVal.toFixed(1)}" x2="${rightX}" y2="${yVal.toFixed(1)}" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      <text x="${rightX + 8}" y="${(yVal + 4).toFixed(1)}" fill="#657e88" font-size="10" font-family="'DM Mono', monospace">${money(pVal)}</text>
    `;
  }

  // 纯真实记录：若当前仅有 1 次初始建档记录
  if (history.length === 1) {
    const pt = history[0];
    const yVal = getY(pt.price);
    container.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="none" style="overflow:visible">
        ${gridLines}

        <!-- 当前售价基准水平线 -->
        <line x1="${padL}" y1="${yVal.toFixed(1)}" x2="${rightX}" y2="${yVal.toFixed(1)}" stroke="#a2e005" stroke-width="2.5" />
        <circle cx="${padL + 16}" cy="${yVal.toFixed(1)}" r="5" fill="#a2e005" stroke="#0d171d" stroke-width="2" />
        <text x="${padL + 28}" y="${(yVal - 8).toFixed(1)}" fill="#a2e005" font-size="11" font-family="'DM Mono', monospace" font-weight="600">当前官方真实售价: ${money(pt.price)}</text>

        <!-- 史低参考线 -->
        <line x1="${padL}" y1="${yLowest.toFixed(1)}" x2="${rightX}" y2="${yLowest.toFixed(1)}" stroke="#3898ec" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.9" />
        <text x="${padL + 6}" y="${(yLowest + 14).toFixed(1)}" fill="#3898ec" font-size="10" font-family="'DM Mono', monospace">基准监控点: ${money(minP)}</text>

        <!-- 日期刻度 -->
        <line x1="${padL}" y1="${padT + chartH}" x2="${padL}" y2="${padT + chartH + 4}" stroke="#2a3f4a" stroke-width="1" />
        <text x="${padL}" y="${padT + chartH + 18}" fill="#8ef0d4" font-size="10" font-family="'DM Mono', monospace">${pt.date} (开始建档)</text>
        <text x="${rightX}" y="${padT + chartH + 18}" fill="#6b838e" font-size="10" font-family="'DM Mono', monospace" text-anchor="end">实时监控中</text>
      </svg>
    `;
    return;
  }

  // 记录累积 2 次及以上时的阶梯走势
  const times = history.map(h => new Date(h.date).getTime());
  let minT = Math.min(...times);
  let maxT = Math.max(...times);
  if (minT === maxT) {
    maxT = minT + 86400000;
  }

  const getX = (t) => padL + ((t - minT) / (maxT - minT)) * chartW;

  const points = history.map(h => ({
    date: h.date,
    price: h.price,
    note: h.note || '',
    x: getX(new Date(h.date).getTime()),
    y: getY(h.price)
  }));

  // Build step-after line & area
  let linePath = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  let areaPath = `M ${points[0].x.toFixed(1)} ${(padT + chartH).toFixed(1)} L ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    linePath += ` L ${next.x.toFixed(1)} ${curr.y.toFixed(1)} L ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
    areaPath += ` L ${next.x.toFixed(1)} ${curr.y.toFixed(1)} L ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
  }

  const lastPt = points[points.length - 1];
  if (lastPt.x < rightX) {
    linePath += ` L ${rightX.toFixed(1)} ${lastPt.y.toFixed(1)}`;
    areaPath += ` L ${rightX.toFixed(1)} ${lastPt.y.toFixed(1)}`;
  }
  areaPath += ` L ${rightX.toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;

  // Date ticks on bottom
  let dateTicks = '';
  const tickCount = Math.min(points.length, 5);
  for (let i = 0; i < tickCount; i++) {
    const idx = Math.floor(i * (points.length - 1) / (tickCount - 1 || 1));
    const pt = points[idx];
    dateTicks += `
      <line x1="${pt.x.toFixed(1)}" y1="${padT + chartH}" x2="${pt.x.toFixed(1)}" y2="${padT + chartH + 4}" stroke="#2a3f4a" stroke-width="1" />
      <text x="${pt.x.toFixed(1)}" y="${padT + chartH + 18}" fill="#6b838e" font-size="10" font-family="'DM Mono', monospace" text-anchor="middle">${pt.date.slice(2)}</text>
    `;
  }

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="none" style="overflow:visible">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a2e005" stop-opacity="0.28" />
          <stop offset="85%" stop-color="#a2e005" stop-opacity="0.03" />
          <stop offset="100%" stop-color="#a2e005" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Background Grid & Ticks -->
      ${gridLines}
      ${dateTicks}

      <!-- Lowest Price Reference Line (Image 1 blue dashed line) -->
      <line x1="${padL}" y1="${yLowest.toFixed(1)}" x2="${rightX}" y2="${yLowest.toFixed(1)}" stroke="#3898ec" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.9" />
      <text x="${padL + 6}" y="${(yLowest - 5).toFixed(1)}" fill="#3898ec" font-size="10" font-family="'DM Mono', monospace" font-weight="600">史低参考: ${money(minP)}</text>

      <!-- Area Fill -->
      <path d="${areaPath}" fill="url(#${gradId})" />

      <!-- Step Line (Image 1 green step line) -->
      <path d="${linePath}" fill="none" stroke="#a2e005" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Hover Cursor Group -->
      <g id="chartHoverGroup" style="display:none">
        <line id="hoverLine" x1="0" y1="${padT}" x2="0" y2="${padT + chartH}" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-dasharray="2 2" />
        <circle id="hoverDot" cx="0" cy="0" r="5" fill="#a2e005" stroke="#0d171d" stroke-width="2" />
      </g>
    </svg>
    <div id="chartTooltip" style="position:absolute;display:none;pointer-events:none;background:#14232c;border:1px solid #314d5c;border-radius:6px;padding:6px 10px;font-size:11px;font-family:'DM Mono',monospace;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.6);z-index:10;transform:translate(-50%, -120%);white-space:nowrap">
      <div id="tipDate" style="color:#8ba3ad;font-size:10px"></div>
      <div id="tipPrice" style="color:#a2e005;font-weight:700;font-size:13px;margin-top:2px"></div>
    </div>
  `;

  const hoverGroup = container.querySelector('#chartHoverGroup');
  const hoverLine = container.querySelector('#hoverLine');
  const hoverDot = container.querySelector('#hoverDot');
  const tooltip = container.querySelector('#chartTooltip');

  container.onmousemove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseSvgX = ((e.clientX - rect.left) / rect.width) * svgW;
    if (mouseSvgX < padL || mouseSvgX > rightX) {
      hoverGroup.style.display = 'none';
      tooltip.style.display = 'none';
      return;
    }

    let activePoint = points[points.length - 1];
    for (let i = 0; i < points.length - 1; i++) {
      if (mouseSvgX >= points[i].x && mouseSvgX < points[i + 1].x) {
        activePoint = points[i];
        break;
      }
    }

    hoverGroup.style.display = '';
    hoverLine.setAttribute('x1', mouseSvgX.toFixed(1));
    hoverLine.setAttribute('x2', mouseSvgX.toFixed(1));
    hoverDot.setAttribute('cx', mouseSvgX.toFixed(1));
    hoverDot.setAttribute('cy', activePoint.y.toFixed(1));

    tooltip.style.display = 'block';
    tooltip.style.left = `${e.clientX - rect.left}px`;
    tooltip.style.top = `${activePoint.y / svgH * rect.height}px`;
    tooltip.querySelector('#tipDate').textContent = `${activePoint.date} · ${activePoint.note || '记录价格'}`;
    tooltip.querySelector('#tipPrice').innerHTML = `${money(activePoint.price)} ${activePoint.price === minP ? '<span style="color:#3898ec;font-size:10px;margin-left:4px">[史低]</span>' : ''}`;
  };

  container.onmouseleave = () => {
    hoverGroup.style.display = 'none';
    tooltip.style.display = 'none';
  };
}

function openPriceModal(game) {
  const modal = $('#priceHistoryModal');
  if (!modal) return;
  const history = getGamePriceHistory(game, activeHistoryKey());
  const prices = history.map(h => h.price);
  const lowestPrice = Math.min(...prices, game.price);
  const originalPrice = game.old || (game.discount ? Math.round(game.price / (1 - game.discount / 100)) : game.price);

  const modalPlat = $('#modalPlatform');
  if (modalPlat) modalPlat.textContent = game.platform || (isPsPlatform(state.platform) ? (state.platform === 'ps4' ? 'PS4' : 'PS5') : state.platform === 'steam' ? 'Steam' : 'Switch');
  const modalTitle = $('#modalGameTitle');
  if (modalTitle) modalTitle.textContent = game.cn || game.name;
  const modalOrig = $('#modalGameOriginal');
  if (modalOrig) modalOrig.textContent = game.name !== game.cn ? game.name : (game.meta || '');

  const coverEl = $('#modalCover');
  const isSteam = state.platform === 'steam' || game.platform === 'PC';
  const isPs = isPsPlatform(state.platform) || game.platform?.includes('PS');
  if (coverEl) {
    coverEl.className = `modal-cover ${isSteam ? 'steam-cover' : isPs ? 'ps-cover' : ''}`;
    coverEl.innerHTML = game.image
      ? `<img src="${game.image}" alt="${escapeHtml(game.cn)}">`
      : `<span style="background:${game.color || '#3163b5'}">${escapeHtml(game.cover || 'PS')}</span>`;
  }

  const curPriceEl = $('#modalCurrentPrice');
  if (curPriceEl) curPriceEl.textContent = money(game.price);
  const curCnyEl = $('#modalCurrentCny');
  if (curCnyEl) curCnyEl.textContent = state.platform === 'steam' ? (state.steamRegion === 'global' ? '中国区参考价' : '人民币结算') : `≈ ${cny(game.price)}`;

  const lowPriceEl = $('#modalLowestPrice');
  if (lowPriceEl) lowPriceEl.textContent = money(lowestPrice);
  const lowTagEl = $('#modalLowestTag');
  if (lowTagEl) lowTagEl.textContent = game.price <= lowestPrice ? '当前即为史低！' : `较史低高 ${money(game.price - lowestPrice)}`;

  const origPriceEl = $('#modalOriginalPrice');
  if (origPriceEl) origPriceEl.textContent = money(originalPrice);
  const discRateEl = $('#modalDiscountRate');
  if (discRateEl) discRateEl.textContent = game.discount ? `已优惠 ${game.discount}%` : '当前官方定价';

  const recCountEl = $('#modalRecordCount');
  if (recCountEl) recCountEl.textContent = `${history.length} 次真实变动记录`;

  renderStepChart(history, game, $('#chartContainer'));

  const tbody = $('#modalHistoryRows');
  if (tbody) {
    const reversed = [...history].reverse();
    tbody.innerHTML = reversed.map((rec, idx) => {
      const isLowest = rec.price === lowestPrice;
      const cnyVal = state.platform === 'steam' ? '¥ ' + rec.price : cny(rec.price);
      let changeTag = '';
      if (idx === reversed.length - 1) {
        changeTag = `<span style="color:#8ef0d4">● ${rec.note || '首次采集建档基准'}</span>`;
      } else {
        const nextInTime = reversed[idx + 1];
        const diff = rec.price - nextInTime.price;
        const notePrefix = rec.note ? `${rec.note} · ` : '';
        if (diff < 0) {
          const pct = Math.round(Math.abs(diff) / nextInTime.price * 100);
          changeTag = `<span style="color:#ff6d9d">${notePrefix}降价 -${pct}% ${isLowest ? '(史低)' : ''}</span>`;
        } else if (diff > 0) {
          const pct = Math.round(diff / nextInTime.price * 100);
          changeTag = `<span style="color:#8ef0d4">${notePrefix}原价恢复 +${pct}%</span>`;
        } else {
          changeTag = `<span style="color:#657980">${rec.note || '价格持平'}</span>`;
        }
      }
      return `
        <tr>
          <td>${rec.date}</td>
          <td style="color:${isLowest ? '#a2e005' : '#edf7f4'};font-weight:600">${money(rec.price)}</td>
          <td style="color:#9baeb2">${cnyVal}</td>
          <td>${changeTag}</td>
        </tr>
      `;
    }).join('');
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closePriceModal() {
  const modal = $('#priceHistoryModal');
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

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
  const platform=state.platform;
  let targets = [];
  if (platform === 'ps5') {
    const list = state.psStore === 'jp' ? (datasets.ps5_jp || []) : (datasets.ps5 || []);
    targets = list.filter(g => !g.image && !g.imageFailed && g.wiki);
  } else {
    targets = (datasets[platform] || []).filter(g => !g.image && !g.imageFailed && g.wiki);
  }
  if(!targets.length)return;
  await Promise.all(targets.map(async g=>{
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),6000);
    try{
      const r=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(g.wiki)}`,{signal:controller.signal});
      if(!r.ok)throw new Error('cover not found');
      const data=await r.json();
      g.image=data.thumbnail?.source||data.originalimage?.source||null;
      g.imageFailed=!g.image;
    }catch{
      g.imageFailed=true;
    }finally{
      clearTimeout(timer);
    }
  }));
  if(state.platform===platform)render();
}
function currentData(){
  let data;
  if (state.platform === 'ps5') {
    if (state.psStore === 'jp') {
      data = state.includePs4
        ? [...(datasets.ps5_jp_with_ps4 || datasets.ps5_jp || [])]
        : [...(datasets.ps5_jp || [])];
    } else {
      data = state.view === 'ps4'
        ? [...(datasets.ps4 || [])]
        : (state.includePs4 ? [...(datasets.ps5_with_ps4 || datasets.ps5 || [])] : [...(datasets.ps5 || [])]);
    }
  } else if (state.platform === 'ps4') {
    data = [...(datasets.ps4 || [])];
  } else if (state.platform === 'steam') {
    data = [...(datasets[activeSteamKey()] || [])];
  } else {
    data = [...(datasets[state.platform.startsWith('switch') ? activeNintendoKey() : state.platform] || [])];
  }

  if (state.view === 'free') {
    data = data
      .filter(x => x.hasFreeEdition || x.price === 0 || x.isFree)
      .map(x => x.freeGame || x)
      .filter(x => x.price === 0 || x.isFree);
  } else if (state.view === 'deals') {
    data = data.filter(x => x.price > 0 && !x.isFree && x.discount > 0);
  } else if (state.view === 'ps4') {
    // PS4 视图展示 PS4 游戏
  } else {
    // 默认游戏榜只显示付费游戏，免费/Demo 只在免费视图中显示。
    data = data.filter(x => (x.price > 0 || (state.platform === 'steam' && state.steamRegion === 'global' && x.priceAvailable === false)) && !x.isFree);
  }

  if (state.query) {
    data = data.filter(x => {
      const edStr = x.editions ? x.editions.map(e => (e.name || '') + ' ' + (e.editionName || '') + ' ' + (e.langLabel || '') + ' ' + (e.rawName || '')).join(' ') : '';
      const cnTag = x.hasChinese ? '支持中文 中文' : '';
      return (x.cn + x.name + x.meta + (x.platform || '') + ' ' + edStr + ' ' + cnTag).toLowerCase().includes(state.query);
    });
  }
  if (state.sort === 'priceAsc') data.sort((a,b) => a.price - b.price);
  else if (state.sort === 'discount') data.sort((a,b) => b.discount - a.discount || a.rank - b.rank);
  else data.sort((a,b) => a.rank - b.rank);
  state.filteredCount = data.length;
  state.pageTotal = Math.max(1, Math.ceil(data.length / 50));
  state.page = Math.min(state.page, state.pageTotal);
  const start = (state.page - 1) * 50;
  return data.slice(start, start + 50);
}

const priceCell=g=>{
  if (g.priceAvailable === false) {
    return '<div class="price-stack"><span class="price-main">国区未定价</span><span class="price-cny">全球排名仍有效</span></div>';
  }
  if (g.price === 0) {
    return `<div class="price-stack"><span class="price-main" style="color:var(--steam-mint, #38ef7d);font-weight:700">免费游玩</span><span class="price-cny">Free to Play</span></div>`;
  }
  return `<div class="price-stack">${g.discount?`<span class="deal-chip">-${g.discount}%</span>`:''}<span class="price-main">${money(g.price)}</span>${g.old?`<span class="price-old">${money(g.old)}</span>`:''}<span class="price-cny">${state.platform==='steam'?(state.steamRegion==='global'?'中国区参考价':'人民币定价'):`≈ ${cny(g.price)}`}</span></div>`;
};

function groupPriceCell(g) {
  if (g.price === 0 && (!g.maxPrice || g.maxPrice === 0)) {
    return `<div class="price-stack"><span class="price-main" style="color:var(--steam-mint, #38ef7d);font-weight:700">免费游玩</span><span class="price-cny">Free to Play</span></div>`;
  }
  const hasDiscount = g.discount > 0;
  const hasRange = g.maxPrice != null && g.maxPrice > g.price;
  return `
    <div class="price-stack">
      ${hasDiscount ? `<span class="deal-chip">最高 -${g.discount}%</span>` : ''}
      <span class="price-main">${money(g.price)} <small style="font-size:11px;color:#789098;font-weight:normal">起</small></span>
      ${hasRange ? `<span class="price-old" style="text-decoration:none;color:#7e959d;font-size:11px">${money(g.price)} ~ ${money(g.maxPrice)}</span>` : (g.old ? `<span class="price-old">${money(g.old)}</span>` : '')}
      <span class="price-cny">≈ ${cny(g.price)} 起</span>
    </div>
  `;
}

function renderRow(g) {
  const isFreeView = state.view === 'free';
  if (g.isGroup) {
    return `
      <tr class="game-group-row">
        <td><span class="rank ${!isPsPlatform(state.platform)&&g.rank<=3?'top':''}">${String(g.rank).padStart(2,'0')}</span></td>
        <td>
          <div class="game-cell">
            <span class="cover ps-cover" style="background:linear-gradient(135deg,${g.color},#172128)">
              ${g.image ? `<img src="${g.image}" alt="${escapeHtml(g.cn)} 封面" loading="lazy" onerror="this.remove()">` : `<span>${g.cover}</span>`}
            </span>
            <div class="game-copy">
              <span class="game-name">${escapeHtml(stripLanguageParentheses(g.cn))}</span>
              ${g.name !== g.cn ? `<span class="game-original">${escapeHtml(stripLanguageParentheses(g.name))}</span>` : ''}
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px">
                ${isPsJp() ? '' : (g.meta ? `<span class="game-meta">${g.meta}</span>` : '')}
                <button type="button" class="editions-toggle-btn" data-target="drawer-${g.groupId}" aria-expanded="false" title="点击展开/收起该游戏的所有具体版本">
                  <span>包含 ${g.editions.length} 个版本</span>
                  <span class="toggle-arrow">▼</span>
                </button>
                ${g.hasChinese ? `<span class="lang-chip lang-zh">支持中文</span>` : ''}
              </div>
            </div>
          </div>
        </td>
        <td><span class="platform-chip">${g.platform}</span></td>
        <td>${groupPriceCell(g)}</td>
        ${!isFreeView ? `<td>${trendCell(g.primaryGame || g)}</td>` : ''}
        <td><a class="store-link" href="${g.url}" target="_blank" rel="noopener" aria-label="前往官方商店">↗</a></td>
      </tr>
      <tr id="drawer-${g.groupId}" class="edition-drawer-row" hidden>
        <td colspan="${isFreeView ? 5 : 6}" class="edition-drawer-cell">
          <div class="editions-card">
            <div class="editions-card-header">
              <span><b>${escapeHtml(stripLanguageParentheses(g.cn))}</b> · 全部收录版本 (${g.editions.length} 款)</span>
              ${!isFreeView ? '<span style="font-size:11px;color:#78939c">点击「历史价格」可查看专属历史走势</span>' : ''}
            </div>
            <table class="editions-subtable">
              <thead>
                <tr>
                  <th>版本名称</th>
                  <th>适用平台</th>
                  <th>实时售价</th>
                  ${!isFreeView ? '<th class="col-history">历史价格</th>' : ''}
                  <th>商店</th>
                </tr>
              </thead>
              <tbody>
    ${g.editions.map(e => `
                  <tr>
                    <td>
                      <div class="edition-tag">
                        <span class="edition-badge">${escapeHtml(e.editionBadge || e.editionName)}</span>
                        ${e.langLabel ? `<span class="lang-chip lang-${e.langType}">${escapeHtml(e.langLabel)}</span>` : ''}
                        ${(isPsJp() && e.hasChinese) ? `<span class="lang-chip lang-zh">支持中文</span>` : ''}
                      </div>
                      <div class="edition-raw-title">${escapeHtml(stripLanguageParentheses(e.cn || e.rawName || e.name))}</div>
                    </td>
                    <td><span class="platform-chip">${e.platform}</span></td>
                    <td>${priceCell(e)}</td>
                    ${!isFreeView ? `<td>${trendCell(e)}</td>` : ''}
                    <td><a class="store-link" href="${e.url}" target="_blank" rel="noopener" aria-label="前往官方商店">↗</a></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    `;
  }

  const isSteam = state.platform === 'steam' || g.platform === 'PC';
  const isPs = isPsPlatform(state.platform) || g.platform?.includes('PS');
  const coverClass = `cover ${isSteam ? 'steam-cover' : isPs ? 'ps-cover' : isNintendoHk() ? 'hk-cover' : ''}`;
  return `
    <tr>
      <td><span class="rank ${!isPsPlatform(state.platform)&&g.rank<=3?'top':''}">${String(g.rank).padStart(2,'0')}</span></td>
      <td>
        <div class="game-cell">
          <span class="${coverClass}" data-fallback="${escapeHtml(g.cover || 'NS')}" style="background:linear-gradient(135deg,${g.color},#172128)">
            ${g.image ? `<img src="${g.image}" alt="${escapeHtml(g.cn)} 封面" loading="lazy" onerror="this.replaceWith(document.createTextNode(this.parentElement.dataset.fallback))">` : `<span>${escapeHtml(g.cover || 'NS')}</span>`}
          </span>
          <div class="game-copy">
            <span class="game-name">${escapeHtml(stripLanguageParentheses(g.cn))}</span>
            ${g.name !== g.cn ? `<span class="game-original">${escapeHtml(stripLanguageParentheses(g.name))}</span>` : ''}
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px">
              ${(state.platform.startsWith('switch') || g.platform?.startsWith('Switch') || g.meta === '数字版' || (g.meta && g.meta.includes('下载版')))
                ? `<span class="edition-badge">数字版</span>`
                : (g.editionBadge ? `<span class="edition-badge">${escapeHtml(g.editionBadge)}</span>` : (isPsJp() ? '' : (g.meta ? `<span class="game-meta">${g.meta}</span>` : '')))}
              ${g.hasChinese ? `<span class="lang-chip lang-zh">支持中文</span>` : ''}
            </div>
          </div>
        </div>
      </td>
      <td><span class="platform-chip ${g.platform === 'PS4' ? 'ps4-chip' : ''}">${g.platform}</span></td>
      <td>${priceCell(g)}</td>
      ${!isFreeView ? `<td>${trendCell(g)}</td>` : ''}
      <td><a class="store-link" href="${g.url||(isPsJp()?'https://store.playstation.com/ja-jp/pages/browse':isPsHk()?'https://store.playstation.com/zh-hant-hk/pages/browse':'https://store-jp.nintendo.com/software/ranking/')}" target="_blank" rel="noopener" aria-label="前往官方商店">↗</a></td>
    </tr>
  `;
}

function render(){
  const isNintendo=state.platform.startsWith('switch');
  const isPs=state.platform==='ps5' || state.platform==='ps4';
  const isHk=isPsHk();
  const isJp=isPsJp();
  const isPs4View=isHk && state.view==='ps4';

  const psTabs = $('#psStoreTabs');
  const nintendoTabs = $('#nintendoStoreTabs');
  const steamTabs = $('#steamRegionTabs');
  const singleRegionTab = $('#singleRegionTab');
  if (nintendoTabs) {
    nintendoTabs.style.display = isNintendo ? 'flex' : 'none';
    $$('#nintendoStoreTabs .subtab').forEach(tab => {
      const active = tab.dataset.nintendoStore === state.nintendoStore;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  }
  if (state.platform === 'ps5') {
    if (singleRegionTab) singleRegionTab.style.display = 'none';
    if (steamTabs) steamTabs.style.display = 'none';
    if (psTabs) {
      psTabs.style.display = 'flex';
      $$('#psStoreTabs .subtab').forEach(t => {
        const store = t.dataset?.psStore || t.getAttribute?.('data-ps-store');
        const isActive = store === state.psStore;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });
    }
  } else if (state.platform === 'steam') {
    if (psTabs) psTabs.style.display = 'none';
    if (singleRegionTab) singleRegionTab.style.display = 'none';
    if (steamTabs) {
      steamTabs.style.display = 'flex';
      $$('#steamRegionTabs .subtab').forEach(tab => {
        const active = tab.dataset.steamRegion === state.steamRegion;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
      });
    }
  } else {
    if (psTabs) psTabs.style.display = 'none';
    if (steamTabs) steamTabs.style.display = 'none';
    if (singleRegionTab) singleRegionTab.style.display = 'none';
  }

  const includePs4Btn = $('#includePs4Btn');
  if (includePs4Btn) {
    // PS4/PS5 版本默认全部纳入，具体平台在展开版本明细中查看。
    includePs4Btn.style.display = 'none';
  }

  const all = state.platform === 'steam' ? (datasets[activeSteamKey()] || []) : isJp
    ? (state.includePs4 ? (datasets.ps5_jp_with_ps4 || datasets.ps5_jp || []) : (datasets.ps5_jp || []))
    : (isPs4View ? (datasets.ps4 || []) : isPs ? (state.includePs4 ? (datasets.ps5_with_ps4 || datasets.ps5 || []) : (datasets.ps5 || [])) : (datasets[isNintendo ? activeNintendoKey() : state.platform] || []));
  const platformGames = all;
  const paidGames = platformGames.filter(x => Number(x.price) > 0 && !x.isFree);
  const freeGames = platformGames.filter(x => x.hasFreeEdition || Number(x.price) === 0 || x.isFree);
  const deals = paidGames.filter(x => x.discount > 0).sort((a,b) => b.discount - a.discount);
  const lowest = paidGames.length ? Math.min(...paidGames.map(x => x.price)) : 0;

  // 更新「仅看折扣」按钮状态与徽章
  const dealToggleBtn = $('#dealToggleBtn');
  if (dealToggleBtn) {
    const isDeals = state.view === 'deals';
    dealToggleBtn.classList.toggle('active', isDeals);
    dealToggleBtn.setAttribute('aria-pressed', String(isDeals));
  }
  const includeFreeDealsBtn = $('#includeFreeDealsBtn');
  if (includeFreeDealsBtn) {
    const isFree = state.view === 'free';
    includeFreeDealsBtn.classList.toggle('active', isFree);
    includeFreeDealsBtn.setAttribute('aria-pressed', String(isFree));
  }
  const dealBadge = $('#dealBadge');
  if (dealBadge) {
    dealBadge.textContent = String(deals.length);
  }

  const isFreeView = state.view === 'free';
  $$('th.col-history').forEach(th => { th.hidden = isFreeView; });

  const data = currentData();
  const pageStart = state.filteredCount ? (state.page - 1) * 50 + 1 : 0;
  const pageEnd = Math.min(state.page * 50, state.filteredCount);
  const pageInfo = $('#pageInfo');
  const pagePrev = $('#pagePrev');
  const pageNext = $('#pageNext');
  if (pageInfo) pageInfo.textContent = `${state.page} / ${state.pageTotal}`;
  if (pagePrev) pagePrev.disabled = state.page <= 1;
  if (pageNext) pageNext.disabled = state.page >= state.pageTotal;
  const ranking = nintendoStatus[activeNintendoKey()];
  const steamActiveStatus = state.steamRegion === 'global' ? steamGlobalStatus : steamStatus;
  const capacity = isNintendo ? (ranking?.officialLimit || all.length || 50) : isJp ? (ps5JpStatus?.officialLimit || all.length || 200) : isPs ? (isPs4View ? all.length : (ps5Status?.officialLimit || all.length || 200)) : (steamActiveStatus?.officialLimit || all.length || 200);
  hideCoverPreview();
  $('#gameRows').innerHTML = data.map(renderRow).join('');
  $('.rank-col').textContent = isHk ? '商店位置' : isJp ? '列表序号' : '排名';

  $('#emptyState').hidden = data.length > 0;
  $('.table-scroll').hidden = data.length === 0;

  if (data.length === 0) {
    const emptyH3 = $('#emptyState h3');
    const emptyP = $('#emptyState p');
    if (emptyH3 && emptyP) {
      if (state.query) {
        emptyH3.textContent = '没有找到匹配的游戏';
        emptyP.textContent = '换个关键词试试看。';
      } else if (state.view === 'free') {
        emptyH3.textContent = '当前平台暂无免费榜单游戏';
        emptyP.textContent = '可切换至「付费排行」或「仅看折扣」查看热门特惠。';
      } else if (state.view === 'deals') {
        emptyH3.textContent = '暂无正在打折的游戏';
        emptyP.textContent = '请稍后刷新或查看热销榜。';
      } else if (state.view === 'ps4') {
        emptyH3.textContent = '暂无仅支持 PS4 的游戏';
        emptyP.textContent = '可切换至「港服」查看支持 PS5 的热门游戏。';
      } else {
        emptyH3.textContent = '没有找到游戏';
        emptyP.textContent = '换个关键词试试看。';
      }
    }
  }

  $('#dealBadge').textContent = deals.length;
  if ($('#freeDealsBadge')) $('#freeDealsBadge').textContent = freeGames.length;
  if ($('#freeBadge')) $('#freeBadge').textContent = freeGames.length;

  if (state.view === 'free') {
    $('#gameCount').textContent = String(freeGames.length);
    $('#resultSummary').textContent = `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款免费游戏`;
  } else if (state.view === 'deals') {
    $('#gameCount').textContent = String(deals.length);
    $('#resultSummary').textContent = isJp ? `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款日服特惠游戏` : isHk || isNintendoHk() ? `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款港服特惠游戏` : `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款折扣游戏`;
  } else if (state.view === 'ps4') {
    $('#gameCount').textContent = String(data.length);
    $('#resultSummary').textContent = `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款仅支持 PS4 游戏`;
  } else {
    $('#gameCount').textContent = String(capacity);
    $('#resultSummary').textContent = isJp ? `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款日服热门游戏` : isHk ? `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款热门游戏（已自动合并各语言与版本）` : isNintendo ? `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款${state.nintendoStore === 'hk' ? '港服' : '日服'}榜单游戏` : `显示 ${pageStart}-${pageEnd} / ${state.filteredCount} 款付费游戏`;
  }

  // 剔除免费游戏后的付费游戏总列表，未打折的按 0% 计入平均
  const paidRankingList = all.filter(g => Number(g.price) > 0 && !g.isFree);
  const totalDiscountSum = paidRankingList.reduce((s, x) => s + (Number(x.discount) || 0), 0);
  const avgDiscountRate = paidRankingList.length ? Math.round(totalDiscountSum / paidRankingList.length) : 0;
  const discountRateEl = $('#discountRate');
  if (discountRateEl) discountRateEl.textContent = `-${avgDiscountRate}%`;
  const discountRateSubEl = $('#discountRateSub');
  if (discountRateSubEl) {
    discountRateSubEl.textContent = `共 ${paidRankingList.length} 款游戏`;
    discountRateSubEl.style.display = '';
  }

  const best = deals[0];
  $('#bestDiscount').textContent = best ? `-${best.discount}%` : '—';
  $('#bestDealName').textContent = best?.cn || '暂无折扣';
  $('#bestDealPrice').innerHTML = best ? `<del>${money(best.old)}</del> ${money(best.price)}<span class="cny-inline">≈ ${cny(best.price)}</span>` : '等待更新';
  $('#averagePrice').textContent = paidGames.length ? money(paidGames.reduce((s,x) => s + x.price, 0) / paidGames.length) : '—';
  $('#discountedCount').innerHTML = `${deals.length} <small>款</small>`;

  const steam = state.platform === 'steam', code = currency(), rate = state.rates[code] || 1;
  $('#tableKicker').textContent = isNintendo
    ? (state.platform === 'switch2' ? 'NINTENDO eSHOP' : 'NINTENDO eSHOP')
    : isPs
    ? 'PLAYSTATION STORE'
    : steam
    ? 'STEAM STORE'
    : 'GAME STORE';

  if (state.view === 'ps4') {
    $('#tableTitle').textContent = 'PS4 精选 · 仅支持 PS4 世代版本';
  } else if (state.view === 'free') {
    $('#tableTitle').textContent = isJp ? 'PS5 免费下载专区' : isHk ? 'PS5 免费下载专区' : steam ? 'Steam 热门免费游戏专区' : `Switch ${state.nintendoStore === 'hk' ? '港服' : '日服'}免费游戏专区`;
  } else if (state.view === 'deals') {
    $('#tableTitle').textContent = isJp ? (state.includePs4 ? 'PS5 & PS4 特惠折扣' : 'PS5 特惠折扣') : isHk ? (state.includePs4 ? 'PS5 & PS4 特惠折扣' : 'PS5 特惠折扣') : steam ? 'Steam 特惠折扣榜' : `Switch ${state.nintendoStore === 'hk' ? '港服' : '日服'}特惠折扣榜`;
  } else {
    $('#tableTitle').textContent = isJp ? (state.includePs4 ? 'PS5 & PS4 日服商店浏览列表' : 'PS5 日服商店浏览列表') : isHk ? (state.includePs4 ? 'PS5 & PS4 港服商店浏览列表' : 'PS5 港服商店浏览列表') : steam ? (state.steamRegion==='global'?'Steam 全球热销榜 · 前 100':'Steam 中国区热销榜 · 前 200') : `Switch ${state.platform === 'switch2' ? '2' : '1'} ${state.nintendoStore === 'hk' ? '港服' : '日服'}官方排行榜 · 前 ${capacity}`;
  }

  $('#regionPill').textContent = isHk || isNintendoHk() ? 'HK · HKD → CNY' : (isJp || isNintendo) ? 'JP · JPY → CNY' : steam && state.steamRegion==='global' ? 'GLOBAL · 中国区参考价' : 'CN · CNY';
  $('#rateValue').textContent = steam ? (state.steamRegion==='global'?'全球排名 · 中国区参考价':'Steam 国区使用人民币定价') : `1 ${code} = ${rate.toFixed(code==='JPY'?5:4)} CNY`;
  $('#rateUpdated').textContent = steam ? (state.steamRegion==='global'?'全球热销名次与中国区售价分别采集':'无需换汇 · 结算以 Steam 为准') : state.rateUpdated ? `${state.rateSource} · ${new Date(state.rateUpdated).toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})}` : '正在获取最新汇率…';
  $('#rateBadge').textContent = steam ? '人民币' : state.rateStale ? '缓存汇率' : '已更新';
  $('#rateBadge').classList.toggle('stale', !steam && state.rateStale);
  $('#rateCardTitle').textContent = steam ? '价格口径' : '实时汇率';
  $('#rateCardNote').textContent = steam
    ? (state.steamRegion === 'global' ? '排名来自 Steam 全球榜，售价是中国区参考价；部分游戏可能未在中国区定价。' : '售价按 Steam 中国区展示，结算请以商店页面为准。')
    : '人民币为实时估算价，支付金额可能受发卡行汇率及手续费影响。';
  const sStatus = $('#sourceStatus');
  const lUpdated = $('#lastUpdated');
  const footerSourceTime = $('#footerSourceTime');
  const sourceTag = $('#sourceTag');

  let sourceTime = '';
  let sourceLabel = '';
  let isStale = false;

  if (isNintendo) {
    sourceLabel = `Nintendo ${state.nintendoStore === 'hk' ? '港服' : '日服'} (${state.platform === 'switch2' ? 'Switch 2' : 'Switch 1'})`;
    if (ranking?.updatedAt) {
      sourceTime = formatSourceTime(ranking.updatedAt);
      isStale = Boolean(ranking.stale);
    }
  } else if (isJp) {
    sourceLabel = 'PlayStation 5 日服';
    if (ps5JpStatus?.updatedAt) {
      sourceTime = formatSourceTime(ps5JpStatus.updatedAt);
      isStale = Boolean(ps5JpStatus.stale);
    }
  } else if (isHk) {
    sourceLabel = isPs4View ? 'PlayStation 4 港服' : 'PlayStation 5 港服';
    if (ps5Status?.updatedAt) {
      sourceTime = formatSourceTime(ps5Status.updatedAt);
      isStale = Boolean(ps5Status.stale);
    }
  } else {
    sourceLabel = state.steamRegion === 'global' ? 'Steam 全球榜' : 'Steam 中国区';
    if (steamActiveStatus?.updatedAt) {
      sourceTime = formatSourceTime(steamActiveStatus.updatedAt);
      isStale = Boolean(steamActiveStatus.stale);
    }
  }

  if (lUpdated) {
    lUpdated.textContent = sourceTime ? `来源时间：${sourceTime} (${sourceLabel})` : `数据来源：${sourceLabel}`;
    lUpdated.title = `数据来源：${sourceLabel}\n上次采集时间：${sourceTime || '刚刚'}\n状态：${isStale ? '已使用缓存数据' : '官方同步最新'}`;
  }
  if (footerSourceTime && sourceTime) {
    footerSourceTime.textContent = sourceTime;
  }
  if (sourceTag) {
    sourceTag.textContent = isStale ? '缓存数据' : '官方直采';
    sourceTag.style.color = isStale ? '#ffb347' : 'var(--mint)';
    sourceTag.style.background = isStale ? 'rgba(255,179,71,.12)' : 'rgba(142,240,212,.08)';
  }
  if (sStatus) {
    sStatus.textContent = isStale ? `${sourceLabel} 缓存` : `${sourceLabel} 官方数据`;
  }
  $('.table-card').classList.add('flash');setTimeout(()=>$('.table-card').classList.remove('flash'),500);
}

async function refresh({notify=false}={}){
  if(refreshInProgress)return;
  refreshInProgress=true;
  const btn=$('#refreshButton');
  if(btn){btn.disabled=true;btn.classList.add('loading');}
  const sStatus=$('#sourceStatus');
  const lUpdated=$('#lastUpdated');
  if(sStatus) sStatus.textContent='正在更新全部平台榜单…';
  if(lUpdated) lUpdated.textContent='正在采集 NS、NS2、PS5、Steam 中国区与全球榜…';
  const groups=[
    ['NS1',[
      ['日服',()=>fetchNintendoRanking('switch1',{force:true})],
      ['港服',()=>fetchNintendoRanking('switch1_hk',{force:true})]
    ]],
    ['NS2',[
      ['日服',()=>fetchNintendoRanking('switch2',{force:true})],
      ['港服',()=>fetchNintendoRanking('switch2_hk',{force:true})]
    ]],
    ['PS5',[
      ['港服',()=>fetchPs5Ranking({force:true})],
      ['日服',()=>fetchPs5JpRanking({force:true})]
    ]],
    ['Steam',[
      ['中国区',()=>fetchSteamRanking({force:true})],
      ['全球',()=>fetchSteamRanking({force:true,region:'global'})]
    ]]
  ];
  try{
    await Promise.all([
      ...groups.map(async ([group,platforms]) => {
        const results = await Promise.all(platforms.map(async ([label,fetchRanking]) => ({
          label,
          ok: await fetchRanking().catch(() => false)
        })));
        if (notify) queueRefreshToast(group, results);
        return results;
      }),
      fetchExchangeRates().catch(error=>console.warn('汇率刷新失败：',error))
    ]);
    render();
    hydrateCovers();
  }finally{
    refreshInProgress=false;
    scheduleNextRefresh();
    if(btn){btn.disabled=false;btn.classList.remove('loading');}
  }
}

$$('.platform-tab').forEach(b=>b.addEventListener('click',async()=>{
  $$('.platform-tab').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});
  state.platform=b.dataset.platform;
  state.page=1;
  render();
  if(state.platform.startsWith('switch')){
    await fetchNintendoRanking(activeNintendoKey());
    render();
  }else if(state.platform==='ps5'){
    if(state.psStore==='jp'){
      await fetchPs5JpRanking();
    }else{
      await fetchPs5Ranking();
    }
    render();
    hydrateCovers();
  }else if(state.platform==='steam'){
    await fetchSteamRanking({region:state.steamRegion});
    render();
    hydrateCovers();
  }else {
    hydrateCovers();
  }
}));

$$('#nintendoStoreTabs .subtab').forEach(btn => btn.addEventListener('click', async () => {
  const store = btn.dataset.nintendoStore;
  if (!store || state.nintendoStore === store) return;
  state.nintendoStore = store;
  state.page = 1;
  render();
  await fetchNintendoRanking(activeNintendoKey());
  render();
  hydrateCovers();
}));

$$('#steamRegionTabs .subtab').forEach(btn => btn.addEventListener('click', async () => {
  const region = btn.dataset.steamRegion;
  if (!region || state.steamRegion === region) return;
  state.steamRegion = region;
  state.page = 1;
  render();
  await fetchSteamRanking({region});
  render();
}));

$$('#psStoreTabs .subtab').forEach(btn => btn.addEventListener('click', async () => {
  const store = btn.dataset?.psStore || btn.getAttribute?.('data-ps-store');
  if (!store || state.psStore === store) return;
  state.psStore = store;
  state.page = 1;
  $$('#psStoreTabs .subtab').forEach(b => {
    const isActive = b === btn;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', String(isActive));
  });
  render();
  if (state.psStore === 'jp') {
    if (!datasets.ps5_jp || !datasets.ps5_jp.length) {
      await fetchPs5JpRanking();
    }
  } else {
    if (!datasets.ps5 || !datasets.ps5.length) {
      await fetchPs5Ranking();
    }
  }
  render();
  hydrateCovers();
}));

$('#includePs4Btn')?.addEventListener('click', () => {
  state.includePs4 = !state.includePs4;
  render();
});

$('#includeFreeDealsBtn')?.addEventListener('click', () => {
  state.view = state.view === 'free' ? 'ranking' : 'free';
  state.includeFreeInDeals = false;
  state.page = 1;
  render();
});

$('#dealToggleBtn')?.addEventListener('click', () => {
  state.view = state.view === 'deals' ? 'ranking' : 'deals';
  state.includeFreeInDeals = false;
  state.page = 1;
  render();
});
$('#pagePrev')?.addEventListener('click', () => {
  if (state.page > 1) { state.page--; render(); }
});
$('#pageNext')?.addEventListener('click', () => {
  if (state.page < state.pageTotal) { state.page++; render(); }
});
$('#searchInput')?.addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();state.page=1;render()});
$('#sortSelect')?.addEventListener('change',e=>{state.sort=e.target.value;state.page=1;render()});
$('#refreshButton')?.addEventListener('click',()=>refresh({notify:true}));
$('#autoToggle')?.addEventListener('click',e=>{
  state.auto=!state.auto;
  e.currentTarget.classList.toggle('active',state.auto);
  e.currentTarget.setAttribute('aria-checked',String(state.auto));
  if(state.auto)scheduleNextRefresh();
  saveSettings();
});
$('#intervalSelect')?.addEventListener('change',e=>{
  state.interval=+e.target.value;
  scheduleNextRefresh();
  saveSettings();
  syncCollectorRefreshMinutes({ write: true });
});

// Modal close triggers
$('#modalCloseBtn')?.addEventListener('click', closePriceModal);
$('#modalBackdrop')?.addEventListener('click', closePriceModal);
window.addEventListener('keydown', e => { if (e.key === 'Escape') closePriceModal(); });

const coverPreview = document.createElement('div');
coverPreview.className = 'cover-preview';
coverPreview.hidden = true;
coverPreview.setAttribute('aria-hidden', 'true');
const coverPreviewImage = document.createElement('img');
coverPreviewImage.alt = '';
coverPreview.append(coverPreviewImage);
document.body.append(coverPreview);
let activeCover = null;
let coverPointerX = 0;
let coverPointerY = 0;

function hideCoverPreview() {
  activeCover = null;
  coverPreview.hidden = true;
}

function positionCoverPreview() {
  if (!activeCover || !coverPreviewImage.naturalWidth) return;
  const maxWidth = Math.min(activeCover.classList.contains('hk-cover') ? 600 : 400, window.innerWidth - 48);
  const maxHeight = Math.min(520, window.innerHeight - 48);
  const scale = Math.min(maxWidth / coverPreviewImage.naturalWidth, maxHeight / coverPreviewImage.naturalHeight);
  const width = Math.round(coverPreviewImage.naturalWidth * scale);
  const height = Math.round(coverPreviewImage.naturalHeight * scale);
  coverPreviewImage.style.width = `${width}px`;
  coverPreviewImage.style.height = `${height}px`;
  const rect = activeCover.getBoundingClientRect();
  const previewWidth = width + 16;
  const previewHeight = height + 16;
  let left = rect.right + 14;
  if (left + previewWidth > window.innerWidth - 12) {
    left = rect.left - previewWidth - 14 >= 12
      ? rect.left - previewWidth - 14
      : Math.max(12, window.innerWidth - previewWidth - 12);
  }
  const top = Math.max(12, Math.min(rect.top + (rect.height - previewHeight) / 2, window.innerHeight - previewHeight - 12));
  coverPreview.style.left = `${left}px`;
  coverPreview.style.top = `${top}px`;
  coverPreview.hidden = false;
}

coverPreviewImage.addEventListener('load', positionCoverPreview);
coverPreviewImage.addEventListener('error', hideCoverPreview);
$('#gameRows')?.addEventListener('pointerover', event => {
  if (event.pointerType === 'touch') return;
  const cover = event.target.closest('.cover');
  const image = cover?.querySelector('img');
  if (!image || activeCover === cover) return;
  activeCover = cover;
  coverPointerX = event.clientX;
  coverPointerY = event.clientY;
  coverPreview.hidden = true;
  coverPreviewImage.src = image.currentSrc || image.src;
  if (coverPreviewImage.complete && coverPreviewImage.naturalWidth) positionCoverPreview();
});
$('#gameRows')?.addEventListener('pointermove', event => {
  if (activeCover) {
    coverPointerX = event.clientX;
    coverPointerY = event.clientY;
  }
});
$('#gameRows')?.addEventListener('pointerout', event => {
  if (activeCover && event.target.closest('.cover') === activeCover && !activeCover.contains(event.relatedTarget)) hideCoverPreview();
});
document.addEventListener('scroll', () => {
  if (!activeCover) return;
  const rect = activeCover.getBoundingClientRect();
  if (coverPointerX < rect.left || coverPointerX > rect.right || coverPointerY < rect.top || coverPointerY > rect.bottom) hideCoverPreview();
  else positionCoverPreview();
}, true);
window.addEventListener('resize', hideCoverPreview);
window.addEventListener('blur', hideCoverPreview);
window.addEventListener('keydown', event => { if (event.key === 'Escape') hideCoverPreview(); });

// Delegated click for opening modal on spark-cell and toggling editions
$('#gameRows')?.addEventListener('click', e => {
  const toggleBtn = e.target.closest('.editions-toggle-btn');
  if (toggleBtn) {
    e.preventDefault();
    e.stopPropagation();
    const targetId = toggleBtn.dataset.target;
    const drawer = document.getElementById(targetId);
    if (drawer) {
      const isExpanded = !drawer.hidden;
      drawer.hidden = isExpanded;
      toggleBtn.classList.toggle('expanded', !isExpanded);
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      const arrow = toggleBtn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = isExpanded ? '▼' : '▲';
    }
    return;
  }

  const cell = e.target.closest('.spark-cell');
  if (!cell) return;
  const gameId = cell.dataset.id;
  const gameName = cell.dataset.game;
  const platList = state.platform === 'ps5'
    ? (state.psStore === 'jp'
        ? (state.includePs4 ? (datasets.ps5_jp_with_ps4 || datasets.ps5_jp || []) : (datasets.ps5_jp || []))
        : (state.view === 'ps4' ? (datasets.ps4 || []) : (state.includePs4 ? (datasets.ps5_with_ps4 || datasets.ps5 || []) : (datasets.ps5 || []))))
    : (datasets[state.platform.startsWith('switch') ? activeNintendoKey() : state.platform === 'steam' ? activeSteamKey() : state.platform] || []);
  let game = null;
  if (gameId) game = platList.find(g => g.id === gameId);
  if (!game && gameName) game = platList.find(g => g.name === gameName);
  if (!game) {
    for (const g of platList) {
      if (g.editions) {
        const found = g.editions.find(ed => (gameId && ed.id === gameId) || (gameName && ed.name === gameName));
        if (found) {
          game = found;
          break;
        }
      }
    }
  }
  if (!game && state.platform === 'ps5') {
    const rawAll = state.psStore === 'jp' ? (datasets.ps5_jp_all || []) : (datasets.ps5_all || []);
    if (gameId) game = rawAll.find(g => g.id === gameId);
    if (!game && gameName) game = rawAll.find(g => g.name === gameName);
  }
  if (game) openPriceModal(game);
});

let startupDataReady = false;
setInterval(()=>{
  if (!startupDataReady) return;
  state.remaining=Math.max(0,Math.ceil((nextRefreshAt-Date.now())/1000));
  if(state.auto && state.remaining===0 && !refreshInProgress)refresh();
  const m=Math.floor(state.remaining/60),s=state.remaining%60;
  const countEl=$('#countdown');
  if(countEl) countEl.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
},1000);

// Initialize UI controls based on restored settings
const initialAutoBtn = $('#autoToggle');
if (initialAutoBtn) {
  initialAutoBtn.classList.toggle('active', state.auto);
  initialAutoBtn.setAttribute('aria-checked', String(state.auto));
}
const initialIntervalSel = $('#intervalSelect');
if (initialIntervalSel) {
  initialIntervalSel.value = String(state.interval);
}
syncCollectorRefreshMinutes();

render();
hydrateCovers();
Promise.all([
  fetchExchangeRates(),
  fetchNintendoRanking('switch1'),
  fetchNintendoRanking('switch2'),
  fetchNintendoRanking('switch1_hk'),
  fetchNintendoRanking('switch2_hk'),
  fetchPs5Ranking(),
  fetchPs5JpRanking(),
  fetchSteamRanking(),
  fetchSteamRanking({region:'global'})
]).then(()=>{
  startupDataReady = true;
  scheduleNextRefresh();
  render();
});
