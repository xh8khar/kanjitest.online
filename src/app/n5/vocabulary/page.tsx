import Link from "next/link"
import { getVocabulary } from "@/lib/kanji"
import type { Metadata } from "next"
import { siteUrl, collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N5 Vocabulary — 219 Words with Readings",
  description:
    "Complete JLPT N5 vocabulary list with readings, meanings, and associated kanji. Browse 219 essential Japanese words for beginners.",
  keywords: kw(["JLPT N5 vocabulary list", "N5 Japanese words", "basic Japanese vocabulary", "N5 word list with readings", "learn N5 vocabulary", "beginner Japanese words"]),
  openGraph: {
    title: "JLPT N5 Vocabulary — 219 Words with Readings",
    description: "Complete JLPT N5 vocabulary list with readings, meanings, and associated kanji.",
    url: siteUrl("/n5/vocabulary"),
  },
  twitter: { title: "JLPT N5 Vocabulary — 219 Words with Readings", description: "Complete JLPT N5 vocabulary with readings, meanings, and kanji." },
  alternates: { canonical: siteUrl("/n5/vocabulary") },
}

export default function N5Vocabulary() {
  const vocab = getVocabulary()
  const sorted = [...vocab].sort((a, b) => a.reading.localeCompare(b.reading, "ja"))
  const items = sorted.map((v) => ({ name: `${v.word} (${v.reading}) — ${v.english}`, url: `/n5/vocabulary/${v.slug}/` }))
  const pageSchema = collectionPageSchema("JLPT N5 Vocabulary — 219 Words with Readings", "Complete JLPT N5 vocabulary list with readings, meanings, and associated kanji.", "/n5/vocabulary")
  const listSchema = itemListSchema(items)

  return (
    <div className="px-4 py-6 sm:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <h1 className="text-lg sm:text-xl font-bold text-ink">Vocabulary</h1>
      <p className="text-xs text-ink/60 mt-1 mb-5 sm:mb-6">{sorted.length} words</p>

      <div className="space-y-1.5 sm:space-y-2">
        {sorted.map((v, i) => (
          <Link
            key={`${v.word}|${v.reading}`}
            href={`/n5/vocabulary/${v.slug}/`}
            className="border border-ink/20 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2.5 sm:py-3 bg-white flex items-center gap-2 sm:gap-4 hover:border-ink/40 transition-all"
          >
            <div className="w-7 h-7 rounded-md bg-ink/10 flex items-center justify-center shrink-0">
              <span className="text-[11px] sm:text-xs font-medium text-ink/60">{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-base sm:text-lg font-bold text-ink leading-none">{v.word}</span>
              <span className="text-[11px] sm:text-xs text-ink/60 ml-1.5 sm:ml-2">({v.english})</span>
              <p className="text-[11px] sm:text-xs text-ink/70 mt-0.5">{v.reading}</p>
            </div>
            <div className="flex gap-0.5 sm:gap-1 shrink-0">
              {v.kanjiIds.map((id, idx) => (
                <div
                  key={id}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-ink/10 text-[10px] sm:text-xs font-bold text-ink/70 flex items-center justify-center"
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
