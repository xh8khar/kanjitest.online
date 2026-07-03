import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl, collectionPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Free JLPT Kanji Study, Quiz & Test — N5, N4 & N3",
  description:
    "Master JLPT N5, N4, and N3 kanji with KanjiTest.Online — study with example words, flip flashcards, test your knowledge. N2, N1 coming soon. Free forever.",
  keywords: kw(["kanji test online", "free JLPT practice", "learn Japanese kanji", "JLPT study guide", "Japanese kanji quiz"]),
  openGraph: {
    title: "Free JLPT Kanji Study, Quiz & Test — N5, N4 & N3",
    description:
      "Master JLPT N5, N4, and N3 kanji with readings, examples, flashcards, and quizzes. N2, N1 coming soon.",
    url: siteUrl(),
  },
  twitter: {
    title: "Free JLPT Kanji Study, Quiz & Test — N5, N4 & N3",
    description: "Master JLPT N5, N4, and N3 kanji with readings, examples, flashcards, and quizzes.",
  },
  alternates: { canonical: siteUrl() },
}

const levels = [
  { id: "n5", label: "N5", kanji: 79, vocab: 219, desc: "Basic Japanese characters for beginners" },
  { id: "n4", label: "N4", kanji: 171, vocab: 473, desc: "Intermediate Japanese characters" },
  { id: "n3", label: "N3", kanji: 367, vocab: 935, desc: "Upper-intermediate Japanese characters" },
]

export default function Home() {
  const jsonLd = collectionPageSchema(
    "Free JLPT Kanji Test Online — KanjiTest.Online",
    "Free JLPT N5, N4, and N3 kanji tests with answers. Study with flashcards, vocabulary, and practice quizzes.",
    "/"
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-5xl font-black text-ink leading-tight">
          Free JLPT Kanji <span className="text-blue-500">Test</span> Online
        </h1>
        <p className="text-sm sm:text-lg text-ink/70 mt-2 sm:mt-3 font-medium">
          N5 Kanji Test · N4 Kanji Test · N3 Kanji Test with answers
        </p>
        <p className="text-xs sm:text-sm text-ink/50 mt-1.5 sm:mt-2">
          Study, Flashcards, Vocabulary & Practice Quizzes — Free forever
        </p>
      </div>

      {/* Level quick-nav */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
        {levels.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="h-12 sm:h-14 px-6 sm:px-8 bg-ink text-white rounded-xl text-sm sm:text-base font-bold flex items-center hover:bg-ink/80 transition-all"
          >
            Kanji {l.label}
          </a>
        ))}
        <a
          href="#why"
          className="h-12 sm:h-14 px-6 sm:px-8 border border-ink/20 rounded-xl text-sm sm:text-base font-medium text-ink/70 flex items-center hover:border-ink/40 transition-all"
        >
          Why?
        </a>
      </div>

      {/* Per-level sections */}
      {levels.map((l) => (
        <section key={l.id} id={l.id} className="mb-10 sm:mb-12 scroll-mt-20">
          <div className="border border-ink/20 rounded-2xl bg-white overflow-hidden">
            <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-ink/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-ink">JLPT {l.label} Kanji Test</h2>
                  <p className="text-xs sm:text-sm text-ink/60 mt-0.5">{l.kanji} kanji · {l.vocab} words · 20 tests</p>
                </div>
                <p className="text-xs sm:text-sm text-ink/50 italic">{l.desc}</p>
              </div>
            </div>

            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-ink/10">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <Link href={`/${l.id}/study/`} className="h-9 sm:h-10 px-3 sm:px-4 bg-ink/10 text-ink rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:bg-ink/20 transition-all">
                  📖 Study
                </Link>
                <Link href={`/${l.id}/flashcards/`} className="h-9 sm:h-10 px-3 sm:px-4 bg-ink/10 text-ink rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:bg-ink/20 transition-all">
                  🃏 Flashcards
                </Link>
                <Link href={`/${l.id}/vocabulary/`} className="h-9 sm:h-10 px-3 sm:px-4 bg-ink/10 text-ink rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:bg-ink/20 transition-all">
                  📝 Vocabulary
                </Link>
              </div>
            </div>

            <div className="px-5 sm:px-7 py-4 sm:py-5">
              <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-3">Practice Tests (10 minutes each)</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    href={`/${l.id}/sets/${n}/`}
                    className="inline-flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 border border-ink/20 rounded-lg text-xs sm:text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all bg-white"
                  >
                    Test {n}
                    <span className="text-[10px] text-ink/40">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* N2 / N1 coming soon */}
      <section className="mb-10 sm:mb-12">
        <div className="border border-ink/20 rounded-2xl bg-white px-5 sm:px-7 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-ink/40">N2</span>
                <span className="text-[10px] uppercase tracking-wider text-ink/30 bg-ink/5 px-2 py-0.5 rounded">Soon</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-ink/40">N1</span>
                <span className="text-[10px] uppercase tracking-wider text-ink/30 bg-ink/5 px-2 py-0.5 rounded">Soon</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-ink/50">
              We&apos;re working on JLPT N2 and N1 kanji with curated examples, flashcards, and tests. Coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Why Learn Kanji */}
      <section id="why" className="mb-10 sm:mb-12 scroll-mt-20">
        <div className="border-t border-ink/20 pt-8 sm:pt-10">
          <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">Why You Should Learn Kanji</h2>
          <p className="text-xs sm:text-sm text-ink/70 leading-relaxed mb-5">
            In Japanese, there are about 2,000 common kanji characters. Kanji is arguably the most prominent part
            of the Japanese writing system. The elegant characters, originally adapted from Chinese, make up most
            of written Japanese. You can see them in books, magazines, on signs, and everywhere. Understanding
            kanji is essential to fully comprehend the Japanese language and culture.
          </p>
        </div>
      </section>

      {/* Kanji by JLPT Level */}
      <section className="mb-10 sm:mb-12">
        <div className="border-t border-ink/20 pt-8 sm:pt-10">
          <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">Kanji by JLPT Level</h2>
          <p className="text-xs sm:text-sm text-ink/70 leading-relaxed mb-5">
            The Japanese-Language Proficiency Test (JLPT) is the main standardized test of Japanese ability for
            non-native speakers. It is composed of 5 levels, from N5 (most basic) to N1 (most advanced).
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 shrink-0 text-sm sm:text-base font-bold text-ink">N5</span>
              <div className="flex-1 h-2 sm:h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-ink rounded-full" style={{ width: "4%" }} />
              </div>
              <span className="w-24 sm:w-32 shrink-0 text-[11px] sm:text-xs text-ink/60 text-right">~100 kanji</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 shrink-0 text-sm sm:text-base font-bold text-ink">N4</span>
              <div className="flex-1 h-2 sm:h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-ink rounded-full" style={{ width: "15%" }} />
              </div>
              <span className="w-24 sm:w-32 shrink-0 text-[11px] sm:text-xs text-ink/60 text-right">~300 kanji</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 shrink-0 text-sm sm:text-base font-bold text-ink">N3</span>
              <div className="flex-1 h-2 sm:h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-ink rounded-full" style={{ width: "33%" }} />
              </div>
              <span className="w-24 sm:w-32 shrink-0 text-[11px] sm:text-xs text-ink/60 text-right">~650 kanji</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 shrink-0 text-sm sm:text-base font-bold text-ink/50">N2</span>
              <div className="flex-1 h-2 sm:h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-ink/50 rounded-full" style={{ width: "50%" }} />
              </div>
              <span className="w-24 sm:w-32 shrink-0 text-[11px] sm:text-xs text-ink/40 text-right">~1,000 kanji</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 shrink-0 text-sm sm:text-base font-bold text-ink/50">N1</span>
              <div className="flex-1 h-2 sm:h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-ink/50 rounded-full" style={{ width: "100%" }} />
              </div>
              <span className="w-24 sm:w-32 shrink-0 text-[11px] sm:text-xs text-ink/40 text-right">~2,000 kanji</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
