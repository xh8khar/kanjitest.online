import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JLPT N1 Kanji — Coming Soon | KanjiTest.Online",
  description: "JLPT N1 kanji study, flashcards, and tests are coming soon to KanjiTest.Online.",
  openGraph: { title: "JLPT N1 Kanji — Coming Soon", description: "JLPT N1 kanji study, flashcards, and tests are coming soon.", url: "https://www.kanjitest.online/n1" },
  twitter: { title: "JLPT N1 Kanji — Coming Soon", description: "JLPT N1 kanji study, flashcards, and tests are coming soon." },
  alternates: { canonical: "https://www.kanjitest.online/n1" },
}

export default function N1Hub() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <span className="text-5xl block mb-6">🚧</span>
      <h1 className="text-2xl font-bold text-ink">JLPT N1 — Coming Soon</h1>
      <p className="text-sm text-ink/60 mt-3">
        We are working on adding all N1 kanji with curated examples, flashcards, and tests.
      </p>
      <div className="flex items-center justify-center gap-2 mt-8">
        <Link href="/n4/" className="h-11 px-6 bg-ink text-white rounded-lg text-sm font-medium flex items-center hover:bg-ink/80 transition-all">N4</Link>
        <Link href="/n5/" className="h-11 px-6 border border-ink/20 rounded-lg text-sm font-medium text-ink/70 flex items-center hover:border-ink/40 transition-all">N5</Link>
      </div>
    </div>
  )
}
