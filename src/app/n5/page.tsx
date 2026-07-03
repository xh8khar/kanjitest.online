import Link from "next/link"
import { getAll } from "@/lib/kanji"
import type { Metadata } from "next"
import { collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N5 Kanji Hub — All 79 Characters",
  description:
    "Browse all 79 JLPT N5 kanji by number. Study each character with kun/on readings, example words, and daily-life sentences. Start learning Japanese today.",
  keywords: kw(["JLPT N5 kanji list", "all JLPT N5 kanji", "N5 kanji chart", "complete N5 kanji list", "JLPT N5 kanji with readings", "learn all N5 kanji", "beginner Japanese kanji list"]),
  openGraph: {
    title: "JLPT N5 Kanji Hub — All 79 Characters",
    description: "Browse all 79 JLPT N5 kanji with readings, examples, and sentences.",
    url: "https://www.kanjitest.online/n5",
  },
  twitter: { title: "JLPT N5 Kanji Hub — All 79 Characters", description: "Complete list of 79 JLPT N5 kanji with readings and examples." },
  alternates: { canonical: "https://www.kanjitest.online/n5" },
}

export default function N5Hub() {
  const all = getAll()
  const items = all.map((k) => ({ name: `${k.kanji} — ${k.meanings[0]}`, url: `/n5/study/${k.id}/` }))
  const pageSchema = collectionPageSchema("JLPT N5 Kanji Hub — All 79 Characters", "Browse all 79 JLPT N5 kanji with readings, examples, and sentences.", "/n5")
  const listSchema = itemListSchema(items)

  return (
    <div className="px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <h1 className="text-xl font-bold text-ink">All 79 Kanji</h1>
      <p className="text-sm text-ink/60 mt-1 mb-8">JLPT N5 — the most fundamental Japanese characters</p>

      {/* Mode cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        <Link
          href="/n5/study/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">📖</span>
          <p className="font-medium text-sm text-ink mt-2">Study All Kanji</p>
          <p className="text-xs text-ink/70 mt-0.5">79 characters with readings and examples</p>
        </Link>
        <Link
          href="/n5/flashcards/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">🃏</span>
          <p className="font-medium text-sm text-ink mt-2">Flashcards</p>
          <p className="text-xs text-ink/70 mt-0.5">Flip, memorize, track your progress</p>
        </Link>
        <Link
          href="/n5/vocabulary/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">📝</span>
          <p className="font-medium text-sm text-ink mt-2">Vocabulary</p>
          <p className="text-xs text-ink/70 mt-0.5">219 example words with readings</p>
        </Link>
        <Link
          href="/n5/sets/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">✍️</span>
          <p className="font-medium text-sm text-ink mt-2">Tests</p>
          <p className="text-xs text-ink/70 mt-0.5">20 sets of 20 questions each</p>
        </Link>
      </div>

      {/* Full kanji grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {all.map((k) => (
          <Link
            key={k.id}
            href={`/n5/study/${k.id}/`}
            className="border border-ink/20 rounded-lg p-3 text-center hover:border-ink/40 transition-all bg-white"
          >
            <div className="text-lg font-bold text-ink leading-none">{k.kanji}</div>
            <div className="text-[10px] text-ink/60 mt-1 leading-tight">
              {k.kun[0]?.replace(/\..+$/, "") || k.on[0]}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
