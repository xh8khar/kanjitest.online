import raw from "@/data/radicals.json"
import n5 from "@/data/n5.json"
import n4 from "@/data/n4.json"
import n3 from "@/data/n3.json"
import n2 from "@/data/n2.json"
import n1 from "@/data/n1.json"

export type Radical = (typeof raw)[number]
export const radicals = raw as Radical[]

interface KanjiEntry {
  kanji: string
  kun: string[]
  on: string[]
  meanings: string[]
  examples: { word: string; reading: string; english: string; sentence?: string; sentenceEnglish?: string }[]
}
type KanjiMap = Map<string, KanjiEntry>

const _kanjiLookup: KanjiMap = new Map()
for (const level of [n5, n4, n3, n2, n1] as KanjiEntry[][]) {
  for (const k of level) {
    if (!_kanjiLookup.has(k.kanji)) {
      _kanjiLookup.set(k.kanji, k)
    }
  }
}

export function getKanjiByChar(ch: string): KanjiEntry | undefined {
  return _kanjiLookup.get(ch)
}

export function toSlug(meaning: string, id: number): string {
  const base = meaning.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  const dupe = radicals.filter((r) => {
    const s = r.meaning.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    return s === base
  })
  return dupe.length > 1 ? `${base}-${id}` : base
}

const _slugMap = new Map<string, Radical>()
for (const r of radicals) {
  _slugMap.set(toSlug(r.meaning, r.id), r)
}
export function getBySlug(slug: string): Radical | undefined {
  return _slugMap.get(slug)
}
