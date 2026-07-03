import { readFileSync, writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, "..", "src", "data", "n5.json")
const raw = readFileSync(dataPath, "utf-8")
const all = JSON.parse(raw)

// Curated N5-level examples: simple, everyday vocabulary
const curated = {
  1: [  // 一
    { word: "一つ", reading: "ひとつ", english: "one (thing)" },
    { word: "一人", reading: "ひとり", english: "one person" },
    { word: "一日", reading: "いちにち", english: "one day" },
  ],
  2: [  // 二
    { word: "二つ", reading: "ふたつ", english: "two (things)" },
    { word: "二人", reading: "ふたり", english: "two people" },
    { word: "二月", reading: "にがつ", english: "February" },
  ],
  3: [  // 三
    { word: "三つ", reading: "みっつ", english: "three (things)" },
    { word: "三月", reading: "さんがつ", english: "March" },
    { word: "三回", reading: "さんかい", english: "three times" },
  ],
  4: [  // 四
    { word: "四つ", reading: "よっつ", english: "four (things)" },
    { word: "四人", reading: "よにん", english: "four people" },
    { word: "四月", reading: "しがつ", english: "April" },
  ],
  5: [  // 五
    { word: "五つ", reading: "いつつ", english: "five (things)" },
    { word: "五人", reading: "ごにん", english: "five people" },
    { word: "五月", reading: "ごがつ", english: "May" },
  ],
  6: [  // 六
    { word: "六つ", reading: "むっつ", english: "six (things)" },
    { word: "六人", reading: "ろくにん", english: "six people" },
    { word: "六月", reading: "ろくがつ", english: "June" },
  ],
  7: [  // 七
    { word: "七つ", reading: "ななつ", english: "seven (things)" },
    { word: "七人", reading: "しちにん", english: "seven people" },
    { word: "七月", reading: "しちがつ", english: "July" },
  ],
  8: [  // 八
    { word: "八つ", reading: "やっつ", english: "eight (things)" },
    { word: "八人", reading: "はちにん", english: "eight people" },
    { word: "八月", reading: "はちがつ", english: "August" },
  ],
  9: [  // 九
    { word: "九つ", reading: "ここのつ", english: "nine (things)" },
    { word: "九人", reading: "きゅうにん", english: "nine people" },
    { word: "九月", reading: "くがつ", english: "September" },
  ],
  10: [  // 十
    { word: "十", reading: "じゅう", english: "ten" },
    { word: "十分", reading: "じゅうぶん", english: "enough" },
    { word: "十月", reading: "じゅうがつ", english: "October" },
  ],
  11: [  // 百
    { word: "百", reading: "ひゃく", english: "hundred" },
    { word: "三百", reading: "さんびゃく", english: "three hundred" },
    { word: "百円", reading: "ひゃくえん", english: "100 yen" },
  ],
  12: [  // 千
    { word: "千", reading: "せん", english: "thousand" },
    { word: "千円", reading: "せんえん", english: "1000 yen" },
    { word: "二千", reading: "にせん", english: "two thousand" },
  ],
  13: [  // 万
    { word: "一万", reading: "いちまん", english: "ten thousand" },
    { word: "万年筆", reading: "まんねんひつ", english: "fountain pen" },
    { word: "万国", reading: "ばんこく", english: "all nations" },
  ],
  14: [  // 円
    { word: "百円", reading: "ひゃくえん", english: "100 yen" },
    { word: "円", reading: "えん", english: "yen; circle" },
    { word: "円い", reading: "まるい", english: "round" },
  ],
  15: [  // 上
    { word: "上", reading: "うえ", english: "above; top" },
    { word: "上手", reading: "じょうず", english: "skillful" },
    { word: "上がる", reading: "あがる", english: "to go up" },
  ],
  16: [  // 下
    { word: "下", reading: "した", english: "below; under" },
    { word: "下手", reading: "へた", english: "unskillful" },
    { word: "下がる", reading: "さがる", english: "to go down" },
  ],
  17: [  // 中
    { word: "中", reading: "なか", english: "inside" },
    { word: "中国", reading: "ちゅうごく", english: "China" },
    { word: "中学校", reading: "ちゅうがっこう", english: "junior high school" },
  ],
  18: [  // 前
    { word: "前", reading: "まえ", english: "front; before" },
    { word: "名前", reading: "なまえ", english: "name" },
    { word: "午前", reading: "ごぜん", english: "morning; AM" },
  ],
  19: [  // 後
    { word: "後ろ", reading: "うしろ", english: "behind" },
    { word: "午後", reading: "ごご", english: "afternoon; PM" },
    { word: "最後", reading: "さいご", english: "last" },
  ],
  20: [  // 外
    { word: "外", reading: "そと", english: "outside" },
    { word: "外国", reading: "がいこく", english: "foreign country" },
    { word: "外国人", reading: "がいこくじん", english: "foreigner" },
  ],
  21: [  // 右
    { word: "右", reading: "みぎ", english: "right" },
    { word: "右手", reading: "みぎて", english: "right hand" },
    { word: "右側", reading: "みぎがわ", english: "right side" },
  ],
  22: [  // 左
    { word: "左", reading: "ひだり", english: "left" },
    { word: "左手", reading: "ひだりて", english: "left hand" },
    { word: "左側", reading: "ひだりがわ", english: "left side" },
  ],
  23: [  // 北
    { word: "北", reading: "きた", english: "north" },
    { word: "北口", reading: "きたぐち", english: "north exit" },
    { word: "北海道", reading: "ほっかいどう", english: "Hokkaido" },
  ],
  24: [  // 南
    { word: "南", reading: "みなみ", english: "south" },
    { word: "南口", reading: "みなみぐち", english: "south exit" },
    { word: "南風", reading: "みなみかぜ", english: "south wind" },
  ],
  25: [  // 東
    { word: "東", reading: "ひがし", english: "east" },
    { word: "東京", reading: "とうきょう", english: "Tokyo" },
    { word: "東口", reading: "ひがしぐち", english: "east exit" },
  ],
  26: [  // 西
    { word: "西", reading: "にし", english: "west" },
    { word: "西口", reading: "にしぐち", english: "west exit" },
    { word: "西洋", reading: "せいよう", english: "Western" },
  ],
  27: [  // 大
    { word: "大きい", reading: "おおきい", english: "big" },
    { word: "大学", reading: "だいがく", english: "university" },
    { word: "大好き", reading: "だいすき", english: "very fond" },
  ],
  28: [  // 小
    { word: "小さい", reading: "ちいさい", english: "small" },
    { word: "小学校", reading: "しょうがっこう", english: "elementary school" },
    { word: "小川", reading: "おがわ", english: "stream" },
  ],
  29: [  // 高
    { word: "高い", reading: "たかい", english: "expensive; tall" },
    { word: "高校", reading: "こうこう", english: "high school" },
    { word: "最高", reading: "さいこう", english: "the best" },
  ],
  30: [  // 安
    { word: "安い", reading: "やすい", english: "cheap" },
    { word: "安心", reading: "あんしん", english: "relief" },
    { word: "安全", reading: "あんぜん", english: "safety" },
  ],
  31: [  // 新
    { word: "新しい", reading: "あたらしい", english: "new" },
    { word: "新聞", reading: "しんぶん", english: "newspaper" },
    { word: "新幹線", reading: "しんかんせん", english: "bullet train" },
  ],
  32: [  // 古
    { word: "古い", reading: "ふるい", english: "old" },
    { word: "中古", reading: "ちゅうこ", english: "secondhand" },
    { word: "古本", reading: "ふるほん", english: "used book" },
  ],
  33: [  // 長
    { word: "長い", reading: "ながい", english: "long" },
    { word: "校長", reading: "こうちょう", english: "principal" },
    { word: "長所", reading: "ちょうしょ", english: "strong point" },
  ],
  34: [  // 白
    { word: "白い", reading: "しろい", english: "white" },
    { word: "白", reading: "しろ", english: "white (color)" },
    { word: "白鳥", reading: "はくちょう", english: "swan" },
  ],
  35: [  // 黒
    { word: "黒い", reading: "くろい", english: "black" },
    { word: "黒", reading: "くろ", english: "black (color)" },
    { word: "黒板", reading: "こくばん", english: "blackboard" },
  ],
  36: [  // 赤
    { word: "赤い", reading: "あかい", english: "red" },
    { word: "赤", reading: "あか", english: "red (color)" },
    { word: "赤ちゃん", reading: "あかちゃん", english: "baby" },
  ],
  37: [  // 青
    { word: "青い", reading: "あおい", english: "blue" },
    { word: "青", reading: "あお", english: "blue (color)" },
    { word: "青空", reading: "あおぞら", english: "blue sky" },
  ],
  38: [  // 花
    { word: "花", reading: "はな", english: "flower" },
    { word: "花見", reading: "はなみ", english: "flower viewing" },
    { word: "花瓶", reading: "かびん", english: "vase" },
  ],
  39: [  // 山
    { word: "山", reading: "やま", english: "mountain" },
    { word: "富士山", reading: "ふじさん", english: "Mt. Fuji" },
    { word: "山田", reading: "やまだ", english: "Yamada (surname)" },
  ],
  40: [  // 川
    { word: "川", reading: "かわ", english: "river" },
    { word: "小川", reading: "おがわ", english: "stream" },
    { word: "川口", reading: "かわぐち", english: "river mouth" },
  ],
  41: [  // 田
    { word: "田んぼ", reading: "たんぼ", english: "rice field" },
    { word: "田中", reading: "たなか", english: "Tanaka (surname)" },
    { word: "田舎", reading: "いなか", english: "countryside" },
  ],
  42: [  // 天
    { word: "天気", reading: "てんき", english: "weather" },
    { word: "天国", reading: "てんごく", english: "heaven" },
    { word: "天井", reading: "てんじょう", english: "ceiling" },
  ],
  43: [  // 気
    { word: "天気", reading: "てんき", english: "weather" },
    { word: "元気", reading: "げんき", english: "healthy; energetic" },
    { word: "気持ち", reading: "きもち", english: "feeling" },
  ],
  44: [  // 雨
    { word: "雨", reading: "あめ", english: "rain" },
    { word: "大雨", reading: "おおあめ", english: "heavy rain" },
    { word: "雨の日", reading: "あめのひ", english: "rainy day" },
  ],
  45: [  // 電
    { word: "電話", reading: "でんわ", english: "telephone" },
    { word: "電車", reading: "でんしゃ", english: "electric train" },
    { word: "電気", reading: "でんき", english: "electricity; lights" },
  ],
  46: [  // 車
    { word: "車", reading: "くるま", english: "car" },
    { word: "電車", reading: "でんしゃ", english: "train" },
    { word: "自転車", reading: "じてんしゃ", english: "bicycle" },
  ],
  47: [  // 国
    { word: "国", reading: "くに", english: "country" },
    { word: "中国", reading: "ちゅうごく", english: "China" },
    { word: "外国", reading: "がいこく", english: "foreign country" },
  ],
  48: [  // 園
    { word: "公園", reading: "こうえん", english: "park" },
    { word: "動物園", reading: "どうぶつえん", english: "zoo" },
    { word: "幼稚園", reading: "ようちえん", english: "kindergarten" },
  ],
  49: [  // 口
    { word: "口", reading: "くち", english: "mouth" },
    { word: "入口", reading: "いりぐち", english: "entrance" },
    { word: "出口", reading: "でぐち", english: "exit" },
  ],
  50: [  // 目
    { word: "目", reading: "め", english: "eye" },
    { word: "目的", reading: "もくてき", english: "purpose" },
    { word: "目玉", reading: "めだま", english: "eyeball" },
  ],
  51: [  // 耳
    { word: "耳", reading: "みみ", english: "ear" },
    { word: "早耳", reading: "はやみみ", english: "keen ear" },
    { word: "耳鼻科", reading: "じびか", english: "ENT department" },
  ],
  52: [  // 手
    { word: "手", reading: "て", english: "hand" },
    { word: "上手", reading: "じょうず", english: "skillful" },
    { word: "手紙", reading: "てがみ", english: "letter" },
  ],
  53: [  // 足
    { word: "足", reading: "あし", english: "foot; leg" },
    { word: "足りる", reading: "たりる", english: "to be enough" },
    { word: "足音", reading: "あしおと", english: "footstep" },
  ],
  54: [  // 体
    { word: "体", reading: "からだ", english: "body" },
    { word: "大体", reading: "だいたい", english: "mostly" },
    { word: "体育", reading: "たいいく", english: "physical education" },
  ],
  55: [  // 人
    { word: "人", reading: "ひと", english: "person" },
    { word: "日本人", reading: "にほんじん", english: "Japanese person" },
    { word: "大人", reading: "おとな", english: "adult" },
  ],
  56: [  // 子
    { word: "子", reading: "こ", english: "child" },
    { word: "子供", reading: "こども", english: "children" },
    { word: "女の子", reading: "おんなのこ", english: "girl" },
  ],
  57: [  // 女
    { word: "女", reading: "おんな", english: "woman" },
    { word: "女性", reading: "じょせい", english: "female" },
    { word: "女の子", reading: "おんなのこ", english: "girl" },
  ],
  58: [  // 男
    { word: "男", reading: "おとこ", english: "man" },
    { word: "男性", reading: "だんせい", english: "male" },
    { word: "男の子", reading: "おとこのこ", english: "boy" },
  ],
  59: [  // 友
    { word: "友達", reading: "ともだち", english: "friend" },
    { word: "友人", reading: "ゆうじん", english: "friend (formal)" },
    { word: "友好", reading: "ゆうこう", english: "friendship" },
  ],
  60: [  // 父
    { word: "お父さん", reading: "おとうさん", english: "father" },
    { word: "父親", reading: "ちちおや", english: "father" },
    { word: "父母", reading: "ふぼ", english: "parents" },
  ],
  61: [  // 母
    { word: "お母さん", reading: "おかあさん", english: "mother" },
    { word: "母親", reading: "ははおや", english: "mother" },
    { word: "母の日", reading: "ははのひ", english: "Mother's Day" },
  ],
  62: [  // 先
    { word: "先生", reading: "せんせい", english: "teacher" },
    { word: "先週", reading: "せんしゅう", english: "last week" },
    { word: "先", reading: "さき", english: "ahead; previous" },
  ],
  63: [  // 生
    { word: "先生", reading: "せんせい", english: "teacher" },
    { word: "学生", reading: "がくせい", english: "student" },
    { word: "生まれる", reading: "うまれる", english: "to be born" },
  ],
  64: [  // 学
    { word: "学生", reading: "がくせい", english: "student" },
    { word: "学校", reading: "がっこう", english: "school" },
    { word: "大学", reading: "だいがく", english: "university" },
  ],
  65: [  // 校
    { word: "学校", reading: "がっこう", english: "school" },
    { word: "校長", reading: "こうちょう", english: "principal" },
    { word: "校庭", reading: "こうてい", english: "schoolyard" },
  ],
  66: [  // 本
    { word: "本", reading: "ほん", english: "book" },
    { word: "日本", reading: "にほん", english: "Japan" },
    { word: "本当", reading: "ほんとう", english: "truth; really" },
  ],
  67: [  // 文
    { word: "文字", reading: "もじ", english: "character; letter" },
    { word: "文学", reading: "ぶんがく", english: "literature" },
    { word: "作文", reading: "さくぶん", english: "essay" },
  ],
  68: [  // 字
    { word: "漢字", reading: "かんじ", english: "kanji" },
    { word: "文字", reading: "もじ", english: "character; letter" },
    { word: "名字", reading: "みょうじ", english: "family name" },
  ],
  69: [  // 名
    { word: "名前", reading: "なまえ", english: "name" },
    { word: "有名", reading: "ゆうめい", english: "famous" },
    { word: "名人", reading: "めいじん", english: "master" },
  ],
  70: [  // 語
    { word: "日本語", reading: "にほんご", english: "Japanese language" },
    { word: "英語", reading: "えいご", english: "English language" },
    { word: "言語", reading: "げんご", english: "language" },
  ],
  71: [  // 言
    { word: "言う", reading: "いう", english: "to say" },
    { word: "言葉", reading: "ことば", english: "word; language" },
    { word: "方言", reading: "ほうげん", english: "dialect" },
  ],
  72: [  // 話
    { word: "話す", reading: "はなす", english: "to speak" },
    { word: "電話", reading: "でんわ", english: "telephone" },
    { word: "会話", reading: "かいわ", english: "conversation" },
  ],
  73: [  // 買
    { word: "買う", reading: "かう", english: "to buy" },
    { word: "買い物", reading: "かいもの", english: "shopping" },
    { word: "買い手", reading: "かいて", english: "buyer" },
  ],
  74: [  // 食
    { word: "食べる", reading: "たべる", english: "to eat" },
    { word: "食事", reading: "しょくじ", english: "meal" },
    { word: "食堂", reading: "しょくどう", english: "dining hall" },
  ],
  75: [  // 飲
    { word: "飲む", reading: "のむ", english: "to drink" },
    { word: "飲み物", reading: "のみもの", english: "beverage" },
    { word: "飲食店", reading: "いんしょくてん", english: "restaurant" },
  ],
  76: [  // 見
    { word: "見る", reading: "みる", english: "to see" },
    { word: "花見", reading: "はなみ", english: "flower viewing" },
    { word: "意見", reading: "いけん", english: "opinion" },
  ],
  77: [  // 聞
    { word: "聞く", reading: "きく", english: "to listen; to ask" },
    { word: "新聞", reading: "しんぶん", english: "newspaper" },
    { word: "聞こえる", reading: "きこえる", english: "to be heard" },
  ],
  78: [  // 読
    { word: "読む", reading: "よむ", english: "to read" },
    { word: "読書", reading: "どくしょ", english: "reading (books)" },
    { word: "音読", reading: "おんどく", english: "reading aloud" },
  ],
  79: [  // 書
    { word: "書く", reading: "かく", english: "to write" },
    { word: "辞書", reading: "じしょ", english: "dictionary" },
    { word: "教科書", reading: "きょうかしょ", english: "textbook" },
  ],
}

for (const entry of all) {
  if (curated[entry.id]) {
    entry.examples = curated[entry.id]
  }
}

writeFileSync(dataPath, JSON.stringify(all, null, 2) + "\n")
console.log(`✓ Curated examples for ${Object.keys(curated).length} kanji`)
