import type { Metadata } from "next"
import { webPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About — Free JLPT Kanji Study Tool",
  description:
    "KanjiTest.Online is a free JLPT N5, N4, and N3 kanji study tool with flashcards, quizzes, and detailed kanji pages. No registration required.",
  keywords: kw(["KanjiTest.Online about", "free JLPT study tool", "about kanji practice website"]),
  openGraph: {
    title: "About — Free JLPT Kanji Study Tool",
    description: "Free JLPT N5, N4, and N3 kanji study tool with flashcards, quizzes, and detailed kanji pages.",
    url: "https://www.kanjitest.online/about",
  },
  twitter: { title: "About — Free JLPT Kanji Study Tool", description: "Free JLPT N5, N4, and N3 kanji study tool." },
  alternates: { canonical: "https://www.kanjitest.online/about" },
}

export default function AboutPage() {
  const pageSchema = webPageSchema("About KanjiTest.Online", "Free JLPT N5, N4, and N3 kanji study tool with flashcards, quizzes, and detailed kanji pages.")
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <div className="border border-ink/20 rounded-xl px-5 sm:px-8 py-6 sm:py-8 bg-white">
        <h1 className="text-lg sm:text-xl font-bold text-ink mb-4">About KanjiTest.Online</h1>
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-ink/60 leading-relaxed">
          <p>
            KanjiTest.Online is a free study tool for JLPT N5, N4, and N3 kanji.
            Every feature &mdash; study lists, flashcards, vocabulary, and tests &mdash; is completely free.
          </p>
          <p>
            Our mission is to help learners build a solid foundation in Japanese reading.
            By mastering kanji across all levels, you unlock the ability to read signs,
            menus, newspapers, and more.
          </p>
          <p>
            Questions or feedback? Reach us at
            <a href="mailto:hello@kanjitest.online" className="text-ink/70 hover:text-ink transition-colors ml-1">hello@kanjitest.online</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
