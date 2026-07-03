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

async function batchFetch(items, fn, batchSize = 5) {
  const map = new Map()
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const res = await Promise.all(batch.map(fn))
    batch.forEach((item, idx) => map.set(item, res[idx]))
  }
  return map
}

const LEVEL = 5 // N5

const kanjiList = await json(`${API}/kanji/jlpt-${LEVEL}`)
console.log(`Found ${kanjiList.length} kanji`)

const details = await batchFetch(kanjiList, (k) => json(`${API}/kanji/${encodeURIComponent(k)}`))
const wordsMap = await batchFetch(kanjiList, async (k) => {
  try { return await json(`${API}/words/${encodeURIComponent(k)}`) }
  catch { return [] }
})

const entries = kanjiList.map((k, i) => {
  const d = details.get(k)
  const words = wordsMap.get(k) || []

  const ex = words
    .filter((w) => w.variants?.[0]?.written && w.variants?.[0]?.pronounced)
    .slice(0, 3)
    .map((w) => ({
      word: w.variants[0].written,
      reading: w.variants[0].pronounced,
      english: w.meanings?.[0]?.glosses?.[0] || "",
    }))

  return {
    id: i + 1,
    kanji: k,
    kun: d.kun_readings || [],
    on: d.on_readings || [],
    meanings: d.meanings || [],
    strokes: d.stroke_count || 0,
    examples: ex.length >= 1 ? ex : [{ word: k, reading: k, english: d.meanings?.[0] || "" }],
  }
})

const out = path.join(__dirname, "..", "src", "data", "n5.json")
fs.writeFileSync(out, JSON.stringify(entries, null, 2))
console.log(`Written ${out} — ${entries.length} entries`)
