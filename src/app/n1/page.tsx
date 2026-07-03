import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JLPT N1 Kanji — Coming Soon",
  description: "JLPT N1 kanji study, flashcards, and tests are coming soon to KanjiTest.Online.",
  openGraph: { title: "JLPT N1 Kanji — Coming Soon", description: "JLPT N1 kanji study, flashcards, and tests are coming soon.", url: "https://www.kanjitest.online/n1" },
  twitter: { title: "JLPT N1 Kanji — Coming Soon", description: "JLPT N1 kanji study, flashcards, and tests are coming soon." },
  alternates: { canonical: "https://www.kanjitest.online/n1" },
}

export default function N1Hub() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-ink/5 flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl sm:text-4xl">🚧</span>
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-ink">JLPT N1 — Coming Soon</h1>
      <p className="text-xs sm:text-sm text-ink/60 mt-3 max-w-sm mx-auto leading-relaxed">
        We&apos;re working on adding all N1 kanji with curated examples, flashcards, and tests.
      </p>
      <div className="flex items-center justify-center gap-2 mt-8">
        <Link href="/n4/" className="h-10 sm:h-11 px-5 sm:px-6 bg-ink text-white rounded-lg text-xs sm:text-sm font-medium flex items-center hover:bg-ink/80 transition-all">N4 Kanji</Link>
        <Link href="/n3/" className="h-10 sm:h-11 px-5 sm:px-6 border border-ink/20 rounded-lg text-xs sm:text-sm font-medium text-ink/70 flex items-center hover:border-ink/40 transition-all">N3 Kanji</Link>
        <Link href="/n5/" className="h-10 sm:h-11 px-5 sm:px-6 border border-ink/20 rounded-lg text-xs sm:text-sm font-medium text-ink/70 flex items-center hover:border-ink/40 transition-all">N5 Kanji</Link>
      </div>
    </div>
  )
}
