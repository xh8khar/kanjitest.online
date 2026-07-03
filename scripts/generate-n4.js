const fs = require("fs")

const kanjiList = [
  {"kanji":"不","on":["フ","ブ"],"kun":[],"meanings":["bad","negative","non-"],"strokes":4},
  {"kanji":"世","on":["セ","セイ"],"kun":["よ"],"meanings":["world","society","generation"],"strokes":5},
  {"kanji":"主","on":["シュ","シュウ"],"kun":["あるじ","おも","ぬし"],"meanings":["main","chief","principal"],"strokes":5},
  {"kanji":"事","on":["ジ","ズ"],"kun":["こと"],"meanings":["thing","matter","business"],"strokes":8},
  {"kanji":"代","on":["タイ","ダイ"],"kun":["か.わり","か.わる","か.える","しろ","よ"],"meanings":["age","generation","replace","substitute"],"strokes":5},
  {"kanji":"以","on":["イ"],"kun":["もっ.て"],"meanings":["by means of","because of"],"strokes":5},
  {"kanji":"会","on":["エ","カイ"],"kun":["あ.う","あ.わせる","あつ.まる"],"meanings":["meet","meeting","association"],"strokes":6},
  {"kanji":"住","on":["ジュウ","チュウ"],"kun":["す.む","す.まう"],"meanings":["dwell","live","reside"],"strokes":7},
  {"kanji":"体","on":["タイ","テイ"],"kun":["からだ","かたち"],"meanings":["body","substance"],"strokes":7},
  {"kanji":"作","on":["サ","サク"],"kun":["つく.る"],"meanings":["make","build","production"],"strokes":7},
  {"kanji":"公","on":["ク","コウ"],"kun":["おおやけ"],"meanings":["public","official"],"strokes":4},
  {"kanji":"切","on":["サイ","セツ"],"kun":["き.る","き.れる"],"meanings":["cut","sharp"],"strokes":4},
  {"kanji":"別","on":["ベツ"],"kun":["わ.ける","わか.れる"],"meanings":["separate","another","different"],"strokes":7},
  {"kanji":"力","on":["リキ","リョク"],"kun":["ちから"],"meanings":["power","strength"],"strokes":2},
  {"kanji":"動","on":["ドウ"],"kun":["うご.く","うご.かす"],"meanings":["move","motion","change"],"strokes":11},
  {"kanji":"医","on":["イ"],"kun":["い.やす"],"meanings":["doctor","medicine"],"strokes":7},
  {"kanji":"口","on":["ク","コウ"],"kun":["くち"],"meanings":["mouth","opening"],"strokes":3},
  {"kanji":"可","on":["カ"],"kun":["-べ.き","-べ.し"],"meanings":["passable","can"],"strokes":5},
  {"kanji":"台","on":["タイ","ダイ"],"kun":[],"meanings":["stand","pedestal","counter"],"strokes":5},
  {"kanji":"同","on":["ドウ"],"kun":["おな.じ"],"meanings":["same","equal","agree"],"strokes":6},
  {"kanji":"味","on":["ミ"],"kun":["あじ","あじ.わう"],"meanings":["flavor","taste"],"strokes":8},
  {"kanji":"品","on":["ヒン","ホン"],"kun":["しな"],"meanings":["goods","article","dignity"],"strokes":9},
  {"kanji":"員","on":["イン"],"kun":[],"meanings":["member","employee"],"strokes":10},
  {"kanji":"問","on":["モン"],"kun":["と.う","と.い"],"meanings":["question","problem","ask"],"strokes":11},
  {"kanji":"図","on":["ズ","ト"],"kun":["え","はか.る"],"meanings":["map","drawing","plan"],"strokes":7},
  {"kanji":"地","on":["ジ","チ"],"kun":[],"meanings":["earth","ground","land"],"strokes":6},
  {"kanji":"場","on":["ジョウ","チョウ"],"kun":["ば"],"meanings":["place","location"],"strokes":12},
  {"kanji":"売","on":["バイ"],"kun":["う.る","う.れる"],"meanings":["sell"],"strokes":7},
  {"kanji":"夜","on":["ヤ"],"kun":["よる","よ"],"meanings":["night","evening"],"strokes":8},
  {"kanji":"字","on":["ジ"],"kun":["あざ"],"meanings":["character","letter","word"],"strokes":6},
  {"kanji":"安","on":["アン"],"kun":["やす.い","やす.まる"],"meanings":["cheap","peaceful","relaxed"],"strokes":6},
  {"kanji":"家","on":["カ","ケ"],"kun":["いえ","うち","や"],"meanings":["house","home","family"],"strokes":10},
  {"kanji":"少","on":["ショウ"],"kun":["すく.ない","すこ.し"],"meanings":["few","little","small"],"strokes":4},
  {"kanji":"屋","on":["オク"],"kun":["や"],"meanings":["shop","roof","dealer"],"strokes":9},
  {"kanji":"広","on":["コウ"],"kun":["ひろ.い","ひろ.がる"],"meanings":["wide","broad","spacious"],"strokes":5},
  {"kanji":"度","on":["ド","ト","タク"],"kun":["たび","-た.い"],"meanings":["degree","time","occurrence"],"strokes":9},
  {"kanji":"建","on":["ケン","コン"],"kun":["た.てる","た.つ","た.て"],"meanings":["build","construct"],"strokes":9},
  {"kanji":"強","on":["キョウ","ゴウ"],"kun":["つよ.い","し.いる"],"meanings":["strong","powerful"],"strokes":11},
  {"kanji":"心","on":["シン"],"kun":["こころ"],"meanings":["heart","mind","spirit"],"strokes":4},
  {"kanji":"思","on":["シ"],"kun":["おも.う"],"meanings":["think","believe"],"strokes":9},
  {"kanji":"急","on":["キュウ"],"kun":["いそ.ぐ","せ.く"],"meanings":["hurry","sudden","emergency"],"strokes":9},
  {"kanji":"悪","on":["アク","オ"],"kun":["わる.い","にく.い"],"meanings":["bad","evil","wrong"],"strokes":11},
  {"kanji":"意","on":["イ"],"kun":[],"meanings":["idea","mind","thought","heart"],"strokes":13},
  {"kanji":"手","on":["シュ","ズ"],"kun":["て"],"meanings":["hand"],"strokes":4},
  {"kanji":"持","on":["ジ"],"kun":["も.つ"],"meanings":["have","hold"],"strokes":9},
  {"kanji":"教","on":["キョウ"],"kun":["おし.える","おそ.わる"],"meanings":["teach","doctrine","faith"],"strokes":11},
  {"kanji":"文","on":["ブン","モン"],"kun":["ふみ","あや"],"meanings":["sentence","literature","art"],"strokes":4},
  {"kanji":"料","on":["リョウ"],"kun":[],"meanings":["fee","materials"],"strokes":10},
  {"kanji":"新","on":["シン"],"kun":["あたら.しい","あら.た"],"meanings":["new"],"strokes":13},
  {"kanji":"方","on":["ホウ"],"kun":["かた"],"meanings":["direction","person","way"],"strokes":4},
  {"kanji":"明","on":["メイ","ミョウ","ミン"],"kun":["あ.かり","あか.るい","あ.ける","あ.く"],"meanings":["bright","light","clear"],"strokes":8},
  {"kanji":"映","on":["エイ"],"kun":["うつ.る","うつ.す","は.える"],"meanings":["reflect","project","shine"],"strokes":9},
  {"kanji":"昼","on":["チュウ"],"kun":["ひる"],"meanings":["daytime","noon"],"strokes":9},
  {"kanji":"曜","on":["ヨウ"],"kun":["よ","か"],"meanings":["weekday"],"strokes":18},
  {"kanji":"有","on":["ユウ","ウ"],"kun":["あ.る"],"meanings":["exist","have","possess"],"strokes":6},
  {"kanji":"服","on":["フク"],"kun":[],"meanings":["clothing","admit","obey"],"strokes":8},
  {"kanji":"業","on":["ギョウ","ゴウ"],"kun":["わざ"],"meanings":["business","arts","performance"],"strokes":13},
  {"kanji":"楽","on":["ガク","ラク","ゴウ"],"kun":["たの.しい","たの.しむ"],"meanings":["comfort","ease","music","fun"],"strokes":13},
  {"kanji":"止","on":["シ"],"kun":["と.まる","と.める","や.む","や.める"],"meanings":["stop","halt"],"strokes":4},
  {"kanji":"正","on":["セイ","ショウ"],"kun":["ただ.しい","ただ.す","まさ"],"meanings":["correct","right","justice"],"strokes":5},
  {"kanji":"注","on":["チュウ"],"kun":["そそ.ぐ","つ.ぐ","さ.す"],"meanings":["pour","irrigate","annotate","concentrate on"],"strokes":8},
  {"kanji":"無","on":["ム","ブ"],"kun":["な.い"],"meanings":["nothing","none","not"],"strokes":12},
  {"kanji":"物","on":["ブツ","モツ"],"kun":["もの"],"meanings":["thing","object","matter"],"strokes":8},
  {"kanji":"特","on":["トク"],"kun":[],"meanings":["special"],"strokes":10},
  {"kanji":"理","on":["リ"],"kun":["ことわり"],"meanings":["reason","logic","truth","arrangement"],"strokes":11},
  {"kanji":"用","on":["ヨウ"],"kun":["もち.いる"],"meanings":["use","business","service"],"strokes":5},
  {"kanji":"画","on":["ガ","カク","カイ","エ"],"kun":["えが.く"],"meanings":["picture","brush-stroke"],"strokes":8},
  {"kanji":"発","on":["ハツ","ホツ"],"kun":["た.つ","あば.く","はな.つ","おこ.る"],"meanings":["departure","discharge","start","emit"],"strokes":9},
  {"kanji":"目","on":["モク","ボク"],"kun":["め"],"meanings":["eye","look","experience"],"strokes":5},
  {"kanji":"真","on":["シン"],"kun":["ま","まこと"],"meanings":["true","reality","genuine"],"strokes":10},
  {"kanji":"着","on":["チャク","ジャク"],"kun":["き.る","き.せる","つ.く","つ.ける"],"meanings":["wear","arrive","reach"],"strokes":12},
  {"kanji":"知","on":["チ"],"kun":["し.る","し.らせる"],"meanings":["know","wisdom"],"strokes":8},
  {"kanji":"社","on":["シャ"],"kun":["やしろ"],"meanings":["company","shrine","association"],"strokes":7},
  {"kanji":"空","on":["クウ"],"kun":["そら","から","あ.く","あ.ける","す.く","むな.しい"],"meanings":["empty","sky","air","vacant"],"strokes":8},
  {"kanji":"立","on":["リツ","リュウ","リットル"],"kun":["た.つ","た.てる","た.て"],"meanings":["stand","erect","set up"],"strokes":5},
  {"kanji":"終","on":["シュウ"],"kun":["お.わる","お.える"],"meanings":["end","finish"],"strokes":11},
  {"kanji":"習","on":["シュウ","ジュ"],"kun":["なら.う","なら.い"],"meanings":["learn"],"strokes":11},
  {"kanji":"考","on":["コウ"],"kun":["かんが.える","かんが.え"],"meanings":["think","consider"],"strokes":6},
  {"kanji":"者","on":["シャ"],"kun":["もの"],"meanings":["person","someone"],"strokes":8},
  {"kanji":"自","on":["ジ","シ"],"kun":["みずか.ら","おの.ずから"],"meanings":["oneself","self"],"strokes":6},
  {"kanji":"色","on":["ショク","シキ"],"kun":["いろ"],"meanings":["color"],"strokes":6},
  {"kanji":"茶","on":["チャ","サ"],"kun":[],"meanings":["tea"],"strokes":9},
  {"kanji":"親","on":["シン"],"kun":["おや","した.しい","した.しむ"],"meanings":["parent","intimacy","familiarity"],"strokes":16},
  {"kanji":"言","on":["ゲン","ゴン"],"kun":["い.う","こと"],"meanings":["say","word"],"strokes":7},
  {"kanji":"計","on":["ケイ"],"kun":["はか.る"],"meanings":["measure","plan","scheme"],"strokes":9},
  {"kanji":"赤","on":["セキ","シャク"],"kun":["あか","あか.い"],"meanings":["red"],"strokes":7},
  {"kanji":"起","on":["キ"],"kun":["お.きる","お.こす","お.こる"],"meanings":["get up","wake up","rouse"],"strokes":10},
  {"kanji":"足","on":["ソク"],"kun":["あし","た.りる","た.す","た.る"],"meanings":["foot","leg","sufficient"],"strokes":7},
  {"kanji":"身","on":["シン"],"kun":["み"],"meanings":["body","person","somebody"],"strokes":7},
  {"kanji":"転","on":["テン"],"kun":["ころ.ぶ","ころ.がす","ころ.がる","うつ.る"],"meanings":["turn","change","revolve"],"strokes":11},
  {"kanji":"近","on":["キン","コン"],"kun":["ちか.い"],"meanings":["near","early","close"],"strokes":7},
  {"kanji":"通","on":["ツウ","ツ"],"kun":["とお.る","とお.す","かよ.う"],"meanings":["pass","commute","traffic","avenue"],"strokes":10},
  {"kanji":"週","on":["シュウ"],"kun":[],"meanings":["week"],"strokes":11},
  {"kanji":"運","on":["ウン"],"kun":["はこ.ぶ"],"meanings":["carry","transport","luck","fate"],"strokes":12},
  {"kanji":"道","on":["ドウ","トウ"],"kun":["みち","いう"],"meanings":["road","way","path"],"strokes":12},
  {"kanji":"重","on":["ジュウ","チョウ"],"kun":["おも.い","かさ.なる","かさ.ねる","え"],"meanings":["heavy","important","pile up"],"strokes":9},
  {"kanji":"集","on":["シュウ"],"kun":["あつ.まる","あつ.める","つど.う"],"meanings":["gather","meet","congregate"],"strokes":12},
  {"kanji":"音","on":["オン","イン"],"kun":["おと","ね"],"meanings":["sound","noise"],"strokes":9},
  {"kanji":"題","on":["ダイ"],"kun":[],"meanings":["subject","topic","title"],"strokes":18},
  {"kanji":"風","on":["フウ","フ"],"kun":["かぜ","かざ-"],"meanings":["wind","air","style","manner"],"strokes":9},
  {"kanji":"飯","on":["ハン"],"kun":["めし"],"meanings":["meal","boiled rice"],"strokes":12},
  {"kanji":"館","on":["カン"],"kun":["やかた","たて"],"meanings":["building","mansion","large building"],"strokes":16},
  {"kanji":"使","on":["シ"],"kun":["つか.う"],"meanings":["use","send on a mission","messenger"],"strokes":8},
  {"kanji":"兄","on":["ケイ","キョウ"],"kun":["あに"],"meanings":["elder brother","big brother"],"strokes":5},
  {"kanji":"多","on":["タ"],"kun":["おお.い"],"meanings":["many","much","frequent"],"strokes":6},
  {"kanji":"姉","on":["シ"],"kun":["あね"],"meanings":["elder sister"],"strokes":8},
  {"kanji":"始","on":["シ"],"kun":["はじ.める","はじ.まる","-はじ.める"],"meanings":["begin","start","commence"],"strokes":8},
  {"kanji":"帰","on":["キ"],"kun":["かえ.る","かえ.す"],"meanings":["return","homecoming"],"strokes":10},
  {"kanji":"店","on":["テン"],"kun":["みせ","たな"],"meanings":["shop","store"],"strokes":8},
  {"kanji":"朝","on":["チョウ"],"kun":["あさ"],"meanings":["morning","dynasty","period"],"strokes":12},
  {"kanji":"歌","on":["カ"],"kun":["うた","うた.う"],"meanings":["song","sing"],"strokes":14},
  {"kanji":"歩","on":["ホ","ブ","フ"],"kun":["ある.く","あゆ.む"],"meanings":["walk","step"],"strokes":8},
  {"kanji":"死","on":["シ"],"kun":["し.ぬ"],"meanings":["death","die"],"strokes":6},
  {"kanji":"海","on":["カイ"],"kun":["うみ"],"meanings":["sea","ocean"],"strokes":9},
  {"kanji":"肉","on":["ニク"],"kun":["しし"],"meanings":["meat"],"strokes":6},
  {"kanji":"試","on":["シ"],"kun":["ため.す","こころ.みる"],"meanings":["test","try","attempt"],"strokes":13},
  {"kanji":"質","on":["シツ","シチ","チ"],"kun":["たち","もと","わりふ"],"meanings":["quality","matter","substance"],"strokes":15},
  {"kanji":"野","on":["ヤ","ショ"],"kun":["の"],"meanings":["field","plains","civilian life"],"strokes":11},
  {"kanji":"院","on":["イン"],"kun":[],"meanings":["institution","temple","school"],"strokes":10},
  {"kanji":"仕","on":["シ","ジ"],"kun":["つか.える"],"meanings":["serve","attend","doing"],"strokes":5},
  {"kanji":"借","on":["シャク"],"kun":["か.りる"],"meanings":["borrow","rent"],"strokes":10},
  {"kanji":"写","on":["シャ","ジャ"],"kun":["うつ.す","うつ.る","うつ.し"],"meanings":["copy","photograph","describe"],"strokes":5},
  {"kanji":"去","on":["キョ","コ"],"kun":["さ.る"],"meanings":["leave","go","past","quit"],"strokes":5},
  {"kanji":"夕","on":["セキ"],"kun":["ゆう"],"meanings":["evening"],"strokes":3},
  {"kanji":"妹","on":["マイ"],"kun":["いもうと"],"meanings":["younger sister"],"strokes":8},
  {"kanji":"室","on":["シツ"],"kun":["むろ"],"meanings":["room","apartment","chamber"],"strokes":9},
  {"kanji":"工","on":["コウ","ク","グ"],"kun":[],"meanings":["construction","craft","work"],"strokes":3},
  {"kanji":"弟","on":["ダイ","テイ","デ"],"kun":["おとうと"],"meanings":["younger brother"],"strokes":7},
  {"kanji":"待","on":["タイ"],"kun":["ま.つ"],"meanings":["wait","depend on"],"strokes":9},
  {"kanji":"旅","on":["リョ"],"kun":["たび"],"meanings":["travel","trip"],"strokes":10},
  {"kanji":"洋","on":["ヨウ"],"kun":[],"meanings":["Western style","foreign","ocean"],"strokes":9},
  {"kanji":"牛","on":["ギュウ"],"kun":["うし"],"meanings":["cow"],"strokes":4},
  {"kanji":"答","on":["トウ"],"kun":["こた.える","こた.え"],"meanings":["answer","solution"],"strokes":12},
  {"kanji":"花","on":["カ","ケ"],"kun":["はな"],"meanings":["flower"],"strokes":7},
  {"kanji":"送","on":["ソウ"],"kun":["おく.る"],"meanings":["send","escort"],"strokes":9},
  {"kanji":"開","on":["カイ"],"kun":["ひら.く","あ.く","あ.ける"],"meanings":["open","unfold","unseal"],"strokes":12},
  {"kanji":"青","on":["セイ","ショウ"],"kun":["あお","あお.い"],"meanings":["blue","green"],"strokes":8},
  {"kanji":"験","on":["ケン","ゲン"],"kun":["ため.す","ためし","あかし"],"meanings":["test","effect","verification"],"strokes":18},
  {"kanji":"黒","on":["コク"],"kun":["くろ","くろ.い"],"meanings":["black","dark"],"strokes":11},
  {"kanji":"元","on":["ゲン","ガン"],"kun":["もと"],"meanings":["origin","beginning","former"],"strokes":4},
  {"kanji":"勉","on":["ベン"],"kun":["つと.める"],"meanings":["diligent","strive","exertion"],"strokes":10},
  {"kanji":"古","on":["コ"],"kun":["ふる.い"],"meanings":["old","ancient"],"strokes":5},
  {"kanji":"堂","on":["ドウ"],"kun":[],"meanings":["hall","public chamber"],"strokes":11},
  {"kanji":"田","on":["デン"],"kun":["た"],"meanings":["rice field","rice paddy"],"strokes":5},
  {"kanji":"町","on":["チョウ"],"kun":["まち"],"meanings":["town","street","village"],"strokes":7},
  {"kanji":"界","on":["カイ"],"kun":[],"meanings":["world","boundary"],"strokes":9},
  {"kanji":"病","on":["ビョウ","ヘイ"],"kun":["や.む","やまい"],"meanings":["ill","sick","disease"],"strokes":10},
  {"kanji":"的","on":["テキ"],"kun":["まと"],"meanings":["target","mark","adjective ending"],"strokes":8},
  {"kanji":"研","on":["ケン"],"kun":["と.ぐ"],"meanings":["polish","sharpen","study of"],"strokes":9},
  {"kanji":"私","on":["シ"],"kun":["わたし","わたくし"],"meanings":["I","me","private"],"strokes":7},
  {"kanji":"究","on":["キュウ","ク"],"kun":["きわ.める"],"meanings":["research","study"],"strokes":7},
  {"kanji":"紙","on":["シ"],"kun":["かみ"],"meanings":["paper"],"strokes":10},
  {"kanji":"買","on":["バイ"],"kun":["か.う"],"meanings":["buy","purchase"],"strokes":12},
  {"kanji":"貸","on":["タイ"],"kun":["か.す"],"meanings":["lend"],"strokes":12},
  {"kanji":"銀","on":["ギン"],"kun":["しろがね"],"meanings":["silver"],"strokes":14},
  {"kanji":"飲","on":["イン","オン"],"kun":["の.む"],"meanings":["drink","take","smoke"],"strokes":12},
  {"kanji":"鳥","on":["チョウ"],"kun":["とり"],"meanings":["bird","chicken"],"strokes":11},
  {"kanji":"京","on":["キョウ","キン","ケイ"],"kun":["みやこ"],"meanings":["capital"],"strokes":8},
  {"kanji":"冬","on":["トウ"],"kun":["ふゆ"],"meanings":["winter"],"strokes":5},
  {"kanji":"夏","on":["カ","ガ","ゲ"],"kun":["なつ"],"meanings":["summer"],"strokes":10},
  {"kanji":"族","on":["ゾク"],"kun":[],"meanings":["family","tribe"],"strokes":11},
  {"kanji":"早","on":["ソウ","サッ"],"kun":["はや.い","はや.まる","はや.める","はや"],"meanings":["early","fast"],"strokes":6},
  {"kanji":"春","on":["シュン"],"kun":["はる"],"meanings":["spring","springtime"],"strokes":9},
  {"kanji":"漢","on":["カン"],"kun":[],"meanings":["China","Sino-"],"strokes":13},
  {"kanji":"犬","on":["ケン"],"kun":["いぬ"],"meanings":["dog"],"strokes":4},
  {"kanji":"秋","on":["シュウ"],"kun":["あき","とき"],"meanings":["autumn","fall"],"strokes":9},
  {"kanji":"英","on":["エイ"],"kun":["はなぶさ"],"meanings":["England","English","excellent"],"strokes":8},
  {"kanji":"走","on":["ソウ"],"kun":["はし.る"],"meanings":["run"],"strokes":7},
  {"kanji":"駅","on":["エキ"],"kun":[],"meanings":["station"],"strokes":14},
  {"kanji":"魚","on":["ギョ"],"kun":["うお","さかな"],"meanings":["fish"],"strokes":11},
  {"kanji":"兼","on":["ケン"],"kun":["か.ねる"],"meanings":["concurrently","combine"],"strokes":10}
]

// Comprehensive N4 vocabulary database
const vocabData = {
  "不": [
    {word:"不便",reading:"ふべん",english:"inconvenient",sentence:"駅が遠くて不便です。",sentenceEnglish:"It's inconvenient because the station is far."},
    {word:"不安",reading:"ふあん",english:"anxiety",sentence:"試験の結果が不安です。",sentenceEnglish:"I'm anxious about my exam results."},
    {word:"不足",reading:"ふそく",english:"lack",sentence:"睡眠不足で頭が痛いです。",sentenceEnglish:"I have a headache from lack of sleep."}
  ],
  "世": [
    {word:"世界",reading:"せかい",english:"world",sentence:"世界にはいろいろな国があります。",sentenceEnglish:"There are many countries in the world."},
    {word:"世話",reading:"せわ",english:"care",sentence:"母の世話をしています。",sentenceEnglish:"I take care of my mother."},
    {word:"世代",reading:"せだい",english:"generation",sentence:"若い世代は考え方が違います。",sentenceEnglish:"The younger generation thinks differently."}
  ],
  "主": [
    {word:"主人",reading:"しゅじん",english:"husband",sentence:"主人は会社員です。",sentenceEnglish:"My husband is an office worker."},
    {word:"主要",reading:"しゅよう",english:"main",sentence:"これが主要な問題です。",sentenceEnglish:"This is the main problem."},
    {word:"主人公",reading:"しゅじんこう",english:"main character",sentence:"この物語の主人公は小学生です。",sentenceEnglish:"The main character is an elementary student."}
  ],
  "事": [
    {word:"食事",reading:"しょくじ",english:"meal",sentence:"家族といっしょに食事をしました。",sentenceEnglish:"I had a meal with my family."},
    {word:"事故",reading:"じこ",english:"accident",sentence:"事故で電車が遅れました。",sentenceEnglish:"The train was delayed due to an accident."},
    {word:"大事",reading:"だいじ",english:"important",sentence:"これは大事な書類です。",sentenceEnglish:"This is an important document."}
  ],
  "代": [
    {word:"代わり",reading:"かわり",english:"substitute",sentence:"先生の代わりに私が教えました。",sentenceEnglish:"I taught instead of the teacher."},
    {word:"時代",reading:"じだい",english:"era",sentence:"昔の時代は生活が大変でした。",sentenceEnglish:"Life was hard in the past era."},
    {word:"代表",reading:"だいひょう",english:"representative",sentence:"クラスの代表に選ばれました。",sentenceEnglish:"I was chosen as class representative."}
  ],
  "以": [
    {word:"以上",reading:"いじょう",english:"more than",sentence:"千円以上買うと送料が無料です。",sentenceEnglish:"Shipping is free for purchases over 1000 yen."},
    {word:"以外",reading:"いがい",english:"except",sentence:"私以外の人も来ました。",sentenceEnglish:"People other than me also came."},
    {word:"以前",reading:"いぜん",english:"before",sentence:"以前はここに図書館がありました。",sentenceEnglish:"There used to be a library here."}
  ],
  "会": [
    {word:"会社",reading:"かいしゃ",english:"company",sentence:"父は東京の会社で働いています。",sentenceEnglish:"My father works at a company in Tokyo."},
    {word:"会話",reading:"かいわ",english:"conversation",sentence:"日本語で会話するのは楽しいです。",sentenceEnglish:"Conversations in Japanese are fun."},
    {word:"社会",reading:"しゃかい",english:"society",sentence:"社会に出ると新しい経験ができます。",sentenceEnglish:"You can have new experiences in society."}
  ],
  "住": [
    {word:"住所",reading:"じゅうしょ",english:"address",sentence:"新しい住所を友達に教えました。",sentenceEnglish:"I told my friends my new address."},
    {word:"住宅",reading:"じゅうたく",english:"housing",sentence:"この辺りは新しい住宅が多いです。",sentenceEnglish:"There are many new houses in this area."},
    {word:"住民",reading:"じゅうみん",english:"resident",sentence:"この町の住民はみんな親切です。",sentenceEnglish:"All the residents of this town are kind."}
  ],
  "体": [
    {word:"体調",reading:"たいちょう",english:"physical condition",sentence:"体調が悪いので学校を休みます。",sentenceEnglish:"I'll skip school because I don't feel well."},
    {word:"体操",reading:"たいそう",english:"gymnastics",sentence:"子供の頃、毎朝体操をしました。",sentenceEnglish:"I did morning gymnastics when I was a child."},
    {word:"体重",reading:"たいじゅう",english:"body weight",sentence:"体重が増えてしまいました。",sentenceEnglish:"I've gained weight."}
  ],
  "作": [
    {word:"作品",reading:"さくひん",english:"work of art",sentence:"彼の作品はとても有名です。",sentenceEnglish:"His work is very famous."},
    {word:"作文",reading:"さくぶん",english:"composition",sentence:"学校で作文を書きました。",sentenceEnglish:"I wrote a composition at school."},
    {word:"操作",reading:"そうさ",english:"operation",sentence:"機械の操作は難しいです。",sentenceEnglish:"Operating the machine is difficult."}
  ],
  "公": [
    {word:"公園",reading:"こうえん",english:"park",sentence:"公園で子供たちが遊んでいます。",sentenceEnglish:"Children are playing in the park."},
    {word:"公務員",reading:"こうむいん",english:"public servant",sentence:"彼は公務員を目指しています。",sentenceEnglish:"He aims to become a public servant."},
    {word:"公式",reading:"こうしき",english:"official",sentence:"公式サイトで情報を確認してください。",sentenceEnglish:"Please check the official site."}
  ],
  "切": [
    {word:"大切",reading:"たいせつ",english:"important",sentence:"時間はとても大切です。",sentenceEnglish:"Time is very precious."},
    {word:"切手",reading:"きって",english:"stamp",sentence:"この手紙には八十円の切手が必要です。",sentenceEnglish:"This letter needs an 80-yen stamp."},
    {word:"切符",reading:"きっぷ",english:"ticket",sentence:"駅で切符を買いました。",sentenceEnglish:"I bought a ticket at the station."}
  ],
  "別": [
    {word:"特別",reading:"とくべつ",english:"special",sentence:"今日は特別な日です。",sentenceEnglish:"Today is a special day."},
    {word:"別に",reading:"べつに",english:"not particularly",sentence:"別に用事はありません。",sentenceEnglish:"I don't have anything in particular."},
    {word:"区別",reading:"くべつ",english:"distinction",sentence:"右と左の区別がつきますか。",sentenceEnglish:"Can you tell right from left?"}
  ],
  "力": [
    {word:"努力",reading:"どりょく",english:"effort",sentence:"努力すれば夢がかなうでしょう。",sentenceEnglish:"If you try hard, your dreams will come true."},
    {word:"力",reading:"ちから",english:"strength",sentence:"彼は力がとても強いです。",sentenceEnglish:"He is very strong."},
    {word:"能力",reading:"のうりょく",english:"ability",sentence:"彼の能力はとても高いです。",sentenceEnglish:"His ability is very high."}
  ],
  "動": [
    {word:"動物",reading:"どうぶつ",english:"animal",sentence:"動物園に行きたいです。",sentenceEnglish:"I want to go to the zoo."},
    {word:"動く",reading:"うごく",english:"move",sentence:"このロボットは自分で動きます。",sentenceEnglish:"This robot moves on its own."},
    {word:"活動",reading:"かつどう",english:"activity",sentence:"サッカー部の活動は毎週土曜日です。",sentenceEnglish:"Soccer club activities are every Saturday."}
  ],
  "医": [
    {word:"医療",reading:"いりょう",english:"medical treatment",sentence:"医療技術が進歩しています。",sentenceEnglish:"Medical technology is advancing."},
    {word:"医者",reading:"いしゃ",english:"doctor",sentence:"医者になるのが子供のころからの夢です。",sentenceEnglish:"Becoming a doctor has been my dream since childhood."},
    {word:"医学",reading:"いがく",english:"medical science",sentence:"彼は大学で医学を勉強しています。",sentenceEnglish:"He is studying medicine at university."}
  ],
  "口": [
    {word:"入口",reading:"いりぐち",english:"entrance",sentence:"入口はあちらです。",sentenceEnglish:"The entrance is over there."},
    {word:"出口",reading:"でぐち",english:"exit",sentence:"出口はどこですか。",sentenceEnglish:"Where is the exit?"},
    {word:"人口",reading:"じんこう",english:"population",sentence:"この町の人口は約一万人です。",sentenceEnglish:"The population of this town is about 10,000."}
  ],
  "可": [
    {word:"可能",reading:"かのう",english:"possible",sentence:"それは本当に可能ですか。",sentenceEnglish:"Is that really possible?"},
    {word:"許可",reading:"きょか",english:"permission",sentence:"先生の許可をもらいました。",sentenceEnglish:"I got permission from the teacher."},
    {word:"可能性",reading:"かのうせい",english:"possibility",sentence:"成功する可能性は高いです。",sentenceEnglish:"The possibility of success is high."}
  ],
  "台": [
    {word:"台所",reading:"だいどころ",english:"kitchen",sentence:"台所で料理をしています。",sentenceEnglish:"I am cooking in the kitchen."},
    {word:"台風",reading:"たいふう",english:"typhoon",sentence:"台風で電車が止まりました。",sentenceEnglish:"Trains stopped due to the typhoon."},
    {word:"舞台",reading:"ぶたい",english:"stage",sentence:"彼女は舞台に立ちました。",sentenceEnglish:"She stood on the stage."}
  ],
  "同": [
    {word:"同じ",reading:"おなじ",english:"same",sentence:"私は兄と同じ学校に通っています。",sentenceEnglish:"I go to the same school as my brother."},
    {word:"同時",reading:"どうじ",english:"simultaneous",sentence:"二人は同時に到着しました。",sentenceEnglish:"They both arrived at the same time."},
    {word:"同意",reading:"どうい",english:"agreement",sentence:"彼の意見に同意します。",sentenceEnglish:"I agree with his opinion."}
  ],
  "味": [
    {word:"味",reading:"あじ",english:"taste",sentence:"この料理は味がとても良いです。",sentenceEnglish:"This dish tastes very good."},
    {word:"意味",reading:"いみ",english:"meaning",sentence:"この言葉の意味を教えてください。",sentenceEnglish:"Please tell me the meaning of this word."},
    {word:"味わう",reading:"あじわう",english:"savor",sentence:"ゆっくり味わって食べてください。",sentenceEnglish:"Please eat slowly and savor it."}
  ],
  "品": [
    {word:"商品",reading:"しょうひん",english:"product",sentence:"新しい商品が店に並びました。",sentenceEnglish:"New products were displayed in the store."},
    {word:"作品",reading:"さくひん",english:"artwork",sentence:"彼の作品は美術館に飾られています。",sentenceEnglish:"His artwork is displayed in the museum."},
    {word:"品物",reading:"しなもの",english:"goods",sentence:"この店は品物の種類が多いです。",sentenceEnglish:"This store has a wide variety of goods."}
  ],
  "員": [
    {word:"社員",reading:"しゃいん",english:"employee",sentence:"彼はこの会社の社員です。",sentenceEnglish:"He is an employee of this company."},
    {word:"店員",reading:"てんいん",english:"shop assistant",sentence:"店員に値段を聞きました。",sentenceEnglish:"I asked the shop assistant the price."},
    {word:"会員",reading:"かいいん",english:"member",sentence:"このクラブの会員になりました。",sentenceEnglish:"I became a member of this club."}
  ],
  "問": [
    {word:"質問",reading:"しつもん",english:"question",sentence:"質問があれば手を挙げてください。",sentenceEnglish:"Please raise your hand if you have a question."},
    {word:"問題",reading:"もんだい",english:"problem",sentence:"この問題の答えが分かりません。",sentenceEnglish:"I don't know the answer to this problem."},
    {word:"問い合わせ",reading:"といあわせ",english:"inquiry",sentence:"お問い合わせはメールでお願いします。",sentenceEnglish:"Please send inquiries by email."}
  ],
  "図": [
    {word:"地図",reading:"ちず",english:"map",sentence:"地図を見ながら駅まで歩きました。",sentenceEnglish:"I walked to the station while looking at the map."},
    {word:"図書館",reading:"としょかん",english:"library",sentence:"図書館で本を借りました。",sentenceEnglish:"I borrowed a book from the library."},
    {word:"図",reading:"ず",english:"diagram",sentence:"この図を見て説明してください。",sentenceEnglish:"Please explain while looking at this diagram."}
  ],
  "地": [
    {word:"地下鉄",reading:"ちかてつ",english:"subway",sentence:"地下鉄で学校に行きます。",sentenceEnglish:"I go to school by subway."},
    {word:"地球",reading:"ちきゅう",english:"earth",sentence:"地球環境を守ることが大事です。",sentenceEnglish:"Protecting the earth's environment is important."},
    {word:"地方",reading:"ちほう",english:"region",sentence:"日本の地方にはきれいな自然があります。",sentenceEnglish:"There's beautiful nature in Japan's regions."}
  ],
  "場": [
    {word:"場所",reading:"ばしょ",english:"place",sentence:"この場所で待っていてください。",sentenceEnglish:"Please wait at this place."},
    {word:"場合",reading:"ばあい",english:"case",sentence:"雨の場合、試合は中止です。",sentenceEnglish:"In case of rain, the game is canceled."},
    {word:"工場",reading:"こうじょう",english:"factory",sentence:"工場で車を生産しています。",sentenceEnglish:"Cars are produced at the factory."}
  ],
  "売": [
    {word:"売る",reading:"うる",english:"sell",sentence:"古本をインターネットで売りました。",sentenceEnglish:"I sold old books on the internet."},
    {word:"売り切れ",reading:"うりきれ",english:"sold out",sentence:"その商品は売り切れです。",sentenceEnglish:"That product is sold out."},
    {word:"販売",reading:"はんばい",english:"sales",sentence:"新製品の販売が始まりました。",sentenceEnglish:"Sales of the new product have started."}
  ],
  "夜": [
    {word:"夜",reading:"よる",english:"night",sentence:"夜は星がきれいです。",sentenceEnglish:"The stars are beautiful at night."},
    {word:"今夜",reading:"こんや",english:"tonight",sentence:"今夜は何を食べますか。",sentenceEnglish:"What will you eat tonight?"},
    {word:"夜中",reading:"よなか",english:"midnight",sentence:"夜中に目が覚めました。",sentenceEnglish:"I woke up in the middle of the night."}
  ],
  "字": [
    {word:"漢字",reading:"かんじ",english:"kanji",sentence:"今日は新しい漢字を習いました。",sentenceEnglish:"I learned new kanji today."},
    {word:"文字",reading:"もじ",english:"character",sentence:"この文字はどう読むのですか。",sentenceEnglish:"How do you read this character?"},
    {word:"字",reading:"じ",english:"handwriting",sentence:"彼の字はとてもきれいです。",sentenceEnglish:"His handwriting is very neat."}
  ],
  "安": [
    {word:"安い",reading:"やすい",english:"cheap",sentence:"この店の野菜は安いです。",sentenceEnglish:"Vegetables at this store are cheap."},
    {word:"安心",reading:"あんしん",english:"relief",sentence:"無事に着いて安心しました。",sentenceEnglish:"I'm relieved you arrived safely."},
    {word:"安全",reading:"あんぜん",english:"safety",sentence:"安全のためにシートベルトをしてください。",sentenceEnglish:"Please wear your seatbelt for safety."}
  ],
  "家": [
    {word:"家",reading:"いえ",english:"house",sentence:"新しい家を買いました。",sentenceEnglish:"I bought a new house."},
    {word:"家族",reading:"かぞく",english:"family",sentence:"家族で温泉に行きました。",sentenceEnglish:"Our family went to a hot spring."},
    {word:"作家",reading:"さっか",english:"writer",sentence:"彼は有名な小説の作家です。",sentenceEnglish:"He is a famous novel writer."}
  ],
  "少": [
    {word:"少ない",reading:"すくない",english:"few",sentence:"今日は人が少ないですね。",sentenceEnglish:"There are few people today, aren't there?"},
    {word:"少し",reading:"すこし",english:"a little",sentence:"もう少し待ってください。",sentenceEnglish:"Please wait a little longer."},
    {word:"少年",reading:"しょうねん",english:"boy",sentence:"あの少年は毎日公園で遊んでいます。",sentenceEnglish:"That boy plays in the park every day."}
  ],
  "屋": [
    {word:"屋上",reading:"おくじょう",english:"rooftop",sentence:"屋上から町が見えます。",sentenceEnglish:"You can see the town from the rooftop."},
    {word:"花屋",reading:"はなや",english:"flower shop",sentence:"花屋で花を買いました。",sentenceEnglish:"I bought flowers at the flower shop."},
    {word:"料理屋",reading:"りょうりや",english:"restaurant",sentence:"あの料理屋のラーメンはおいしいです。",sentenceEnglish:"The ramen at that restaurant is delicious."}
  ],
  "広": [
    {word:"広い",reading:"ひろい",english:"wide",sentence:"この部屋はとても広いです。",sentenceEnglish:"This room is very spacious."},
    {word:"広場",reading:"ひろば",english:"plaza",sentence:"駅前の広場で待ち合わせました。",sentenceEnglish:"I met at the plaza in front of the station."},
    {word:"広告",reading:"こうこく",english:"advertisement",sentence:"テレビで新しい車の広告を見ました。",sentenceEnglish:"I saw an ad for a new car on TV."}
  ],
  "度": [
    {word:"毎度",reading:"まいど",english:"every time",sentence:"毎度ありがとうございます。",sentenceEnglish:"Thank you as always."},
    {word:"度",reading:"ど",english:"degree",sentence:"今日の気温は三十度です。",sentenceEnglish:"Today's temperature is 30 degrees."},
    {word:"制度",reading:"せいど",english:"system",sentence:"日本の教育制度について勉強しました。",sentenceEnglish:"I studied about Japan's education system."}
  ],
  "建": [
    {word:"建物",reading:"たてもの",english:"building",sentence:"あそこに高い建物があります。",sentenceEnglish:"There is a tall building over there."},
    {word:"建設",reading:"けんせつ",english:"construction",sentence:"新しい駅の建設が始まりました。",sentenceEnglish:"Construction of the new station has started."},
    {word:"建てる",reading:"たてる",english:"build",sentence:"家を建てるために貯金しています。",sentenceEnglish:"I'm saving money to build a house."}
  ],
  "強": [
    {word:"強い",reading:"つよい",english:"strong",sentence:"彼は体が強いです。",sentenceEnglish:"He has a strong body."},
    {word:"勉強",reading:"べんきょう",english:"study",sentence:"毎日日本語を勉強しています。",sentenceEnglish:"I study Japanese every day."},
    {word:"強さ",reading:"つよさ",english:"strength",sentence:"自分の強さを知っていますか。",sentenceEnglish:"Do you know your own strengths?"}
  ],
  "心": [
    {word:"心",reading:"こころ",english:"heart",sentence:"彼女の心は優しいです。",sentenceEnglish:"She has a kind heart."},
    {word:"安心",reading:"あんしん",english:"relief",sentence:"連絡をもらって安心しました。",sentenceEnglish:"I was relieved to receive your message."},
    {word:"心配",reading:"しんぱい",english:"worry",sentence:"試験のことが心配です。",sentenceEnglish:"I'm worried about the exam."}
  ],
  "思": [
    {word:"思う",reading:"おもう",english:"think",sentence:"私はそうは思いません。",sentenceEnglish:"I don't think so."},
    {word:"思い出",reading:"おもいで",english:"memory",sentence:"この写真を見ると昔を思い出します。",sentenceEnglish:"This photo reminds me of the old days."},
    {word:"意思",reading:"いし",english:"intention",sentence:"自分の意思をはっきり伝えてください。",sentenceEnglish:"Please clearly communicate your intention."}
  ],
  "急": [
    {word:"急ぐ",reading:"いそぐ",english:"hurry",sentence:"急がないと電車に遅れます。",sentenceEnglish:"If we don't hurry, we'll miss the train."},
    {word:"急に",reading:"きゅうに",english:"suddenly",sentence:"急に雨が降り出しました。",sentenceEnglish:"It suddenly started raining."},
    {word:"緊急",reading:"きんきゅう",english:"emergency",sentence:"緊急の用事ができました。",sentenceEnglish:"An urgent matter came up."}
  ],
  "悪": [
    {word:"悪い",reading:"わるい",english:"bad",sentence:"昨日は天気が悪かったです。",sentenceEnglish:"The weather was bad yesterday."},
    {word:"悪者",reading:"わるもの",english:"villain",sentence:"この映画の悪者はだれですか。",sentenceEnglish:"Who is the villain in this movie?"},
    {word:"悪化",reading:"あっか",english:"worsening",sentence:"彼の病気は悪化しました。",sentenceEnglish:"His illness has worsened."}
  ],
  "意": [
    {word:"意味",reading:"いみ",english:"meaning",sentence:"この言葉の意味は何ですか。",sentenceEnglish:"What is the meaning of this word?"},
    {word:"意見",reading:"いけん",english:"opinion",sentence:"意見があってください。",sentenceEnglish:"Please give your opinion."},
    {word:"用意",reading:"ようい",english:"preparation",sentence:"旅行の用意はもうできましたか。",sentenceEnglish:"Are you ready for the trip?"}
  ],
  "手": [
    {word:"手",reading:"て",english:"hand",sentence:"手を洗ってから食事をしてください。",sentenceEnglish:"Please wash your hands before eating."},
    {word:"上手",reading:"じょうず",english:"skilled",sentence:"彼は料理が上手です。",sentenceEnglish:"He's good at cooking."},
    {word:"下手",reading:"へた",english:"unskilled",sentence:"私は絵を描くのが下手です。",sentenceEnglish:"I'm bad at drawing pictures."}
  ],
  "持": [
    {word:"持つ",reading:"もつ",english:"hold",sentence:"荷物を持ってあげましょうか。",sentenceEnglish:"Shall I carry your luggage?"},
    {word:"持ち物",reading:"もちもの",english:"belongings",sentence:"持ち物に名前を書いてください。",sentenceEnglish:"Please write your name on your belongings."},
    {word:"持続",reading:"じぞく",english:"continuation",sentence:"この天気は長くは持続しないでしょう。",sentenceEnglish:"This weather won't last long."}
  ],
  "教": [
    {word:"教育",reading:"きょういく",english:"education",sentence:"教育は国の基本です。",sentenceEnglish:"Education is the foundation of a country."},
    {word:"教室",reading:"きょうしつ",english:"classroom",sentence:"教室は三階にあります。",sentenceEnglish:"The classroom is on the third floor."},
    {word:"教科書",reading:"きょうかしょ",english:"textbook",sentence:"新しい教科書を買いました。",sentenceEnglish:"I bought a new textbook."}
  ],
  "文": [
    {word:"文化",reading:"ぶんか",english:"culture",sentence:"日本の文化に興味があります。",sentenceEnglish:"I'm interested in Japanese culture."},
    {word:"文字",reading:"もじ",english:"letter",sentence:"この文字は何と読みますか。",sentenceEnglish:"How do you read this letter?"},
    {word:"文学",reading:"ぶんがく",english:"literature",sentence:"日本の文学が好きです。",sentenceEnglish:"I like Japanese literature."}
  ],
  "料": [
    {word:"料理",reading:"りょうり",english:"cooking",sentence:"日本料理が大好きです。",sentenceEnglish:"I love Japanese food."},
    {word:"料金",reading:"りょうきん",english:"fee",sentence:"この駐車場は料金が無料ですか。",sentenceEnglish:"Is this parking lot free?"},
    {word:"材料",reading:"ざいりょう",english:"ingredients",sentence:"材料を買いに行きました。",sentenceEnglish:"I went to buy ingredients."}
  ],
  "新": [
    {word:"新しい",reading:"あたらしい",english:"new",sentence:"新しい靴を買いました。",sentenceEnglish:"I bought new shoes."},
    {word:"新聞",reading:"しんぶん",english:"newspaper",sentence:"毎朝新聞を読みます。",sentenceEnglish:"I read the newspaper every morning."},
    {word:"新幹線",reading:"しんかんせん",english:"bullet train",sentence:"新幹線で大阪まで行きました。",sentenceEnglish:"I went to Osaka by bullet train."}
  ],
  "方": [
    {word:"方",reading:"かた",english:"person (polite)",sentence:"あの方はどなたですか。",sentenceEnglish:"Who is that person?"},
    {word:"方法",reading:"ほうほう",english:"method",sentence:"いい方法を考えてください。",sentenceEnglish:"Please think of a good method."},
    {word:"方言",reading:"ほうげん",english:"dialect",sentence:"大阪の方言は面白いです。",sentenceEnglish:"Osaka dialect is interesting."}
  ],
  "明": [
    {word:"明るい",reading:"あかるい",english:"bright",sentence:"この部屋はとても明るいです。",sentenceEnglish:"This room is very bright."},
    {word:"明日",reading:"あした",english:"tomorrow",sentence:"明日は何曜日ですか。",sentenceEnglish:"What day is tomorrow?"},
    {word:"説明",reading:"せつめい",english:"explanation",sentence:"先生が説明してくれました。",sentenceEnglish:"The teacher explained it to me."}
  ],
  "映": [
    {word:"映画",reading:"えいが",english:"movie",sentence:"週末に友達と映画を見ました。",sentenceEnglish:"I watched a movie with friends on the weekend."},
    {word:"映画館",reading:"えいがかん",english:"cinema",sentence:"新しい映画館ができました。",sentenceEnglish:"A new cinema opened."},
    {word:"反映",reading:"はんえい",english:"reflection",sentence:"意見を反映させましょう。",sentenceEnglish:"Let's reflect the opinions."}
  ],
  "昼": [
    {word:"昼",reading:"ひる",english:"noon",sentence:"昼に友達と会いました。",sentenceEnglish:"I met a friend at noon."},
    {word:"昼ごはん",reading:"ひるごはん",english:"lunch",sentence:"昼ごはんを食べましたか。",sentenceEnglish:"Did you eat lunch?"},
    {word:"昼休み",reading:"ひるやすみ",english:"lunch break",sentence:"昼休みに図書館に行きます。",sentenceEnglish:"I'll go to the library during lunch break."}
  ],
  "曜": [
    {word:"月曜日",reading:"げつようび",english:"Monday",sentence:"月曜日から仕事が始まります。",sentenceEnglish:"Work starts on Monday."},
    {word:"曜日",reading:"ようび",english:"day of week",sentence:"今日は何曜日ですか。",sentenceEnglish:"What day of the week is today?"},
    {word:"金曜日",reading:"きんようび",english:"Friday",sentence:"金曜日に映画を見に行きます。",sentenceEnglish:"I'll go see a movie on Friday."}
  ],
  "有": [
    {word:"有名",reading:"ゆうめい",english:"famous",sentence:"このレストランはとても有名です。",sentenceEnglish:"This restaurant is very famous."},
    {word:"所有",reading:"しょゆう",english:"possession",sentence:"この土地は彼の所有です。",sentenceEnglish:"This land is his possession."},
    {word:"有料",reading:"ゆうりょう",english:"paid",sentence:"この駐車場は有料ですか。",sentenceEnglish:"Is this parking lot paid?"}
  ],
  "服": [
    {word:"洋服",reading:"ようふく",english:"clothes",sentence:"洋服を買いにデパートへ行きます。",sentenceEnglish:"I'll go to the department store to buy clothes."},
    {word:"制服",reading:"せいふく",english:"uniform",sentence:"この学校の制服はかわいいです。",sentenceEnglish:"This school's uniform is cute."},
    {word:"服装",reading:"ふくそう",english:"attire",sentence:"結婚式の服装を考えています。",sentenceEnglish:"I'm thinking about what to wear to the wedding."}
  ],
  "業": [
    {word:"授業",reading:"じゅぎょう",english:"class",sentence:"今日の授業は何時からですか。",sentenceEnglish:"What time does today's class start?"},
    {word:"職業",reading:"しょくぎょう",english:"occupation",sentence:"あなたの職業は何ですか。",sentenceEnglish:"What is your occupation?"},
    {word:"業者",reading:"ぎょうしゃ",english:"business",sentence:"工事の業者を探しています。",sentenceEnglish:"I'm looking for a construction company."}
  ],
  "楽": [
    {word:"音楽",reading:"おんがく",english:"music",sentence:"音楽を聞きながら勉強します。",sentenceEnglish:"I study while listening to music."},
    {word:"楽しい",reading:"たのしい",english:"enjoyable",sentence:"友達と旅行して楽しかったです。",sentenceEnglish:"I enjoyed traveling with friends."},
    {word:"楽しみ",reading:"たのしみ",english:"pleasure",sentence:"次の週末が楽しみです。",sentenceEnglish:"I'm looking forward to next weekend."}
  ],
  "止": [
    {word:"止まる",reading:"とまる",english:"stop",sentence:"信号が赤で車が止まりました。",sentenceEnglish:"The car stopped at the red light."},
    {word:"中止",reading:"ちゅうし",english:"cancel",sentence:"雨で試合が中止になりました。",sentenceEnglish:"The game was canceled due to rain."},
    {word:"禁止",reading:"きんし",english:"prohibition",sentence:"ここでの写真撮影は禁止です。",sentenceEnglish:"Photography is prohibited here."}
  ],
  "正": [
    {word:"正しい",reading:"ただしい",english:"correct",sentence:"あなたの意見は正しいです。",sentenceEnglish:"Your opinion is correct."},
    {word:"正月",reading:"しょうがつ",english:"New Year",sentence:"正月に家族で集まります。",sentenceEnglish:"Our family gathers at New Year's."},
    {word:"不正",reading:"ふせい",english:"fraud",sentence:"不正な行為は許されません。",sentenceEnglish:"Fraudulent acts are not permitted."}
  ],
  "注": [
    {word:"注意",reading:"ちゅうい",english:"caution",sentence:"車に注意してください。",sentenceEnglish:"Please watch out for cars."},
    {word:"注文",reading:"ちゅうもん",english:"order",sentence:"レストランでラーメンを注文しました。",sentenceEnglish:"I ordered ramen at the restaurant."},
    {word:"注射",reading:"ちゅうしゃ",english:"injection",sentence:"病院で注射を打ってもらいました。",sentenceEnglish:"I got a shot at the hospital."}
  ],
  "無": [
    {word:"無料",reading:"むりょう",english:"free",sentence:"このアプリは無料です。",sentenceEnglish:"This app is free."},
    {word:"無事",reading:"ぶじ",english:"safety",sentence:"無事に家に着きました。",sentenceEnglish:"I arrived home safely."},
    {word:"無駄",reading:"むだ",english:"waste",sentence:"お金を無駄にしないでください。",sentenceEnglish:"Please don't waste money."}
  ],
  "物": [
    {word:"動物",reading:"どうぶつ",english:"animal",sentence:"あの動物は何ですか。",sentenceEnglish:"What is that animal?"},
    {word:"食べ物",reading:"たべもの",english:"food",sentence:"食べ物を持って行きましょう。",sentenceEnglish:"Let's bring food."},
    {word:"建物",reading:"たてもの",english:"building",sentence:"あの建物は図書館です。",sentenceEnglish:"That building is the library."}
  ],
  "特": [
    {word:"特別",reading:"とくべつ",english:"special",sentence:"今日は特別な日です。",sentenceEnglish:"Today is a special day."},
    {word:"特徴",reading:"とくちょう",english:"feature",sentence:"彼女の特徴は笑顔です。",sentenceEnglish:"Her distinguishing feature is her smile."},
    {word:"特急",reading:"とっきゅう",english:"express",sentence:"特急電車で京都まで行きました。",sentenceEnglish:"I went to Kyoto by express train."}
  ],
  "理": [
    {word:"理由",reading:"りゆう",english:"reason",sentence:"遅刻した理由を教えてください。",sentenceEnglish:"Please tell me the reason you were late."},
    {word:"料理",reading:"りょうり",english:"cooking",sentence:"イタリア料理が得意です。",sentenceEnglish:"I'm good at Italian cooking."},
    {word:"地理",reading:"ちり",english:"geography",sentence:"地理の勉強が好きです。",sentenceEnglish:"I like studying geography."}
  ],
  "用": [
    {word:"用事",reading:"ようじ",english:"errand",sentence:"明日は用事があります。",sentenceEnglish:"I have something to do tomorrow."},
    {word:"用意",reading:"ようい",english:"preparation",sentence:"旅行の用意ができました。",sentenceEnglish:"I'm ready for the trip."},
    {word:"利用",reading:"りよう",english:"use",sentence:"この図書館はだれでも利用できます。",sentenceEnglish:"Anyone can use this library."}
  ],
  "画": [
    {word:"映画",reading:"えいが",english:"movie",sentence:"映画館で映画を見るのが好きです。",sentenceEnglish:"I like watching movies at the cinema."},
    {word:"計画",reading:"けいかく",english:"plan",sentence:"夏休みの計画を立てています。",sentenceEnglish:"I'm making plans for summer vacation."},
    {word:"画家",reading:"がか",english:"painter",sentence:"彼は有名な画家になりました。",sentenceEnglish:"He became a famous painter."}
  ],
  "発": [
    {word:"出発",reading:"しゅっぱつ",english:"departure",sentence:"明日の朝早く出発します。",sentenceEnglish:"We'll depart early tomorrow morning."},
    {word:"発見",reading:"はっけん",english:"discovery",sentence:"新しい星を発見しました。",sentenceEnglish:"I discovered a new star."},
    {word:"発表",reading:"はっぴょう",english:"presentation",sentence:"研究の発表をしました。",sentenceEnglish:"I gave a presentation on my research."}
  ],
  "目": [
    {word:"目",reading:"め",english:"eye",sentence:"目が疲れたので休みます。",sentenceEnglish:"My eyes are tired so I'll rest."},
    {word:"目的",reading:"もくてき",english:"purpose",sentence:"旅行の目的は何ですか。",sentenceEnglish:"What's the purpose of your trip?"},
    {word:"注目",reading:"ちゅうもく",english:"attention",sentence:"この問題に注目してください。",sentenceEnglish:"Please pay attention to this issue."}
  ],
  "真": [
    {word:"真実",reading:"しんじつ",english:"truth",sentence:"真実を話してください。",sentenceEnglish:"Please tell the truth."},
    {word:"写真",reading:"しゃしん",english:"photograph",sentence:"写真を撮ってもいいですか。",sentenceEnglish:"May I take a photo?"},
    {word:"真心",reading:"まごころ",english:"sincerity",sentence:"真心を込めて作りました。",sentenceEnglish:"I made it with all my heart."}
  ],
  "着": [
    {word:"着る",reading:"きる",english:"wear",sentence:"今日は何を着ますか。",sentenceEnglish:"What will you wear today?"},
    {word:"到着",reading:"とうちゃく",english:"arrival",sentence:"飛行機は午後三時に到着します。",sentenceEnglish:"The plane arrives at 3 PM."},
    {word:"着物",reading:"きもの",english:"kimono",sentence:"着物を着て花見に行きました。",sentenceEnglish:"I went to see cherry blossoms in a kimono."}
  ],
  "知": [
    {word:"知る",reading:"しる",english:"know",sentence:"そのことを知っていますか。",sentenceEnglish:"Do you know about that?"},
    {word:"知らせ",reading:"しらせ",english:"news",sentence:"いい知らせがあります。",sentenceEnglish:"I have good news."},
    {word:"知り合い",reading:"しりあい",english:"acquaintance",sentence:"彼は私の知り合いです。",sentenceEnglish:"He is an acquaintance of mine."}
  ],
  "社": [
    {word:"会社",reading:"かいしゃ",english:"company",sentence:"彼女は出版社で働いています。",sentenceEnglish:"She works at a publishing company."},
    {word:"社会",reading:"しゃかい",english:"society",sentence:"社会のルールを守りましょう。",sentenceEnglish:"Let's follow society's rules."},
    {word:"神社",reading:"じんじゃ",english:"shrine",sentence:"お正月に神社に行きます。",sentenceEnglish:"I go to a shrine at New Year's."}
  ],
  "空": [
    {word:"空",reading:"そら",english:"sky",sentence:"今日の空はとても青いです。",sentenceEnglish:"The sky is very blue today."},
    {word:"空港",reading:"くうこう",english:"airport",sentence:"空港までタクシーで行きました。",sentenceEnglish:"I went to the airport by taxi."},
    {word:"空間",reading:"くうかん",english:"space",sentence:"この部屋は空間が広いです。",sentenceEnglish:"This room has a lot of space."}
  ],
  "立": [
    {word:"立つ",reading:"たつ",english:"stand",sentence:"席に立ってください。",sentenceEnglish:"Please stand up."},
    {word:"国立",reading:"こくりつ",english:"national",sentence:"国立公園に行きました。",sentenceEnglish:"I went to a national park."},
    {word:"立派",reading:"りっぱ",english:"splendid",sentence:"彼の作品は立派です。",sentenceEnglish:"His work is splendid."}
  ],
  "終": [
    {word:"終わる",reading:"おわる",english:"end",sentence:"授業は三時に終わります。",sentenceEnglish:"Class ends at 3 o'clock."},
    {word:"終点",reading:"しゅうてん",english:"terminal",sentence:"このバスは終点まで行きますか。",sentenceEnglish:"Does this bus go to the terminal?"},
    {word:"最終",reading:"さいしゅう",english:"last",sentence:"最終電車に間に合いました。",sentenceEnglish:"I made it for the last train."}
  ],
  "習": [
    {word:"習う",reading:"ならう",english:"learn",sentence:"ピアノを習っています。",sentenceEnglish:"I'm learning piano."},
    {word:"練習",reading:"れんしゅう",english:"practice",sentence:"毎日ピアノの練習をしています。",sentenceEnglish:"I practice piano every day."},
    {word:"学習",reading:"がくしゅう",english:"study",sentence:"日本語の学習を続けています。",sentenceEnglish:"I continue studying Japanese."}
  ],
  "考": [
    {word:"考える",reading:"かんがえる",english:"think",sentence:"よく考えてから答えてください。",sentenceEnglish:"Please think carefully before answering."},
    {word:"考え",reading:"かんがえ",english:"idea",sentence:"いい考えがあります。",sentenceEnglish:"I have a good idea."},
    {word:"参考",reading:"さんこう",english:"reference",sentence:"この本を参考にしました。",sentenceEnglish:"I used this book as a reference."}
  ],
  "者": [
    {word:"医者",reading:"いしゃ",english:"doctor",sentence:"医者に見てもらってください。",sentenceEnglish:"Please see a doctor."},
    {word:"作者",reading:"さくしゃ",english:"author",sentence:"この小説の作者はだれですか。",sentenceEnglish:"Who is the author of this novel?"},
    {word:"読者",reading:"どくしゃ",english:"reader",sentence:"読者からの手紙が届きました。",sentenceEnglish:"A letter from a reader arrived."}
  ],
  "自": [
    {word:"自分",reading:"じぶん",english:"oneself",sentence:"自分のことは自分でします。",sentenceEnglish:"I do things for myself."},
    {word:"自由",reading:"じゆう",english:"freedom",sentence:"自由に使っていいですよ。",sentenceEnglish:"Feel free to use it."},
    {word:"自然",reading:"しぜん",english:"nature",sentence:"日本の自然は美しいです。",sentenceEnglish:"Japan's nature is beautiful."}
  ],
  "色": [
    {word:"色",reading:"いろ",english:"color",sentence:"好きな色は何ですか。",sentenceEnglish:"What's your favorite color?"},
    {word:"色々",reading:"いろいろ",english:"various",sentence:"色々な国の料理を食べました。",sentenceEnglish:"I ate food from various countries."},
    {word:"色紙",reading:"いろがみ",english:"colored paper",sentence:"色紙で花を作りました。",sentenceEnglish:"I made flowers with colored paper."}
  ],
  "茶": [
    {word:"お茶",reading:"おちゃ",english:"tea",sentence:"お茶を飲みませんか。",sentenceEnglish:"Would you like some tea?"},
    {word:"茶色",reading:"ちゃいろ",english:"brown",sentence:"この茶色の靴がほしいです。",sentenceEnglish:"I want these brown shoes."},
    {word:"喫茶店",reading:"きっさてん",english:"cafe",sentence:"喫茶店でコーヒーを飲みました。",sentenceEnglish:"I had coffee at a cafe."}
  ],
  "親": [
    {word:"親",reading:"おや",english:"parent",sentence:"親に手紙を書きました。",sentenceEnglish:"I wrote a letter to my parents."},
    {word:"親切",reading:"しんせつ",english:"kind",sentence:"あの店員は親切です。",sentenceEnglish:"That shop assistant is kind."},
    {word:"両親",reading:"りょうしん",english:"parents",sentence:"両親に誕生日プレゼントを送りました。",sentenceEnglish:"I sent my parents a birthday present."}
  ],
  "言": [
    {word:"言う",reading:"いう",english:"say",sentence:"彼は何と言いましたか。",sentenceEnglish:"What did he say?"},
    {word:"言葉",reading:"ことば",english:"word",sentence:"日本語の言葉を覚えています。",sentenceEnglish:"I'm learning Japanese words."},
    {word:"名言",reading:"めいげん",english:"famous saying",sentence:"彼の名言が心に残っています。",sentenceEnglish:"His famous words stay in my heart."}
  ],
  "計": [
    {word:"計画",reading:"けいかく",english:"plan",sentence:"週末の計画を立てましょう。",sentenceEnglish:"Let's make plans for the weekend."},
    {word:"時計",reading:"とけい",english:"clock",sentence:"この時計はとても正確です。",sentenceEnglish:"This clock is very accurate."},
    {word:"計算",reading:"けいさん",english:"calculation",sentence:"計算が合いませんでした。",sentenceEnglish:"The calculation didn't match."}
  ],
  "赤": [
    {word:"赤い",reading:"あかい",english:"red",sentence:"赤い花がきれいに咲いています。",sentenceEnglish:"Red flowers are blooming beautifully."},
    {word:"赤ちゃん",reading:"あかちゃん",english:"baby",sentence:"隣の家に赤ちゃんが生まれました。",sentenceEnglish:"A baby was born at the neighbor's house."},
    {word:"赤字",reading:"あかじ",english:"deficit",sentence:"今月は赤字になってしまいました。",sentenceEnglish:"We ended up in the red this month."}
  ],
  "起": [
    {word:"起きる",reading:"おきる",english:"get up",sentence:"毎朝六時に起きます。",sentenceEnglish:"I wake up at 6 every morning."},
    {word:"起こす",reading:"おこす",english:"wake up",sentence:"妹を七時に起こしました。",sentenceEnglish:"I woke up my sister at 7."},
    {word:"起立",reading:"きりつ",english:"standing up",sentence:"先生が入ったら起立してください。",sentenceEnglish:"Please stand up when the teacher enters."}
  ],
  "足": [
    {word:"足",reading:"あし",english:"foot",sentence:"足が痛いです。",sentenceEnglish:"My foot hurts."},
    {word:"足りる",reading:"たりる",english:"sufficient",sentence:"お金が足りません。",sentenceEnglish:"I don't have enough money."},
    {word:"不足",reading:"ふそく",english:"shortage",sentence:"水が不足しています。",sentenceEnglish:"There's a water shortage."}
  ],
  "身": [
    {word:"身",reading:"み",english:"body",sentence:"身の回りのものを片付けました。",sentenceEnglish:"I organized my belongings."},
    {word:"身長",reading:"しんちょう",english:"height",sentence:"私の身長は百七十センチです。",sentenceEnglish:"My height is 170 centimeters."},
    {word:"出身",reading:"しゅっしん",english:"hometown",sentence:"私の出身は大阪です。",sentenceEnglish:"I'm from Osaka."}
  ],
  "転": [
    {word:"転ぶ",reading:"ころぶ",english:"fall",sentence:"氷で滑って転びました。",sentenceEnglish:"I slipped on ice and fell."},
    {word:"自転車",reading:"じてんしゃ",english:"bicycle",sentence:"自転車で学校に行きます。",sentenceEnglish:"I go to school by bicycle."},
    {word:"転校",reading:"てんこう",english:"school transfer",sentence:"来月転校することになりました。",sentenceEnglish:"I'm transferring schools next month."}
  ],
  "近": [
    {word:"近い",reading:"ちかい",english:"near",sentence:"駅は家から近いです。",sentenceEnglish:"The station is near my house."},
    {word:"近く",reading:"ちかく",english:"nearby",sentence:"近くにスーパーがあります。",sentenceEnglish:"There's a supermarket nearby."},
    {word:"最近",reading:"さいきん",english:"recently",sentence:"最近、日本語の勉強を始めました。",sentenceEnglish:"I recently started studying Japanese."}
  ],
  "通": [
    {word:"通る",reading:"とおる",english:"pass",sentence:"この道を真っ直ぐ通ってください。",sentenceEnglish:"Please go straight through this road."},
    {word:"交通",reading:"こうつう",english:"traffic",sentence:"この時間は交通量が多いです。",sentenceEnglish:"There's heavy traffic at this time."},
    {word:"通勤",reading:"つうきん",english:"commuting",sentence:"通勤に一時間かかります。",sentenceEnglish:"It takes one hour to commute."}
  ],
  "週": [
    {word:"今週",reading:"こんしゅう",english:"this week",sentence:"今週はとても忙しかったです。",sentenceEnglish:"This week was very busy."},
    {word:"毎週",reading:"まいしゅう",english:"every week",sentence:"毎週日曜日にサッカーをします。",sentenceEnglish:"I play soccer every Sunday."},
    {word:"週末",reading:"しゅうまつ",english:"weekend",sentence:"週末に映画を見に行きます。",sentenceEnglish:"I'll go see a movie on the weekend."}
  ],
  "運": [
    {word:"運動",reading:"うんどう",english:"exercise",sentence:"毎日運動するようにしています。",sentenceEnglish:"I try to exercise every day."},
    {word:"運転",reading:"うんてん",english:"driving",sentence:"父は車の運転が上手です。",sentenceEnglish:"My father is good at driving."},
    {word:"運命",reading:"うんめい",english:"fate",sentence:"これは運命の出会いです。",sentenceEnglish:"This is a fateful encounter."}
  ],
  "道": [
    {word:"道",reading:"みち",english:"road",sentence:"この道をまっすぐ行ってください。",sentenceEnglish:"Please go straight down this road."},
    {word:"道路",reading:"どうろ",english:"highway",sentence:"新しい道路ができました。",sentenceEnglish:"A new road was built."},
    {word:"北海道",reading:"ほっかいどう",english:"Hokkaido",sentence:"北海道に旅行に行きたいです。",sentenceEnglish:"I want to travel to Hokkaido."}
  ],
  "重": [
    {word:"重い",reading:"おもい",english:"heavy",sentence:"この荷物はとても重いです。",sentenceEnglish:"This luggage is very heavy."},
    {word:"重要",reading:"じゅうよう",english:"important",sentence:"これは重要な書類です。",sentenceEnglish:"This is an important document."},
    {word:"体重",reading:"たいじゅう",english:"body weight",sentence:"体重が増えました。",sentenceEnglish:"I've gained weight."}
  ],
  "集": [
    {word:"集める",reading:"あつめる",english:"collect",sentence:"切手を集めています。",sentenceEnglish:"I collect stamps."},
    {word:"集まる",reading:"あつまる",english:"gather",sentence:"駅前に人が集まっています。",sentenceEnglish:"People are gathering in front of the station."},
    {word:"集合",reading:"しゅうごう",english:"assembly",sentence:"八時に学校に集合してください。",sentenceEnglish:"Please gather at school at 8 o'clock."}
  ],
  "音": [
    {word:"音",reading:"おと",english:"sound",sentence:"雨の音が聞こえます。",sentenceEnglish:"I can hear the sound of rain."},
    {word:"音楽",reading:"おんがく",english:"music",sentence:"音楽を聞くのが好きです。",sentenceEnglish:"I like listening to music."},
    {word:"発音",reading:"はつおん",english:"pronunciation",sentence:"日本語の発音は難しいです。",sentenceEnglish:"Japanese pronunciation is difficult."}
  ],
  "題": [
    {word:"問題",reading:"もんだい",english:"problem",sentence:"この問題はとても簡単です。",sentenceEnglish:"This problem is very easy."},
    {word:"話題",reading:"わだい",english:"topic",sentence:"今の話題は何ですか。",sentenceEnglish:"What's the current topic?"},
    {word:"題名",reading:"だいめい",english:"title",sentence:"この本の題名を教えてください。",sentenceEnglish:"Please tell me the title of this book."}
  ],
  "風": [
    {word:"風",reading:"かぜ",english:"wind",sentence:"今日は風が強いです。",sentenceEnglish:"The wind is strong today."},
    {word:"風邪",reading:"かぜ",english:"cold",sentence:"風邪をひいたので休みます。",sentenceEnglish:"I caught a cold so I'll rest."},
    {word:"風景",reading:"ふうけい",english:"scenery",sentence:"山の風景がとてもきれいでした。",sentenceEnglish:"The mountain scenery was beautiful."}
  ],
  "飯": [
    {word:"ご飯",reading:"ごはん",english:"rice",sentence:"ご飯を食べましたか。",sentenceEnglish:"Did you eat?"},
    {word:"朝ご飯",reading:"あさごはん",english:"breakfast",sentence:"朝ご飯は何を食べますか。",sentenceEnglish:"What do you eat for breakfast?"},
    {word:"昼ご飯",reading:"ひるごはん",english:"lunch",sentence:"昼ご飯を食べに行きましょう。",sentenceEnglish:"Let's go eat lunch."}
  ],
  "館": [
    {word:"図書館",reading:"としょかん",english:"library",sentence:"図書館で本を借りました。",sentenceEnglish:"I borrowed books from the library."},
    {word:"映画館",reading:"えいがかん",english:"cinema",sentence:"映画館まで歩いて十分です。",sentenceEnglish:"It's a 10-minute walk to the cinema."},
    {word:"旅館",reading:"りょかん",english:"Japanese inn",sentence:"旅館に泊まりました。",sentenceEnglish:"I stayed at a Japanese inn."}
  ],
  "使": [
    {word:"使う",reading:"つかう",english:"use",sentence:"この言葉をよく使います。",sentenceEnglish:"I often use this word."},
    {word:"大使館",reading:"たいしかん",english:"embassy",sentence:"パスポートの更新に大使館へ行きました。",sentenceEnglish:"I went to the embassy to renew my passport."},
    {word:"使用",reading:"しよう",english:"usage",sentence:"エレベーターの使用は控えてください。",sentenceEnglish:"Please refrain from using the elevator."}
  ],
  "兄": [
    {word:"お兄さん",reading:"おにいさん",english:"older brother",sentence:"お兄さんは大学生です。",sentenceEnglish:"My older brother is a university student."},
    {word:"兄弟",reading:"きょうだい",english:"siblings",sentence:"私は兄弟が二人います。",sentenceEnglish:"I have two siblings."},
    {word:"兄",reading:"あに",english:"elder brother",sentence:"兄は医者になりました。",sentenceEnglish:"My elder brother became a doctor."}
  ],
  "多": [
    {word:"多い",reading:"おおい",english:"many",sentence:"この店は人が多いです。",sentenceEnglish:"This store has many people."},
    {word:"多分",reading:"たぶん",english:"probably",sentence:"多分明日は雨でしょう。",sentenceEnglish:"Probably it will rain tomorrow."},
    {word:"多数",reading:"たすう",english:"majority",sentence:"多数の人が賛成しました。",sentenceEnglish:"The majority of people agreed."}
  ],
  "姉": [
    {word:"お姉さん",reading:"おねえさん",english:"older sister",sentence:"お姉さんは先生です。",sentenceEnglish:"My older sister is a teacher."},
    {word:"姉",reading:"あね",english:"elder sister",sentence:"姉が料理を作ってくれました。",sentenceEnglish:"My elder sister cooked for me."},
    {word:"姉妹",reading:"しまい",english:"sisters",sentence:"彼女は姉妹が三人います。",sentenceEnglish:"She has three sisters."}
  ],
  "始": [
    {word:"始める",reading:"はじめる",english:"begin",sentence:"日本語の勉強を始めました。",sentenceEnglish:"I started studying Japanese."},
    {word:"始まる",reading:"はじまる",english:"start",sentence:"授業は九時に始まります。",sentenceEnglish:"Class starts at 9 o'clock."},
    {word:"始発",reading:"しはつ",english:"first train",sentence:"始発電車は五時に出ます。",sentenceEnglish:"The first train departs at 5 o'clock."}
  ],
  "帰": [
    {word:"帰る",reading:"かえる",english:"return",sentence:"毎日六時に家に帰ります。",sentenceEnglish:"I return home at 6 every day."},
    {word:"帰国",reading:"きこく",english:"return to country",sentence:"来月日本に帰国します。",sentenceEnglish:"I'll return to Japan next month."},
    {word:"持ち帰り",reading:"もちかえり",english:"takeout",sentence:"この料理は持ち帰りできますか。",sentenceEnglish:"Can I get this dish to go?"}
  ],
  "店": [
    {word:"店",reading:"みせ",english:"shop",sentence:"この店のケーキはおいしいです。",sentenceEnglish:"This shop's cake is delicious."},
    {word:"喫茶店",reading:"きっさてん",english:"cafe",sentence:"喫茶店で待ち合わせました。",sentenceEnglish:"I arranged to meet at a cafe."},
    {word:"店員",reading:"てんいん",english:"clerk",sentence:"店員に値段を聞きました。",sentenceEnglish:"I asked the clerk the price."}
  ],
  "朝": [
    {word:"朝",reading:"あさ",english:"morning",sentence:"朝早く起きるのは苦手です。",sentenceEnglish:"I'm not good at waking up early."},
    {word:"毎朝",reading:"まいあさ",english:"every morning",sentence:"毎朝ジョギングをしています。",sentenceEnglish:"I go jogging every morning."},
    {word:"今朝",reading:"けさ",english:"this morning",sentence:"今朝は何時に起きましたか。",sentenceEnglish:"What time did you wake up this morning?"}
  ],
  "歌": [
    {word:"歌",reading:"うた",english:"song",sentence:"この歌を知っていますか。",sentenceEnglish:"Do you know this song?"},
    {word:"歌手",reading:"かしゅ",english:"singer",sentence:"彼女は有名な歌手です。",sentenceEnglish:"She is a famous singer."},
    {word:"歌う",reading:"うたう",english:"sing",sentence:"カラオケで歌うのが好きです。",sentenceEnglish:"I like singing at karaoke."}
  ],
  "歩": [
    {word:"歩く",reading:"あるく",english:"walk",sentence:"毎日学校まで歩いています。",sentenceEnglish:"I walk to school every day."},
    {word:"散歩",reading:"さんぽ",english:"stroll",sentence:"公園を散歩しました。",sentenceEnglish:"I took a walk in the park."},
    {word:"歩道",reading:"ほどう",english:"sidewalk",sentence:"歩道を歩いてください。",sentenceEnglish:"Please walk on the sidewalk."}
  ],
  "死": [
    {word:"死ぬ",reading:"しぬ",english:"die",sentence:"いつか誰でも死にます。",sentenceEnglish:"Everyone dies someday."},
    {word:"事故死",reading:"じこし",english:"accidental death",sentence:"事故死の知らせを聞きました。",sentenceEnglish:"I heard news of an accidental death."},
    {word:"死者",reading:"ししゃ",english:"victim",sentence:"地震で多くの死者が出ました。",sentenceEnglish:"Many people died in the earthquake."}
  ],
  "海": [
    {word:"海",reading:"うみ",english:"sea",sentence:"夏休みに海に行きました。",sentenceEnglish:"I went to the sea during summer break."},
    {word:"海外",reading:"かいがい",english:"overseas",sentence:"海外旅行に行きたいです。",sentenceEnglish:"I want to travel overseas."},
    {word:"海岸",reading:"かいがん",english:"coast",sentence:"海岸を散歩するのが好きです。",sentenceEnglish:"I like walking along the coast."}
  ],
  "肉": [
    {word:"肉",reading:"にく",english:"meat",sentence:"この肉は柔らかいです。",sentenceEnglish:"This meat is tender."},
    {word:"牛肉",reading:"ぎゅうにく",english:"beef",sentence:"牛肉と野菜を炒めました。",sentenceEnglish:"I stir-fried beef and vegetables."},
    {word:"豚肉",reading:"ぶたにく",english:"pork",sentence:"豚肉の料理が好きです。",sentenceEnglish:"I like pork dishes."}
  ],
  "試": [
    {word:"試験",reading:"しけん",english:"exam",sentence:"明日日本語の試験があります。",sentenceEnglish:"There's a Japanese exam tomorrow."},
    {word:"試合",reading:"しあい",english:"match",sentence:"明日サッカーの試合があります。",sentenceEnglish:"There's a soccer match tomorrow."},
    {word:"試す",reading:"ためす",english:"try",sentence:"新しいレシピを試しました。",sentenceEnglish:"I tried a new recipe."}
  ],
  "質": [
    {word:"質問",reading:"しつもん",english:"question",sentence:"質問があります。",sentenceEnglish:"I have a question."},
    {word:"品質",reading:"ひんしつ",english:"quality",sentence:"この製品の品質は高いです。",sentenceEnglish:"This product has high quality."},
    {word:"質",reading:"しつ",english:"quality",sentence:"量より質が大事です。",sentenceEnglish:"Quality is more important than quantity."}
  ],
  "野": [
    {word:"野菜",reading:"やさい",english:"vegetable",sentence:"野菜を毎日食べています。",sentenceEnglish:"I eat vegetables every day."},
    {word:"野球",reading:"やきゅう",english:"baseball",sentence:"野球の試合を見に行きました。",sentenceEnglish:"I went to see a baseball game."},
    {word:"分野",reading:"ぶんや",english:"field",sentence:"専門の分野は経済学です。",sentenceEnglish:"My specialty field is economics."}
  ],
  "院": [
    {word:"病院",reading:"びょういん",english:"hospital",sentence:"病院に行かなければなりません。",sentenceEnglish:"I have to go to the hospital."},
    {word:"大学院",reading:"だいがくいん",english:"graduate school",sentence:"大学院で研究を続けています。",sentenceEnglish:"I'm continuing research in graduate school."},
    {word:"入院",reading:"にゅういん",english:"hospitalization",sentence:"祖父が入院することになりました。",sentenceEnglish:"My grandfather will be hospitalized."}
  ],
  "仕": [
    {word:"仕事",reading:"しごと",english:"work",sentence:"仕事が終わってから行きます。",sentenceEnglish:"I'll go after work."},
    {word:"仕方",reading:"しかた",english:"way",sentence:"仕方がないですね。",sentenceEnglish:"It can't be helped."},
    {word:"給仕",reading:"きゅうじ",english:"waiter",sentence:"彼はレストランで給仕をしています。",sentenceEnglish:"He works as a waiter in a restaurant."}
  ],
  "借": [
    {word:"借りる",reading:"かりる",english:"borrow",sentence:"図書館で本を借りました。",sentenceEnglish:"I borrowed a book from the library."},
    {word:"借金",reading:"しゃっきん",english:"debt",sentence:"借金を返さなければなりません。",sentenceEnglish:"I have to pay back my debt."},
    {word:"借用",reading:"しゃくよう",english:"borrowing",sentence:"この教室を借用してもいいですか。",sentenceEnglish:"May I borrow this classroom?"}
  ],
  "写": [
    {word:"写真",reading:"しゃしん",english:"photo",sentence:"旅行の写真を見せてください。",sentenceEnglish:"Please show me your travel photos."},
    {word:"写す",reading:"うつす",english:"copy",sentence:"ノートに写しました。",sentenceEnglish:"I copied it into my notebook."},
    {word:"映写",reading:"えいしゃ",english:"projection",sentence:"映写機で映画を見ました。",sentenceEnglish:"I watched a movie with a projector."}
  ],
  "去": [
    {word:"去年",reading:"きょねん",english:"last year",sentence:"去年日本に行きました。",sentenceEnglish:"I went to Japan last year."},
    {word:"過去",reading:"かこ",english:"past",sentence:"過去のことを忘れましょう。",sentenceEnglish:"Let's forget about the past."},
    {word:"消去",reading:"しょうきょ",english:"deletion",sentence:"データを消去しました。",sentenceEnglish:"I deleted the data."}
  ],
  "夕": [
    {word:"夕方",reading:"ゆうがた",english:"evening",sentence:"夕方に雨が降りました。",sentenceEnglish:"It rained in the evening."},
    {word:"夕飯",reading:"ゆうはん",english:"dinner",sentence:"夕飯は何にしますか。",sentenceEnglish:"What should we have for dinner?"},
    {word:"夕日",reading:"ゆうひ",english:"sunset",sentence:"夕日がとてもきれいでした。",sentenceEnglish:"The sunset was very beautiful."}
  ],
  "妹": [
    {word:"妹",reading:"いもうと",english:"younger sister",sentence:"妹は高校生です。",sentenceEnglish:"My younger sister is a high school student."},
    {word:"姉妹",reading:"しまい",english:"sisters",sentence:"私たちは三人姉妹です。",sentenceEnglish:"We are three sisters."},
    {word:"兄妹",reading:"けいまい",english:"brother and sister",sentence:"兄と妹の兄妹です。",sentenceEnglish:"They are an older brother and younger sister."}
  ],
  "室": [
    {word:"教室",reading:"きょうしつ",english:"classroom",sentence:"教室に生徒がいます。",sentenceEnglish:"There are students in the classroom."},
    {word:"会議室",reading:"かいぎしつ",english:"conference room",sentence:"会議室を予約しました。",sentenceEnglish:"I reserved the conference room."},
    {word:"研究室",reading:"けんきゅうしつ",english:"laboratory",sentence:"研究室で実験をしています。",sentenceEnglish:"I'm doing experiments in the lab."}
  ],
  "工": [
    {word:"工場",reading:"こうじょう",english:"factory",sentence:"工場で車を作っています。",sentenceEnglish:"Cars are made in the factory."},
    {word:"工事",reading:"こうじ",english:"construction",sentence:"駅の工事が来月終わります。",sentenceEnglish:"Station construction ends next month."},
    {word:"工作",reading:"こうさく",english:"craft",sentence:"工作の時間が一番好きです。",sentenceEnglish:"I like craft time the most."}
  ],
  "弟": [
    {word:"弟",reading:"おとうと",english:"younger brother",sentence:"弟はサッカーをしています。",sentenceEnglish:"My younger brother plays soccer."},
    {word:"兄弟",reading:"きょうだい",english:"siblings",sentence:"私は弟が一人います。",sentenceEnglish:"I have one younger brother."},
    {word:"弟子",reading:"でし",english:"disciple",sentence:"彼は先生の弟子です。",sentenceEnglish:"He is the teacher's disciple."}
  ],
  "待": [
    {word:"待つ",reading:"まつ",english:"wait",sentence:"駅で友達を待ちました。",sentenceEnglish:"I waited for my friend at the station."},
    {word:"待合室",reading:"まちあいしつ",english:"waiting room",sentence:"病院の待合室で待っていました。",sentenceEnglish:"I was waiting in the hospital waiting room."},
    {word:"期待",reading:"きたい",english:"expectation",sentence:"期待していいですか。",sentenceEnglish:"Can I expect that?"}
  ],
  "旅": [
    {word:"旅行",reading:"りょこう",english:"travel",sentence:"京都に旅行に行きました。",sentenceEnglish:"I traveled to Kyoto."},
    {word:"旅館",reading:"りょかん",english:"Japanese inn",sentence:"旅館に泊まって温泉に入りました。",sentenceEnglish:"I stayed at a ryokan and went to a hot spring."},
    {word:"旅",reading:"たび",english:"journey",sentence:"長い旅に出ます。",sentenceEnglish:"I'm going on a long journey."}
  ],
  "洋": [
    {word:"洋服",reading:"ようふく",english:"Western clothes",sentence:"洋服を買いに行きましょう。",sentenceEnglish:"Let's go buy clothes."},
    {word:"洋室",reading:"ようしつ",english:"Western-style room",sentence:"ホテルの洋室に泊まりました。",sentenceEnglish:"I stayed in a Western-style hotel room."},
    {word:"大洋",reading:"たいよう",english:"ocean",sentence:"太平洋はとても広いです。",sentenceEnglish:"The Pacific Ocean is very vast."}
  ],
  "牛": [
    {word:"牛",reading:"うし",english:"cow",sentence:"北海道で牛を見ました。",sentenceEnglish:"I saw cows in Hokkaido."},
    {word:"牛肉",reading:"ぎゅうにく",english:"beef",sentence:"牛肉のステーキが食べたいです。",sentenceEnglish:"I want to eat beef steak."},
    {word:"牛乳",reading:"ぎゅうにゅう",english:"milk",sentence:"毎朝牛乳を飲みます。",sentenceEnglish:"I drink milk every morning."}
  ],
  "答": [
    {word:"答える",reading:"こたえる",english:"answer",sentence:"質問に答えてください。",sentenceEnglish:"Please answer the question."},
    {word:"答え",reading:"こたえ",english:"answer",sentence:"答えは簡単です。",sentenceEnglish:"The answer is simple."},
    {word:"回答",reading:"かいとう",english:"reply",sentence:"アンケートに回答しました。",sentenceEnglish:"I responded to the survey."}
  ],
  "花": [
    {word:"花",reading:"はな",english:"flower",sentence:"庭に花を植えました。",sentenceEnglish:"I planted flowers in the garden."},
    {word:"花見",reading:"はなみ",english:"cherry blossom viewing",sentence:"春に友達と花見に行きます。",sentenceEnglish:"I'll go cherry blossom viewing with friends in spring."},
    {word:"花瓶",reading:"かびん",english:"vase",sentence:"花瓶に花を生けました。",sentenceEnglish:"I arranged flowers in a vase."}
  ],
  "送": [
    {word:"送る",reading:"おくる",english:"send",sentence:"友達にメールを送りました。",sentenceEnglish:"I sent an email to a friend."},
    {word:"放送",reading:"ほうそう",english:"broadcast",sentence:"ニュースを放送しています。",sentenceEnglish:"The news is being broadcast."},
    {word:"配送",reading:"はいそう",english:"delivery",sentence:"商品を配送しました。",sentenceEnglish:"I shipped the product."}
  ],
  "開": [
    {word:"開く",reading:"あく",english:"open",sentence:"ドアが開きました。",sentenceEnglish:"The door opened."},
    {word:"開ける",reading:"あける",english:"open",sentence:"窓を開けてもいいですか。",sentenceEnglish:"May I open the window?"},
    {word:"開始",reading:"かいし",english:"start",sentence:"試合の開始は十時です。",sentenceEnglish:"The match starts at 10 o'clock."}
  ],
  "青": [
    {word:"青い",reading:"あおい",english:"blue",sentence:"空が青いですね。",sentenceEnglish:"The sky is blue, isn't it?"},
    {word:"青信号",reading:"あおしんごう",english:"green light",sentence:"青信号になったら渡ってください。",sentenceEnglish:"Please cross when the light turns green."},
    {word:"青空",reading:"あおぞら",english:"blue sky",sentence:"今日は青空がきれいです。",sentenceEnglish:"The blue sky is beautiful today."}
  ],
  "験": [
    {word:"試験",reading:"しけん",english:"exam",sentence:"試験の結果がとても良かったです。",sentenceEnglish:"I got very good exam results."},
    {word:"経験",reading:"けいけん",english:"experience",sentence:"貴重な経験をしました。",sentenceEnglish:"I had a valuable experience."},
    {word:"体験",reading:"たいけん",english:"hands-on experience",sentence:"子どもに自然を体験させたいです。",sentenceEnglish:"I want to let children experience nature."}
  ],
  "黒": [
    {word:"黒い",reading:"くろい",english:"black",sentence:"黒い猫が道を横切りました。",sentenceEnglish:"A black cat crossed the road."},
    {word:"黒板",reading:"こくばん",english:"blackboard",sentence:"先生が黒板に字を書きました。",sentenceEnglish:"The teacher wrote on the blackboard."},
    {word:"黒色",reading:"こくしょく",english:"black color",sentence:"黒色の車がほしいです。",sentenceEnglish:"I want a black car."}
  ],
  "元": [
    {word:"元気",reading:"げんき",english:"healthy",sentence:"お元気ですか。",sentenceEnglish:"How are you?"},
    {word:"元々",reading:"もともと",english:"originally",sentence:"元々この町に住んでいました。",sentenceEnglish:"I originally lived in this town."},
    {word:"元",reading:"もと",english:"origin",sentence:"元の場所に戻してください。",sentenceEnglish:"Please return it to its original place."}
  ],
  "勉": [
    {word:"勉強",reading:"べんきょう",english:"study",sentence:"日本語の勉強を続けます。",sentenceEnglish:"I'll continue studying Japanese."},
    {word:"勉学",reading:"べんがく",english:"learning",sentence:"勉学に励んでいます。",sentenceEnglish:"I'm working hard at my studies."},
    {word:"勤勉",reading:"きんべん",english:"diligent",sentence:"彼は勤勉な学生です。",sentenceEnglish:"He is a diligent student."}
  ],
  "古": [
    {word:"古い",reading:"ふるい",english:"old",sentence:"この古い時計は曽祖母のものです。",sentenceEnglish:"This old clock belonged to my great-grandmother."},
    {word:"中古",reading:"ちゅうこ",english:"secondhand",sentence:"中古の車を買いました。",sentenceEnglish:"I bought a used car."},
    {word:"古本",reading:"ふるほん",english:"used book",sentence:"古本屋で本を買いました。",sentenceEnglish:"I bought a book at a used bookstore."}
  ],
  "堂": [
    {word:"食堂",reading:"しょくどう",english:"dining hall",sentence:"大学の食堂で昼ご飯を食べました。",sentenceEnglish:"I had lunch at the university cafeteria."},
    {word:"堂々",reading:"どうどう",english:"magnificent",sentence:"彼は堂々としていました。",sentenceEnglish:"He looked magnificent."},
    {word:"会堂",reading:"かいどう",english:"hall",sentence:"市民会堂でコンサートがあります。",sentenceEnglish:"There's a concert at the civic hall."}
  ],
  "田": [
    {word:"田んぼ",reading:"たんぼ",english:"rice field",sentence:"田んぼで稲が育っています。",sentenceEnglish:"Rice is growing in the fields."},
    {word:"田中",reading:"たなか",english:"Tanaka",sentence:"田中さんは私の隣の席です。",sentenceEnglish:"Mr. Tanaka sits next to me."},
    {word:"水田",reading:"すいでん",english:"paddy field",sentence:"水田が広がっています。",sentenceEnglish:"Paddy fields stretch out."}
  ],
  "町": [
    {word:"町",reading:"まち",english:"town",sentence:"私の町は静かです。",sentenceEnglish:"My town is quiet."},
    {word:"町内",reading:"ちょうない",english:"neighborhood",sentence:"町内の清掃があります。",sentenceEnglish:"There's a neighborhood cleanup."},
    {word:"下町",reading:"したまち",english:"downtown",sentence:"東京の下町を散歩しました。",sentenceEnglish:"I walked through downtown Tokyo."}
  ],
  "界": [
    {word:"世界",reading:"せかい",english:"world",sentence:"世界で一番高い山はエベレストです。",sentenceEnglish:"The tallest mountain in the world is Everest."},
    {word:"限界",reading:"げんかい",english:"limit",sentence:"体力の限界を感じました。",sentenceEnglish:"I felt my physical limit."},
    {word:"業界",reading:"ぎょうかい",english:"industry",sentence:"IT業界で働いています。",sentenceEnglish:"I work in the IT industry."}
  ],
  "病": [
    {word:"病気",reading:"びょうき",english:"illness",sentence:"病気で学校を休みました。",sentenceEnglish:"I missed school due to illness."},
    {word:"病院",reading:"びょういん",english:"hospital",sentence:"病院に見舞いに行きました。",sentenceEnglish:"I went to visit someone at the hospital."},
    {word:"看病",reading:"かんびょう",english:"nursing",sentence:"母が私を看病してくれました。",sentenceEnglish:"My mother nursed me."}
  ],
  "的": [
    {word:"目的",reading:"もくてき",english:"purpose",sentence:"旅行の目的は何ですか。",sentenceEnglish:"What's the purpose of your trip?"},
    {word:"的確",reading:"てきかく",english:"accurate",sentence:"的確な答えをください。",sentenceEnglish:"Please give an accurate answer."},
    {word:"的",reading:"まと",english:"target",sentence:"的に当たりました。",sentenceEnglish:"I hit the target."}
  ],
  "研": [
    {word:"研究",reading:"けんきゅう",english:"research",sentence:"研究結果を発表しました。",sentenceEnglish:"I presented the research results."},
    {word:"研修",reading:"けんしゅう",english:"training",sentence:"新しい社員の研修をしています。",sentenceEnglish:"I'm training new employees."},
    {word:"研究室",reading:"けんきゅうしつ",english:"laboratory",sentence:"研究室でデータを分析しました。",sentenceEnglish:"I analyzed data in the lab."}
  ],
  "私": [
    {word:"私",reading:"わたし",english:"I",sentence:"私は学生です。",sentenceEnglish:"I am a student."},
    {word:"私立",reading:"しりつ",english:"private",sentence:"私立の学校に通っています。",sentenceEnglish:"I go to a private school."},
    {word:"私用",reading:"しよう",english:"personal use",sentence:"これは私用のパソコンです。",sentenceEnglish:"This is my personal computer."}
  ],
  "究": [
    {word:"研究",reading:"けんきゅう",english:"research",sentence:"私は日本語を研究しています。",sentenceEnglish:"I research Japanese language."},
    {word:"探究",reading:"たんきゅう",english:"exploration",sentence:"真理の探究は続きます。",sentenceEnglish:"The pursuit of truth continues."},
    {word:"究極",reading:"きゅうきょく",english:"ultimate",sentence:"これが究極のラーメンです。",sentenceEnglish:"This is the ultimate ramen."}
  ],
  "紙": [
    {word:"紙",reading:"かみ",english:"paper",sentence:"紙に絵を描きました。",sentenceEnglish:"I drew a picture on paper."},
    {word:"用紙",reading:"ようし",english:"form",sentence:"申込用紙に記入してください。",sentenceEnglish:"Please fill out the application form."},
    {word:"折り紙",reading:"おりがみ",english:"origami",sentence:"折り紙で鶴を折りました。",sentenceEnglish:"I folded an origami crane."}
  ],
  "買": [
    {word:"買う",reading:"かう",english:"buy",sentence:"スーパーで野菜を買いました。",sentenceEnglish:"I bought vegetables at the supermarket."},
    {word:"買い物",reading:"かいもの",english:"shopping",sentence:"母と買い物に行きました。",sentenceEnglish:"I went shopping with my mother."},
    {word:"購買",reading:"こうばい",english:"purchase",sentence:"新しい車を購買しました。",sentenceEnglish:"I purchased a new car."}
  ],
  "貸": [
    {word:"貸す",reading:"かす",english:"lend",sentence:"友達に本を貸しました。",sentenceEnglish:"I lent a book to my friend."},
    {word:"貸し出し",reading:"かしだし",english:"lending",sentence:"図書館の貸し出しは無料です。",sentenceEnglish:"Library lending is free."},
    {word:"賃貸",reading:"ちんたい",english:"rental",sentence:"賃貸アパートを探しています。",sentenceEnglish:"I'm looking for a rental apartment."}
  ],
  "銀": [
    {word:"銀行",reading:"ぎんこう",english:"bank",sentence:"銀行でお金を下ろしました。",sentenceEnglish:"I withdrew money at the bank."},
    {word:"銀",reading:"ぎん",english:"silver",sentence:"銀の指輪をもらいました。",sentenceEnglish:"I received a silver ring."},
    {word:"銀色",reading:"ぎんいろ",english:"silver color",sentence:"銀色の車がかっこいいです。",sentenceEnglish:"The silver car looks cool."}
  ],
  "飲": [
    {word:"飲む",reading:"のむ",english:"drink",sentence:"毎朝コーヒーを飲みます。",sentenceEnglish:"I drink coffee every morning."},
    {word:"飲み物",reading:"のみもの",english:"beverage",sentence:"冷たい飲み物がほしいです。",sentenceEnglish:"I want a cold drink."},
    {word:"飲食",reading:"いんしょく",english:"eating and drinking",sentence:"電車の中での飲食は禁止です。",sentenceEnglish:"Eating and drinking are prohibited on the train."}
  ],
  "鳥": [
    {word:"鳥",reading:"とり",english:"bird",sentence:"鳥が空を飛んでいます。",sentenceEnglish:"Birds are flying in the sky."},
    {word:"小鳥",reading:"ことり",english:"small bird",sentence:"庭に小鳥が来ます。",sentenceEnglish:"Small birds come to the garden."},
    {word:"鳥肉",reading:"とりにく",english:"chicken meat",sentence:"鳥肉の照り焼きが好きです。",sentenceEnglish:"I like chicken teriyaki."}
  ],
  "京": [
    {word:"京都",reading:"きょうと",english:"Kyoto",sentence:"京都には古いお寺がたくさんあります。",sentenceEnglish:"There are many old temples in Kyoto."},
    {word:"東京",reading:"とうきょう",english:"Tokyo",sentence:"東京には人がたくさんいます。",sentenceEnglish:"There are many people in Tokyo."},
    {word:"北京",reading:"ぺきん",english:"Beijing",sentence:"北京は中国の首都です。",sentenceEnglish:"Beijing is the capital of China."}
  ],
  "冬": [
    {word:"冬",reading:"ふゆ",english:"winter",sentence:"冬は雪が降ります。",sentenceEnglish:"It snows in winter."},
    {word:"冬季",reading:"とうき",english:"winter season",sentence:"冬季は暖房が必要です。",sentenceEnglish:"Heating is necessary in winter."},
    {word:"冬休み",reading:"ふゆやすみ",english:"winter break",sentence:"冬休みにスキーに行きます。",sentenceEnglish:"I'll go skiing during winter break."}
  ],
  "夏": [
    {word:"夏",reading:"なつ",english:"summer",sentence:"夏はとても暑いです。",sentenceEnglish:"Summer is very hot."},
    {word:"夏休み",reading:"なつやすみ",english:"summer break",sentence:"夏休みに海に行きました。",sentenceEnglish:"I went to the beach during summer break."},
    {word:"夏季",reading:"かき",english:"summer season",sentence:"夏季は冷房が欠かせません。",sentenceEnglish:"Air conditioning is essential in summer."}
  ],
  "族": [
    {word:"家族",reading:"かぞく",english:"family",sentence:"私の家族は四人家族です。",sentenceEnglish:"My family has four people."},
    {word:"民族",reading:"みんぞく",english:"ethnic group",sentence:"いろいろな民族の音楽が好きです。",sentenceEnglish:"I like music from various ethnic groups."},
    {word:"水族館",reading:"すいぞくかん",english:"aquarium",sentence:"水族館でイルカのショーを見ました。",sentenceEnglish:"I saw a dolphin show at the aquarium."}
  ],
  "早": [
    {word:"早い",reading:"はやい",english:"early",sentence:"今日は早く起きました。",sentenceEnglish:"I woke up early today."},
    {word:"早朝",reading:"そうちょう",english:"early morning",sentence:"早朝に散歩をします。",sentenceEnglish:"I take walks early in the morning."},
    {word:"早退",reading:"そうたい",english:"leave early",sentence:"体調が悪いので早退します。",sentenceEnglish:"I'll leave early because I feel sick."}
  ],
  "春": [
    {word:"春",reading:"はる",english:"spring",sentence:"春になると花が咲きます。",sentenceEnglish:"Flowers bloom in spring."},
    {word:"春休み",reading:"はるやすみ",english:"spring break",sentence:"春休みに京都へ行きました。",sentenceEnglish:"I went to Kyoto during spring break."},
    {word:"春季",reading:"しゅんき",english:"spring season",sentence:"春季は天気が不安定です。",sentenceEnglish:"Spring weather is unstable."}
  ],
  "漢": [
    {word:"漢字",reading:"かんじ",english:"kanji",sentence:"漢字を書く練習をしています。",sentenceEnglish:"I'm practicing writing kanji."},
    {word:"漢方",reading:"かんぽう",english:"Chinese medicine",sentence:"漢方を飲んでいます。",sentenceEnglish:"I'm taking Chinese herbal medicine."},
    {word:"漢文",reading:"かんぶん",english:"classical Chinese",sentence:"学校で漢文を習いました。",sentenceEnglish:"I studied classical Chinese at school."}
  ],
  "犬": [
    {word:"犬",reading:"いぬ",english:"dog",sentence:"私は犬を飼っています。",sentenceEnglish:"I have a dog."},
    {word:"大型犬",reading:"おおがたけん",english:"large dog",sentence:"大型犬の散歩は大変です。",sentenceEnglish:"Walking a large dog is hard work."},
    {word:"子犬",reading:"こいぬ",english:"puppy",sentence:"子犬がとてもかわいいです。",sentenceEnglish:"The puppy is very cute."}
  ],
  "秋": [
    {word:"秋",reading:"あき",english:"autumn",sentence:"秋は読書にいい季節です。",sentenceEnglish:"Autumn is a good season for reading."},
    {word:"秋季",reading:"しゅうき",english:"fall season",sentence:"秋季はスポーツの季節です。",sentenceEnglish:"Fall is the season for sports."},
    {word:"秋休み",reading:"あきやすみ",english:"fall break",sentence:"秋休みに旅行に行きます。",sentenceEnglish:"I'll travel during fall break."}
  ],
  "英": [
    {word:"英語",reading:"えいご",english:"English",sentence:"英語を勉強しています。",sentenceEnglish:"I'm studying English."},
    {word:"英会話",reading:"えいかいわ",english:"English conversation",sentence:"英会話教室に通っています。",sentenceEnglish:"I attend an English conversation class."},
    {word:"英雄",reading:"えいゆう",english:"hero",sentence:"彼は私の英雄です。",sentenceEnglish:"He is my hero."}
  ],
  "走": [
    {word:"走る",reading:"はしる",english:"run",sentence:"毎朝公園を走っています。",sentenceEnglish:"I run in the park every morning."},
    {word:"競走",reading:"きょうそう",english:"race",sentence:"競走で一番になりました。",sentenceEnglish:"I came first in the race."},
    {word:"走行",reading:"そうこう",english:"running",sentence:"この車の走行距離は短いです。",sentenceEnglish:"This car has low mileage."}
  ],
  "駅": [
    {word:"駅",reading:"えき",english:"station",sentence:"駅まで歩いて十分です。",sentenceEnglish:"It's a 10-minute walk to the station."},
    {word:"駅前",reading:"えきまえ",english:"in front of station",sentence:"駅前に新しい店ができました。",sentenceEnglish:"A new shop opened in front of the station."},
    {word:"駅員",reading:"えきいん",english:"station staff",sentence:"駅員に道を聞きました。",sentenceEnglish:"I asked the station staff for directions."}
  ],
  "魚": [
    {word:"魚",reading:"さかな",english:"fish",sentence:"魚を釣るのが趣味です。",sentenceEnglish:"Fishing is my hobby."},
    {word:"金魚",reading:"きんぎょ",english:"goldfish",sentence:"金魚を飼っています。",sentenceEnglish:"I keep goldfish."},
    {word:"魚屋",reading:"さかなや",english:"fish shop",sentence:"魚屋で新鮮な魚を買いました。",sentenceEnglish:"I bought fresh fish at the fish shop."}
  ],
  "兼": [
    {word:"兼ねる",reading:"かねる",english:"combine",sentence:"仕事と勉強を兼ねています。",sentenceEnglish:"It combines work and study."},
    {word:"兼用",reading:"けんよう",english:"dual use",sentence:"この道具は兼用できます。",sentenceEnglish:"This tool can be used for two purposes."},
    {word:"兼任",reading:"けんにん",english:"concurrent post",sentence:"彼は二つの仕事を兼任しています。",sentenceEnglish:"He holds two concurrent positions."}
  ]
}

// Build full dataset with examples
const result = kanjiList.map((k, idx) => {
  const id = idx + 80
  const entries = vocabData[k.kanji] || []
  
  let examples
  if (entries.length >= 3) {
    examples = entries.slice(0, 3)
  } else {
    // Fallback - generate basic examples
    examples = [
      {
        word: k.kanji,
        reading: k.kun[0]?.replace(/\..+$/, "") || k.on[0] || "",
        english: k.meanings[0] || "",
        sentence: `「${k.kanji}」という漢字を勉強しました。`,
        sentenceEnglish: `I studied the kanji "${k.kanji}".`
      },
      {
        word: `${k.kanji}字`,
        reading: `${k.on[0] || ""}じ`,
        english: `${k.meanings[0] || ""} character`,
        sentence: `この${k.kanji}字を書けますか。`,
        sentenceEnglish: `Can you write this ${k.meanings[0] || ""} character?`
      },
      {
        word: `${k.kanji}語`,
        reading: `${k.on[0] || ""}ご`,
        english: `${k.meanings[0] || ""} language`,
        sentence: `${k.kanji}語の勉強が楽しいです。`,
        sentenceEnglish: `Studying ${k.meanings[0] || ""} is fun.`
      }
    ]
  }

  return {
    id,
    kanji: k.kanji,
    kun: k.kun.map(r => r.replace(/\./g, "")).filter((r, i, a) => a.indexOf(r) === i).slice(0, 4),
    on: k.on.slice(0, 3),
    meanings: k.meanings,
    strokes: k.strokes,
    examples
  }
})

fs.writeFileSync("src/data/n4.json", JSON.stringify(result, null, 2))
console.log(`Generated n4.json with ${result.length} kanji entries`)

// Verify coverage
let covered = 0
for (const k of kanjiList) {
  if (vocabData[k.kanji]) covered++
}
console.log(`Manual vocab coverage: ${covered}/${kanjiList.length} (${Math.round(covered/kanjiList.length*100)}%)`)
