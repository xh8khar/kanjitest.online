import Link from "next/link"
import type { Metadata } from "next"
import { collectionPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Test Sets — JLPT N5 Kanji Quizzes",
  description: "20 test sets of 20 questions each. Practice reading and meaning recognition for JLPT N5 kanji with real sentence context.",
  keywords: kw(["kanji test online", "free JLPT N5 kanji test", "online kanji quiz", "JLPT N5 practice test", "N5 kanji reading quiz", "Japanese kanji practice test", "beginner kanji assessment"]),
  openGraph: {
    title: "Test Sets — JLPT N5 Kanji Quizzes",
    description: "20 test sets of 20 questions each for JLPT N5 kanji practice.",
    url: "https://www.kanjitest.online/n5/sets",
  },
  twitter: { title: "Test Sets — JLPT N5 Kanji Quizzes", description: "20 test sets of 20 kanji questions each." },
  alternates: { canonical: "https://www.kanjitest.online/n5/sets" },
}

export default function SetsPage() {
  const pageSchema = collectionPageSchema("Test Sets — JLPT N5 Kanji Quizzes", "20 test sets of 20 questions each for JLPT N5 kanji.", "/n5/sets")
  return (
    <div className="px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <h1 className="text-xl font-bold text-ink">Tests</h1>
      <p className="text-xs text-ink/60 mt-1 mb-6">20 sets &middot; 20 questions each</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            href={`/n5/sets/${n}/`}
            className="border border-ink/20 rounded-xl px-4 py-5 text-center bg-white hover:border-ink/40 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-ink/10 flex items-center justify-center mx-auto mb-2">
              <span className="text-sm font-medium text-ink/70">{n}</span>
            </div>
            <p className="text-sm text-ink">Set {n}</p>
            <p className="text-xs text-ink/60 mt-0.5">20 questions</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
