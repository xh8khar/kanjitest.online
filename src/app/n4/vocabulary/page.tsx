import Link from "next/link"
import { getVocabulary } from "@/lib/kanji"
import type { Metadata } from "next"
import { collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N4 Vocabulary List — 473 Words | KanjiTest.Online",
  description:
    "Complete JLPT N4 vocabulary list with readings, meanings, and associated kanji. Browse 473 essential Japanese words for intermediate learners.",
  keywords: kw(["JLPT N4 vocabulary list", "N4 Japanese words", "intermediate Japanese vocabulary", "N4 word list with readings", "learn N4 vocabulary"]),
  openGraph: {
    title: "JLPT N4 Vocabulary List — 473 Words",
    description: "Complete JLPT N4 vocabulary list with readings, meanings, and associated kanji.",
    url: "https://kanjitest.online/n4/vocabulary",
  },
  twitter: { title: "JLPT N4 Vocabulary List — 473 Words", description: "Complete JLPT N4 vocabulary with readings, meanings, and kanji." },
  alternates: { canonical: "https://kanjitest.online/n4/vocabulary" },
}

export default function N4Vocabulary() {
  const vocab = getVocabulary("n4")
  const sorted = [...vocab].sort((a, b) => a.reading.localeCompare(b.reading, "ja"))
  const items = sorted.map((v) => ({ name: `${v.word} (${v.reading}) — ${v.english}`, url: `/n4/vocabulary/${v.slug}/` }))
  const pageSchema = collectionPageSchema("JLPT N4 Vocabulary List — 473 Words", "Complete JLPT N4 vocabulary list with readings, meanings, and associated kanji.", "/n4/vocabulary")
  const listSchema = itemListSchema(items)

  return (
    <div className="px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <h1 className="text-xl font-bold text-ink">Vocabulary</h1>
      <p className="text-xs text-ink/60 mt-1 mb-6">{sorted.length} words</p>

      <div className="space-y-2">
        {sorted.map((v, i) => (
          <Link
            key={`${v.word}|${v.reading}`}
            href={`/n4/vocabulary/${encodeURIComponent(v.slug)}/`}
            className="border border-ink/20 rounded-xl px-5 py-3 bg-white flex items-center gap-4 hover:border-ink/40 transition-all"
          >
            <div className="w-7 h-7 rounded-md bg-ink/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-ink/60">{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-lg font-bold text-ink leading-none">{v.word}</span>
              <span className="text-xs text-ink/60 ml-2">({v.english})</span>
              <p className="text-xs text-ink/70 mt-0.5">{v.reading}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              {v.kanjiIds.map((id, idx) => (
                <div
                  key={id}
                  className="w-6 h-6 rounded bg-ink/10 text-xs font-bold text-ink/70 flex items-center justify-center"
                >
                  {v.kanjiChars[idx]}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
