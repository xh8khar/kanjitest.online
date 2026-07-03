import type { Metadata } from "next"
import { webPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About",
  description:
    "Kanji Test Online is a free JLPT N5 kanji study tool with flashcards, quizzes, and detailed kanji pages. No registration required, completely free.",
  keywords: kw(["Kanji Test Online about", "free JLPT N5 study tool", "about kanji practice website"]),
  openGraph: {
    title: "About — Kanji Test Online",
    description: "Free JLPT N5 kanji study tool with flashcards, quizzes, and detailed kanji pages.",
    url: "https://www.kanjitest.online/about",
  },
  twitter: { title: "About — Kanji Test Online", description: "Free JLPT N5 kanji study tool." },
  alternates: { canonical: "https://www.kanjitest.online/about" },
}

export default function AboutPage() {
  const pageSchema = webPageSchema("About Kanji Test Online", "Free JLPT N5 kanji study tool with flashcards, quizzes, and detailed kanji pages.")
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <div className="border border-ink/20 rounded-xl px-8 py-8 bg-white">
        <h1 className="text-xl font-bold text-ink mb-4">About KanjiTest.online</h1>
        <div className="space-y-4 text-sm text-ink/60 leading-relaxed">
          <p>
            KanjiTest.online is a free study tool for JLPT N5 kanji.
            Every feature &mdash; study lists, flashcards, and tests &mdash; is completely free.
          </p>
          <p>
            Our mission is to help beginners build a solid foundation in Japanese reading.
            By mastering the 79 N5 kanji, you unlock the ability to read basic signs,
            menus, and simple sentences.
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
