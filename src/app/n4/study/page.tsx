import Link from "next/link"
import { getAll } from "@/lib/kanji"
import type { Metadata } from "next"
import { collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Study All JLPT N4 Kanji — Complete List",
  description:
    "Complete list of 171 JLPT N4 kanji with kun/on readings, example words, and daily sentences.",
  keywords: kw(["JLPT N4 study list", "N4 kanji readings and meanings", "learn JLPT N4 kanji", "all N4 kanji with examples"]),
  openGraph: {
    title: "Study All JLPT N4 Kanji — Complete List",
    description: "Complete list of 171 JLPT N4 kanji with readings, examples, and sentences.",
    url: "https://kanjitest.online/n4/study",
  },
  twitter: { title: "Study All JLPT N4 Kanji — Complete List", description: "171 JLPT N4 kanji with readings, examples, and sentences." },
  alternates: { canonical: "https://kanjitest.online/n4/study" },
}

export default function N4StudyList() {
  const all = getAll("n4")
  const items = all.map((k) => ({ name: `${k.kanji} (${k.kun[0]?.replace(/\..+$/, "") || k.on[0]}) — ${k.meanings[0]}`, url: `/n4/study/${k.id}/` }))
  const listSchema = itemListSchema(items)
  const pageSchema = collectionPageSchema("Study All JLPT N4 Kanji — Complete List", "171 JLPT N4 kanji with readings, examples, and sentences.", "/n4/study")

  return (
    <div className="px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <h1 className="text-xl font-bold text-ink">Study</h1>
      <p className="text-xs text-ink/60 mt-1 mb-6">{all.length} kanji</p>

      <div className="space-y-2">
        {all.map((k) => {
          const ex = k.examples[0]
          return (
            <Link
              key={k.id}
              href={`/n4/study/${k.id}/`}
              className="border border-ink/20 rounded-xl px-5 py-3 bg-white flex items-center gap-4 hover:border-ink/40 transition-all"
            >
              <div className="w-7 h-7 rounded-md bg-ink/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-ink/60">{k.id}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-lg font-bold text-ink leading-none">{k.kanji}</span>
                  <span className="text-xs text-ink/70 truncate">
                    {k.kun.map((r) => r.replace(/\..+$/, "")).join("、") || k.on.join("、")}
                  </span>
                </div>
                {ex && (
                  <p className="text-xs text-ink/60 mt-0.5 truncate">
                    {ex.word} &middot; {ex.english}
                  </p>
                )}
              </div>
              <span className="text-ink/40 shrink-0">&rarr;</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
