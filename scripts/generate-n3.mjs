import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API = "https://kanjiapi.dev/v1"

async function json(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return r.json()
}

async function batchFetch(items, fn, batchSize = 3) {
  const map = new Map()
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const res = await Promise.all(batch.map(fn))
    batch.forEach((item, idx) => map.set(item, res[idx]))
    if (i + batchSize < items.length) await new Promise(r => setTimeout(r, 100))
  }
  return map
}

const templates = [
  (w, e) => ({ sentence: `${w}はどういう意味ですか。`, sentenceEnglish: `What does "${e}" mean?` }),
  (w, e) => ({ sentence: `${w}の使い方を説明してください。`, sentenceEnglish: `Please explain how to use "${e}".` }),
  (w, e) => ({ sentence: `この${w}はとても重要です。`, sentenceEnglish: `This "${e}" is very important.` }),
  (w, e) => ({ sentence: `${w}について勉強しています。`, sentenceEnglish: `I am studying about "${e}".` }),
  (w, e) => ({ sentence: `${w}の例を教えてください。`, sentenceEnglish: `Please tell me an example of "${e}".` }),
  (w, e) => ({ sentence: `昨日${w}を使う機会がありました。`, sentenceEnglish: `I had a chance to use "${e}" yesterday.` }),
  (w, e) => ({ sentence: `${w}という言葉を知っていますか。`, sentenceEnglish: `Do you know the word "${e}"?` }),
  (w, e) => ({ sentence: `${w}の意味を調べました。`, sentenceEnglish: `I looked up the meaning of "${e}".` }),
]

function pickTemplate(word, idx) {
  return templates[Math.abs((word.charCodeAt(0) || 0) + idx) % templates.length]
}

function makeExamples(words, kanji) {
  const valid = words
    .filter((w) => w.variants?.[0]?.written && w.variants?.[0]?.pronounced)
    .slice(0, 3)

  if (valid.length === 0) {
    const meaning = kanji.meanings?.[0] || ""
    return [{
      word: kanji.kanji,
      reading: kanji.on_readings?.[0] || kanji.kanji,
      english: meaning,
      sentence: `${kanji.kanji}という漢字があります。`,
      sentenceEnglish: `There is a kanji "${kanji.kanji}".`,
    }]
  }

  return valid.map((w, i) => {
    const eng = w.meanings?.[0]?.glosses?.[0] || ""
    const { sentence, sentenceEnglish } = pickTemplate(w.variants[0].written, i)(w.variants[0].written, eng)
    return {
      word: w.variants[0].written,
      reading: w.variants[0].pronounced,
      english: eng,
      sentence,
      sentenceEnglish,
    }
  })
}

const LEVEL = 3
const kanjiList = await json(`${API}/kanji/jlpt-${LEVEL}`)
console.log(`Found ${kanjiList.length} N3 kanji`)

const details = await batchFetch(kanjiList, (k) => json(`${API}/kanji/${encodeURIComponent(k)}`))
const wordsMap = await batchFetch(kanjiList, async (k) => {
  try { return await json(`${API}/words/${encodeURIComponent(k)}`) }
  catch { return [] }
})

const entries = kanjiList.map((k, i) => {
  const d = details.get(k)
  const words = wordsMap.get(k) || []
  const ex = makeExamples(words, d || {})

  return {
    id: i + 1,
    kanji: k,
    kun: d?.kun_readings || [],
    on: d?.on_readings || [],
    meanings: d?.meanings || [],
    strokes: d?.stroke_count || 0,
    examples: ex,
  }
})

const out = path.join(__dirname, "..", "src", "data", "n3.json")
fs.writeFileSync(out, JSON.stringify(entries, null, 2))
console.log(`Written ${out} — ${entries.length} entries`)
