import Link from "next/link"
import { getAll } from "@/lib/kanji"
import type { Metadata } from "next"
import { siteUrl, collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N3 Kanji — Complete Study List with Readings",
  description:
    "Complete list of 367 JLPT N3 kanji with kun/on readings, example words, and daily sentences. Click any kanji to study.",
  keywords: kw(["JLPT N3 study list", "N3 kanji readings and meanings", "learn JLPT N3 kanji", "all N3 kanji with examples"]),
  openGraph: {
    title: "JLPT N3 Kanji — Complete Study List with Readings",
    description: "Complete list of 367 JLPT N3 kanji with readings, examples, and sentences.",
    url: siteUrl("/n3/study"),
  },
  twitter: { title: "JLPT N3 Kanji — Complete Study List with Readings", description: "367 JLPT N3 kanji with readings, examples, and sentences." },
  alternates: { canonical: siteUrl("/n3/study") },
}

export default function N3StudyList() {
  const all = getAll("n3")
  const items = all.map((k) => ({ name: `${k.kanji} (${k.kun[0]?.replace(/\..+$/, "") || k.on[0]}) — ${k.meanings[0]}`, url: `/n3/study/${k.kanji}/` }))
  const listSchema = itemListSchema(items)
  const pageSchema = collectionPageSchema("JLPT N3 Kanji — Complete Study List with Readings", "367 JLPT N3 kanji with readings, examples, and sentences.", "/n3/study")

  return (
    <div className="px-4 py-6 sm:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <h1 className="text-lg sm:text-xl font-bold text-ink">Study</h1>
      <p className="text-xs text-ink/60 mt-1 mb-5 sm:mb-6">{all.length} kanji</p>

      <div className="space-y-1.5 sm:space-y-2">
        {all.map((k) => {
          const ex = k.examples[0]
          return (
            <Link
              key={k.id}
              href={`/n3/study/${k.kanji}/`}
              className="border border-ink/20 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2.5 sm:py-3 bg-white flex items-center gap-2 sm:gap-4 hover:border-ink/40 transition-all"
            >
              <div className="w-7 h-7 rounded-md bg-ink/10 flex items-center justify-center shrink-0">
                <span className="text-[11px] sm:text-xs font-medium text-ink/60">{k.id}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg font-bold text-ink leading-none">{k.kanji}</span>
                  <span className="text-[11px] sm:text-xs text-ink/70 truncate">
                    {k.kun.map((r) => r.replace(/\..+$/, "")).join("、") || k.on.join("、")}
                  </span>
                </div>
                {ex && (
                  <p className="text-[11px] sm:text-xs text-ink/60 mt-0.5 truncate">
                    {ex.word} &middot; {ex.english}
                  </p>
                )}
              </div>
              <span className="text-ink/30 shrink-0 text-sm">&rarr;</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
