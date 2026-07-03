import Link from "next/link"
import { getAll } from "@/lib/kanji"
import type { Metadata } from "next"
import { collectionPageSchema, itemListSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N4 Kanji Hub — All 171 Characters",
  description:
    "Browse all 171 JLPT N4 kanji by number. Study each character with kun/on readings, example words, and daily-life sentences.",
  keywords: kw(["JLPT N4 kanji list", "all JLPT N4 kanji", "N4 kanji chart", "complete N4 kanji list", "learn all N4 kanji"]),
  openGraph: {
    title: "JLPT N4 Kanji Hub — All 171 Characters",
    description: "Browse all 171 JLPT N4 kanji with readings, examples, and sentences.",
    url: "https://www.kanjitest.online/n4",
  },
  twitter: { title: "JLPT N4 Kanji Hub — All 171 Characters", description: "Complete list of 171 JLPT N4 kanji with readings and examples." },
  alternates: { canonical: "https://www.kanjitest.online/n4" },
}

export default function N4Hub() {
  const all = getAll("n4")
  const items = all.map((k) => ({ name: `${k.kanji} — ${k.meanings[0]}`, url: `/n4/study/${k.id}/` }))
  const pageSchema = collectionPageSchema("JLPT N4 Kanji Hub — All 171 Characters", "Browse all 171 JLPT N4 kanji with readings and examples.", "/n4")
  const listSchema = itemListSchema(items)

  return (
    <div className="px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <h1 className="text-xl font-bold text-ink">All 171 Kanji</h1>
      <p className="text-sm text-ink/60 mt-1 mb-8">JLPT N4 — intermediate Japanese characters</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        <Link
          href="/n4/study/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">📖</span>
          <p className="font-medium text-sm text-ink mt-2">Study All Kanji</p>
          <p className="text-xs text-ink/70 mt-0.5">171 characters with readings and examples</p>
        </Link>
        <Link
          href="/n4/flashcards/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">🃏</span>
          <p className="font-medium text-sm text-ink mt-2">Flashcards</p>
          <p className="text-xs text-ink/70 mt-0.5">Flip, memorize, track your progress</p>
        </Link>
        <Link
          href="/n4/vocabulary/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">📝</span>
          <p className="font-medium text-sm text-ink mt-2">Vocabulary</p>
          <p className="text-xs text-ink/70 mt-0.5">473 example words with readings</p>
        </Link>
        <Link
          href="/n4/sets/"
          className="border border-ink/20 rounded-xl px-5 py-5 bg-white hover:border-ink/40 transition-all"
        >
          <span className="text-xl">✍️</span>
          <p className="font-medium text-sm text-ink mt-2">Tests</p>
          <p className="text-xs text-ink/70 mt-0.5">20 sets of 20 questions each</p>
        </Link>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {all.map((k) => (
          <Link
            key={k.id}
            href={`/n4/study/${k.id}/`}
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
