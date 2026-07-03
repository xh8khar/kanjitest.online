import Link from "next/link"
import { getVocabulary } from "@/lib/kanji"
import type { Metadata } from "next"
import { siteUrl, collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N3 Vocabulary — 935 Words with Readings",
  description:
    "Complete JLPT N3 vocabulary list with readings, meanings, and associated kanji. Browse 935 essential Japanese words for intermediate learners.",
  keywords: kw(["JLPT N3 vocabulary list", "N3 Japanese words", "intermediate Japanese vocabulary", "N3 word list with readings", "learn N3 vocabulary"]),
  openGraph: {
    title: "JLPT N3 Vocabulary — 935 Words with Readings",
    description: "Complete JLPT N3 vocabulary list with readings, meanings, and associated kanji.",
    url: siteUrl("/n3/vocabulary"),
  },
  twitter: { title: "JLPT N3 Vocabulary — 935 Words with Readings", description: "Complete JLPT N3 vocabulary with readings, meanings, and kanji." },
  alternates: { canonical: siteUrl("/n3/vocabulary") },
}

export default function N3Vocabulary() {
  const vocab = getVocabulary("n3")
  const sorted = [...vocab].sort((a, b) => a.reading.localeCompare(b.reading, "ja"))
  const items = sorted.map((v) => ({ name: `${v.word} (${v.reading}) — ${v.english}`, url: `/n3/vocabulary/${v.slug}/` }))
  const pageSchema = collectionPageSchema("JLPT N3 Vocabulary — 935 Words with Readings", "Complete JLPT N3 vocabulary list with readings, meanings, and associated kanji.", "/n3/vocabulary")
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
            href={`/n3/vocabulary/${v.slug}/`}
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
