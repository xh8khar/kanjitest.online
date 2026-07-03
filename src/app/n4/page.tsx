import Link from "next/link"
import { getAll } from "@/lib/kanji"
import type { Metadata } from "next"
import { siteUrl, collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N4 Kanji — All 171 Characters",
  description:
    "Browse all 171 JLPT N4 kanji with kun/on readings, example words, and daily-life sentences. Study, flashcard, and test yourself.",
  keywords: kw(["JLPT N4 kanji list", "all JLPT N4 kanji", "N4 kanji chart", "complete N4 kanji list", "learn all N4 kanji"]),
  openGraph: {
    title: "JLPT N4 Kanji — All 171 Characters",
    description: "Browse all 171 JLPT N4 kanji with readings, examples, and sentences.",
    url: siteUrl("/n4"),
  },
  twitter: { title: "JLPT N4 Kanji — All 171 Characters", description: "Complete list of 171 JLPT N4 kanji with readings and examples." },
  alternates: { canonical: siteUrl("/n4") },
}

export default function N4Hub() {
  const all = getAll("n4")
  const items = all.map((k) => ({ name: `${k.kanji} — ${k.meanings[0]}`, url: `/n4/study/${k.kanji}/` }))
  const pageSchema = collectionPageSchema("JLPT N4 Kanji Hub — All 171 Characters", "Browse all 171 JLPT N4 kanji with readings and examples.", "/n4")
  const listSchema = itemListSchema(items)

  return (
    <div className="px-4 py-6 sm:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <h1 className="text-lg sm:text-xl font-bold text-ink">All 171 Kanji</h1>
      <p className="text-xs sm:text-sm text-ink/60 mt-1 mb-6 sm:mb-8">JLPT N4 — intermediate Japanese characters</p>

      <div className="flex gap-1.5 sm:grid sm:grid-cols-3 md:grid-cols-4 overflow-x-auto pb-1 sm:pb-0 sm:gap-3 mb-6 sm:mb-10 scrollbar-none">
        <Link
          href="/n4/study/"
          className="shrink-0 sm:shrink border border-ink/20 rounded-xl px-3 sm:px-5 py-2.5 sm:py-5 bg-white hover:border-ink/40 transition-all sm:text-center flex sm:block items-center gap-2"
        >
          <span className="text-base sm:text-xl">📖</span>
          <p className="font-medium text-xs sm:text-sm text-ink sm:mt-2">Study</p>
          <p className="hidden sm:block text-xs text-ink/70 mt-0.5">171 characters</p>
        </Link>
        <Link
          href="/n4/flashcards/"
          className="shrink-0 sm:shrink border border-ink/20 rounded-xl px-3 sm:px-5 py-2.5 sm:py-5 bg-white hover:border-ink/40 transition-all sm:text-center flex sm:block items-center gap-2"
        >
          <span className="text-base sm:text-xl">🃏</span>
          <p className="font-medium text-xs sm:text-sm text-ink sm:mt-2">Flashcards</p>
          <p className="hidden sm:block text-xs text-ink/70 mt-0.5">Flip & memorize</p>
        </Link>
        <Link
          href="/n4/vocabulary/"
          className="shrink-0 sm:shrink border border-ink/20 rounded-xl px-3 sm:px-5 py-2.5 sm:py-5 bg-white hover:border-ink/40 transition-all sm:text-center flex sm:block items-center gap-2"
        >
          <span className="text-base sm:text-xl">📝</span>
          <p className="font-medium text-xs sm:text-sm text-ink sm:mt-2">Vocabulary</p>
          <p className="hidden sm:block text-xs text-ink/70 mt-0.5">473 words</p>
        </Link>
        <Link
          href="/n4/sets/"
          className="shrink-0 sm:shrink border border-ink/20 rounded-xl px-3 sm:px-5 py-2.5 sm:py-5 bg-white hover:border-ink/40 transition-all sm:text-center flex sm:block items-center gap-2"
        >
          <span className="text-base sm:text-xl">✍️</span>
          <p className="font-medium text-xs sm:text-sm text-ink sm:mt-2">Tests</p>
          <p className="hidden sm:block text-xs text-ink/70 mt-0.5">20 sets</p>
        </Link>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2">
        {all.map((k) => (
          <Link
            key={k.id}
            href={`/n4/study/${k.kanji}/`}
            className="border border-ink/20 rounded-lg p-2 sm:p-3 text-center hover:border-ink/40 transition-all bg-white"
          >
            <div className="text-base sm:text-lg font-bold text-ink leading-none">{k.kanji}</div>
            <div className="text-[10px] text-ink/60 mt-0.5 leading-tight">
              {k.kun[0]?.replace(/\..+$/, "") || k.on[0]}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
