const chineseTitleMap = new Proxy({
  "Stray": "迷失",
  "Figment": "虚构世界",
  "Figment 2": "虚构世界2",
  "Figment 2: Creed Valley": "虚构世界2：信念之谷",
  "Figment 1 + Figment 2": "虚构世界1 + 虚构世界2",
  "Hades II": "哈迪斯 II",
  "Hades II Nintendo Switch 2 Edition": "哈迪斯 II Nintendo Switch 2 版",
  "Fire Emblem: Fortune's Weave": "火焰纹章 万紫千紅",
  "ファイアーエムブレム 万紫千紅": "火焰纹章 万紫千紅",
  "Balatro": "小丑牌",
  "BIOHAZARD": "生化危机",
  "BIOHAZARD RE:4": "生化危机4 重制版",
  "BIOHAZARD requiem": "生化危机 安魂曲",
  "Resident Evil Requiem": "生化危机 安魂曲",
  "Resident Evil 4": "生化危机4",
  "Metaphor: ReFantazio": "暗喻幻想",
  "メタファー：リファンタジオ": "暗喻幻想",
  "It Takes Two": "双人成行",
  "Split Fiction": "双影奇境",
  "Grounded": "禁闭求生",
  "Slay the Spire": "杀戮尖塔",
  "ELDEN RING": "艾尔登法环",
  "Stellar Blade": "剑星",
  "Cyberpunk 2077: Phantom Liberty": "赛博朋克2077 往日之影",
  "Wuthering Waves": "鸣潮",
  "鳴潮": "鸣潮",
  "Infinity Nikki": "无限暖暖",
  "インフィニティニキ": "无限暖暖",
  "Honkai: Star Rail": "崩坏：星穹铁道",
  "崩壊：スターレイル": "崩坏：星穹铁道",
  "Zenless Zone Zero": "绝区零",
  "ゼンレスゾーンゼロ": "绝区零",
  "Arknights: Endfield": "明日方舟：终末地",
  "アークナイツ：エンドフィールド": "明日方舟：终末地",
  "ARK: Survival Ascended": "方舟：生存飞升",
  "Squad": "战术小队",
  "Last Epoch": "最后纪元",
  "Steep": "极限巅峰",
  "ICEY": "艾希",
  "SEKIRO: SHADOWS DIE TWICE": "只狼 影逝二度",
  "SEKIRO™： SHADOWS DIE TWICE": "只狼 影逝二度",
  "Sekiro™: Shadows Die Twice - GOTY Edition": "只狼 影逝二度 年度版",
  "Ghost of Yōtei": "羊蹄山之魂",
  "Ghost of Yotei": "羊蹄山之魂",
  "Overcooked": "胡闹厨房",
  "Overcooked!": "胡闹厨房",
  "Overcooked! 2": "胡闹厨房2",
  "Overcooked! All You Can Eat": "胡闹厨房 全都好吃",
  "War Thunder": "战争雷霆",
  "Minecraft Dungeons II": "我的世界 地下城2",
  "Minecraft Dungeons II Deluxe Edition": "我的世界 地下城2 豪华版",
  "Pokémon LEGENDS Z-A": "宝可梦传说 Z-A",
  "Castlevania Dominus Collection": "恶魔城 多米纳斯合集",
  "Castlevania Advance Collection": "恶魔城 Advance合集",
  "ウィッチャー３　ワイルドハント　リマスター": "巫师3 狂猎 复刻版",
  "ホグワーツ・レガシー：デジタルデラックスエディション Hogwarts Legacy: Digital Deluxe Edition": "霍格沃茨之遗 数字豪华版",
  "Mini Motorways（ミニ・モーターウェイ）": "迷你高速公路",
  "ホグワーツ・レガシー: デジタルデラックスエディション": "霍格沃茨之遗 数字豪华版",
  "Hogwarts Legacy: Digital Deluxe Edition": "霍格沃茨之遗 数字豪华版",
  "ぷよぷよeスポーツ": "噗哟噗哟 电竞",
  "ポケットモンスター スカーレット": "宝可梦 朱",
  "ポケットモンスター ブリリアントダイヤモンド": "宝可梦 晶灿钻石",
  "ポケットモンスター シャイニングパール": "宝可梦 明亮珍珠",
  "ポケットモンスター リーフグリーン": "宝可梦 叶绿",
  "スーパーマリオブラザーズ ワンダー": "超级马力欧兄弟 惊奇",
  "ファイナルファンタジータクティクス - イヴァリース クロニクルズ": "最终幻想战略版 伊瓦利斯编年史",
  "ドラゴンクエストXI　過ぎ去りし時を求めて S": "勇者斗恶龙XI 寻觅逝去的时光 S",
  "ドラゴンクエストVII Reimagined": "勇者斗恶龙VII 重制版",
  "デイヴ・ザ・ダイバー": "潜水员戴夫",
  "ぷよぷよ™テトリス®２Ｓ": "噗哟噗哟俄罗斯方块2S",
  "真・三國無双２ with 猛将伝 Remastered": "真·三国无双2 with 猛将传 复刻版",
  "悪魔城ドラキュラ アニバーサリーコレクション": "恶魔城 周年纪念合集",
  "太鼓の達人 ドンダフルフェスティバル": "太鼓之达人 咚咚雷音祭",
  "みんなのGOLF WORLD": "全民高尔夫 世界",
  "世界樹の迷宮Ⅰ･Ⅱ･Ⅲ HD REMASTER": "世界树的迷宫Ⅰ·Ⅱ·Ⅲ HD复刻版",
  "桃太郎電鉄 ～昭和 平成 令和も定番！～": "桃太郎电铁 昭和 平成 令和也是基本款！",
  "グランド・セフト・オート：トリロジー：決定版": "侠盗猎车手 三部曲 决定版",
  "スポンジ・ボブ  :  カニカーニ・クックオフ": "海绵宝宝 蟹堡王大挑战",
  "魔法使いの夜": "魔法使之夜",
  "リズム天国 ミラクルスターズ": "节奏天国 奇迹之星",
  "トルネコの大冒険 不思議のダンジョン　ちょっとステキなリマスター": "特鲁尼克大冒险 不可思议的迷宫 精美复刻版",
  "不思議のダンジョン　風来のシレン６　とぐろ島探検録": "不可思议迷宫 风来的希炼6 蛇蜷岛探险录",
  "妖怪ウォッチ1 for Nintendo Switch": "妖怪手表1 for Nintendo Switch",
  "トモダチコレクション わくわく生活": "Tomodachi Life 朋友收集 梦想生活",
  "妖怪ウォッチ4++": "妖怪手表4++",
  "Little Witch in the Woods": "林中小女巫",
  "大乱闘スマッシュブラザーズ SPECIAL": "任天堂明星大乱斗 特别版",
  "マリオカート ワールド": "马力欧卡丁车 世界",
  "ドンキーコング バナンザ": "咚奇刚 蕉力全开",
  "Minecraft": "我的世界",
  "空の軌跡 the 2nd": "空之轨迹 the 2nd",
  "ドラゴンクエストモンスターズ３　魔族の王子とエルフの旅": "勇者斗恶龙怪兽篇3 魔族王子与精灵之旅",
  "パワフルプロ野球2026-2027": "实况力量棒球 2026-2027",
  "アナザーエデン ビギンズ": "另一个伊甸 起源",
  "スプラトゥーン3": "斯普拉遁3",
  "モンスターハンターライズ ＋ サンブレイク セット": "怪物猎人 崛起 + 曙光 套装",
  "世界のアソビ大全51": "世界游戏大全51",
  "ロマンシング サガ2 リベンジオブザセブン": "浪漫沙加2 七英雄的复仇",
  "Overcooked!® - オーバークック 王国のフルコース": "胡闹厨房 全都好吃",
  "ほの暮しの庭": "ほの暮しの庭",
  "がんばれゴエモン大集合！": "加油五右卫门 大合集",
  "パワフルプロ野球2026-2027 パワフルエディション": "实况力量棒球 2026-2027 强力版",
  "ドラゴンクエストIII　そして伝説へ…": "勇者斗恶龙III 接着迈向传说",
  "FINAL FANTASY I-VI Bundle": "最终幻想 I-VI 同捆包",
  "ホグワーツ・レガシー Hogwarts Legacy": "霍格沃茨之遗",
  "スーパー マリオパーティ ジャンボリー": "超级马力欧派对 空前盛会",
  "あつまれ どうぶつの森": "集合啦！动物森友会",
  "ファイアーエムブレム 風花雪月": "火焰之纹章 风花雪月",
  "魔法少女ノ魔女裁判": "魔法少女的魔女审判",
  "ポケットモンスター ファイアレッド": "宝可梦 火红",
  "マリオカート8 デラックス": "马力欧卡丁车8 豪华版",
  "Le Mirage Mystique": "Le Mirage Mystique",
  "東方紅魔郷：New Classic　～ the Embodiment of Scarlet Devil.": "东方红魔乡：New Classic",
  "桃太郎電鉄２ ～あなたの町も きっとある～ 東日本編＋西日本編": "桃太郎电铁2 东日本篇+西日本篇",
  "パラノマサイト FILE38 伊勢人魚物語": "灵异视界 FILE38 伊势人鱼物语",
  "モンスターハンターダブルクロス™ Nintendo Switch Ver.": "怪物猎人XX Nintendo Switch版",
  "太鼓の達人 ドンダフルフェスティバル 太鼓ミュージックパス 90日利用券セット": "太鼓之达人 咚咚雷音祭 音乐通行证90日套装",
  "ダンガンロンパ 希望の学園と絶望の高校生 Anniversary Edition": "弹丸论破 希望学园与绝望高中生 周年版",
  "空の軌跡 the 2nd デジタルデラックス版": "空之轨迹 the 2nd 数字豪华版",
  "ゼルダの伝説 ブレス オブ ザ ワイルド": "塞尔达传说 旷野之息",
  "都市伝説解体センター": "都市传说解体中心",
  "EA SPORTS FC™ 27": "EA SPORTS FC 27",
  "『超探偵事件簿 レインコード』『ダンガンロンパ1・2・V3』バンドル": "超侦探事件簿 雾雨迷宫 + 弹丸论破合集",
  "Le Mirage Mystique ダウンロード版 デジタル特典版": "Le Mirage Mystique ダウンロード版 デジタル特典版",
  "逆転裁判123 成歩堂セレクション": "逆转裁判123 成步堂精选集",
  "Pikmin 4 (ピクミン4)": "皮克敏4",
  "ドラゴンクエストI＆II": "勇者斗恶龙I＆II",
  "ポケットモンスター バイオレット": "宝可梦 紫",
  "NieR:Automata The End of YoRHa Edition": "尼尔：机械纪元 The End of YoRHa Edition",
  "ファイアーエムブレム 万紫千紅 (ばんしせんこう)": "火焰纹章 万紫千紅",
  "めっちゃカメレオン": "超级变色龙",
  "空の軌跡 the 2nd Nintendo Switch 2 Edition": "空之轨迹 the 2nd Switch 2版",
  "ELDEN RING Tarnished Edition": "艾尔登法环 褪色者版",
  "「ディアブロ IV: 憎悪の時代」コレクション": "暗黑破坏神IV 「憎悪の時代」合集",
  "ロマンシング サガ2 リベンジオブザセブン Nintendo Switch 2 Edition": "浪漫沙加2 七英雄的复仇 Switch 2版",
  "アナザーエデン ビギンズ Nintendo Switch 2 Edition": "另一个伊甸 起源 Switch 2版",
  "ダービースタリオン２": "ダービースタリオン2",
  "鬼武者 Way of the Sword": "鬼武者 Way of the Sword",
  "FINAL FANTASY VII REBIRTH": "最终幻想VII 重生",
  "スプラトゥーン レイダース": "斯普拉遁 Raiders",
  "FINAL FANTASY VII REMAKE INTERGRADE": "最终幻想VII 重制版 Intergrade",
  "空の軌跡 the 1st Nintendo Switch 2 Edition": "空之轨迹 the 1st Nintendo Switch 2 版",
  "ぽこ あ ポケモン": "Pokémon Pokopia",
  "桃太郎電鉄２ ～あなたの町も きっとある～ Nintendo Switch 2 Edition 東日本編＋西日本編": "桃太郎电铁2 Switch 2版 东日本篇+西日本篇",
  "ペルソナ３ リロード": "女神异闻录3 Reload",
  "東方紅魔郷：New Classic　～ the Embodiment of Scarlet Devil.　デラックス版": "东方红魔乡：New Classic 豪华版",
  "オービタルズ Orbitals": "Orbitals 轨道星球",
  "Granblue Fantasy Versus: Rising Legendary Edition": "碧蓝幻想 Versus Rising 传奇版",
  "ゼルダの伝説 ブレス オブ ザ ワイルド Nintendo Switch 2 Edition": "塞尔达传说 旷野之息 Switch 2版",
  "PRAGMATA": "识质存在",
  "PRAGMATA™": "识质存在",
  "PRAGMATA Deluxe Edition": "识质存在 豪华版",
  "PRAGMATA™ Deluxe Edition": "识质存在 豪华版",
  "PRAGMATA Digital Deluxe Edition": "识质存在 数字豪华版",
  "PRAGMATA™ Digital Deluxe Edition": "识质存在 数字豪华版",
  "Forza Horizon 5 Premium Edition": "极限竞速：地平线 5 顶级版",
  "Forza Horizon 5 Standard Edition": "极限竞速：地平线 5 标准版",
  "モンスターハンターワイルズ": "怪物猎人 荒野",
  "モンスターハンターストーリーズ3　～運命の双竜～": "怪物猎人物语3 ～命运之双龙～",
  "モンスターハンターストーリーズ3　～運命の双竜～ デラックスエディション": "怪物猎人物语3 豪华版",
  "モンスターハンターストーリーズ3　～運命の双竜～ プレミアムデラックスエディション": "怪物猎人物语3 高级豪华版",
  "SILENT HILL f": "寂静岭 f",
  "CODE VEIN II": "噬血代码 II",
  "CODE VEIN II Ultimate Edition": "噬血代码 II 终极版",
  "DEATH STRANDING 2: ON THE BEACH": "死亡搁浅2：冥滩之上",
  "METAL GEAR SOLID Δ: SNAKE EATER Digital Deluxe Edition": "合金装备Δ：食蛇者 数字豪华版",
  "龍が如く 極３ / 龍が如く３外伝 Dark Ties PS4 & PS5": "人中之龙 极3 / 人中之龙3外传 Dark Ties",
  "Clair Obscur: Expedition 33 – Deluxe Edition": "光与影：33号远征队 豪华版",
  "Starfield Premium Edition": "星空 高级版",
  "デジモンストーリー タイムストレンジャー デラックスエディション": "数码宝贝故事 时空异客 豪华版",
  "鉄拳8 Advanced Edition": "铁拳8 进阶版",
  "Battlefield™ 6 ファントムエディション": "战地风云6 魅影版",
  "OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4 & PS5": "歧路旅人0 数字豪华版",
  "Echoes of Aincrad": "艾恩葛朗特的回响",
  "Echoes of Aincrad アルティメットエディション": "艾恩葛朗特的回响 终极版",
  "ドラゴンボール Sparking! ZERO": "七龙珠 电光炸裂！ZERO",
  "龍が如く８外伝 Pirates in Hawaii PS4 & PS5": "人中之龙8外传 夏威夷海盗",
  "ドラゴンクエストVII Reimagined　デジタルデラックス版": "勇者斗恶龙VII Reimagined 数字豪华版",
  "Valheim": "英灵神殿",
  "MONSTER HUNTER RISE": "怪物猎人 崛起",
  "ゼルダの伝説 ティアーズ オブ ザ キングダム": "塞尔达传说 王国之泪",
  "HADES": "哈迪斯",
  "Stardew Valley": "星露谷物语",
  "オーバークック 王国的フルコース": "胡闹厨房 全都好吃",
  "ホロウナイト": "空洞骑士",
  "ペルソナ５ ザ・ロイヤル": "女神异闻录5 皇家版",
  "ぷよぷよ™テトリス®２": "噗哟噗哟俄罗斯方块2",
  "真・三國無双 ORIGINS": "真·三国无双 起源",
  "『スター・ウォーズ 無法者たち』": "星球大战：亡命之徒",
  "スター・ウォーズ 無法者たち": "星球大战：亡命之徒",
  "零 ～紅い蝶～ REMAKE": "零 ～红蝶～ 重制版",
  "ファークライ6": "孤岛惊魂6",
  "龍の国 ルーンファクトリー": "龙之国 符文工厂",
  "牧場物語 Let's！風のグランドバザール": "牧场物语 来吧！风之繁华市集",
  "アサシン クリード ヴァルハラ": "刺客信条：英灵殿",
  "スーパーロボット大戦Y": "超级机器人大战Y",
  "スーパーロボット大戦30": "超级机器人大战30",
  "幻想水滸伝 I&II HDリマスター 門の紋章戦争 / デュナン統一戦争": "幻想水浒传 I&II HD复刻版",
  "テイルズ オブ エクシリア リマスター": "无尽传奇 复刻版",
  "テイルズ オブ グレイセス エフ リマスター": "圣恩传奇 F 复刻版",
  "テイルズ オブ シンフォニア リマスター": "仙乐传说 复刻版",
  "聖剣伝説 VISIONS of MANA": "圣剑传说 玛娜视界",
  "ガンダムブレイカー４": "高达破坏者4",
  "SDガンダム バトルアライアンス": "SD高达 激斗同盟",
  "龍が如く７外传 名を消した男": "人中之龙7外传 无名之龙",
  "龍が如く７　光と闇の行方　インターナショナル": "人中之龙7 光与暗的去向 国际版",
  "ロマンシング サガ -ミンストレルソング- リマスター": "浪漫沙加 吟游诗人之歌 复刻版",
  "サガ フロンティア２ リマスター": "沙加开拓者2 复刻版",
  "サガ フロンティア リマスター": "沙加开拓者 复刻版",
  "天穂のサクナヒメ": "天穗之咲稻姬",
  "ハッピーダンガンロンパＳ 超高校級の南国サイコロ合宿": "幸福枪弹辩驳S 超高中级的南国掷骰合宿",
  "僕のヒーローアカデミア All's Justice": "我的英雄学院 All's Justice",
  "BLEACH Rebirth of Souls": "死神 魂魄觉醒",
  "ボーダーランズ® 4": "无主之地4",
  "『ボーダーランズ® 4』": "无主之地4",
  "フロストパンク2": "冰汽时代2",
  "007 First Light": "007 初露锋芒",
  "007 First Light - デラックスエディション": "007 初露锋芒 豪华版",
  "Rust Console Edition": "腐蚀 Rust 主机版",
  "Forza Horizon 5": "极限竞速：地平线 5",
  "METAL GEAR SOLID Δ: SNAKE EATER": "合金装备Δ：食蛇者",
  "龍が如く 極３ / 龍が如く３外伝 Dark Ties": "人中之龙 极3 / 人中之龙3外传 Dark Ties",
  "Clair Obscur: Expedition 33": "光与影：33号远征队",
  "Starfield": "星空",
  "デジモンストーリー タイムストレンジャー": "数码宝贝故事 时空异客",
  "鉄拳8": "铁拳8",
  "Battlefield™ 6": "战地风云6",
  "OCTOPATH TRAVELER 0": "歧路旅人0",
  "龍が如く８外伝 Pirates in Hawaii": "人中之龙8外传 夏威夷海盗",
  "REANIMAL": "生灵重塑",
  "REANIMAL – Digital Deluxe Edition": "生灵重塑 数字豪华版",
  "The Elder Scrolls IV: Oblivion Remastered": "上古卷轴IV：湮没 复刻版",
  "The Elder Scrolls IV: Oblivion Remastered - Deluxe Edition": "上古卷轴IV：湮没 复刻版 豪华版",
  "幻想水滸伝 I&II HDリマスター 門の紋章戦争 / デュナン統一戦争 PS4 & PS5": "幻想水浒传 I&II HD复刻版",
  "Avowed": "宣誓",
  "FINAL FANTASY VII REMAKE": "最终幻想VII 重制版",
  "NINJA GAIDEN 4": "忍者龙剑传4",
  "NINJA GAIDEN 4": "忍者龙剑传4",
  "The Outer Worlds 2": "天外世界2",
  "ジュラシック・ワールド・エボリューション3": "侏罗纪世界：进化3",
  "プラネットコースター 2": "过山车之星2",
  "STAR WARS ジェダイ：フォールン・オーダー™": "星球大战 绝地：陨落的武士团",
  "STAR WARS ジェダイ：フォールン・オーダー": "星球大战 绝地：陨落的武士团",
  "STAR WARS ジェダイ：フォールン・オーダー™ デラックス エディション": "星球大战 绝地：陨落的武士团 豪华版",
  "STAR WARS ジェダイ：サバイバー™": "星球大战 绝地：幸存者",
  "STAR WARS ジェダイ：サバイバー": "星球大战 绝地：幸存者",
  "STAR WARS ジェダイ：サバイバー™ デラックス エディション": "星球大战 绝地：幸存者 豪华版",
  "The Elder Scrolls Online": "上古卷轴OL",
  "The Elder Scrolls Online: Standard Edition": "上古卷轴OL 标准版",
  "Cult of the Lamb": "咩咩启示录",
  "Cult of the Lamb: Heretic Edition": "咩咩启示录：异教徒版",
  "龍が如く７外传 名を消した男　PS4 & PS5": "人中之龙7外传 无名之龙",
  "ロマンシング サガ -ミンストレルソング- リマスター PS4 & PS5": "浪漫沙加 吟游诗人之歌 复刻版",
  "サガ フロンティア２ リマスター PS4 & PS5": "沙加开拓者2 复刻版",
  "SAND LAND": "沙漠大冒险",
  "SAND LAND PS4® & PS5®": "沙漠大冒险",
  "トワと神樹の祈り子たち": "永久与神树的祈愿者",
  "Lost Soul Aside™": "失落之魂",
  "Lost Soul Aside": "失落之魂",
  "Sea of Thieves: 2026": "盗贼之海",
  "Sea of Thieves": "盗贼之海",
  "Sea of Thieves: 2026 Premium Edition": "盗贼之海 高级版",
  "CHRONO CROSS: THE RADICAL DREAMERS EDITION": "穿越时空：THE RADICAL DREAMERS EDITION",
  "DAEMON X MACHINA TITANIC SCION": "机甲战魔 泰坦之裔",
  "DREDGE": "渔帆暗涌",
  "DREDGE - Digital Deluxe Edition": "渔帆暗涌 数字豪华版",
  "DREDGE: Expansion Bundle": "渔帆暗涌 扩展捆绑包",
  "Moving Out 2": "胡闹搬家2",
  "Neon Abyss": "霓虹深渊",
  "SCARLET NEXUS": "绯红结系",
  "SCARLET NEXUS PS4 & PS5": "绯红结系",
  "Shadow Labyrinth (シャドウラビリンス)": "暗影迷宫",
  "Shadow Labyrinth": "暗影迷宫",
  "Sifu": "师父",
  "ソニックレーシング クロスワールド": "索尼克赛车 跨界世界",
  "ソニックレーシング クロスワールド PS4 & PS5": "索尼克赛车 跨界世界",
  "NARUTO X BORUTO ナルティメットストームコネクションズ": "火影忍者 终极风暴羁绊",
  "ASTRONEER": "异星探险家",
  "ASTRONEER - Ultimate Edition": "异星探险家 终极版",
  "アバター：フロンティア・オブ・パンドラ": "阿凡达：潘多拉边境",
  "Palworld": "幻兽帕鲁",
  "Palworld / 幻兽帕鲁": "幻兽帕鲁",
  "Palworld / パルワールド": "幻兽帕鲁",
  "Grounded 2": "禁闭求生2",
  "禁闭求生2 Grounded 2": "禁闭求生2",
  "Once Human": "七日世界",
  "Once Human（基本プレイ無料）": "七日世界",
  "Once Human（免費遊戲）": "七日世界",
  "Aniimo": "伊莫",
  "アニモ": "伊莫",
  "NTE: Neverness to Everness": "异环",
  "Wo Long: Fallen Dynasty": "卧龙：苍天陨落",
  "Wo Long: Fallen Dynasty （卧龙：苍天陨落）(PS4 & PS5)": "卧龙：苍天陨落",
  "Wo Long 2: Wings of Ember": "卧龙2：凤火连天",
  "Beast of Reincarnation": "轮回之兽",
  "ビースト・オブ・リンカネーション": "轮回之兽",
  "Mount & Blade II: Bannerlord": "骑马与砍杀2：霸主",
  "Mount &amp; Blade II: Bannerlord": "骑马与砍杀2：霸主",
  "Dead Cells": "死亡细胞",
  "Escape the Backrooms": "逃离后室",
  "World War Z": "僵尸世界大战",
  "World War Z: Aftermath": "僵尸世界大战：余波",
  "LOST JUDGMENT：裁かれざる記憶": "审判之逝：湮灭的记忆",
  "Dragon Quest Builders 2": "勇者斗恶龙 创世小玩家2",
  "THE FINALS": "THE FINALS",
  "R.E.P.O.": "R.E.P.O.",
  "Pizza Possum": "Pizza Possum",
  "Gears of War: E-Day": "战争机器：E-Day",
  "Ready or Not": "严阵以待",
  "Limbus Company": "边狱公司",
  "Victoria 3": "维多利亚3",
  "Raft": "木筏求生",
  "Rust": "Rust",
  "PEAK": "PEAK",
  "Pummel Party": "Pummel Party",
  "Chained Together": "Chained Together",
  "AION 2": "AION 2",
  "Transport Fever 3": "Transport Fever 3",
  "Pokémon Pokopia": "Pokémon Pokopia",
  "DYNASTY WARRIORS 3: Complete Edition Remastered": "真・三国无双2 with 猛将传 Remastered",
  "FATAL FURY: City of the Wolves": "饿狼传说：群狼之城",
  "VALORANT": "无畏契约",
  "Shape of Dreams": "梦之形",
  "Tales of ARISE": "破晓传奇",
  "A Way Out": "逃出生天",
  "Super Bunny Man": "超级兔子人",
  "スーパーバニーマン": "超级兔子人",
  "SYNDUALITY Echo of Ada": "奇异贤伴 爱达之歌",
  "Resident Evil 6": "生化危机6",
  "Resident Evil Revelations 2": "生化危机：启示录2",
  "Dragonball FighterZ": "七龙珠 斗士Z",
  "DRAGON BALL FighterZ": "七龙珠 斗士Z",
  "KINGDOM HEARTS Collection [I～III]": "王国之心合集 [I～III]",
  "KINGDOM HEARTS -HD 1.5+2.5 ReMIX-": "王国之心 -HD 1.5+2.5 ReMIX-",
  "KINGDOM HEARTS III + Re Mind (DLC)": "王国之心III + Re Mind（DLC）",
  "FINAL FANTASY X/X-2 HD Remaster": "最终幻想X/X-2 高清重制版",
  "FINAL FANTASY XII THE ZODIAC AGE": "最终幻想XII 黄道时代",
  "FINAL FANTASY Ⅻ THE ZODIAC AGE": "最终幻想XII 黄道时代",
  "ACE COMBAT 7: SKIES UNKNOWN": "皇牌空战7：未知空域",
  "Marvel's Spider-Man 2": "漫威蜘蛛侠2",
  "Marvel's Spider-Man: Miles Morales": "漫威蜘蛛侠：迈尔斯·莫拉莱斯",
  "Marvel's Spider-Man Remastered": "漫威蜘蛛侠 重制版",
  "Marvel's Spider-Man": "漫威蜘蛛侠",
  "The Last of Us Part II Remastered": "最后生还者 第二部 重制版",
  "The Last of Us Part I": "最后生还者 第一部",
  "Street Fighter 6": "街头霸王6",
  "Street Fighter 6 Years 1-2 Fighters Edition": "街头霸王6 第1–2年斗士版",
  "PUBG: BATTLEGROUNDS": "绝地求生",
  "World of Warships: Legends": "战舰世界：传奇",
  "Microsoft Flight Simulator 2024": "微软飞行模拟2024",
  "Microsoft Flight Simulator 2024 - Aviator Edition": "微软飞行模拟2024 飞行员版",
  "Monster Hunter Wilds": "怪物猎人 荒野",
  "Monster Hunter Wilds Prologue Demo": "怪物猎人 荒野 序章体验版",
  "Minecraft: Ultimate Collection": "我的世界 终极合集",
  "Far Cry 6": "孤岛惊魂6",
  "Black Desert": "黑色沙漠",
  "Black Desert: Mythical Edition": "黑色沙漠 神话版",
  "Black Desert: Heroic Edition": "黑色沙漠 英雄版",
  "Roblox": "罗布乐思",
  "Call of Duty: Modern Warfare 2 Campaign Remastered": "使命召唤：现代战争2 战役重制版",
  "Call of Duty: Modern Warfare Remastered": "使命召唤：现代战争 重制版",
  "Call of Duty: Black Ops II": "使命召唤：黑色行动II",
  "Call of Duty: Black Ops III - Zombies Chronicles Edition": "使命召唤：黑色行动III 僵尸编年史版",
  "Call of Duty: Black Ops III - Zombies Chronicles Deluxe": "使命召唤：黑色行动III 僵尸编年史豪华版",
  "Resident Evil Remake Trilogy": "生化危机 重制三部曲",
  "Resident Evil 4 Chainsaw Demo PS4 & PS5": "生化危机4 重制版 电锯体验版 PS4 & PS5",
  "The Sims 4": "模拟人生4",
  "The Seven Deadly Sins: Origin": "七大罪：起源",
  "七つの大罪：Origin": "七大罪：起源",
  "Alan Wake 2": "心灵杀手2",
  "FINAL FANTASY XVI": "最终幻想XVI",
  "FINAL FANTASY XV": "最终幻想XV",
  "FINAL FANTASY XV MULTIPLAYER: COMRADES": "最终幻想XV 多人扩展包：战友",
  "ファイナルファンタジーXIV": "最终幻想XIV",
  "Moving Out + Moving Out 2 Bundle": "胡闹搬家 + 胡闹搬家2 组合包",
  "The First Descendant": "第一后裔",
  "UFC 6": "UFC 6",
  "Yu-Gi-Oh! MASTER DUEL": "游戏王 大师决斗",
  "遊戯王 マスターデュエル": "游戏王 大师决斗",
  "Sackboy: A Big Adventure": "麻布仔大冒险",
  "Battlefield 1": "战地1",
  "Battlefield 1 Revolution": "战地1 革命版",
  "Granblue Fantasy: Relink": "碧蓝幻想：Relink",
  "Trine 5: A Clockwork Conspiracy": "三位一体5：发条阴谋",
  "TEKKEN 8 - DEMO": "铁拳8 体验版",
  "HITMAN World of Assassination": "杀手：暗杀世界",
  "HITMAN World of Assassination Part One": "杀手：暗杀世界 第一部",
  "HITMAN World of Assassination Part One – VR Edition": "杀手：暗杀世界 第一部 VR版",
  "Gears of War: Reloaded": "战争机器：重装上阵",
  "RESIDENT EVIL 2": "生化危机2 重制版",
  "RESIDENT EVIL 2 R.P.D. Demo": "生化危机2 重制版 R.P.D.体验版",
  "FINAL FANTASY TACTICS - The Ivalice Chronicles [PS4 & PS5]": "最终幻想战略版 伊瓦利斯编年史 [PS4 & PS5]",
  "FINAL FANTASY TACTICS - The Ivalice Chronicles Deluxe Edition [PS4 & PS5]": "最终幻想战略版 伊瓦利斯编年史 豪华版 [PS4 & PS5]",
  "Fallout 76": "辐射76",
  "Fallout 4": "辐射4",
  "Ship of Fools": "同舟共济",
  "Sniper Elite: Resistance": "狙击精英：抵抗",
  "Outer Wilds": "星际拓荒",
  "Outer Wilds: Archaeologist Edition": "星际拓荒 考古学家版",
  "Destiny 2": "命运2",
  "Goat Simulator 3": "模拟山羊3",
  "The Elder Scrolls V: Skyrim Special Edition": "上古卷轴V：天际 特别版",
  "The Elder Scrolls V: Skyrim Anniversary Edition - PS5 & PS4": "上古卷轴V：天际 周年纪念版 PS5 & PS4",
  "Cities: Skylines": "都市：天际线",
  "Cities: Skylines - Remastered": "都市：天际线 重制版",
  "シティーズ：スカイライン": "都市：天际线",
  "THE KING OF FIGHTERS XV": "拳皇XV",
  "THE KING OF FIGHTERS XIV (PS4)": "拳皇XIV（PS4）",
  "God of War Ragnarök": "战神：诸神黄昏",
  "God of War": "战神",
  "Monster Hunter: World": "怪物猎人：世界",
  "モンスターハンター：ワールド": "怪物猎人：世界",
  "モンスターハンターライズ": "怪物猎人 崛起",
  "Monster Hunter World: Iceborne Master Edition": "怪物猎人：世界 冰原 大师版",
  "Monster Hunter World: Iceborne Master Edition Digital Deluxe": "怪物猎人：世界 冰原 大师版 数字豪华版",
  "War Robots": "战争机器人",
  "Age of Empires II: Definitive Edition": "帝国时代II：决定版",
  "Age of Empires IV: Anniversary Edition": "帝国时代IV 周年纪念版",
  "The Binding of Isaac: Repentance": "以撒的结合：忏悔",
  "The Binding of Isaac: Rebirth": "以撒的结合：重生",
  "Fortnite": "堡垒之夜",
  "グランド・セフト・オートVI": "侠盗猎车手VI",
  "ドラゴンクエストⅩ オンライン": "勇者斗恶龙X Online",
  "Path of Exile 2": "流放之路2",
  "ロケットリーグ": "火箭联盟",
  "METAL GEAR SOLID: MASTER COLLECTION Vol.2": "合金装备 大师合集 第2辑",
  "7 Days to Die - コンソールエディション": "七日杀 主机版",
  "Bloodborne": "血源诅咒",
  "GUILTY GEAR -STRIVE-": "罪恶装备 奋战",
  "TCG Card Shop Simulator": "TCG卡牌商店模拟器",
  "Ghost of Tsushima": "对马岛之魂",
  "ディズニー ドリームライトバレー": "迪士尼梦幻星谷",
  "真・女神転生Ⅴ Vengeance": "真・女神转生V Vengeance",
  "Granblue Fantasy Versus: Rising": "碧蓝幻想 Versus：崛起",
  "The Outlast Trials": "逃生：试炼",
  "Apex Legends": "Apex英雄",
  "Ori and the Will of the Wisps": "奥日与精灵意志",
  "Counter-Strike 2": "反恐精英2",
  "Sons Of The Forest": "森林之子",
  "Escape from Tarkov": "逃离塔科夫",
  "Terraria": "泰拉瑞亚",
  "Left 4 Dead 2": "求生之路2",
  "Project Zomboid": "僵尸毁灭工程",
  "Watch_Dogs 2": "看门狗2",
  "Library Of Ruina": "废墟图书馆",
  "Crusader Kings III": "十字军之王III",
  "Lobotomy Corporation | Monster Management Simulation": "脑叶公司",
  "Slay the Spire 2": "杀戮尖塔2",
  "Euro Truck Simulator 2": "欧洲卡车模拟2",
  "Stellaris": "群星",
  "Sid Meier's Civilization VI": "席德·梅尔的文明VI",
  "Cuphead": "茶杯头",
  "Minecraft Dungeons": "我的世界：地下城",
  "ARK: Survival Evolved": "方舟：生存进化",
  "The Forest": "森林",
  "DARK SOULS III": "黑暗之魂III",
  "Dying Light": "消逝的光芒",
  "7 Days to Die": "七日杀",
  "Titanfall 2": "泰坦陨落2",
  "Sea of Thieves: 2026 Edition": "盗贼之海 2026版",
  "American Truck Simulator": "美国卡车模拟",
  "Kingdom Rush Origins - Tower Defense": "王国保卫战：起源",
  "Assassin's Creed Odyssey": "刺客信条：奥德赛",
  "WRC 7 FIA World Rally Championship": "WRC 7 国际汽联世界拉力锦标赛",
  "Russian Fishing 4": "俄罗斯钓鱼4",
  "Rise of the Tomb Raider": "古墓丽影：崛起",
  "Kingdom Rush - Tower Defense": "王国保卫战",
  "Kingdom Rush Frontiers - Tower Defense": "王国保卫战：前线",
  "Kingdom Rush Vengeance - Tower Defense": "王国保卫战：复仇",
  "DEATH STRANDING DIRECTOR'S CUT": "死亡搁浅 导演剪辑版",
  "Team Fortress 2": "军团要塞2",
  "Tom Clancy's Rainbow Six Siege": "彩虹六号：围攻",
  "Magic: The Gathering Arena": "万智牌：竞技场",
  "S.T.A.L.K.E.R. 2: Heart of Chornobyl": "潜行者2：切尔诺贝利之心",
  "Gothic 1 Remake": "哥特王朝1 重制版",
  "Age of Wonders 4": "奇迹时代4",
  "Borderlands 4": "无主之地4",
  "Ratchet & Clank: Rift Apart": "瑞奇与叮当：时空跳转",
  "Nobody Saves the World": "小人物拯救世界",
  "Lies of P": "匹诺曹的谎言",
  "Lies of P: Overture Bundle": "匹诺曹的谎言：序曲 组合包",
  "eFootball": "eFootball",
  "FATAL FURY: City of the Wolves - Demo Version -": "饿狼传说：群狼之城 体验版",
  "ELDEN RING NIGHTREIGN": "艾尔登法环 黑夜君临",
  "Winning Post 10 2026": "赛马大亨10 2026",
  "真・三國無雙２ with 猛將傳 Remastered": "真・三国无双2 with 猛将传 Remastered",
  "真・三国无双２ with 猛将传 Remastered": "真・三国无双2 with 猛将传 Remastered",
  "真・三國無雙２ with 猛將傳 Remastered 數位豪華版": "真・三国无双2 with 猛将传 Remastered 数字豪华版",
  "真・三国无双２ with 猛将传 Remastered 数字豪华版": "真・三国无双2 with 猛将传 Remastered 数字豪华版",
  "真・三国无双２ with 猛将传 Remastered 体验版": "真・三国无双2 with 猛将传 Remastered 体验版",
  "PRAGMATA Sketchbook - DEMO": "识质存在 Sketchbook 体验版",
  "Shadow Tactics: Blades of the Shogun": "影子战术：将军之刃",
  "Cult of the Lamb: Cultist Edition": "咩咩启示录: Cultist Edition",
  "Cult of the Lamb: Sinful Edition": "咩咩启示录: Sinful Edition",
  "Cult of the Lamb: The One Who Waits": "咩咩启示录: The One Who Waits",
  "Cult of the Lamb: Unholy Edition": "咩咩启示录: Unholy Edition",
  "Cult of the Lamb: Woolhaven Edition": "咩咩启示录: Woolhaven Edition",
  "Little Nightmares III - Free Trial & Friend's Pass": "小小梦魇III 免费体验版与好友通行证",
  "theHunter: Call of the Wild - Ultimate Hunting Bundle": "猎人：荒野的召唤 终极狩猎组合包",
  "NieR:Automata DEMO 120161128": "尼尔：机械纪元 体验版 120161128",
  "Sniper Elite: Resistance PS4 & PS5": "狙击精英：抵抗 PS4 & PS5",
  "Destiny 2 PS4 & PS5": "命运2 PS4 & PS5",
  "Marvel Rivals": "漫威争锋",
  "Brotato": "土豆兄弟",
  "プロ野球スピリッツ2026": "职业棒球之魂2026",
  "SILENT HILL: Townfall": "寂静岭：Townfall",
  "eFootball: Lamine Yamal Edition 2027": "eFootball 拉明·亚马尔版2027",
  "eFootball: Leo Messi Edition 2027": "eFootball 莱昂内尔·梅西版2027",
  "eFootball: Lamine Yamal Edition 2027 [Deluxe]": "eFootball 拉明·亚马尔版2027 豪华版",
  "eFootball: Leo Messi Edition 2027 [Deluxe]": "eFootball 莱昂内尔·梅西版2027 豪华版",
  "NBA 2K27": "NBA 2K27",
  "REMATCH": "REMATCH",
  "ARC Raiders": "ARC Raiders",
  "Bodycam": "Bodycam",
  "Dota 2": "Dota 2",
  "Muse Dash": "喵斯快跑",
  "紅の錬金術士と白の守護者 ～レスレリアーナのアトリエ～": "红色的炼金术士和白色的守护者 ～蕾斯莱莉娅娜的炼金工房～",
  "ACE COMBAT7: SKIES UNKNOWN DELUXE EDITION": "皇牌空战7：未知空域 豪华版",
  "Grand Theft Auto VI": "侠盗猎车手VI",
  "ヒューマン フォール フラット Nintendo Switch 2 Edition アップグレードパス": "人类：一败涂地 Nintendo Switch 2版 升级通行证",
  "ポケモン不思議のダンジョン 救助隊DX": "宝可梦不可思议迷宫 救助队DX",
  "DRAGON QUEST XI S: Echoes of an Elusive Age – Definitive Edition": "勇者斗恶龙XI S 寻觅逝去的时光 决定版",
  "Little Nightmares Trial": "小小梦魇 体验版",
  "KINGDOM HEARTS HD 2.8 Final Chapter Prologue": "王国之心 HD 2.8 终章序幕",
  "DEAD OR ALIVE 6": "生死格斗6",
  "DEAD OR ALIVE 6 Last Round": "生死格斗6 Last Round",
  "DEAD OR ALIVE 6 Last Round Core Fighters": "生死格斗6 Last Round 基础免费版",
  "DEAD OR ALIVE 6: Core Fighters": "生死格斗6 基础免费版",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN": "最终幻想起源：天堂的陌生人",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN Digital Deluxe Upgrade": "最终幻想起源：天堂的陌生人 数字豪华升级包",
  "Warhammer 40,000: Space Marine 2 - 1-Year Anniversary Edition": "战锤40,000：星际战士2 一周年纪念版",
  "Warhammer 40,000: Space Marine 2 - 2-Year Anniversary Edition": "战锤40,000：星际战士2 两周年纪念版",
  "Warhammer 40,000: Space Marine 2 - 3-Year Anniversary Edition": "战锤40,000：星际战士2 三周年纪念版",
  "Bloodborne The Old Hunters Edition": "血源诅咒 老猎人版",
  "Bloodborne PlayStationHits": "血源诅咒 PlayStation Hits",
  "Goat Simulator 3 – Starter Edition": "模拟山羊3 入门版",
  "Goat Simulator 3 - Multiversal Traveler's Edition": "模拟山羊3 多元宇宙旅行者版",
  "War Thunder - Senrai Maidens Bundle (中英韩文版)": "战争雷霆 - Senrai Maidens Bundle",
  "War Thunder - High-res Texture Edition (英语)": "战争雷霆 - High-res Texture Edition",
  "War Thunder - German Starter Bundle (日语, 英语)": "战争雷霆 - German Starter Bundle",
  "War Thunder - US Starter Bundle (日语, 英语)": "战争雷霆 - US Starter Bundle",
  "War Thunder - \"Be Prepared!\" Bundle (日语, 英语)": "战争雷霆 - \"Be Prepared!\" Bundle",
  "War Thunder - Cyberpunk Helicopter Snail Bundle (日语, 英语)": "战争雷霆 - Cyberpunk Helicopter Snail Bundle",
  "War Thunder - Senrai Maidens: Emily Bundle (日语, 英语)": "战争雷霆 - Senrai Maidens: Emily Bundle",
  "War Thunder - Senrai Maidens: Ling Bundle (日语, 英语)": "战争雷霆 - Senrai Maidens: Ling Bundle",
  "War Thunder - Senrai Maidens: Usagi Bundle (日语, 英语)": "战争雷霆 - Senrai Maidens: Usagi Bundle",
  "Beat Saber (日语, 韩语, 英语)": "节奏光剑",
  "Beat Saber + Britney Spears Music Pack (日语, 韩语, 英语)": "节奏光剑 + Britney Spears Music Pack",
  "Beat Saber + BTS Music Pack (日语, 韩语, 英语)": "节奏光剑 + BTS Music Pack",
  "Beat Saber + Daft Punk Music Pack (日语, 韩语, 英语)": "节奏光剑 + Daft Punk Music Pack",
  "Beat Saber + Hip Hop Mixtape (日语, 韩语, 英语)": "节奏光剑 + Hip Hop Mixtape",
  "Beat Saber + Imagine Dragons Music Pack (日语, 韩语, 英语)": "节奏光剑 + Imagine Dragons Music Pack",
  "Beat Saber + Linkin Park x Mike Shinoda Ultimate Bundle (日语, 韩语, 英语)": "节奏光剑 + Linkin Park x Mike Shinoda Ultimate Bundle",
  "Beat Saber + Metallica Music Pack (日语, 韩语, 英语)": "节奏光剑 + Metallica Music Pack",
  "Beat Saber + Monstercat Mixtape 2 (日语, 韩语, 英语)": "节奏光剑 + Monstercat Mixtape 2",
  "Beat Saber + Queen Music Pack (日语, 韩语, 英语)": "节奏光剑 + Queen Music Pack",
  "Beat Saber + The Rolling Stones Music Pack (日语, 韩语, 英语)": "节奏光剑 + The Rolling Stones Music Pack",
  "Towa and the Guardians of the Sacred Tree": "永久与神树的祈愿者",
  "ヴィラクタル(Viractal) Nintendo Switch 2 Edition": "维拉克塔尔 Nintendo Switch 2 版",
  "Sullyland Nursery Rhyme": "Sullyland Nursery Rhyme",
  "Leafy Corner": "绿植小筑",
  "sins of KALEIDO 塔巡りし因果の魔女": "sins of KALEIDO 塔巡りし因果の魔女",
  "むちむちポーク！＆ピンクスゥイーツ Boosted": "むちむちポーク!&ピンクスゥイーツ Boosted",
  "テニスの王子様 も～っと 学園祭の王子様 ♡-40 and more...": "网球王子 学园祭的王子们 ♡-40 and more…",
  "ヴィラクタル(Viractal)": "维拉克塔尔",
  "ウィザードリィ外伝 五つの試練 トリプルパック": "ウィザードリィ外伝 五つの試練 トリプルパック",
  "God of War Laufey™ (中英韩文版)": "战神：劳菲",
  "FINAL FANTASY VII REVELATION Premium Plus Edition (中韩文版) (中韩文版)": "最终幻想VII：启示 高级加强版",
  "FINAL FANTASY VII REVELATION (中韩文版) (中韩文版)": "最终幻想VII：启示",
  "FINAL FANTASY VII REVELATION Premium Edition (中韩文版) (中韩文版)": "最终幻想VII：启示 高级版",
  "FINAL FANTASY VII REVELATION Premium Plus Edition": "最终幻想VII：启示 高级加强版",
  "FINAL FANTASY VII Remake Series Trilogy Edition（中韩文版）": "最终幻想VII 重制系列三部曲合集",
  "FINAL FANTASY VII Remake Series Trilogy Edition（日英文版） (日语, 英语)": "最终幻想VII 重制系列三部曲合集",
  "FINAL FANTASY VII REVELATION": "最终幻想VII：启示",
  "FINAL FANTASY VII REVELATION Premium Edition": "最终幻想VII：启示 高级版",
  "FINAL FANTASY RESONANCE Digital Deluxe Edition (中韩文版)": "最终幻想：共鸣 数字豪华版",
  "FINAL FANTASY RESONANCE": "最终幻想：共鸣",
  "FINAL FANTASY RESONANCE Digital Deluxe Edition": "最终幻想：共鸣 数字豪华版",
  "FINAL FANTASY RESONANCE (日语, 英语)": "最终幻想：共鸣",
  "EA SPORTS™《Madden NFL 27》 (英语)": "EA SPORTSMadden NFL 27",
  "Until Dawn 2 (中日英韩文版)": "Until Dawn 2",
  "Castlevania: Belmont’s Curse Midnight Edition (中日英韩文版)": "恶魔城：贝尔蒙特的诅咒 Midnight Edition",
  "Castlevania: Belmont&#x27;s Curse": "恶魔城：贝尔蒙特的诅咒",
  "Castlevania: Belmont&#x27;s Curse Demo": "恶魔城：贝尔蒙特的诅咒 体验版",
  "Clive Barker’s Hellraiser: Revival - Deluxe Edition (英语)": "Clive Barker's Hellraiser: Revival - Deluxe Edition",
  "Clive Barker&#x27;s Hellraiser: Revival (英语)": "Clive Barker's Hellraiser: Revival",
  "Kingdom Come: Deliverance - Saga Bundle": "天国：拯救 传奇捆绑包",
  "Graveyard Keeper 2": "守墓人2",
  "STRANGER THAN HEAVEN (中日英韩文版)": "STRANGER THAN HEAVEN",
  "Well Dweller Demo": "黯井微光 体验版",
  "Achilles: Legends Untold": "阿喀琉斯：未诉传说",
  "Ship of Fools - Completely Foolish Edition": "同舟共济 同舟共寄版",
  "Ship of Fools - The Aquapocalypse Edition": "同舟共济 Aquapocalypse Edition",
  "Sniper Elite: The French Collection": "狙击精英：法国典藏版",
  "Stupid Never Dies: Glorious Idiot Edition (中日英韩文版)": "愚者不灭 Glorious Idiot Edition",
  "Jotunnslayer: Horde of Hel - Conan Edition": "巨人杀手：暗黑之潮 柯南版",
  "Hamster Playground": "仓鼠游乐场",
  "Fate/EXTRA Record PS4 & PS5 (中日英韩文版)": "Fate/EXTRA Record PS4 & PS5",
  "《MARVEL Tōkon: Fighting Souls》": "漫威斗魂",
  "Way of the Hunter 2 - Deluxe Edition": "猎人之路2 豪华版",
  "Way of the Hunter 2": "猎人之路2",
  "Hunting Simulator 3 (英语)": "狩猎模拟3",
  "Hunting Simulator 3 - Apex Predator Edition (中日英韩文版)": "狩猎模拟3 Apex Predator Edition",
  "THE KING OF FIGHTERS XIV DEMO VER.2 (中日英韩文版)": "拳皇XIV 体验版2",
  "Venus Vacation PRISM - DEAD OR ALIVE Xtreme -": "维纳斯璀璨假期",
  "God of War Laufey™": "战神：劳菲",
  "ファイナルファンタジー レゾナンス": "最终幻想：共鸣",
  "PSO2 NEW GENESIS": "梦幻之星Online 2：新起源",
  "僕のヒーローアカデミア ULTRA RUMBLE": "僕のヒーローアカデミア ULTRA RUMBLE",
  "ドラゴンクエストモンスターズ４　枯れ木の国のビアンカ・フローラ": "勇者斗恶龙怪物仙境4 枯木国的碧安卡与芙萝拉",
  "三國志14 with パワーアップキット Complete Edition": "三国志14 威力加强传承版套装",
  "Throne and Liberty": "王权与自由",
  "テイルズ オブ エターニア リマスター": "永恒传说 复刻版",
  "Train Sim World® 7": "模拟火车世界7",
  "カラオケ＠DAM": "カラオケ@DAM",
  "Active Matter": "Active Matter",
  "Castlevania: Belmont's Curse": "恶魔城：贝尔蒙特的诅咒",
  "STRANGER THAN HEAVEN": "STRANGER THAN HEAVEN",
  "JDM：ジャパニーズドリフトマスター": "JDM：漂移大师",
  "JOYSOUND.TV Plus ダウンロード版": "JOYSOUND.TV Plus ダウンロード版",
  "エイリアン：ファイアーチーム エリート ２": "异形：火力精英2",
  "神貌のクリファ": "神貌之树逆卡巴拉",
  "進撃の巨人３": "进击的巨人3",
  "ドラゴンボール ゲキシン スクアドラ": "ドラゴンボール ゲキシン スクアドラ",
  "Big Walk": "Big Walk",
  "WARDOGS": "WARDOGS",
  "BOMBANANA!": "BOMBANANA!",
  "MECCHA CHAMELEON": "MECCHA CHAMELEON",
  "Mimic Party": "Mimic Party",
  "STAR WARS: Galactic Racer™": "星球大战：银河赛车手",
  "Nivalis Nights": "尼瓦利斯之夜",
  "LEGO® Batman™: Legacy of the Dark Knight": "乐高蝙蝠侠：黑暗骑士之遗",
  "Planet Zoo 2": "动物园之星2",
  "Queen's Blade Re:Build": "Queen's Blade Re:Build",
  "NieR:Automata Game of the YoRHa Edition": "尼尔：机械纪元 Game of the YoRHa Edition",
  "NieR:Automata Game of the YoRHa Edition (中日英韩文版)": "尼尔：机械纪元 Game of the YoRHa Edition",
  "NieR:Automata Game of the YoRHa Edition (OST bundle)": "尼尔：机械纪元 Game of the YoRHa Edition（原声带合集）",
  "NieR:Automata Game of the YoRHa Edition (OST bundle) (中日英韩文版)": "尼尔：机械纪元 Game of the YoRHa Edition（原声带合集）",
  "ARK: Bob&#x27;s Bundle": "方舟 Bob's Bundle",
  "HITMAN WOA Free Demo ft. The Undying": "杀手：暗杀世界 免费体验版（The Undying）",
  "Diablo® Prime Evil Collection": "暗黑破坏神 Prime Evil Collection",
  "Fallout 76: Deathclaw Pet Deluxe Edition PS4 & PS5": "辐射76 死亡爪宠物豪华版 PS4 & PS5",
  "Cities: Skylines - Mayor&#x27;s Edition": "都市：天际线 市长版",
  "Cities: Skylines - Mayor&#x27;s Edition (韩语, 英语)": "都市：天际线 市长版",
  "Cities: Skylines - Premium Edition 2": "都市：天际线 高级版2",
  "Cities: Skylines - Premium Edition 2 (韩语, 英语)": "都市：天际线 高级版2",
  "Cities: Skylines - PlayStation®4 Edition": "都市：天际线 PlayStation 4版",
  "Cities: Skylines - PlayStation®4 Edition (韩语, 英语)": "都市：天际线 PlayStation 4版",
  "Age of Empires II + Age of Mythology Premium Edition Bundle": "帝国时代II + 神话时代 高级版捆绑包",
  "The Elder Scrolls V: Skyrim Anniversary Edition + Fallout 4: Anniversary Edition Bundle": "上古卷轴V：天际 周年版 + 辐射4 周年版捆绑包",
  "Destiny 2: Renegades": "命运2：反叛",
  "Schedule I": "Schedule I",
  "《瑪利歐 ＋ 瘋狂兔子 希望之星》- 黃金版（MARIO + RABBIDS SPARKS OF HOPE GOLD EDITION）": "瑪利歐 + 瘋狂兔子 希望之星- 黃金版(MARIO + RABBIDS SPARKS OF HOPE GOLD EDITION)",
  "霍格華茲的傳承：數位豪華版 Hogwarts Legacy: Digital Deluxe Edition": "霍格華茲的傳承: 數位豪華版 Hogwarts Legacy: Digital Deluxe Edition",
  "潛水員戴夫 (DAVE THE DIVER)": "潛水員戴夫 (DAVE THE DIVER)",
  "薩爾達傳說 曠野之息 擴充票": "薩爾達傳說 曠野之息 擴充票",
  "MONSTER HUNTER RISE + SUNBREAK 組合包": "MONSTER HUNTER RISE + SUNBREAK 組合包",
  "潛水員戴夫－叢林 Content Pack": "潛水員戴夫-叢林 Content Pack",
  "《樂高®小城：臥底密探》[LEGO® CITY Undercover]": "樂高小城: 臥底密探[LEGO CITY Undercover]",
  "薔薇與椿 〜豪華絢爛版〜": "薔薇與椿 〜豪華絢爛版〜",
  "女神異聞錄５ 皇家版（PERSONA5 THE ROYAL）": "女神異聞錄5 皇家版(PERSONA5 THE ROYAL)",
  "Phoenix Wright: Ace Attorney Trilogy(逆轉裁判123成步堂精選集)": "Phoenix Wright: Ace Attorney Trilogy(逆轉裁判123成步堂精選集)",
  "潛水員戴夫 一番的假日 Content Pack": "潛水員戴夫 一番的假日 Content Pack",
  "《瑪利歐 ＋ 瘋狂兔子 希望之星》(MARIO + RABBIDS SPARKS OF HOPE)": "瑪利歐 + 瘋狂兔子 希望之星(MARIO + RABBIDS SPARKS OF HOPE)",
  "《刺客教條：埃齊歐合輯》(Assassin’s Creed The Ezio Collection)": "刺客教條: 埃齊歐合輯(Assassin's Creed The Ezio Collection)",
  "《波斯王子：失落王冠》完全版 (Prince of Persia: The Lost Crown - Complete Edition)": "波斯王子: 失落王冠完全版 (Prince of Persia: The Lost Crown - Complete Edition)",
  "Nintendo Switch 運動": "Nintendo Switch 運動",
  "寶可夢 紫 零之秘寶": "寶可夢 紫 零之秘寶",
  "真人快打11終極版": "真人快打11終極版",
  "寶可夢傳說 Z-A 超次元爆湧": "寶可夢傳說 Z-A 超次元爆湧",
  "resident evil 4": "生化危机4",
  "LEGO® 漫威超級英雄 2 [LEGO® Marvel Super Heroes 2]": "LEGO 漫威超級英雄 2 [LEGO Marvel Super Heroes 2]",
  "《Pokémon Champions+起始包》": "Pokémon Champions+起始包",
  "潛水員戴夫 (DAVE THE DIVER) Nintendo Switch 2 Edition": "潛水員戴夫 (DAVE THE DIVER) Nintendo Switch 2 Edition",
  "薩爾達傳說 王國之淚 Nintendo Switch 2 Edition升級通行證": "薩爾達傳說 王國之淚 Nintendo Switch 2 Edition升級通行證",
  "薩爾達傳說 曠野之息 Nintendo Switch 2 Edition升級通行證": "薩爾達傳說 曠野之息 Nintendo Switch 2 Edition升級通行證",
  "Pokémon Pokopia擴充票": "Pokémon Pokopia擴充票",
  "空之軌跡 the 1st Nintendo Switch 2 Edition": "空之軌跡 the 1st Nintendo Switch 2 Edition",
  "瑪利歐賽車世界": "瑪利歐賽車世界",
  "異度神劍2 Nintendo Switch 2 Edition升級通行證": "異度神劍2 Nintendo Switch 2 Edition升級通行證",
  "集合啦！動物森友會 Nintendo Switch 2 Edition升級通行證": "集合啦!動物森友會 Nintendo Switch 2 Edition升級通行證",
  "雙影奇境": "雙影奇境",
  "ONE PIECE 海賊無雙4 Nintendo Switch 2 Edition": "ONE PIECE 海賊無雙4 Nintendo Switch 2 Edition",
  "集合啦！動物森友會 Nintendo Switch 2 Edition": "集合啦!動物森友會 Nintendo Switch 2 Edition",
  "巫師3：狂獵 — 重製版": "巫師3: 狂獵 — 重製版",
  "《暗黑破壞神® IV：憎恨時代合輯》": "暗黑破壞神 IV: 憎恨時代合輯",
  "超級瑪利歐派對 空前盛會 Nintendo Switch 2 Edition + 空前盛會TV": "超級瑪利歐派對 空前盛會 Nintendo Switch 2 Edition + 空前盛會TV",
  "Dragon's Dogma 2: Dark Arisen": "Dragon's Dogma 2 角色编辑&保存",
  "軌道雙子星": "軌道雙子星",
  "Maestro 大師指揮": "Maestro 大師指揮",
  "FINAL FANTASY VII REMAKE INTERGRADE Digital Deluxe Edition": "最终幻想VII 重制版 Intergrade 数字豪华版",
  "艾爾登法環 褪色者版 (ELDEN RING Tarnished Edition)": "艾爾登法環 褪色者版 (ELDEN RING Tarnished Edition)",
  "薩爾達傳說 曠野之息 Nintendo Switch 2 Edition": "薩爾達傳說 曠野之息 Nintendo Switch 2 Edition",
  "Minecraft Dungeons II ": "我的世界 地下城2",
  "地球防衛軍5 for Nintendo Switch 2 DELUXE EDITION": "地球防衛軍5 for Nintendo Switch 2 DELUXE EDITION",
  "真・三國無双２ with 猛将伝 Remastered Digital Deluxe Edition": "真·三国无双2 with 猛将传 复刻版 数字豪华版",
  "地球防衛軍5 for Nintendo Switch 2": "地球防衛軍5 for Nintendo Switch 2",
  "FINAL FANTASY VII REBIRTH Digital Deluxe Edition": "最终幻想VII 重生 数字豪华版",
  "テニスの王子様 も～っと 学園祭の王子様 ♡-40 and more... Nintendo Switch 2 Edition": "网球王子 学园祭的王子们 ♡-40 and more… Nintendo Switch 2 版",
  "ドラゴンクエストモンスターズ３　魔族の王子とエルフの旅　マスターズ版": "勇者斗恶龙怪兽篇3 魔族王子与精灵之旅 大师版",
  "ホグワーツ・レガシー: デジタルデラックスエディション\nHogwarts Legacy: Digital Deluxe Edition": "霍格沃茨之遗 数字豪华版",
  "ACE COMBAT™7: SKIES UNKNOWN DELUXE EDITION": "皇牌空战7：未知空域 豪华版",
  "God of War Laufey™ 数字豪华版 (中英韩文版)": "God of War Laufey 数字豪华版",
  "God of War Laufey™ 数字豪华版升级 (中英韩文版)": "God of War Laufey 数字豪华版升级",
  "Grand Theft Auto VI：终极版 (中英韩文版)": "Grand Theft Auto VI: 终极版",
  "Grand Theft Auto VI (中英韩文版)": "侠盗猎车手VI",
  "《EA SPORTS FC™ 27》标准版（PS4 和 PS5 版）": "EA SPORTS FC 27标准版(PS4 和 PS5 版)",
  "《EA SPORTS FC™ 27》终极版（PS4 和 PS5 版）": "EA SPORTS FC 27终极版(PS4 和 PS5 版)",
  "EA SPORTS FC™ 27 Lite": "EA SPORTS FC 27标准版",
  "NBA 2K27 豪华版": "NBA 2K27 豪华版",
  "《NBA 2K27》": "NBA 2K27",
  "空战奇兵8 希孚之翼 (ACE COMBAT 8: WINGS OF THEVE) 数字豪华版": "空战奇兵8 希孚之翼 (ACE COMBAT 8: WINGS OF THEVE) 数字豪华版",
  "空战奇兵8 希孚之翼 (ACE COMBAT 8: WINGS OF THEVE)": "空战奇兵8 希孚之翼 (ACE COMBAT 8: WINGS OF THEVE)",
  "eFootball™: Lamine Yamal Edition 2027 [Deluxe]": "eFootball 拉明·亚马尔版2027 豪华版",
  "eFootball™: Lamine Yamal Edition 2027": "eFootball 拉明·亚马尔版2027",
  "eFootball™: Leo Messi Edition 2027 [Deluxe]": "eFootball 莱昂内尔·梅西版2027 豪华版",
  "eFootball™: Leo Messi Edition 2027": "eFootball 莱昂内尔·梅西版2027",
  "eFootball™": "eFootball",
  "影之刃零数字豪华版 (中日英韩文版)": "影之刃零数字豪华版",
  "影之刃零 (中日英韩文版)": "影之刃零",
  "《羊蹄山之魂》完整版": "羊蹄山之魂完整版",
  "《刺客信条：黑旗 记忆重置》豪华版": "刺客信条: 黑旗 记忆重置豪华版",
  "刺客信条：黑旗 记忆重置": "刺客信条: 黑旗 记忆重置",
  "控制: 共振": "控制: 共振",
  "鬼武者 Way of the Sword 高级豪华版": "鬼武者 Way of the Sword 高级豪华版",
  "鬼武者 Way of the Sword 豪华版": "鬼武者 Way of the Sword 豪华版",
  "鬼武者 Way of the Sword DEMO": "鬼武者 Way of the Sword 体验版",
  "崩坏：星穹铁道": "崩坏: 星穹铁道",
  "崩壞：星穹鐵道": "崩壞: 星穹鐵道",
  "巫师3：狂猎 — 重制版": "巫师3: 狂猎 — 重制版",
  "Minecraft Dungeons II 豪华版": "Minecraft Dungeons II 豪华版",
  "《暗黑破坏神® IV》：憎恨的时代收藏": "暗黑破坏神 IV: 憎恨的时代收藏",
  "Diablo® IV - 标准版": "Diablo IV - 标准版",
  "伊莫": "伊莫",
  "原神-6周年": "原神-6周年",
  "原神-六週年": "原神-六週年",
  "燕云十六声（免费游玩）": "燕云十六声(免费游玩)",
  "燕雲十六聲（免費遊玩）": "燕雲十六聲(免費遊玩)",
  "跑车浪漫旅 7": "跑车浪漫旅 7",
  "《跑车浪漫旅 7》25周年纪念数字豪华版": "跑车浪漫旅 725周年纪念数字豪华版",
  "《使命召唤®：现代战争® 4》金库版": "使命召唤: 现代战争 4金库版",
  "使命召唤®：现代战争® 4": "使命召唤: 现代战争 4",
  "《使命召唤®：黑色行动 7》跨越世代版": "使命召唤: 黑色行动 7跨越世代版",
  "《使命召唤®：黑色行动 6》跨越世代版": "使命召唤: 黑色行动 6跨越世代版",
  "《使命召唤®：现代战争® III 2023》跨越世代礼包": "使命召唤: 现代战争 III 2023跨越世代礼包",
  "《使命召唤®：现代战争®II 2022》跨越世代版": "使命召唤: 现代战争II 2022跨越世代版",
  "使命召唤®：战争地带™": "使命召唤: 战争地带",
  "《漫威金刚狼》": "漫威金刚狼",
  "《漫威金刚狼》数字豪华版": "漫威金刚狼数字豪华版",
  "博德之门3": "博德之门3",
  "博德之门3 - 数字豪华版": "博德之门3 - 数字豪华版",
  "潜水员戴夫": "潜水员戴夫",
  "潜水员戴夫 戴夫 & 一番捆绑包": "潜水员戴夫 戴夫 & 一番捆绑包",
  "Marvel’s Spider-Man 2": "漫威蜘蛛侠2",
  "《Marvel’s Spider-Man 2》数字豪华版": "Marvel's Spider-Man 2数字豪华版",
  "空之轨迹 the 2nd": "空之轨迹 the 2nd",
  "空之轨迹 the 2nd 数字豪华版": "空之轨迹 the 2nd 数字豪华版",
  "空之轨迹 the 2nd 体验版": "空之轨迹 the 2nd 体验版",
  "三角洲行动 (免费游玩)": "三角洲行动 (免费游玩)",
  "Delta Force": "三角洲行动 (免费游玩)",
  "Grand Theft Auto V（PS4™ 和 PS5™）": "Grand Theft Auto 在线模式",
  "Grand Theft Auto 在线模式 (PlayStation®5)": "Grand Theft Auto 在线模式 (PlayStation5)",
  "Grand Theft Auto V及大白鲨现金卡捆绑包": "Grand Theft Auto V及大白鲨现金卡捆绑包",
  "红色沙漠：增强版": "红色沙漠: 增强版",
  "红色沙漠：增强豪华版": "红色沙漠: 增强豪华版",
  "七日世界（免费游戏）": "七日世界(免费游戏)",
  "空之轨迹 the 1st": "空之轨迹 the 1st",
  "空之轨迹 the 1st 数字豪华版": "空之轨迹 the 1st 数字豪华版",
  "空之轨迹 the 1st 体验版": "空之轨迹 the 1st 体验版",
  "SILENT HILL: Townfall - Deluxe Edition": "寂静岭：Townfall 豪华版",
  "The Last of Us™ Part II Remastered": "最后生还者 第二部 重制版",
  "The Last of Us™ Part II 数字豪华版": "The Last of Us Part II 数字豪华版",
  "The Last of Us™ Part II 普通版": "The Last of Us Part II 普通版",
  "鸣潮": "鸣潮",
  "Street Fighter 6 Demo": "街头霸王6 体验版",
  "艾尔登法环 黄金树幽影版 PS4 & PS5": "艾尔登法环 黄金树幽影版 PS4 & PS5",
  "艾尔登法环 PS4 & PS5": "艾尔登法环 PS4 & PS5",
  "艾尔登法环 黄金树幽影 数字典藏包 PS4 & PS5": "艾尔登法环 黄金树幽影 数字典藏包 PS4 & PS5",
  "艾尔登法环 黄金树幽影 数字豪华版 PS4 & PS5": "艾尔登法环 黄金树幽影 数字豪华版 PS4 & PS5",
  "《刺客信条：影》数字豪华版": "刺客信条: 影数字豪华版",
  "《刺客信条：影》高级版": "刺客信条: 影高级版",
  "《刺客信条：影》": "刺客信条: 影",
  "The Last of Us™ Part I": "最后生还者 第一部",
  "《The Last of Us™ Part I》数字豪华版": "The Last of Us Part I数字豪华版",
  "黑神话：悟空": "黑神话: 悟空",
  "黑神话：悟空 数字豪华版": "黑神话: 悟空 数字豪华版",
  "《FINAL FANTASY RESONANCE》第一章抢先体验版 (日语, 英语)": "FINAL FANTASY RESONANCE第一章抢先体验版",
  "《FINAL FANTASY RESONANCE》第一章抢先体验版": "FINAL FANTASY RESONANCE第一章抢先体验版",
  "双影奇境": "双影奇境",
  "《双影奇境》 - 好友通行证": "双影奇境 - 好友通行证",
  "极限竞速：地平线 5 标准版": "极限竞速: 地平线 5 标准版",
  "极限竞速：地平线 5 顶级版": "极限竞速: 地平线 5 顶级版",
  "极限竞速：地平线 5 豪华版": "极限竞速: 地平线 5 豪华版",
  "异环": "异环",
  "異環": "異環",
  "Dragon&#x27;s Dogma 2: Dark Arisen": "Dragon's Dogma 2 角色编辑&保存",
  "Dragon&#x27;s Dogma 2": "Dragon's Dogma 2 角色编辑&保存",
  "Dragon&#x27;s Dogma 2 角色编辑＆保存": "Dragon's Dogma 2 角色编辑&保存",
  "《刺客信条：奥德赛》终极版": "刺客信条: 奥德赛终极版",
  "《刺客信条：奥德赛》 - 数码标准版": "刺客信条: 奥德赛 - 数码标准版",
  "《刺客信条》古典组合包": "刺客信条古典组合包",
  "《刺客信条：奥德赛》豪华版": "刺客信条: 奥德赛豪华版",
  "《刺客信条：奥德赛》- 数码黄金版": "刺客信条: 奥德赛- 数码黄金版",
  "「《刺客信条：奥德赛》- 数码黄金版」+「《刺客信条：起源》 - 数码黄金版」同捆包": "刺客信条: 奥德赛- 数码黄金版+刺客信条: 起源 - 数码黄金版同捆包",
  "「《刺客信条：奥德赛》- 数码黄金版」+「《刺客信条：艾吉奥合辑》- 数码标准版」同捆包": "刺客信条: 奥德赛- 数码黄金版+刺客信条: 艾吉奥合辑- 数码标准版同捆包",
  "《绝区零》": "绝区零",
  "絕區零": "絕區零",
  "Apex Legends™ PS4™": "Apex 英雄",
  "Apex Legends™ PS5": "Apex 英雄",
  "《Apex 英雄》": "Apex 英雄",
  "全境封锁2 (中日英韩文版)": "全境封锁2",
  "《全境封锁 2》- 黄金版 (中日英韩文版)": "全境封锁 2- 黄金版",
  "全境封锁2 - 精英版 (中日英韩文版)": "全境封锁2 - 精英版",
  "全境封锁2 - 传奇版 (中日英韩文版)": "全境封锁2 - 传奇版",
  "全境封锁2 - 终极版 (中日英韩文版)": "全境封锁2 - 终极版",
  "Bloodborne™ The Old Hunters Edition (中英韩文版)": "血源诅咒 老猎人版",
  "Bloodborne™ PlayStation®Hits (中英韩文版)": "血源诅咒 PlayStation Hits",
  "WORLD OF WARSHIPS: LEGENDS": "战舰世界：传奇",
  "Microsoft Flight Simulator 2024- Standard Edition": "微软飞行模拟2024 标准版",
  "Microsoft Flight Simulator 2024 - Premium Deluxe Edition": "微软飞行模拟2024 高级豪华版",
  "Microsoft Flight Simulator 2024 - Deluxe Edition": "微软飞行模拟2024 豪华版",
  "Microsoft Flight Simulator 2024 -  Aviator Edition": "微软飞行模拟2024 飞行员版",
  "PS5®版《NBA 2K26》": "NBA 2K26超级明星版",
  "《NBA 2K26》超级明星版": "NBA 2K26超级明星版",
  "《NBA 2K26》x《PGA TOUR 2K25》同捆包": "NBA 2K26xPGA TOUR 2K25同捆包",
  "《NBA 2K26》x《WWE 2K25》同捆包": "NBA 2K26xWWE 2K25同捆包",
  "《NBA 2K26》SLAM版": "NBA 2K26超级明星版",
  "EA SPORTS™ 开球同捆包（《Madden NFL 27》和《College Football 27》） (英语)": "EA SPORTS 开球同捆包(Madden NFL 27和College Football 27)",
  "《EA SPORTS™ Madden NFL 27》豪华版 (英语)": "EA SPORTS Madden NFL 27豪华版",
  "EA SPORTS™ MVP 同捆包（《College Football 27》豪华版和《Madden NFL 27》豪华版） (英语)": "EA SPORTS MVP 同捆包(College Football 27豪华版和Madden NFL 27豪华版)",
  "剑星": "剑星",
  "《剑星》完整版": "剑星完整版",
  "宇宙机器人": "宇宙机器人",
  "《宇宙机器人》数字豪华版": "宇宙机器人数字豪华版",
  "战争雷霆 制品版 (日语, 英语)": "战争雷霆 制品版",
  "战争雷霆 (英语)": "战争雷霆",
  "Monster Hunter Wilds 黄金版": "Monster Hunter Wilds 黄金版",
  "我的世界": "我的世界",
  "《我的世界 豪华系列》": "我的世界 豪华系列",
  "双人成行 PS4™ 和 PS5™": "双人成行 PS4 和 PS5",
  "Hazelight 同捆包": "Hazelight 同捆包",
  "双人成行——好友通行证 PS4™": "双人成行——好友通行证 PS4",
  "双人成行——好友通行证 PS5™": "双人成行——好友通行证 PS5",
  "战地风云™ 6": "战地风云 6",
  "《战地风云™ 6》魅影版": "战地风云 6魅影版",
  "无限暖暖": "无限暖暖",
  "無限暖暖": "無限暖暖",
  "仁王3 数字豪华版": "仁王3 数字豪华版",
  "仁王3 数字豪华版 (日语, 韩语, 英语)": "仁王3 数字豪华版",
  "仁王３": "仁王3",
  "仁王３ (日语, 韩语, 英语)": "仁王3",
  "仁王3　体验版 (日语, 韩语, 英语)": "仁王3 体验版",
  "仁王3　体验版": "仁王3 体验版",
  "《使命召唤®：黑色行动冷战》跨越世代版 PS4™ & PS5™": "使命召唤: 黑色行动冷战跨越世代版 PS4 & PS5",
  "《使命召唤®：黑色行动冷战》标准版": "使命召唤: 黑色行动冷战标准版",
  "《孤岛惊魂6》年度版": "孤岛惊魂6年度版",
  "孤岛惊魂6": "孤岛惊魂6",
  "Far Cry® 6 FREE Trial": "孤岛惊魂6 体验版",
  "《孤岛惊魂6》豪华版": "孤岛惊魂6豪华版",
  "《孤岛惊魂6》黄金版": "孤岛惊魂6黄金版",
  "《孤岛惊魂》精选捆绑包": "孤岛惊魂精选捆绑包",
  "机动战士高达 激战任务2": "机动战士高达 激战任务2",
  "机动战士高达 激战任务２": "机动战士高达 激战任务2",
  "MOBILE SUIT GUNDAM BATTLE OPERATION 2": "机动战士高达 激战任务2",
  "三国志14 威力加强传承版套装 PS5": "三国志14 威力加强传承版套装 PS5",
  "三国志14 威力加强版套装": "三国志14 威力加强版套装",
  "三国志 14 (英语)": "三国志 14",
  "三国志 14 数字豪华版 (英语)": "三国志 14 数字豪华版",
  "三国志14 威力加强版套装 (英语)": "三国志14 威力加强版套装",
  "三国志14 威力加强版套装 数字豪华版 (英语)": "三国志14 威力加强版套装 数字豪华版",
  "The Blood of Dawnwalker 黎明行者之血": "The Blood of Dawnwalker 黎明行者之血",
  "The Blood of Dawnwalker 黎明行者之血 日蚀版": "The Blood of Dawnwalker 黎明行者之血 日蚀版",
  "猛兽派对": "猛兽派对",
  "猛兽派对豪华版": "猛兽派对豪华版",
  "REANIMAL DEMO": "生灵重塑 体验版",
  "World of Tanks Modern Armor (日语, 英语)": "World of Tanks Modern Armor – 极速恶魔",
  "World of Tanks Modern Armor – 极速恶魔 (日语, 英语)": "World of Tanks Modern Armor – 极速恶魔",
  "World of Tanks Modern Armor – 神准伙伴 (日语, 英语)": "World of Tanks Modern Armor – 神准伙伴",
  "World of Tanks Modern Armor": "World of Tanks Modern Armor – 极速恶魔",
  "Black Desert : Standard Edition": "黑色沙漠 标准版",
  "Black Desert : Mythical Edition": "黑色沙漠 神话版",
  "Call of Duty®: Modern Warfare® 2 Campaign Remastered": "使命召唤：现代战争2 战役重制版",
  "Resident Evil 4 PS4 & PS5": "生化危机4 PS4 & PS5",
  "Resident Evil 4 Gold Edition PS4 & PS5": "生化危机4 黄金版 PS4 & PS5",
  "Resident Evil 4 VR模式游戏体验版": "Resident Evil 4 VR模式游戏体验版",
  "《The Sims™ 4》": "模拟人生4",
  "The Sims™ 4": "模拟人生4",
  "真・三国无双 起源": "真・三国无双 起源",
  "真・三国无双 起源 数字豪华版": "真・三国无双 起源 数字豪华版",
  "真・三国无双 起源 (日语, 韩语, 英语)": "真・三国无双 起源",
  "真・三国无双 起源 体验版": "真・三国无双 起源 体验版",
  "真・三国无双 起源 体验版 (日语, 韩语, 英语)": "真・三国无双 起源 体验版",
  "真・三国无双 起源 数字豪华版 (日语, 韩语, 英语)": "真・三国无双 起源 数字豪华版",
  "NINJA GAIDEN 4 豪华版": "NINJA GAIDEN 4 豪华版",
  "《疯狂兔子：奇遇派对》": "疯狂兔子: 奇遇派对",
  "Overcooked! 2 - Gourmet Edition": "胡闹厨房2 美食版",
  "Red Dead Redemption 2": "Red Dead 在线模式",
  "Red Dead Redemption 2：终极版": "Red Dead Redemption 2: 终极版",
  "Red Dead 在线模式": "Red Dead 在线模式",
  "Wo Long 2: Wings of Ember Digital Deluxe Edition (中日英韩文版)": "卧龙2：凤火连天 数字豪华版",
  "Wo Long 2: Wings of Ember（卧龙2：凤火连天） (中日英韩文版)": "Wo Long 2: Wings of Ember(卧龙2: 凤火连天)",
  "《赛博朋克 2077》": "赛博朋克 2077",
  "《赛博朋克 2077：终极版》 (PS5)": "赛博朋克 2077: 终极版 (PS5)",
  "看门狗 2 - 数码标准版 PlayStation®Hits": "看门狗 2 - 数码标准版 PlayStationHits",
  "看门狗 2 - 数码黄金版": "看门狗 2 - 数码黄金版",
  "《看门狗》+《看门狗 2》标准版捆绑包": "看门狗+看门狗 2标准版捆绑包",
  "看门狗 2 - 体验版": "看门狗 2 - 体验版",
  "神界：原罪2 - 终极版 PS4 & PS5": "神界: 原罪2 - 终极版 PS4 & PS5",
  "Warframe® (英语)": "Warframe 制品版",
  "Warframe® 制品版 (中日英韩文版)": "Warframe 制品版",
  "Warframe": "Warframe 制品版",
  "Resident Evil Requiem 豪华版": "Resident Evil Requiem 豪华版",
  "Resident Evil Requiem - Demo": "生化危机 安魂曲 体验版",
  "HELLDIVERS™ 2": "HELLDIVERS 2超级公民版",
  "《HELLDIVERS™ 2》超级公民版": "HELLDIVERS 2超级公民版",
  "Alan Wake 2 Deluxe Edition": "心灵杀手2 豪华版",
  "007 First Light - 豪华版": "007 First Light - 豪华版",
  "Wo Long: Fallen Dynasty Complete Edition (PS4 & PS5)": "卧龙：苍天陨落 完整版 (PS4 & PS5)",
  "《彩虹六号：围攻》- 终极版": "彩虹六号: 围攻- 终极版",
  "《彩虹六号：围攻》- 精英版": "彩虹六号: 围攻- 精英版",
  "《彩虹六号：围攻》- 免费版": "彩虹六号: 围攻- 免费版",
  "《虹彩六號：圍攻行動 》": "虹彩六號: 圍攻行動",
  "FINAL FANTASY XVI 完全版": "FINAL FANTASY XVI 完全版",
  "FINAL FANTASY XVI DEMO": "最终幻想XVI 体验版",
  "Transport Fever 3: 豪华版": "Transport Fever 3: 豪华版",
  "超级机器人大战Y 数字终极版": "超级机器人大战Y 数字终极版",
  "超级机器人大战Y 数字豪华版": "超级机器人大战Y 数字豪华版",
  "超级机器人大战Y 体验版": "超级机器人大战Y 体验版",
  "超级机器人大战Y": "超级机器人大战Y",
  "FINAL FANTASY VII REBIRTH Digital Deluxe Edition (中韩文版)": "最终幻想VII 重生 数字豪华版",
  "FINAL FANTASY VII REBIRTH (中韩文版)": "最终幻想VII 重生",
  "FINAL FANTASY VII REBIRTH (日语, 英语)": "最终幻想VII 重生",
  "FINAL FANTASY VII REBIRTH DEMO (中韩文版)": "最终幻想VII 重生 体验版",
  "FINAL FANTASY VII REBIRTH DEMO (日语, 英语)": "最终幻想VII 重生 体验版",
  "明日方舟：终末地": "明日方舟: 终末地",
  "明日方舟：終末地": "明日方舟: 終末地",
  "Moving Out 2 - Deluxe Edition": "胡闹搬家2 豪华版",
  "勇者斗恶龙 VII Reimagined": "勇者斗恶龙 VII Reimagined",
  "勇者斗恶龙 VII Reimagined 数字豪华版": "勇者斗恶龙 VII Reimagined 数字豪华版",
  "勇者斗恶龙 VII Reimagined 数字豪华版 (日语, 英语)": "勇者斗恶龙 VII Reimagined 数字豪华版",
  "勇者斗恶龙 VII Reimagined (日语, 英语)": "勇者斗恶龙 VII Reimagined",
  "勇者斗恶龙 VII Reimagined 率先启程体验版 (日语, 英语)": "勇者斗恶龙 VII Reimagined 率先启程体验版",
  "勇者斗恶龙 VII Reimagined 率先启程体验版": "勇者斗恶龙 VII Reimagined 率先启程体验版",
  "THE FIRST DESCENDANT": "第一后裔",
  "人中之龙８　究极版　PS4 & PS5": "人中之龙8 究极版 PS4 & PS5",
  "人中之龙８ PS4 & PS5": "人中之龙8 PS4 & PS5",
  "人中之龙８　豪华版　PS4 & PS5": "人中之龙8 豪华版 PS4 & PS5",
  "《使命召唤®：先锋》跨越世代版": "使命召唤: 先锋跨越世代版",
  "《使命召唤®：先锋》标准版": "使命召唤: 先锋标准版",
  "ONE PIECE 海贼无双4 PS4 & PS5": "ONE PIECE 海贼无双4 PS4 & PS5",
  "ONE PIECE 海贼无双 4 数字传奇版 PS4 & PS5": "ONE PIECE 海贼无双 4 数字传奇版 PS4 & PS5",
  "ONE PIECE 海贼无双4 数字终极版 PS4 & PS5": "ONE PIECE 海贼无双4 数字终极版 PS4 & PS5",
  "UFC™ 6": "UFC 6",
  "《UFC™ 6》终极版": "UFC 6终极版",
  "《Until Dawn 2》数字豪华版 (中日英韩文版)": "Until Dawn 2数字豪华版",
  "数码宝贝物语 时空异客 数字终极版": "数码宝贝物语 时空异客 数字终极版",
  "数码宝贝物语 时空异客": "数码宝贝物语 时空异客",
  "数码宝贝物语 时空异客 数字豪华版": "数码宝贝物语 时空异客 数字豪华版",
  "数码宝贝物语 时空异客 体验版": "数码宝贝物语 时空异客 体验版",
  "FINAL FANTASY XV ROYAL EDITION": "最终幻想XV 皇家版",
  "FINAL FANTASY XV ROYAL EDITION (日语, 英语)": "最终幻想XV 皇家版",
  "《渡神纪 芬尼斯崛起》- 数字黄金版 PS4 & PS5": "渡神纪 芬尼斯崛起- 数字黄金版 PS4 & PS5",
  "《渡神纪 芬尼斯崛起》- 数字标准版 PS4 & PS5": "渡神纪 芬尼斯崛起- 数字标准版 PS4 & PS5",
  "《渡神纪 芬尼斯崛起》 - 免费体验版": "渡神纪 芬尼斯崛起 - 免费体验版",
  "《地平线 西之绝境™》完整版": "地平线 西之绝境完整版",
  "《地平线 西之绝境™》": "地平线 西之绝境",
  "Horizon Forbidden West™": "地平线 西之绝境",
  "人中之龙 极３ / 人中之龙３外传 Dark Ties 豪华版 PS4 & PS5": "人中之龙 极3 / 人中之龙3外传 Dark Ties 豪华版 PS4 & PS5",
  "人中之龙 极３ / 人中之龙３外传 Dark Ties PS4 & PS5": "人中之龙 极3 / 人中之龙3外传 Dark Ties PS4 & PS5",
  "人中之龙 极３ / 人中之龙３外传 Dark Ties 体验版": "人中之龙 极3 / 人中之龙3外传 Dark Ties 体验版",
  "Ready or Not: Digital Deluxe Edition": "严阵以待 数字豪华版",
  "深海迷航": "深海迷航",
  "漫威争锋": "漫威争锋",
  "漫威爭鋒": "漫威爭鋒",
  "无主之地®4": "无主之地4",
  "《无主之地® 4》超级豪华版": "无主之地 4超级豪华版",
  "《无主之地® 4》豪华版": "无主之地 4豪华版",
  "永劫无间": "永劫无间",
  "永劫無間": "永劫無間",
  "《飙酷车神：轰鸣盛典》跨世代捆绑包": "飙酷车神: 轰鸣盛典跨世代捆绑包",
  "《飙酷车神：轰鸣盛典》第 3 年终极版": "飙酷车神: 轰鸣盛典第 3 年终极版",
  "《飙酷车神：轰鸣盛典》豪华版": "飙酷车神: 轰鸣盛典豪华版",
  "《飙酷车神：轰鸣盛典》": "飙酷车神: 轰鸣盛典",
  "《飙酷车神：轰鸣盛典》第 2 年终极版": "飙酷车神: 轰鸣盛典第 2 年终极版",
  "猎人：荒野的召唤™": "猎人: 荒野的召唤",
  "theHunter: Call of the Wild™ - Ultimate Hunting Bundle": "猎人：荒野的召唤 终极狩猎组合包",
  "《猎人：荒野的召唤™》——职业猎人包": "猎人: 荒野的召唤——职业猎人包",
  "《猎人：荒野的召唤™》——狩猎新手同捆包": "猎人: 荒野的召唤——狩猎新手同捆包",
  "《古墓丽影：亚特兰蒂斯遗迹》 (中日英韩文版)": "古墓丽影: 亚特兰蒂斯遗迹",
  "NieR:Automata DEMO 120161128 (中韩文版)": "尼尔：机械纪元 体验版 120161128",
  "三国志8 REMAKE 威力加强版套装": "三国志8 REMAKE 威力加强版套装",
  "三国志8 REMAKE (PS4 & PS5)": "三国志8 REMAKE (PS4 & PS5)",
  "三国志8 REMAKE 数字豪华版 (PS4 & PS5)": "三国志8 REMAKE 数字豪华版 (PS4 & PS5)",
  "三国志8 REMAKE (PS4 & PS5) (英语)": "三国志8 REMAKE (PS4 & PS5)",
  "三国志8 REMAKE 数字豪华版 (PS4 & PS5) (英语)": "三国志8 REMAKE 数字豪华版 (PS4 & PS5)",
  "三国志8 REMAKE 威力加强版套装 (英语)": "三国志8 REMAKE 威力加强版套装",
  "狂野飙车：竞速传奇": "狂野飙车: 竞速传奇",
  "狂野飆車：競速傳奇": "狂野飆車: 競速傳奇",
  "七龙珠 电光炸裂！ZERO": "七龙珠 电光炸裂!ZERO",
  "七龙珠 电光炸裂！ZERO 数字传奇版": "七龙珠 电光炸裂!ZERO 数字传奇版",
  "七龙珠 电光炸裂！ZERO 极限超突破NEO版": "七龙珠 电光炸裂!ZERO 极限超突破NEO版",
  "3on3 街头篮球": "3on3 街头篮球",
  "3对3街头篮球": "3对3街头篮球",
  "3on3 FreeStyle": "3对3街头篮球",
  "Warhammer 40,000: Space Marine 2": "Warhammer 40,000: 星际战士2",
  "晶核": "晶核",
  "《Sackboy: A Big Adventure》数字豪华版 PS4 & PS5": "Sackboy: A Big Adventure数字豪华版 PS4 & PS5",
  "Sackboy: A Big Adventure PS4 & PS5": "麻布仔大冒险 PS4 & PS5",
  "《Sackboy: A Big Adventure》数字豪华版升级包": "Sackboy: A Big Adventure数字豪华版升级包",
  "Dune: Awakening 沙丘：觉醒": "Dune: Awakening 沙丘: 觉醒",
  "Dune: Awakening 沙丘：觉醒 - 豪华版": "Dune: Awakening 沙丘: 觉醒 - 豪华版",
  "Dune: Awakening 沙丘：觉醒 - 终极版": "Dune: Awakening 沙丘: 觉醒 - 终极版",
  "FINAL FANTASY VII REMAKE INTERGRADE Digital Deluxe Edition （中韩文版）": "最终幻想VII 重制版 Intergrade 数字豪华版",
  "FINAL FANTASY VII REMAKE Digital Deluxe Edition": "最终幻想VII 重制版 数字豪华版",
  "FINAL FANTASY VII REMAKE INTERGRADE （中韩文版）": "最终幻想VII 重制版 Intergrade",
  "FINAL FANTASY VII REMAKE INTERGRADE Digital Deluxe Edition （日英文版） (日语, 英语)": "最终幻想VII 重制版 Intergrade 数字豪华版",
  "FINAL FANTASY VII REMAKE INTERGRADE （日英文版） (日语, 英语)": "最终幻想VII 重制版 Intergrade",
  "FINAL FANTASY VII REMAKE DEMO (中韩文版)": "最终幻想VII 重制版 体验版",
  "FINAL FANTASY VII REMAKE DEMO": "最终幻想VII 重制版 体验版",
  "《F1® 25》：2026赛季版": "F1 25: 2026赛季版",
  "F1® 25": "F1 25: 2026赛季版",
  "Marvel&#x27;s Spider-Man: Miles Morales PS4 & PS5": "漫威蜘蛛侠：迈尔斯·莫拉莱斯 PS4 & PS5",
  "Marvel&#x27;s Spider-Man: Miles Morales Ultimate Edition": "漫威蜘蛛侠：迈尔斯·莫拉莱斯 终极版",
  "Kingdom Come: Deliverance II Royal Edition": "天国: 拯救2 皇家版",
  "Kingdom Come: Deliverance II": "天国: 拯救2",
  "Battlefield™ 1": "战地1",
  "Battlefield™ 1 Revolution": "战地1 革命版",
  "Battlefield™ 1与Titanfall™ 2终极同捆包": "Battlefield 1与Titanfall 2终极同捆包",
  "碧蓝幻想Relink 无尽黄昏（普通版）": "碧蓝幻想Relink 无尽黄昏(普通版)",
  "碧蓝幻想Relink 无尽黄昏（特别版）": "碧蓝幻想Relink 无尽黄昏(特别版)",
  "Granblue Fantasy: Relink Standard Edition PS4＆PS5": "碧蓝幻想：Relink 标准版 PS4&PS5",
  "碧蓝幻想Relink 无尽黄昏 Demo": "碧蓝幻想Relink 无尽黄昏 Demo",
  "《刺客信条：幻景》+《刺客信条：英灵殿》同捆包": "刺客信条: 幻景+刺客信条: 英灵殿同捆包",
  "《刺客信条：幻景》": "刺客信条: 幻景",
  "《刺客信条：幻景》 - 刺客大师版": "刺客信条: 幻景 - 刺客大师版",
  "《刺客信条：幻景》豪华版": "刺客信条: 幻景豪华版",
  "《NBA 2K25》全明星版": "NBA 2K25全明星版",
  "《NBA 2K25》标准版": "NBA 2K25标准版",
  "《NBA 2K25》锦标赛版": "NBA 2K25锦标赛版",
  "《WWE 2K26》标准版 (英语)": "WWE 2K26标准版",
  "《WWE 2K26》King of Kings版 (英语)": "WWE 2K26标准版",
  "《WWE 2K26》狂野年代版 (英语)": "WWE 2K26狂野年代版",
  "《WWE 2K26》Monday Night War版 (英语)": "WWE 2K26标准版",
  "铁拳8 Season2 Deluxe Edition": "铁拳8 Season2 Deluxe Edition",
  "铁拳8 Season2 Ultimate Edition": "铁拳8 Season2 Ultimate Edition",
  "铁拳8": "铁拳8",
  "铁拳8 Advanced Edition": "铁拳8 Advanced Edition",
  "《守望先锋®》": "守望先锋",
  "《守望先锋®》 (英语)": "守望先锋",
  "《鬥陣特攻®》": "鬥陣特攻",
  "《极限国度》豪华版": "极限国度豪华版",
  "《极限国度》高级版": "极限国度高级版",
  "《极限国度》 PS4 & PS5": "极限国度 PS4 & PS5",
  "STRANGER THAN HEAVEN 豪华版 (中日英韩文版)": "STRANGER THAN HEAVEN 豪华版",
  "《致命躯壳 II：虔诚版》": "致命躯壳 II: 虔诚版",
  "《致命躯壳 II》": "致命躯壳 II",
  "《致命躯壳 II》公开测试": "致命躯壳 II公开测试",
  "七龙珠 异战2": "七龙珠 异战2",
  "七龙珠 异战2 (日语)": "七龙珠 异战2",
  "七龙珠 异战2 数字特别版": "七龙珠 异战2 数字特别版",
  "七龙珠 异战2 数字豪华版": "七龙珠 异战2 数字豪华版",
  "七龙珠 异战2 体验版 (日语)": "七龙珠 异战2 体验版",
  "七龙珠 异战2 体验版": "七龙珠 异战2 体验版",
  "HITMAN World of Assassination Deluxe Edition": "杀手：暗杀世界 豪华版",
  "双点博物馆：探索者版": "双点博物馆: 探索者版",
  "双点博物馆": "双点博物馆",
  "NARUTO X BORUTO 火影忍者 终极风暴羁绊 豪华数字版 PS4™ & PS5®": "NARUTO X BORUTO 火影忍者 终极风暴羁绊 豪华数字版 PS4 & PS5",
  "NARUTO X BORUTO 火影忍者 终极风暴羁绊 乐曲终极数字版 PS4™ & PS5®": "NARUTO X BORUTO 火影忍者 终极风暴羁绊 乐曲终极数字版 PS4 & PS5",
  "NARUTO X BORUTO 火影忍者 终极风暴羁绊 PS4™ & PS5®": "NARUTO X BORUTO 火影忍者 终极风暴羁绊 PS4 & PS5",
  "星之翼（Starward）": "星之翼(Starward)",
  "女神异闻录４ Revival (中日英韩文版)": "女神异闻录4 Revival",
  "女神异闻录４ Revival: 数字高级版 (中日英韩文版)": "女神异闻录4 Revival: 数字高级版",
  "女神异闻录４ Revival: 数字豪华版 (中日英韩文版)": "女神异闻录4 Revival: 数字豪华版",
  "梦之形": "梦之形",
  "《Sky光·遇》": "Sky光·遇",
  "Halo: Campaign Evolved": "Halo: Campaign Evolved - 高级版",
  "Halo: Campaign Evolved - 高级版": "Halo: Campaign Evolved - 高级版",
  "DEAD OR ALIVE Xtreme 沙滩排球 3 Fortune (中英韩文版)": "DEAD OR ALIVE Xtreme 沙滩排球 3 Fortune",
  "DEAD OR ALIVE Xtreme 沙滩排球 3 Fortune 基本免费版 (中英韩文版)": "DEAD OR ALIVE Xtreme 沙滩排球 3 Fortune 基本免费版",
  "DEAD OR ALIVE Xtreme 3 Fortune": "DEAD OR ALIVE Xtreme 沙滩排球 3 Fortune",
  "潜行者 2：切尔诺贝利之心 - 终极版": "潜行者 2: 切尔诺贝利之心 - 终极版",
  "潜行者2：切尔诺贝利之心": "潜行者2: 切尔诺贝利之心",
  "潜行者 2：切尔诺贝利之心 - 豪华版": "潜行者 2: 切尔诺贝利之心 - 豪华版",
  "小小梦魇3": "小小梦魇3",
  "小小梦魇3 数字豪华版": "小小梦魇3 数字豪华版",
  "Little Nightmares III - Free Trial & Friend&#x27;s Pass": "小小梦魇III 免费体验版与好友通行证",
  "光与影：33号远征队": "光与影: 33号远征队",
  "光与影：33号远征队 豪华版": "光与影: 33号远征队 豪华版",
  "THE FINALS - Year 1 Deluxe Edition": "THE FINALS Year 1 豪华版",
  "RESIDENT EVIL 2 Deluxe Edition": "生化危机2 重制版 豪华版",
  "《侏罗纪世界：进化 3》豪华版": "侏罗纪世界: 进化 3豪华版",
  "侏罗纪世界：进化 3": "侏罗纪世界: 进化 3",
  "《侏罗纪世界：进化 3》重生包。": "侏罗纪世界: 进化 3重生包。",
  "《暗黑破坏神2》重制版 - 终极包": "暗黑破坏神2重制版 - 终极包",
  "植物大战僵尸™：重植版": "植物大战僵尸: 重植版",
  "勇者斗恶龙XI S 寻觅逝去的时光 - Definitive Edition": "勇者斗恶龙XI S 寻觅逝去的时光 - Definitive Edition",
  "DRAGON QUEST XI S: Echoes of an Elusive Age – Definitive Edition (英语)": "勇者斗恶龙XI S 寻觅逝去的时光 决定版",
  "《勇者斗恶龙XI S 寻觅逝去的时光 - Definitive Edition》体验版": "勇者斗恶龙XI S 寻觅逝去的时光 - Definitive Edition体验版",
  "《勇者斗恶龙XI S 寻觅逝去的时光 - Definitive Edition》体验版 (英语)": "勇者斗恶龙XI S 寻觅逝去的时光 - Definitive Edition体验版",
  "小小梦魇 强化版": "小小梦魇 强化版",
  "小小梦魇 强化版 - 数字完全版": "小小梦魇 强化版 - 数字完全版",
  "Little Nightmares Trial (中韩文版)": "小小梦魇 体验版",
  "《阿凡达：潘多拉边境™》完整版": "阿凡达: 潘多拉边境完整版",
  "阿凡达：潘多拉边境": "阿凡达: 潘多拉边境",
  "浴火重生版 - 《阿凡达：潘多拉边境™》": "浴火重生版 - 阿凡达: 潘多拉边境",
  "KINGDOM HEARTS HD 2.8 Final Chapter Prologue (英语)": "王国之心 HD 2.8 终章序幕",
  "KINGDOM HEARTS -HD 1.5+2.5 ReMIX- (英语)": "王国之心 -HD 1.5+2.5 ReMIX-",
  "KINGDOM HEARTS -HD 1.5+2.5 ReMIX- (日语)": "王国之心 -HD 1.5+2.5 ReMIX-",
  "KINGDOM HEARTS HD 2.8 Final Chapter Prologue (日语)": "王国之心 HD 2.8 终章序幕",
  "真人快打11": "真人快打11",
  "真人快打11终极版 PS4 & PS5": "真人快打11终极版 PS4 & PS5",
  "真人快打11：余波」典藏版": "真人快打11: 余波典藏版",
  "《真人快打11终极版》+《Injustice™ 2》 - 传奇版捆绑包": "真人快打11终极版+Injustice 2 - 传奇版捆绑包",
  "孤山独影": "孤山独影",
  "孤山独影——豪华版": "孤山独影——豪华版",
  "《GigaBash 巨击大乱斗》": "GigaBash 巨击大乱斗",
  "Cuphead (中日英韩文版)": "茶杯头",
  "Cuphead & The Delicious Last Course (游戏)": "Cuphead & The Delicious Last Course (游戏)",
  "《消逝的光芒：困兽》失地复苏豪华版": "消逝的光芒: 困兽失地复苏豪华版",
  "《消逝的光芒：困兽》": "消逝的光芒: 困兽",
  "《消逝的光芒：困兽》失地复苏决定版": "消逝的光芒: 困兽失地复苏决定版",
  "《席德·梅尔的文明VI 典藏版》": "席德·梅尔的文明VI 典藏版",
  "《席德·梅尔的文明VI》": "席德·梅尔的文明VI",
  "《席德·梅尔的文明VI 白金版》": "席德·梅尔的文明VI 白金版",
  "《使命召唤®：二战》数字豪华版 (中英韩文版)": "使命召唤: 二战数字豪华版",
  "使命召唤®：二战 (中英韩文版)": "使命召唤: 二战",
  "明末：渊虚之羽": "明末: 渊虚之羽",
  "《明末：渊虚之羽》豪华版": "明末: 渊虚之羽豪华版",
  "黯井微光": "黯井微光",
  "Marvel&#x27;s Spider-Man Remastered": "漫威蜘蛛侠 重制版",
  "Marvel&#x27;s Spider-Man Game Of The Year Edition": "漫威蜘蛛侠 年度版",
  "Fallout 76 PS4 & PS5": "辐射76 PS4 & PS5",
  "七龙珠Z 卡卡洛特 MASTER EDITION PS4 & PS5": "七龙珠Z 卡卡洛特 MASTER EDITION PS4 & PS5",
  "七龙珠Z 卡卡洛特 PS4&PS5": "七龙珠Z 卡卡洛特 PS4&PS5",
  "七龙珠Z 卡卡洛特 DAIMA EDITION PS4 & PS5": "七龙珠Z 卡卡洛特 DAIMA EDITION PS4 & PS5",
  "七龙珠Z 卡卡洛特 体验版": "七龙珠Z 卡卡洛特 体验版",
  "席德·梅尔的文明®VII": "席德·梅尔的文明VII",
  "《席德·梅尔的文明VII》开拓者版": "席德·梅尔的文明VII开拓者版",
  "《席德·梅尔的文明®VII》豪华版": "席德·梅尔的文明VII豪华版",
  "《动物园之星 2》豪华版": "动物园之星 2豪华版",
  "《动物园之星 2》": "动物园之星 2",
  "刺客信条：艾吉奥合集": "刺客信条: 艾吉奥合集",
  "「《刺客信条：枭雄》 - 数码黄金版」+「《刺客信条：艾吉奥合辑》 - 数码标准版」同捆包": "刺客信条: 枭雄 - 数码黄金版+刺客信条: 艾吉奥合辑 - 数码标准版同捆包",
  "Sniper Elite: Resistance PS4™ & PS5™": "狙击精英：抵抗 PS4 & PS5",
  "Sniper Elite: Resistance Deluxe Edition PS4™ & PS5™": "狙击精英：抵抗 豪华版 PS4 & PS5",
  "《刺客信条：英灵殿》- 数字标准版 PS4 & PS5": "刺客信条: 英灵殿- 数字标准版 PS4 & PS5",
  "《刺客信条：英灵殿》+《渡神纪 芬尼斯崛起》同捆包": "刺客信条: 英灵殿+渡神纪 芬尼斯崛起同捆包",
  "《刺客信条》神话同捆包": "刺客信条神话同捆包",
  "刺客信条：英灵殿 - 完全版": "刺客信条: 英灵殿 - 完全版",
  "刺客信条：英灵殿 - 豪华版": "刺客信条: 英灵殿 - 豪华版",
  "刺客信条：英灵殿 - 诸神黄昏版": "刺客信条: 英灵殿 - 诸神黄昏版",
  "《刺客信条：英灵殿》+《看门狗：军团》同捆包": "刺客信条: 英灵殿+看门狗: 军团同捆包",
  "愚者不灭（Stupid Never Dies）": "愚者不灭(Stupid Never Dies)",
  "愚者不灭（Stupid Never Dies）：First Bite Demo": "愚者不灭(Stupid Never Dies): First Bite Demo",
  "英灵神殿": "英灵神殿",
  "真人快打™ 1：终极版 (英语)": "真人快打 1: 终极版",
  "真人快打：远古之神捆绑包": "真人快打: 远古之神捆绑包",
  "真人快打™ 1 (英语)": "真人快打 1",
  "Destiny 2 PS4™ & PS5™": "命运2 PS4 & PS5",
  "Call of Duty®: Black Ops III - Zombies Chronicles Edition": "使命召唤：黑色行动III 僵尸编年史版",
  "Call of Duty®: Black Ops III - Zombies Chronicles Deluxe": "使命召唤：黑色行动III 僵尸编年史豪华版",
  "汤姆·克兰西《幽灵行动：断点》终极版 (游戏)": "汤姆·克兰西幽灵行动: 断点终极版 (游戏)",
  "《幽灵行动：断点》 - 标准版 (中日英韩文版)": "幽灵行动: 断点 - 标准版",
  "《幽灵行动：断点》 - 黄金版 (中日英韩文版)": "幽灵行动: 断点 - 黄金版",
  "汤姆·克兰西《幽灵行动：断点》 (中日英韩文版)": "汤姆·克兰西幽灵行动: 断点",
  "汤姆·克兰西《幽灵行动：断点》豪华版 (游戏)": "汤姆·克兰西幽灵行动: 断点豪华版 (游戏)",
  "战锤40K：暗潮": "战锤40K: 暗潮",
  "Warhammer 40,000: Darktide - 帝国版": "Warhammer 40,000: Darktide - 帝国版",
  "浪漫沙加3 错综宿命 数字豪华版 (中韩文版)": "浪漫沙加3 错综宿命 数字豪华版",
  "浪漫沙加3 错综宿命 (中韩文版)": "浪漫沙加3 错综宿命",
  "浪漫沙加3 错综宿命": "浪漫沙加3 错综宿命",
  "浪漫沙加3 错综宿命 数字豪华版": "浪漫沙加3 错综宿命 数字豪华版",
  "巨灵之斩：冥府群魔 — 收藏版": "巨灵之斩: 冥府群魔 — 收藏版",
  "巨人杀手：暗黑之潮": "巨人杀手: 暗黑之潮",
  "巨人杀手：暗黑之潮 试玩版": "巨人杀手: 暗黑之潮 试玩版",
  "大富翁11 PS4 & PS5": "大富翁11 PS4 & PS5",
  "RuneScape: Dragonwilds 符文世界：龙之荒野": "RuneScape: Dragonwilds 符文世界: 龙之荒野",
  "《符文世界：龙之荒野》 - 豪华版": "符文世界: 龙之荒野 - 豪华版",
  "Goat Simulator 3 - Multiversal Traveler&#x27;s Edition": "模拟山羊3 多元宇宙旅行者版",
  "Fate/EXTRA Record 数字豪华版 PS4 & PS5 (中日英韩文版)": "Fate/EXTRA Record 数字豪华版 PS4 & PS5",
  "三国志13 with 威力加强版": "三国志13 with 威力加强版",
  "三国志13": "三国志13",
  "Ratchet & Clank: Rift Apart 数字豪华版": "Ratchet & Clank: Rift Apart 数字豪华版",
  "《MARVEL Tōkon: Fighting Souls》终极版": "MARVEL Tōkon: Fighting Souls终极版",
  "《MARVEL Tōkon: Fighting Souls 》数字豪华版": "MARVEL Tōkon: Fighting Souls 数字豪华版",
  "咒语旅团": "咒语旅团",
  "迪士尼无限飞车— Disney Speedstorm": "迪士尼无限飞车— Disney Speedstorm",
  "《迪士尼無限飛車》— Disney Speedstorm": "迪士尼無限飛車— Disney Speedstorm",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN Digital Deluxe Edition PS4 & PS5": "最终幻想起源：天堂的陌生人 数字豪华版 PS4 & PS5",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN PS4 & PS5": "最终幻想起源：天堂的陌生人 PS4 & PS5",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN PS4 & PS5 (日语, 英语)": "最终幻想起源：天堂的陌生人 PS4 & PS5",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN Digital Deluxe Edition PS4 & PS5 (日语, 英语)": "最终幻想起源：天堂的陌生人 数字豪华版 PS4 & PS5",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN Digital Deluxe Upgrade (日语, 英语)": "最终幻想起源：天堂的陌生人 数字豪华升级包",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN DEMO VERSION (日语, 英语)": "最终幻想起源：天堂的陌生人 体验版",
  "STRANGER OF PARADISE FINAL FANTASY ORIGIN DEMO VERSION": "最终幻想起源：天堂的陌生人 体验版",
  "World War Z: Aftermath Deluxe Edition": "僵尸世界大战：余波 豪华版",
  "人中之龙８外传 Pirates in Hawaii 豪华版 PS4 & PS5": "人中之龙8外传 Pirates in Hawaii 豪华版 PS4 & PS5",
  "人中之龙８外传 Pirates in Hawaii PS4 & PS5": "人中之龙8外传 Pirates in Hawaii PS4 & PS5",
  "人中之龙８外传 Pirates in Hawaii 体验版": "人中之龙8外传 Pirates in Hawaii 体验版",
  "Dead by Daylight PS4™ & PS5™": "黎明杀机: 杰森版",
  "黎明杀机：十周年版": "黎明杀机: 十周年版",
  "《黎明杀机》 - 黄金版": "黎明杀机 - 黄金版",
  "《黎明杀机：杰森版》": "黎明杀机: 杰森版",
  "DRAGON BALL FighterZ PS4™&PS5®": "DRAGON BALL FighterZ传奇版 PS4 & PS5",
  "Dragonball FighterZ　FighterZ版  PS4™&PS5®": "DRAGON BALL FighterZ传奇版 PS4 & PS5",
  "DRAGON BALL FighterZ传奇版 PS4™ & PS5®": "DRAGON BALL FighterZ传奇版 PS4 & PS5",
  "真・三国无双7 with 猛将传 制品版": "真・三国无双7 with 猛将传 制品版",
  "真・三国无双7 with 猛将传 制品版 (英语)": "真・三国无双7 with 猛将传 制品版",
  "真・三国无双7 with 猛将传 制品版 (日语)": "真・三国无双7 with 猛将传 制品版",
  "DEAD OR ALIVE 6: Core Fighters (中日英韩文版)": "生死格斗6 基础免费版",
  "《Nobody Saves the World》+《Frozen Hearth》捆绑包": "Nobody Saves the World+Frozen Hearth捆绑包",
  "THE KING OF FIGHTERS XV 标准版 PS4 & PS5": "THE KING OF FIGHTERS XV 标准版 PS4 & PS5",
  "THE KING OF FIGHTERS XV Ultimate Edition": "拳皇XV 终极版",
  "THE KING OF FIGHTERS XV 豪华版 PS4 & PS5": "THE KING OF FIGHTERS XV 豪华版 PS4 & PS5",
  "THE KING OF FIGHTERS XV DEMO": "拳皇XV 体验版",
  "共鸣：瘟疫传说传承": "共鸣: 瘟疫传说传承",
  "我的世界地牢": "我的世界地牢",
  "《我的世界：地下城》：终极版": "我的世界: 地下城: 终极版",
  "信長之野望･新生 with 威力加強版 Complete Edition": "信長之野望・新生 with 威力加強版 Complete Edition",
  "信長之野望·新生": "信長之野望·新生",
  "信長之野望･新生 with 威力加強版 (英语)": "信長之野望・新生 with 威力加強版",
  "信長之野望･新生 with 威力加強版 數位豪華版 (英语)": "信長之野望・新生 with 威力加強版 數位豪華版",
  "信長之野望･新生 with 威力加強版": "信長之野望・新生 with 威力加強版",
  "信長之野望･新生 with 威力加強版 Complete Edition (英语)": "信長之野望・新生 with 威力加強版 Complete Edition",
  "信長之野望･新生 with 威力加強版 Complete Edition + Collector&#x27;s Set (英语)": "信長之野望・新生 with 威力加強版 Complete Edition + Collector's Set",
  "信長之野望･新生 with 威力加強版 Complete Edition + Collector&#x27;s Set": "信長之野望・新生 with 威力加強版 Complete Edition + Collector's Set",
  "信長之野望･新生 with 威力加強版 數位豪華版": "信長之野望・新生 with 威力加強版 數位豪華版",
  "信長之野望·新生 数字豪华版": "信長之野望·新生 数字豪华版",
  "SEGA 新创造球会": "SEGA 新创造球会",
  "SEGA 新創造球會": "SEGA 新創造球會",
  "《四海兄弟：故乡 最终版》": "四海兄弟: 故乡 最终版",
  "《四海兄弟：缄默法则》合集": "四海兄弟: 缄默法则合集",
  "四海兄弟：故乡": "四海兄弟: 故乡",
  "A Way Out Trial": "逃出生天 体验版",
  "Brotato PS4 & PS5": "土豆兄弟 PS4 & PS5",
  "《看门狗：军团》- 终极版 PS4 & PS5": "看门狗: 军团- 终极版 PS4 & PS5",
  "《看门狗：军团》 PS4 & PS5": "看门狗: 军团 PS4 & PS5",
  "《看门狗：军团》- 黄金版 PS4 & PS5": "看门狗: 军团- 黄金版 PS4 & PS5",
  "《看门狗：军团》豪华版 PS4 & PS5": "看门狗: 军团豪华版 PS4 & PS5",
  "女神异闻录３ Reload PS4＆PS5": "女神异闻录3 Reload PS4&PS5",
  "女神异闻录３ Reload 数字高级版 PS4＆PS5": "女神异闻录3 Reload 数字高级版 PS4&PS5",
  "女神异闻录３ Reload 数字豪华版 PS4＆PS5": "女神异闻录3 Reload 数字豪华版 PS4&PS5",
  "女神异闻录３ Reload 体验版": "女神异闻录3 Reload 体验版",
  "刺客信条：大革命 - 数字标准版": "刺客信条: 大革命 - 数字标准版",
  "DARK SOULS™ III (中英韩文版)": "黑暗之魂III",
  "DARK SOULS™ III - Deluxe Edition (中英韩文版)": "黑暗之魂III 豪华版",
  "《The Last of Us™ 合辑》": "The Last of Us 合辑",
  "GUNDAM 异轨征途 数字豪华版 (中日英韩文版)": "GUNDAM 异轨征途 数字豪华版",
  "GUNDAM 异轨征途 (中日英韩文版)": "GUNDAM 异轨征途",
  "鬼灭之刃 火之神血风谭2　豪华版 PS4 & PS5": "鬼灭之刃 火之神血风谭2 豪华版 PS4 & PS5",
  "鬼灭之刃 火之神血风谭2 PS4 & PS5": "鬼灭之刃 火之神血风谭2 PS4 & PS5",
  "乐高®蝙蝠侠™：黑暗骑士之遗豪华版": "乐高蝙蝠侠: 黑暗骑士之遗豪华版",
  "乐高®蝙蝠侠™：黑暗骑士之遗": "乐高蝙蝠侠: 黑暗骑士之遗",
  "地平线 山之呼唤™": "地平线 山之呼唤",
  "植物大战僵尸™: 和睦小镇保卫战": "植物大战僵尸: 和睦小镇保卫战",
  "《植物大战僵尸™：和睦小镇保卫战》豪华版": "植物大战僵尸: 和睦小镇保卫战豪华版",
  "EA 植物飞车捆绑包": "EA 植物飞车捆绑包",
  "勇者斗恶龙 创世小玩家２　破坏神席德与空荡岛 (中韩文版)": "勇者斗恶龙 创世小玩家2 破坏神席德与空荡岛",
  "DRAGON QUEST BUILDERS 2": "勇者斗恶龙 创世小玩家2",
  "勇者斗恶龙 创世小玩家２ 游戏本篇＋追加DLC第1波・第2波・第3波套装": "勇者斗恶龙 创世小玩家2 游戏本篇+追加DLC第1波・第2波・第3波套装",
  "勇者斗恶龙 创世小玩家２ 游戏本篇＋追加DLC第1波・第2波・第3波套装 (中韩文版)": "勇者斗恶龙 创世小玩家2 游戏本篇+追加DLC第1波・第2波・第3波套装",
  "DRAGON QUEST BUILDERS 2 Digital Deluxe Edition": "勇者斗恶龙 创世小玩家2 数字豪华版",
  "勇者斗恶龙 创世小玩家２　破坏神席德与空荡岛　玩个过瘾体验版 (中韩文版)": "勇者斗恶龙 创世小玩家2 破坏神席德与空荡岛 玩个过瘾体验版",
  "勇者斗恶龙 创世小玩家２　破坏神席德与空荡岛　玩个过瘾体验版": "勇者斗恶龙 创世小玩家2 破坏神席德与空荡岛 玩个过瘾体验版",
  "使命召唤®：现代战争®": "使命召唤: 现代战争",
  "THE KING OF FIGHTERS XIV ULTIMATE EDITION (游戏)": "THE KING OF FIGHTERS XIV ULTIMATE EDITION (游戏)",
  "THE KING OF FIGHTERS XIV (PS4™) (中日韩文版)": "拳皇XIV（PS4）",
  "THE KING OF FIGHTERS XIV (PS4™)": "拳皇XIV（PS4）",
  "《战地风云 5》": "战地风云 5",
  "《战地风云 5》决定版": "战地风云 5决定版",
  "《Grounded 2》：创始者版本": "Grounded 2: 创始者版本",
  "人中之龙7　光与暗的去向　国际版 Legendary Hero Edition": "人中之龙7 光与暗的去向 国际版 Legendary Hero Edition",
  "人中之龙7＆人中之龙８套装包": "人中之龙7&人中之龙8套装包",
  "人中之龙7　光与暗的去向　国际版 Hero Edition": "人中之龙7 光与暗的去向 国际版 Hero Edition",
  "人中之龙7　光与暗的去向　国际版": "人中之龙7 光与暗的去向 国际版",
  "《DEATH STRANDING 2:ON THE BEACH》数字豪华版": "DEATH STRANDING 2: ON THE BEACH数字豪华版",
  "Venus Vacation PRISM - DEAD OR ALIVE Xtreme -  数字豪华版": "Venus Vacation PRISM - DEAD OR ALIVE Xtreme - 数字豪华版",
  "《God of War Ragnarök》数字豪华版": "God of War Ragnarök数字豪华版",
  "Shadow Tactics: Blades of the Shogun Deluxe Edition": "影子战术：将军之刃 豪华版",
  "饿狼传说：群狼之城  Revenge Edition": "饿狼传说: 群狼之城 Revenge Edition",
  "饿狼传说：群狼之城  Legend Edition": "饿狼传说: 群狼之城 Legend Edition",
  "《纪元117：罗马和平》黄金版": "纪元117: 罗马和平黄金版",
  "《纪元117：罗马和平》": "纪元117: 罗马和平",
  "《神鬼寓言》尊享版": "神鬼寓言尊享版",
  "《神鬼寓言》标准版": "神鬼寓言标准版",
  "牧场物语 来吧！风之繁华集市": "牧场物语 来吧!风之繁华集市",
  "牧场物语 来吧！风之繁华集市 数字豪华版": "牧场物语 来吧!风之繁华集市 数字豪华版",
  "牧场物语 来吧！风之繁华集市 数字豪华典藏版": "牧场物语 来吧!风之繁华集市 数字豪华典藏版",
  "歧路旅人0 OCTOPATH TRAVELER 0 PS4&PS5": "歧路旅人0 OCTOPATH TRAVELER 0 PS4&PS5",
  "歧路旅人0 OCTOPATH TRAVELER 0 PS4&PS5 (日语, 英语)": "歧路旅人0 OCTOPATH TRAVELER 0 PS4&PS5",
  "歧路旅人0 序章体验版 (日语, 英语)": "歧路旅人0 序章体验版",
  "歧路旅人0 序章体验版": "歧路旅人0 序章体验版",
  "歧路旅人0 数字豪华版 OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4&PS5 (TC/SC/KR)": "歧路旅人0 数字豪华版 OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4&PS5",
  "歧路旅人0 数字豪华版 OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4&PS5 (EN/JP)": "歧路旅人0 数字豪华版 OCTOPATH TRAVELER 0 Digital Deluxe Edition PS4&PS5",
  "《EA SPORTS FC™ 26》标准版（PS4 和 PS5 版）": "EA SPORTS FC 26标准版(PS4 和 PS5 版)",
  "Mount & Blade II: Bannerlord - Digital Deluxe": "骑马与砍杀2：霸主 数字豪华版",
  "队长小翼2 世界群星": "队长小翼2 世界群星",
  "队长小翼2 世界群星 数字豪华版": "队长小翼2 世界群星 数字豪华版",
  "队长小翼2 世界群星 数字终极版": "队长小翼2 世界群星 数字终极版",
  "ACE COMBAT™ 7: SKIES UNKNOWN - TOP GUN: Maverick 数字豪华版 (游戏)": "ACE COMBAT 7: SKIES UNKNOWN - TOP GUN: Maverick 数字豪华版 (游戏)",
  "ACE COMBAT™ 7: SKIES UNKNOWN (中韩文版)": "皇牌空战7：未知空域",
  "ACE COMBAT™ 7: SKIES UNKNOWN - TOP GUN: Maverick 数字版 (游戏)": "ACE COMBAT 7: SKIES UNKNOWN - TOP GUN: Maverick 数字版 (游戏)",
  "《轮回之兽》数字豪华版": "轮回之兽数字豪华版",
  "超级忍 反攻的斩击 PS4 & PS5": "超级忍 反攻的斩击 PS4 & PS5",
  "超级忍 反攻的斩击 数字豪华版 PS4 & PS5": "超级忍 反攻的斩击 数字豪华版 PS4 & PS5",
  "《超级忍 反攻的斩击》试玩版": "超级忍 反攻的斩击试玩版",
  "Call of Duty®: Modern Warfare® Remastered": "使命召唤：现代战争 重制版",
  "MONSTER HUNTER: WORLD™": "怪物猎人：世界",
  "蝙蝠侠™：阿卡姆骑士 PlayStation®Hits (韩语, 英语)": "蝙蝠侠: 阿卡姆骑士 PlayStationHits",
  "蝙蝠侠：阿卡姆合辑 (韩语, 英语)": "蝙蝠侠: 阿卡姆合辑",
  "蝙蝠侠：阿卡姆骑士豪华版 (韩语, 英语)": "蝙蝠侠: 阿卡姆骑士豪华版",
  "火影忍者 疾风传 终极风暴4 (中日韩文版)": "火影忍者 疾风传 终极风暴4",
  "火影忍者疾风传：终极风暴4 慕留人传 (中日韩文版)": "火影忍者疾风传: 终极风暴4 慕留人传",
  "FINAL FANTASY X/X-2 HD Remaster (中韩文版)": "最终幻想X/X-2 高清重制版",
  "ACE COMBAT 8: WINGS OF THEVE": "空战奇兵8 希孚之翼",
  "エーペックスレジェンズ": "Apex 英雄",
  "機動戦士ガンダム　バトルオペレーション２": "机动战士高达 激战任务2",
  "「オーバーウォッチ®」": "守望先锋",
  "『NBA 2K27』": "NBA 2K27",
  "ドラゴンクエストⅩ　オンライン": "勇者斗恶龙X Online",
  "星の翼（Starward）": "星之翼",
  "Dragon's Dogma 2": "Dragon's Dogma 2 角色编辑&保存",
  "地球防衛軍６.２ INVADERS FROM ANOTHER WORLD": "地球防衛軍6.2 INVADERS FROM ANOTHER WORLD",
  "グランド・セフト・オートV (PlayStation®5)": "Grand Theft Auto 在线模式",
  "CONTROL Resonant（コントロール レゾナント）": "控制: 共振",
  "Dead by Daylight": "黎明杀机: 杰森版",
  "ディビジョン2": "全境封锁2",
  "グランツーリスモ７": "跑车浪漫旅 7",
  "Call of Duty®": "使命召唤: 战争地带",
  "ロマンシング サガ3 デスティニーユナイテッド": "浪漫沙加3 错综宿命",
  "Marvel’s Wolverine": "漫威金刚狼",
  "プロサッカークラブをつくろう！": "SEGA 新创造球会",
  "ディアブロ IV": "Diablo IV - 标准版",
  "レインボーシックス シージ": "虹彩六號: 圍攻行動",
  "紅の砂漠 Enhanced": "红色沙漠: 增强版",
  "アサシン クリード ブラック フラッグ RE:シンクロ": "刺客信条: 黑旗 记忆重置",
  "Stellar Blade™": "剑星",
  "風燕伝：Where Winds Meet（基本プレイ無料）": "燕云十六声(免费游玩)",
  "ロケットリーグ®": "火箭联盟",
  "RuneScape: Dragonwilds": "RuneScape: Dragonwilds 符文世界: 龙之荒野",
  "マーベル・ライバルズ": "漫威争锋",
  "地球防衛軍6": "地球防衛軍6",
  "ペルソナ４ リバイバル": "女神异闻录4 Revival",
  "GRANBLUE FANTASY: Relink": "碧蓝幻想：Relink",
  "ACE COMBAT™ 7: SKIES UNKNOWN": "皇牌空战7：未知空域",
  "Phantom Blade Zero": "影之刃零",
  "ボーダーランズ4": "无主之地4",
  "Call of Duty®: Black Ops II": "使命召唤：黑色行动II",
  "TEKKEN 8": "铁拳8",
  "GUNDAM ROGUE ORBIT": "GUNDAM 异轨征途",
  "アサシン クリード シャドウズ": "刺客信条: 影",
  "ドラゴンボールZ KAKAROT": "七龙珠Z 卡卡洛特 PS4&PS5",
  "NBA 2K26": "NBA 2K26超级明星版",
  "ドラゴンボール ゼノバース2": "七龙珠 异战2",
  "空の軌跡 the 1st": "空之轨迹 the 1st",
  "龍が如く８": "人中之龙8 PS4 & PS5",
  "クリスタル・オブ・アトラン": "晶核",
  "Bloodborne®": "血源诅咒",
  "Marvel’s Spider-Man: Miles Morales": "漫威蜘蛛侠：迈尔斯·莫拉莱斯",
  "信長の野望･新生": "信長之野望·新生",
  "Sky 星を紡ぐ子どもたち": "Sky光·遇",
  "ONE PIECE 海賊無双4": "ONE PIECE 海賊無双4",
  "theHunter: Call of the Wild™": "猎人: 荒野的召唤",
  "井戸の鳥 (Well Dweller)": "黯井微光",
  "サイバーパンク2077": "赛博朋克 2077",
  "WWE 2K26": "WWE 2K26标准版",
  "Party Animals": "猛兽派对",
  "The Blood of Dawnwalker": "The Blood of Dawnwalker 黎明行者之血",
  "Tower of Fantasy（幻塔）": "Tower of Fantasy(幻塔)",
  "餓狼伝説 City of the Wolves": "餓狼伝説 City of the Wolves",
  "Mortal Shell II": "致命躯壳 II",
  "三國志8 REMAKE": "三國志8 REMAKE",
  "アストロボット": "宇宙机器人",
  "赛博朋克 2077": "赛博朋克 2077",
  "Apex Legends™": "Apex英雄",
  "渔力全开": "渔力全开",
  "极限竞速：地平线 5": "极限竞速: 地平线 5",
  "极限竞速：地平线 6": "极限竞速: 地平线 6",
  "Grand Theft Auto V 增强版": "Grand Theft Auto V 增强版",
  "双人成行": "双人成行",
  "三角洲行动": "三角洲行动",
  "《赛博朋克 2077：往日之影》": "赛博朋克 2077: 往日之影",
  "Wallpaper Engine：壁纸引擎": "Wallpaper Engine: 壁纸引擎",
  "影之刃零": "影之刃零",
  "Warhammer 40,000: 星际战士2": "Warhammer 40,000: 星际战士2",
  "霍格沃茨之遗": "霍格沃茨之遗",
  "朋友，梭哈吧": "朋友,梭哈吧",
  "《使命召唤®：现代战争® III 2023》": "使命召唤: 现代战争 III 2023",
  "天国：拯救2": "天国: 拯救2",
  "Warframe 星际战甲": "Warframe 星际战甲",
  "饥荒联机版": "饥荒联机版",
  "黎明杀机": "黎明杀机",
  "HELLDIVERS™ 绝地潜兵2": "HELLDIVERS 绝地潜兵2",
  "方舟: 生存飞升": "方舟: 生存飞升",
  "Watch_Dogs® 2": "看门狗2",
  "王国：两位君主": "王国: 两位君主",
  "潜水员戴夫 DAVE THE DIVER": "潜水员戴夫 DAVE THE DIVER",
  "极限国度": "极限国度",
  "全面战争：战锤3": "全面战争: 战锤3",
  "底特律：化身为人": "底特律: 化身为人",
  "午夜轮班": "午夜轮班",
  "王国保卫战 6：新启程": "王国保卫战 6: 新启程",
  "Marvel’s Spider-Man Remastered": "漫威蜘蛛侠 重制版",
  "Far Cry® 6": "孤岛惊魂6",
  "针影裁梦": "针影裁梦",
  "Subnautica - 深海迷航": "Subnautica - 深海迷航",
  "机械狂欢": "机械狂欢",
  "Cities: Skylines II 都市：天际线2": "Cities: Skylines II 都市: 天际线2",
  "人类一败涂地 / Human Fall Flat": "人类一败涂地 / Human Fall Flat",
  "Steep™": "极限巅峰",
  "007 初露锋芒": "007 初露锋芒",
  "生存日志": "生存日志",
  "边缘世界 RimWorld": "边缘世界 RimWorld",
  "缺氧": "缺氧",
  "No Man's Sky 无人深空": "No Man's Sky 无人深空",
  "《猎人：荒野的召唤™》": "猎人: 荒野的召唤",
  "Sid Meier’s Civilization® VI": "席德·梅尔的文明VI",
  "苍翼：混沌效应": "苍翼: 混沌效应",
  "艾尔登法环": "艾尔登法环",
  "Ghost of Tsushima导演剪辑版": "Ghost of Tsushima导演剪辑版",
  "女神异闻录３ Reload": "女神异闻录3 Reload",
  "DARK SOULS™ III": "黑暗之魂III",
  "王国保卫战 5：联盟": "王国保卫战 5: 联盟",
  "雀魂麻将": "雀魂麻将",
  "女神异闻录5皇家版": "女神异闻录5皇家版",
  "最后纪元": "最后纪元",
  "逸剑风云决": "逸剑风云决",
  "刺客信条：影": "刺客信条: 影",
  "死亡搁浅2": "死亡搁浅2",
  "我们到了吗？": "我们到了吗?",
  "兰斯7 战国兰斯": "兰斯7 战国兰斯",
  "Titanfall® 2": "泰坦陨落2",
  "Hades": "哈迪斯",
  "Valheim: 英灵神殿": "Valheim: 英灵神殿",
  "战争雷霆": "战争雷霆",
  "不问凡尘": "不问凡尘",
  "UNCHARTED™: 盗贼传奇合辑": "UNCHARTED: 盗贼传奇合辑",
  "猎杀：对决 1896": "猎杀: 对决 1896",
  "Assassin's Creed® Odyssey": "刺客信条：奥德赛",
  "席德·梅尔的文明VII": "席德·梅尔的文明VII",
  "魔法门之英雄无敌：上古纪元 Heroes of Might and Magic: Olden Era": "魔法门之英雄无敌: 上古纪元 Heroes of Might and Magic: Olden Era",
  "Phasmophobia 恐鬼症": "Phasmophobia 恐鬼症",
  "塔罗斯的法则2": "塔罗斯的法则2",
  "《暗黑破坏神® IV》": "暗黑破坏神 IV",
  "消逝的光芒2: 重装上阵版": "消逝的光芒2: 重装上阵版",
  "死亡之门": "死亡之门",
  "地铁：离乡": "地铁: 离乡",
  "Rise of the Tomb Raider™": "古墓丽影：崛起",
  "Resident Evil 2": "生化危机2 重制版",
  "Yu-Gi-Oh! Master Duel": "游戏王 大师决斗",
  "原子之心": "原子之心",
  "Warhammer 40,000: 行商浪人": "Warhammer 40,000: 行商浪人",
  "神界：原罪2 - 终极版": "神界: 原罪2 - 终极版",
  "胡闹厨房 全都好吃": "胡闹厨房 全都好吃",
  "Kingdom Rush  - Tower Defense": "王国保卫战",
  "失落城堡2": "失落城堡2",
  "鲁特里一家死了（The Roottrees are Dead）": "鲁特里一家死了(The Roottrees are Dead)",
  "东方夜雀食堂 - Touhou Mystia's Izakaya": "东方夜雀食堂 - Touhou Mystia's Izakaya",
  "潜水员戴夫 - 丛林 Content Pack": "潜水员戴夫 - 丛林 Content Pack",
  "建筑模拟器": "建筑模拟器",
  "苏丹的游戏": "苏丹的游戏",
  "超级兔子人": "超级兔子人",
  "神之天平（ASTLIBRA Revision）": "神之天平(ASTLIBRA Revision)",
  "雨中冒险 2": "雨中冒险 2",
  "龙之剑:觉醒": "龙之剑: 觉醒",
  "桌面破坏神：挂机ARPG": "桌面破坏神: 挂机ARPG",
  "Cyberpunk 2077": "赛博朋克 2077",
  "How to Fish": "渔力全开",
  "Dressmaker": "针影裁梦",
  "Baldur's Gate 3": "博德之门3",
  "Total War: WARHAMMER III": "全面战争: 战锤3",
  "Forza Horizon 6": "极限竞速: 地平线 6",
  "Grand Theft Auto V Enhanced": "Grand Theft Auto V 增强版",
  "CONTROL Resonant": "控制: 共振",
  "Ghost of Tsushima DIRECTOR'S CUT": "Ghost of Tsushima导演剪辑版",
  "The Witcher 3: Wild Hunt — Remastered": "巫师3: 狂猎 — 重制版",
  "Call of Duty®: Modern Warfare® III": "使命召唤: 现代战争 III 2023",
  "Gamble With Your Friends": "朋友,梭哈吧",
  "Hogwarts Legacy": "霍格沃茨之遗",
  "Call of Duty®: Modern Warfare® 4": "使命召唤: 现代战争 4",
  "Street Fighter™ 6": "街头霸王6",
  "No Man's Sky": "No Man's Sky 无人深空",
  "Cities: Skylines II": "Cities: Skylines II 都市: 天际线2",
  "RimWorld": "边缘世界 RimWorld"
}, {
  normalize(title) {
    return title.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
      .replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"')
      .replace(/[™®]/g, '').normalize('NFKC').replace(/[’‘]/g, "'")
      .replace(/\s*:\s*/g, ': ').replace(/\s+/g, ' ').trim();
  },
  set(titles, title, value) {
    titles[title] = value;
    this.index = null;
    return true;
  },
  get(titles, title) {
    if (typeof title !== 'string') return titles[title];
    if (titles[title]) return titles[title];
    if (!this.index) {
      this.index = new Map(Object.entries(titles).map(([name, cn]) => [this.normalize(name).toLowerCase(), cn]));
      this.bases = [...this.index].sort((a, b) => b[0].length - a[0].length);
    }
    const normalized = this.normalize(title).toLowerCase();
    if (this.index.has(normalized)) return this.index.get(normalized);
    for (const [base, cn] of this.bases) {
      if (!normalized.startsWith(base + ' ')) continue;
      const rawSuffix = this.normalize(title).slice(base.length).trim();
      if (!/^(Nintendo Switch 2 Edition|Digital Deluxe Edition|Deluxe Edition|デジタルデラックスエディション|デジタルデラックス版|デラックスエディション|マスターズ版|PS4 & PS5)$/i.test(rawSuffix)) continue;
      const suffix = rawSuffix.replace(/Nintendo Switch 2 Edition/gi, 'Switch 2版')
        .replace(/デジタルデラックスエディション|Digital Deluxe Edition/gi, '数字豪华版')
        .replace(/デジタルデラックス版|デラックスエディション|Deluxe Edition/gi, '豪华版')
        .replace(/マスターズ版/g, '大师版');
      if (!/[ぁ-ヿ]/.test(suffix)) return cn + ' ' + suffix;
    }
    return undefined;
  }
});

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
    conceptId: g.conceptId,
    hasChinese: Boolean(g.hasChinese),
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
  'Premium Plus Edition',
  'Premium Deluxe Edition',
  'Aviator Edition',
  'Trilogy Edition',
  'The Old Hunters Edition',
  'GOTY Edition',
  '普通版',
  '年度版',
  '高级版',
  '高級版',
  '精英版',
  '传奇版',
  '傳奇版',
  '超级公民版',
  '超級公民版',
  '豪华系列',
  '豪華系列',
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
    .replace(/\s*[（\(][^）\)]*(?:中文|英文|日文|日语|日語|英语|英語|韩语|韓語|韓文|韩文|简中|繁中|中韓|中韩|日英|英日|中英|中日|Chinese|English|Japanese|Korean|TC|SC|KR|JP|EN)[^）\)]*[）\)]/gi, '')
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
    .replace(/[™®]/g, '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[《》「」『』【】()（）［］\[\]®™:：·,，。!！?？\-–—_\s]/g, '');

  for (let i = 0; i < rawGames.length; i++) {
    const game = rawGames[i];
    // 商品名字中的明确版本标记优先于特殊游戏名称的解析，避免捆绑包被误标为标准版。
    const productName = String(game.name || game.rawName || '').normalize('NFKC');
    if (/\b(?:Bundle|Upgrade|DLC|Demo|Trial)\b|\b(?:Premium(?:\s+Plus|\s+Deluxe)?|Digital\s+Deluxe|Deluxe|Ultimate|Gold|Aviator|Trilogy|Complete|GOTY)\s+Edition\b|\b(?:Starter|Expansion|Texture)\s+Pack\b|High[ -]res\s+Texture|The Old Hunters Edition|捆绑包|捆綁包|組合包|组合包|同捆包|豪华|豪華|高级版|高級版|精英版|传奇版|傳奇版|年度版|超级公民版|超級公民版|升级包|升級包|追加内容|追加內容|好友通行证|好友通行證|体验版|體驗版|体験版|试玩版|試玩版/i.test(productName)) continue;
    const { base, edition, lang } = extractBaseGame(game.name || game.rawName);
    const groupKey = game.conceptId ? `concept:${game.conceptId}` : canonicalGroupKey(base);
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
      return e.price > 0 && /^(?:标准版|普通版|通常版|標準版|Standard Edition)$/i.test(e.editionBadge || '')
        && !/\b(?:Lite|Demo|Trial|DLC)\b|体验版|體驗版|体験版|试玩版|試玩版|追加内容|追加內容|原石|创世结晶|創世結晶/i.test(title);
    }).sort((a, b) => {
      const platformPriority = e => e.platform === 'PS5' ? 0 : e.platform?.includes('PS5') ? 1 : 2;
      const languagePriority = e => e.langType === 'zh' || e.hasChinese ? 0 : 1;
      return platformPriority(a) - platformPriority(b) || languagePriority(a) - languagePriority(b) || a.price - b.price || a.rank - b.rank;
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
  datasets.ps5 = groupPs5Games(ps5Raw, null, false);
  datasets.ps5_with_ps4 = groupPs5Games(normalized, null, false);
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
let lastRankingRevision = '';
let collectorPlatformStatus = {};
let collectorStatusUnavailable = false;
async function syncCollectorRefreshMinutes({ write = false } = {}) {
  try {
    const response = await fetch(`${apiBase}${write ? '/api/settings' : '/health'}`, {
      method: write ? 'POST' : 'GET',
      headers: write ? { 'content-type': 'application/json' } : undefined,
      body: write ? JSON.stringify({ refreshMinutes: state.interval }) : undefined,
      cache: 'no-store',
      signal: AbortSignal.timeout(4000)
    });
    const payload = await response.json();
    if (!response.ok || ![5, 15, 30, 60].includes(Number(payload.refreshMinutes))) return;
    if (!write) {
      state.interval = Number(payload.refreshMinutes);
      const serverNow = Date.parse(payload.serverTime);
      const serverNext = Date.parse(payload.nextRefreshAt);
      serverRefreshInProgress = Boolean(payload.refreshInProgress);
      nextRefreshAt = Number.isFinite(serverNow) && Number.isFinite(serverNext)
        ? Date.now() + Math.max(0, serverNext - serverNow) : null;
      const select = $('#intervalSelect');
      if (select) select.value = String(state.interval);
      saveSettings();
      if (payload.platforms) {
        collectorPlatformStatus = payload.platforms;
        collectorStatusUnavailable = false;
        renderRefreshNotice();
        const revision = JSON.stringify(Object.entries(payload.platforms).map(([key, value]) => [key, value.updatedAt, value.refreshState, value.lastAttemptAt, value.lastError]));
        if (!lastRankingRevision) lastRankingRevision = revision;
        else if (revision !== lastRankingRevision && startupDataReady && state.auto && !refreshInProgress) {
          lastRankingRevision = revision;
          refresh({ silent: true });
        }
      }
    }
  } catch {
    collectorStatusUnavailable = true;
    renderRefreshNotice();
  }
}

function renderRefreshNotice() {
  const notice = $('#refreshNotice');
  if (!notice) return;
  const key = state.platform.startsWith('switch') ? activeNintendoKey()
    : state.platform === 'ps5' ? (state.psStore === 'jp' ? 'ps5_jp' : 'ps5')
    : state.steamRegion === 'global' ? 'steam_global' : 'steam';
  const local = key.startsWith('switch') ? nintendoStatus[key]
    : key === 'ps5' ? ps5Status : key === 'ps5_jp' ? ps5JpStatus
    : key === 'steam_global' ? steamGlobalStatus : steamStatus;
  const status = collectorPlatformStatus[key] || local || {};
  const success = status.updatedAt ? formatSourceTime(status.updatedAt) : '暂无成功记录';
  const failed = status.refreshState === 'failed' || Boolean(status.stale && status.lastError);
  const running = status.refreshState === 'refreshing';
  const interrupted = status.refreshState === 'interrupted';
  const partial = status.refreshState === 'partial';
  notice.dataset.state = collectorStatusUnavailable || failed ? 'failed' : running ? 'refreshing' : 'success';
  const attempt = status.lastAttemptAt ? `${formatSourceTime(status.lastAttemptAt)} ` : '';
  notice.textContent = collectorStatusUnavailable
    ? `无法确认本次更新状态，正在显示缓存 · 上次成功：${success}`
    : running ? `后台获取中，继续显示上次数据 · 上次成功：${success}`
    : interrupted ? `${attempt}采集因服务重启中断，本次未完成，继续显示缓存 · 上次成功：${success}`
    : partial ? `部分商品获取失败，未取得的新价格沿用缓存 · 本次采集：${success}`
    : failed ? `${attempt}获取失败，本次未更新，继续显示缓存 · 上次成功：${success}`
    : status.updatedAt ? `上次成功获取：${success}` : '尚未获取到数据';
  // 只显示短原因，避免后台的长错误信息撑高移动端页面。
  const error = String(status.lastError || '');
  const code = error.match(/\b(403|429|503|502)\b/)?.[1];
  if (!running && !interrupted && failed && code) notice.textContent += ` · HTTP ${code}`;
  else if (failed && /timeout|超时/i.test(error)) notice.textContent += ' · 连接超时';
  notice.title = failed ? error : '';
}
function normalizeGame(game){
  const labelDiscount=Number(String(game.saleLabel||'').match(/(\d+)\s*%/)?.[1]||0),discount=game.discount||labelDiscount;
  const old=game.old||(discount&&game.price?Math.round(game.price/(1-discount/100)):null);
  return {
    ...game,
    image: /^https:\/\/store\.nintendo\.com\.hk\/media\/catalog\/product\//.test(game.image || '')
      ? `${apiBase}/api/nintendo/image?url=${encodeURIComponent(game.image)}` : game.image,
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
  initialNintendo[platform]?{count:initialNintendo[platform].count,officialLimit:initialNintendo[platform].officialLimit,updatedAt:initialNintendo[platform].updatedAt,stale:true,sourceType:initialNintendo[platform].sourceType,sourceNote:initialNintendo[platform].sourceNote}:null
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
    nintendoStatus[platform]={count:payload.count||payload.games.length,officialLimit:payload.officialLimit||payload.games.length,updatedAt:payload.updatedAt,stale:Boolean(payload.stale),sourceType:payload.sourceType,sourceNote:payload.sourceNote};
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
const initialAuto = true;
const initialInterval = 60;

const savedRates=(()=>{try{return JSON.parse(localStorage.getItem('game-pulse-rates'))}catch{return null}})();
const state={platform:'switch1',view:'ranking',nintendoStore:'jp',psStore:'hk',steamRegion:'cn',includePs4:true,includeFreeInDeals:false,page:1,filteredCount:0,pageTotal:1,query:'',sort:'rank',auto:initialAuto,interval:initialInterval,remaining:initialInterval*60,rates:{JPY:0.042728,HKD:0.856469,CNY:1,...savedRates?.rates},rateUpdated:savedRates?.updated||null,rateSource:savedRates?.source||'备用汇率',rateStale:!savedRates};
let nextRefreshAt = null;
let serverRefreshInProgress = false;
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
async function scheduleNextRefresh() {
  await syncCollectorRefreshMinutes();
}
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const isPsPlatform = p => p === 'ps5' || p === 'ps4';
const isPsHk = () => (state.platform === 'ps5' && state.psStore === 'hk') || state.platform === 'ps4';
const isPsJp = () => state.platform === 'ps5' && state.psStore === 'jp';
const activeSteamKey = () => state.steamRegion === 'global' ? 'steam_global' : 'steam';
const activeNintendoKey = () => state.nintendoStore === 'hk' ? `${state.platform}_hk` : state.platform;
const isNintendoHk = () => state.platform.startsWith('switch') && state.nintendoStore === 'hk';
const activeHistoryKey = () => state.platform.startsWith('switch') ? activeNintendoKey() : state.platform === 'steam' ? activeSteamKey() : state.platform === 'ps5' ? `ps5_${state.psStore}` : state.platform==='ps4'?'ps5_hk':state.platform;
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

function clearBrowserDataCache() {
  const keys = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (key?.startsWith('game-pulse-') && key !== SETTINGS_STORAGE_KEY) keys.push(key);
  }
  for (const key of keys) localStorage.removeItem(key);
}

$('#clearCacheButton')?.addEventListener('click', () => {
  if (!startupDataReady || refreshInProgress) return;
  const button = $('#clearCacheButton');
  button.disabled = true;
  button.textContent = '正在清除…';
  try {
    clearBrowserDataCache();
    location.reload();
  } catch (error) {
    button.disabled = false;
    button.textContent = '清除缓存';
    toastQueue.push({ title: '缓存清除失败', detail: '浏览器未允许访问本地存储，请检查隐私设置后重试。' });
    showNextRefreshToast();
    console.warn('清除缓存失败：', error);
  }
});

/* ================= 历史价格存储与阶梯走势图逻辑 ================= */
/* ================= 真实价格追踪与变动记录逻辑 ================= */

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function getGameKey(game, platform) {
  const plat = platform || (state.platform === 'ps5' ? `ps5_${state.psStore}` : state.platform) || 'unknown';
  const idOrName = game.id || game.name;
  return `${plat}:${idOrName}`;
}

let serverPriceHistories = (()=>{try{return JSON.parse(localStorage.getItem('game-pulse-price-history')) || {}}catch{return {}}})();
const historyRequests = new Map();
const historyFetchedAt=new Map();
const fullHistoryFetchedAt=new Map();
let visibleHistoryTimer=null;
async function fetchPriceHistories(key) {
  const keys=key?[key]:[...new Set($$('.spark-cell').map(cell=>`${activeHistoryKey()}:${cell.dataset.id||cell.dataset.game}`))]
    .filter(item=>Date.now()-(historyFetchedAt.get(item)||0)>30000).slice(0,100);
  if(!keys.length)return;
  const requestKey = keys.join('|')+(key?'full':'6');
  if (historyRequests.has(requestKey)) return historyRequests.get(requestKey);
  keys.forEach(item=>historyFetchedAt.set(item,Date.now()));
  const task = loadPriceHistories(keys,Boolean(key)).catch(error=>{keys.forEach(item=>historyFetchedAt.delete(item));throw error;}).finally(()=>historyRequests.delete(requestKey));
  historyRequests.set(requestKey, task);
  return task;
}
async function loadPriceHistories(keys,full) {
  const params=new URLSearchParams();keys.forEach(key=>params.append('key',key));
  if(!full){const since=new Date();since.setMonth(since.getMonth()-6);params.set('since',since.toISOString());}
  const response = await fetch(`${apiBase}/api/prices/history?${params}`, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('历史价格读取失败');
  const payload = await response.json();
  if (!payload.ok) throw new Error('历史价格读取失败');
  for(const [key,cursor] of Object.entries(payload.continuations||{})){
    let after=cursor;
    while(after){
      const next=await fetch(`${apiBase}/api/prices/history?key=${encodeURIComponent(key)}&after=${encodeURIComponent(after)}`,{cache:'no-store',signal:AbortSignal.timeout(8000)});
      if(!next.ok)throw new Error('历史价格读取失败');
      const page=await next.json();
      payload.histories[key].push(...page.histories[key]);after=page.continuations?.[key];
    }
  }
  for(const [key,records] of Object.entries(payload.histories)){
    if(!full&&fullHistoryFetchedAt.has(key)){
      const merged=new Map((serverPriceHistories[key]||[]).map(record=>[record.date,record]));
      records.forEach(record=>merged.set(record.date,record));
      serverPriceHistories[key]=[...merged.values()].sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
    }else serverPriceHistories[key]=records;
    if(full)fullHistoryFetchedAt.set(key,Date.now());
  }
  const cachedKeys=Object.keys(serverPriceHistories);
  for(const key of cachedKeys.slice(0,Math.max(0,cachedKeys.length-200))){delete serverPriceHistories[key];fullHistoryFetchedAt.delete(key);historyFetchedAt.delete(key);}
  const persist = ()=>{try{const recent=Object.fromEntries(Object.entries(serverPriceHistories).slice(-100).map(([key,records])=>[key,records.slice(-120)]));localStorage.setItem('game-pulse-price-history',JSON.stringify(recent))}catch{}};
  if (window.requestIdleCallback) window.requestIdleCallback(persist, {timeout:2000});
  else setTimeout(persist,0);
  return true;
}
function getGamePriceHistory(game, platform) {
  return serverPriceHistories[getGameKey(game, platform)] || [];
}
function recordAllCurrentGames() {}

const dailyHistoryCache = new WeakMap();
const chartModelCache = new WeakMap();
const priceChartDateFormat = new Intl.DateTimeFormat('zh-CN', {timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'});
let chartRange = 6;
function buildPriceChartModel(history, now = Date.now(), months = 6) {
  const dayTime = value => Math.floor((Number(new Date(value)) + 28800000) / 86400000) * 86400000 - 28800000;
  const today = dayTime(now);
  const cacheKey = `${today}:${months}`;
  const cachedModels = chartModelCache.get(history);
  if (cachedModels?.has(cacheKey)) return cachedModels.get(cacheKey);
  let daily = dailyHistoryCache.get(history);
  if (!daily) {
  const days = new Map();
  for (const record of [...history].sort((a, b) => Date.parse(a.date) - Date.parse(b.date))) {
    const time = dayTime(record.date);
    if (Number.isFinite(time) && Number.isFinite(record.price)) days.set(time, { ...record, time });
  }
    daily = [...days.values()];
    dailyHistoryCache.set(history,daily);
  }
  if (!daily.length) return null;
  const end = Math.max(today, daily.at(-1).time);
  const startDate = new Date(today + 28800000);
  if (months) {
    const day = startDate.getUTCDate();
    startDate.setUTCDate(1);
    startDate.setUTCMonth(startDate.getUTCMonth()-months);
    const lastDay = new Date(Date.UTC(startDate.getUTCFullYear(),startDate.getUTCMonth()+1,0)).getUTCDate();
    startDate.setUTCDate(Math.min(day,lastDay));
  }
  const first = months ? Math.max(startDate.getTime()-28800000,daily[0].time) : daily[0].time;
  const baseline = daily.findLast(record=>record.time < first);
  const records = daily.filter(record=>record.time >= first && record.time <= end);
  if (baseline) records.unshift({...baseline,time:first});
  if (!records.length) return null;
  const low = Math.min(...records.map(record => record.price));
  const high = Math.max(...records.map(record => record.price));
  const margin = Math.max((high - low) * 0.2, high * 0.1, 1);
  const model = { records, first, end, low, minimum: Math.max(0, low - margin), maximum: high + margin };
  const models = cachedModels || new Map();
  if (models.size>6) models.clear();
  models.set(cacheKey,model);
  chartModelCache.set(history,models);
  return model;
}

function priceChartPath(model, left, right, top, bottom) {
  const x = time => left + (time - model.first) / Math.max(86400000,model.end - model.first) * (right - left);
  const y = price => bottom - (price - model.minimum) / (model.maximum - model.minimum) * (bottom - top);
  let line = `M ${x(model.records[0].time)} ${y(model.records[0].price)}`;
  for (const record of model.records.slice(1)) line += ` H ${x(record.time)} V ${y(record.price)}`;
  return { line: line + ` H ${right}`, x, y };
}

function snapPriceChartPoint(model, fraction) {
  const dayCount = Math.round((model.end-model.first)/86400000);
  const index = Math.round(Math.max(0,Math.min(1,fraction))*dayCount);
  const time = model.first + index*86400000;
  let lo=0,hi=model.records.length;
  while(lo<hi){const mid=(lo+hi)>>>1;if(model.records[mid].time<=time)lo=mid+1;else hi=mid;}
  return {index,time,price:model.records[Math.max(0,lo-1)].price};
}

function renderMiniSparklineSvg(history) {
  const model = buildPriceChartModel(history || []);
  if (!model) {
    return `<svg class="mini-sparkline" viewBox="0 0 72 16"><line x1="2" y1="8" x2="70" y2="8" stroke="#31524b" stroke-width="1.8" stroke-dasharray="3 3"/></svg>`;
  }
  const { line: d } = priceChartPath(model, 2, 70, 1, 15);
  return `<svg class="mini-sparkline" viewBox="0 0 72 16"><path d="${d}" fill="none" stroke="#a2e005" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`;

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
    <div class="spark-cell" data-id="${escapeHtml(g.id || '')}" data-game="${escapeHtml(g.name)}" title="最近6个月走势 · 点击查看历史价格与记录">
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
  container.chartCleanup?.();
  container.onpointermove = null;
  container.onpointerleave = null;
  const model = buildPriceChartModel(history, Date.now(), chartRange);
  if (!model) {
    container.innerHTML = '<p class="history-empty">暂无已采集的价格记录</p>';
    return;
  }
  const width = Math.max(260, Math.round(container.clientWidth));
  const height = 240, left = 12, right = width - 66, top = 18, bottom = 202;
  const { first, end, low, minimum, maximum } = model;
  const values = model.records.map(record => record.price);
  const { line, x, y } = priceChartPath(model, left, right, top, bottom);
  let ticks = '';
  const priceTicks=[...new Set(values)].sort((a,b)=>a-b);
  const priceStride=Math.max(1,Math.ceil(priceTicks.length/6));
  for (let i=0;i<priceTicks.length;i++) {
    const price=priceTicks[i];
    const label=i%priceStride===0||i===priceTicks.length-1;
    ticks += `<line x1="${left}" x2="${right}" y1="${y(price)}" y2="${y(price)}" stroke="#23353c"/>${label?`<text x="${right + 7}" y="${y(price) + 4}" fill="#9baeb2" font-size="11">${escapeHtml(money(price))}</text>`:''}`;
  }
  const dateLabel = timestamp => priceChartDateFormat.format(timestamp);
  const dayCount=Math.round((end-first)/86400000);
  const labelStride=Math.max(1,Math.ceil((dayCount+1)/Math.max(2,Math.floor((right-left)/105))));
  for (let i=0;i<=dayCount;i++) {
    const time=first+i*86400000;
    ticks+=`<line x1="${x(time)}" x2="${x(time)}" y1="${bottom}" y2="${bottom+4}" stroke="#536970"/>`;
    if(i%labelStride===0||i===dayCount){
      if(i!==dayCount&&dayCount-i<labelStride&&i!==0)continue;
      ticks += `<text x="${x(time)}" y="226" text-anchor="${i===0?'start':i===dayCount?'end':'middle'}" fill="#9baeb2" font-size="12">${dateLabel(time)}</text>`;
    }
  }
  const startX=x(model.records[0].time);
  container.innerHTML = `<svg class="chart-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${chartRange ? `最近${chartRange}个月` : '全部'}已记录的价格走势">${ticks}<path d="${line} L ${right} ${bottom} L ${startX} ${bottom} Z" fill="#a2e005" opacity=".08"/><line x1="${startX}" x2="${right}" y1="${y(low)}" y2="${y(low)}" stroke="#3898ec" stroke-dasharray="4 4"/><path d="${line}" fill="none" stroke="#a2e005" stroke-width="2" stroke-linejoin="round"/><circle cx="${startX}" cy="${y(values[0])}" r="3" fill="#a2e005"/><g id="chartCursor" hidden><line y1="${top}" y2="${bottom}" stroke="#a2e005" stroke-dasharray="2 3"/><circle r="4" fill="#a2e005"/></g></svg><div class="price-chart-tooltip" hidden></div>`;
  const cursor = container.querySelector('#chartCursor');
  const cursorLine = cursor.querySelector('line');
  const dot = cursor.querySelector('circle');
  const tip = container.querySelector('.price-chart-tooltip');
  let bounds = null, frame = 0, pointerX = 0, lastDayIndex = -1, tipWidth = 190;
  const hideCursor = () => {
    cursor.setAttribute('hidden','');
    tip.hidden = true;
  };
  const drawPointer = () => {
    frame = 0;
    bounds ||= container.getBoundingClientRect();
    const point=snapPriceChartPoint(model,(pointerX-bounds.left-left)/(right-left));
    if(point.index===lastDayIndex)return;
    lastDayIndex=point.index;
    const coordinate=x(point.time);
    cursor.removeAttribute('hidden');
    cursorLine.setAttribute('x1', coordinate); cursorLine.setAttribute('x2', coordinate);
    dot.setAttribute('cx', coordinate); dot.setAttribute('cy', y(point.price));
    tip.hidden = false;
    tip.textContent = dateLabel(point.time) + ' · ' + money(point.price);
    tipWidth=tip.offsetWidth;
    tip.style.transform = `translate3d(${Math.max(0,Math.min(coordinate-tipWidth/2,width-tipWidth))}px,0,0)`;
  };
  container.onpointerenter = () => {bounds=container.getBoundingClientRect();};
  container.onpointermove = event => {
    pointerX=event.clientX;
    if(!frame)frame=requestAnimationFrame(drawPointer);
  };
  container.onpointerleave = () => {
    cancelAnimationFrame(frame);frame=0;bounds=null;lastDayIndex=-1;hideCursor();
  };
  container.chartCleanup = ()=>{cancelAnimationFrame(frame);container.onpointerenter=null;};
}

let activePriceChart = null;
let priceModalRequest = 0;
$('#chartRanges')?.addEventListener('click',event=>{
  const button=event.target.closest('[data-months]');
  if(!button||!activePriceChart)return;
  chartRange=Number(button.dataset.months);
  $$('#chartRanges button').forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
  renderStepChart(getGamePriceHistory(activePriceChart.game,activePriceChart.platform),activePriceChart.game,$('#chartContainer'));
});
new ResizeObserver(() => {
  if (!activePriceChart) return;
  renderStepChart(getGamePriceHistory(activePriceChart.game, activePriceChart.platform), activePriceChart.game, $('#chartContainer'));
}).observe($('#chartContainer'));
async function openPriceModal(game, {updated=false}={}) {
  const modal = $('#priceHistoryModal');
  if (!modal) return;
  const request = ++priceModalRequest;
  const platform = activeHistoryKey();
  const historyKey=getGameKey(game,platform);
  if(!updated){
    chartRange=6;
    $$('#chartRanges button').forEach(button=>{const selected=button.dataset.months==='6';button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});
  }
  if(!updated && Date.now()-(fullHistoryFetchedAt.get(historyKey)||0)>30000){
    fetchPriceHistories(historyKey).then(()=>{
      if(request===priceModalRequest && !modal.hidden)openPriceModal(game,{updated:true});
    }).catch(error=>console.warn(error.message));
  }
  if (request !== priceModalRequest) return;
  modal.hidden = false;
  activePriceChart = { game, platform };
  const history = getGamePriceHistory(game, activeHistoryKey());
  if(updated){
    $$('.spark-cell').filter(cell=>cell.dataset.id===String(game.id||'')&&cell.dataset.game===game.name)
      .forEach(cell=>{const svg=cell.querySelector('svg');if(svg)svg.outerHTML=renderMiniSparklineSvg(history);});
  }
  const prices = history.map(h => h.price);
  const lowestPrice = prices.length ? Math.min(...prices) : null;
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
  if (lowPriceEl) lowPriceEl.textContent = lowestPrice == null ? '暂无记录' : money(lowestPrice);
  const lowTagEl = $('#modalLowestTag');
  if (lowTagEl) lowTagEl.textContent = lowestPrice == null ? '' : game.price <= lowestPrice ? '当前为建档以来最低价' : `较记录最低高 ${money(game.price - lowestPrice)}`;

  const origPriceEl = $('#modalOriginalPrice');
  if (origPriceEl) origPriceEl.textContent = money(originalPrice);
  const discRateEl = $('#modalDiscountRate');
  if (discRateEl) discRateEl.textContent = game.discount ? `已优惠 ${game.discount}%` : '当前官方定价';

  const recCountEl = $('#modalRecordCount');
  if (recCountEl) recCountEl.textContent = `${history.length} 条记录`;

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
          <td data-label="记录时间">${escapeHtml(new Date(rec.date).toLocaleString('zh-CN'))}</td>
          <td style="color:${isLowest ? '#a2e005' : '#edf7f4'};font-weight:600">${money(rec.price)}</td>
          <td data-label="折合人民币" style="color:#9baeb2">${cnyVal}</td>
          <td data-label="变动" class="history-change">${changeTag}</td>
        </tr>
      `;
    }).join('');
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closePriceModal() {
  $('#chartContainer')?.chartCleanup?.();
  ++priceModalRequest;
  activePriceChart = null;
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
function normalizeSearchText(value) {
  return String(value ?? '').replace(/[™®©]/g, '').normalize('NFKC').toLowerCase()
    .replace(/[\p{P}\p{Z}\p{Cf}\s™®©]/gu, '');
}
function matchesGameSearch(game, query) {
  const needle = normalizeSearchText(query);
  if (!needle) return true;
  const entries = [game, game.primaryGame, ...(game.editions || [])].filter(Boolean);
  if (!matchesGameSearch.aliases) {
    const aliases = new Map();
    for (const [name, cn] of Object.entries(chineseTitleMap)) {
      const key = normalizeSearchText(cn);
      if (!key) continue;
      if (!aliases.has(key)) aliases.set(key, []);
      aliases.get(key).push(name);
    }
    matchesGameSearch.aliases = aliases;
  }
  return entries.some(entry => [
    entry.name, entry.cn, chineseTitleMap[entry.name], entry.rawName,
    entry.originalName, entry.title, entry.editionName, entry.langLabel,
    entry.meta, entry.platform, entry.hasChinese ? '支持中文' : '',
    ...(matchesGameSearch.aliases.get(normalizeSearchText(chineseTitleMap[entry.name] || entry.cn || entry.name)) || [])
  ].some(value => value && normalizeSearchText(value).includes(needle)));
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

  if (state.sort === 'priceAsc') data.sort((a,b) => a.price - b.price);
  else if (state.sort === 'discount') data.sort((a,b) => b.discount - a.discount || a.rank - b.rank);
  else data.sort((a,b) => a.rank - b.rank);
  // 先编号再搜索，搜索结果沿用当前列表的序号。
  data = data.map((game, index) => ({...game, displayRank:index + 1}));
  if (state.query) data = data.filter(x => matchesGameSearch(x, state.query));
  state.filteredCount = data.length;
  state.pageTotal = Math.max(1, Math.ceil(data.length / 50));
  state.page = Math.min(state.page, state.pageTotal);
  const start = (state.page - 1) * 50;
  return data.slice(start, start + 50);
}

const priceCell=(g,{inlinePlatform=false}={})=>{
  const platformPrefix = inlinePlatform ? '<span class="mobile-price-platform">PC</span> · ' : '';
  if (g.priceAvailable === false) {
    return `<div class="price-stack"><span class="price-main">国区未定价</span><span class="price-cny">${platformPrefix}全球排名仍有效</span></div>`;
  }
  if (g.price === 0) {
    return `<div class="price-stack"><span class="price-main" style="color:var(--steam-mint, #38ef7d);font-weight:700">免费游玩</span><span class="price-cny">${platformPrefix}Free to Play</span></div>`;
  }
  return `<div class="price-stack">${g.discount?`<span class="deal-chip">-${g.discount}%</span>`:''}<span class="price-main">${money(g.price)}</span>${g.old?`<span class="price-old">${money(g.old)}</span>`:''}<span class="price-cny">${platformPrefix}${state.platform==='steam'?(state.steamRegion==='global'?'中国区参考价':'人民币定价'):`≈ ${cny(g.price)}`}</span></div>`;
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

function mobileGameActions(g,{hidePlatform=false,platformLabels='',leadingDiscount=false}={}) {
  const url = g.url || (isPsJp() ? 'https://store.playstation.com/ja-jp/pages/browse' : isPsHk() ? 'https://store.playstation.com/zh-hant-hk/pages/browse' : 'https://store-jp.nintendo.com/software/ranking/');
  return `<span class="mobile-game-actions">${leadingDiscount && g.discount ? `<span class="deal-chip">-${g.discount}%</span>` : ''}${hidePlatform ? '' : `<span class="mobile-platform-line"><span class="mobile-platform">${escapeHtml(g.platform || '')}</span>${platformLabels}</span>`}<a href="${escapeHtml(url)}" target="_blank" rel="noopener" aria-label="前往官方商店">商店 ↗</a>${state.view === 'free' ? '' : trendCell(g.primaryGame || g)}</span>`;
}

function mobileWideSide(g) {
  const originalName = stripLanguageParentheses(g.name);
  const hasTranslation = stripLanguageParentheses(g.cn) !== originalName;
  const isSwitch = g.platform?.startsWith('Switch');
  const isSteam = g.platform === 'PC';
  const badges = `${isSwitch ? '<span class="edition-badge">数字版</span>' : ''}${g.hasChinese ? '<span class="lang-chip lang-zh">支持中文</span>' : ''}`;
  return `<div class="mobile-wide-side">${isSwitch || isSteam ? `<span class="mobile-wide-title" title="${escapeHtml(g.cn)}">${escapeHtml(stripLanguageParentheses(g.cn))}</span>` : ''}${hasTranslation ? `<span class="mobile-wide-name" title="${escapeHtml(originalName)}">${escapeHtml(originalName)}</span>` : ''}<div class="mobile-game-price">${priceCell(g,{inlinePlatform:isSteam})}</div>${!isSwitch && badges ? `<div class="mobile-wide-badges">${badges}</div>` : ''}${mobileGameActions(g,{platformLabels:isSwitch ? badges : '',leadingDiscount:isSwitch})}</div>`;
}

function renderRow(g) {
  const isFreeView = state.view === 'free';
  const hasOriginalName = stripLanguageParentheses(g.name) !== stripLanguageParentheses(g.cn);
  if (g.isGroup) {
    return `
      <tr class="game-group-row">
        <td><span class="rank ${!isPsPlatform(state.platform)&&(g.displayRank ?? g.rank)<=3?'top':''}">${String(g.displayRank ?? g.rank).padStart(2,'0')}</span></td>
        <td>
          <div class="game-cell ${hasOriginalName ? '' : 'no-original-name'}">
            <span class="cover ps-cover" style="background:linear-gradient(135deg,${g.color},#172128)">
              ${g.image ? `<img src="${g.image}" alt="${escapeHtml(g.cn)} 封面" loading="lazy" onerror="this.remove()">` : `<span>${g.cover}</span>`}
            </span>
            <div class="game-copy">
              <span class="game-name">${escapeHtml(stripLanguageParentheses(g.cn))}</span>
              ${hasOriginalName ? `<span class="game-original">${escapeHtml(stripLanguageParentheses(g.name))}</span>` : ''}
              <div class="mobile-game-price">${groupPriceCell(g)}</div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px">
                ${isPsJp() ? '' : (g.meta ? `<span class="game-meta">${g.meta}</span>` : '')}
                <button type="button" class="editions-toggle-btn" data-target="drawer-${g.groupId}" aria-expanded="false" title="点击展开/收起该游戏的所有具体版本">
                  <span>包含 ${g.editions.length} 个版本</span>
                  <span class="toggle-arrow">▼</span>
                </button>
                ${g.hasChinese ? `<span class="lang-chip lang-zh">支持中文</span>` : ''}
                ${mobileGameActions(g)}
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
  const isWideCover = isSteam || (!isPs && isNintendoHk());
  return `
    <tr class="${isWideCover ? `wide-cover-row${isSteam ? ' steam-wide-row' : isNintendoHk() && !isPs ? ' hk-wide-row' : ''}` : ''}">
      <td><span class="rank ${!isPsPlatform(state.platform)&&(g.displayRank ?? g.rank)<=3?'top':''}">${String(g.displayRank ?? g.rank).padStart(2,'0')}</span></td>
      <td>
        <div class="game-cell ${hasOriginalName ? '' : 'no-original-name'}">
          ${isWideCover ? '<div class="wide-cover-left">' : ''}
          <span class="${coverClass}" data-fallback="${escapeHtml(g.cover || 'NS')}" style="background:linear-gradient(135deg,${g.color},#172128)">
            ${g.image ? `<img src="${g.image}" alt="${escapeHtml(g.cn)} 封面" loading="lazy" onerror="this.replaceWith(document.createTextNode(this.parentElement.dataset.fallback))">` : `<span>${escapeHtml(g.cover || 'NS')}</span>`}
          </span>
          <div class="game-copy">
            <span class="game-name">${escapeHtml(stripLanguageParentheses(g.cn))}</span>
            ${hasOriginalName ? `<span class="game-original">${escapeHtml(stripLanguageParentheses(g.name))}</span>` : ''}
            <div class="mobile-game-price">${priceCell(g)}</div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px">
              ${(state.platform.startsWith('switch') || g.platform?.startsWith('Switch') || g.meta === '数字版' || (g.meta && g.meta.includes('下载版')))
                ? `<span class="edition-badge">数字版</span>`
                : (g.editionBadge ? `<span class="edition-badge">${escapeHtml(g.editionBadge)}</span>` : (isPsJp() ? '' : (g.meta ? `<span class="game-meta">${g.meta}</span>` : '')))}
              ${g.hasChinese ? `<span class="lang-chip lang-zh">支持中文</span>` : ''}
              ${mobileGameActions(g)}
            </div>
          </div>
          ${isWideCover ? '</div>' : ''}
          ${isWideCover ? mobileWideSide(g) : ''}
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
  if (!freeGames.length && state.view === 'free') { state.view = 'ranking'; state.page = 1; }
  $('.toolbar-inner')?.classList.toggle('no-free-games', freeGames.length === 0);
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
    includeFreeDealsBtn.hidden = freeGames.length === 0;
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
  $('#gameRows').innerHTML = data.map(renderRow).join('');
  $('.rank-col').textContent = '序号';

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
    $('#tableTitle').textContent = isJp ? (state.includePs4 ? 'PS5 & PS4 日服商店浏览列表' : 'PS5 日服商店浏览列表') : isHk ? (state.includePs4 ? 'PS5 & PS4 港服商店浏览列表' : 'PS5 港服商店浏览列表') : steam ? (state.steamRegion==='global'?'Steam 全球热销榜 · 前 100':'Steam 中国区热销榜 · 前 200') : `Switch ${state.platform === 'switch2' ? '2' : '1'} ${state.nintendoStore === 'hk' ? '港服' : '日服'}网页排行榜 · ${all.length} 条`;
  }

  $('#regionPill').textContent = isHk || isNintendoHk() ? 'HK · HKD → CNY' : (isJp || isNintendo) ? 'JP · JPY → CNY' : steam && state.steamRegion==='global' ? 'GLOBAL · 中国区参考价' : 'CN · CNY';
  $('#rateValue').textContent = steam ? (state.steamRegion==='global'?'全球排名 · 中国区参考价':'Steam 国区使用人民币定价') : `1 ${code} = ${rate.toFixed(code==='JPY'?5:4)} CNY`;
  $('#rateUpdated').textContent = steam ? (state.steamRegion==='global'?'全球热销名次与中国区售价分别采集':'无需换汇 · 结算以 Steam 为准') : state.rateUpdated ? `${state.rateSource} · ${new Date(state.rateUpdated).toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})}` : '正在获取最新汇率…';
  $('#rateBadge').textContent = steam ? '人民币' : state.rateStale ? '缓存汇率' : '已更新';
  $('#rateBadge').classList.toggle('stale', !steam && state.rateStale);
  $('#rateCardTitle').textContent = steam ? '价格口径' : '实时汇率';
  $('#rateCardNote').textContent = steam
    ? (state.steamRegion === 'global' ? '排名来自 Steam 全球榜，售价是中国区参考价；部分游戏可能未在中国区定价。' : '售价按 Steam 中国区展示，结算请以商店页面为准。')
    : isNintendo ? (ranking?.sourceNote || (isNintendoHk() ? '网页商店排行榜，含游戏与追加内容；与主机 eShop 前100名不同。' : `日服网页排行榜当前提供 ${all.length} 条；与主机 eShop 前100名不同。`)) : '人民币为实时估算价，支付金额可能受发卡行汇率及手续费影响。';
  const sStatus = $('#sourceStatus');
  const lUpdated = $('#lastUpdated');
  const footerSourceTime = $('#footerSourceTime');
  const sourceTag = $('#sourceTag');

  let sourceTime = '';
  let sourceLabel = '';
  let isStale = false;

  if (isNintendo) {
    sourceLabel = `Nintendo 网页榜 ${state.nintendoStore === 'hk' ? '港服' : '日服'} (${state.platform === 'switch2' ? 'Switch 2' : 'Switch 1'})`;
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
  renderRefreshNotice();
  $('.table-card').classList.add('flash');setTimeout(()=>$('.table-card').classList.remove('flash'),500);
  if (!visibleHistoryTimer) visibleHistoryTimer=setTimeout(()=>{
    visibleHistoryTimer=null;
    fetchPriceHistories().then(changed=>{if(changed)render();}).catch(error=>console.warn(error.message));
  },100);
}

async function refresh({notify=false,silent=false}={}){
  if(refreshInProgress)return;
  refreshInProgress=true;
  fetchExchangeRates().then(()=>render()).catch(error=>console.warn('汇率刷新失败：',error));
  const cacheButton=$('#clearCacheButton');
  if(cacheButton && !silent)cacheButton.disabled=true;
  const btn=$('#refreshButton');
  if(btn && !silent){btn.disabled=true;btn.classList.add('loading');}
  const sStatus=$('#sourceStatus');
  const lUpdated=$('#lastUpdated');
  if(sStatus && !silent) sStatus.textContent='正在读取最新缓存…';
  if(lUpdated && !silent) lUpdated.textContent='正在同步已发布的榜单…';
  const groups=[
    ['NS1',[
      ['日服',()=>fetchNintendoRanking('switch1')],
      ['港服',()=>fetchNintendoRanking('switch1_hk')]
    ]],
    ['NS2',[
      ['日服',()=>fetchNintendoRanking('switch2')],
      ['港服',()=>fetchNintendoRanking('switch2_hk')]
    ]],
    ['PS5',[
      ['港服',()=>fetchPs5Ranking()],
      ['日服',()=>fetchPs5JpRanking()]
    ]],
    ['Steam',[
      ['中国区',()=>fetchSteamRanking()],
      ['全球',()=>fetchSteamRanking({region:'global'})]
    ]]
  ];
  try{
    await Promise.all([
      ...groups.map(async ([group,platforms]) => {
        const results = await Promise.all(platforms.map(async ([label,fetchRanking]) => ({
          label,
          ok: await fetchRanking().catch(() => false)
        })));
        render();
        hydrateCovers();
        if (notify) queueRefreshToast(group, results);
        return results;
      }),
      fetchPriceHistories().catch(error=>console.warn('历史价格刷新失败：',error))
    ]);
    render();
    hydrateCovers();
  }finally{
    refreshInProgress=false;
    await scheduleNextRefresh();
    if(cacheButton)cacheButton.disabled=false;
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

// Modal close triggers
$('#modalCloseBtn')?.addEventListener('click', closePriceModal);
$('#modalBackdrop')?.addEventListener('click', closePriceModal);
window.addEventListener('keydown', e => { if (e.key === 'Escape') closePriceModal(); });


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
  state.remaining=nextRefreshAt===null?0:Math.max(0,Math.ceil((nextRefreshAt-Date.now())/1000));
  const m=Math.floor(state.remaining/60),s=state.remaining%60;
  const countEl=$('#countdown');
  if(countEl) countEl.textContent=nextRefreshAt===null?'每小时更新':`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
},1000);
setInterval(()=>syncCollectorRefreshMinutes(),15000);
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden)syncCollectorRefreshMinutes();
});

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

let syncingGameTitles = false;
async function syncGameTitles(){
  if(syncingGameTitles || document.hidden)return;
  syncingGameTitles=true;
  try{
    const response=await fetch(`${apiBase}/api/translations`,{cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(!response.ok)return;
    const payload=await response.json();
    let changed=false;
    for(const [name,cn] of Object.entries(payload.titles||{})){
      if(typeof cn==='string' && chineseTitleMap[name]!==cn){chineseTitleMap[name]=cn;matchesGameSearch.aliases=null;changed=true;}
    }
    if(changed){
      const apply=game=>{if(chineseTitleMap[game.name])game.cn=chineseTitleMap[game.name];for(const edition of game.editions||[])apply(edition);};
      Object.values(datasets).forEach(games=>games.forEach(apply));
      render();
    }
  }catch{}finally{syncingGameTitles=false;}
}
setInterval(syncGameTitles,30000);
syncGameTitles();

render();
hydrateCovers();
fetchExchangeRates().then(()=>render()).catch(error=>console.warn('汇率刷新失败：',error));
Promise.all([
  fetchPriceHistories().catch(error => console.warn(error.message)),
  fetchNintendoRanking('switch1'),
  fetchNintendoRanking('switch2'),
  fetchNintendoRanking('switch1_hk'),
  fetchNintendoRanking('switch2_hk'),
  fetchPs5Ranking(),
  fetchPs5JpRanking(),
  fetchSteamRanking(),
  fetchSteamRanking({region:'global'})
].map(task=>task.finally(()=>{render();hydrateCovers();}))).then(async()=>{
  startupDataReady = true;
  const cacheButton=$('#clearCacheButton');
  if(cacheButton)cacheButton.disabled=false;
  await scheduleNextRefresh();
  render();
});
