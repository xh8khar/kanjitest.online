import Link from "next/link"
import { getAll } from "@/lib/kanji"
import type { Metadata } from "next"
import { collectionPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Free JLPT Kanji Study, Quiz & Test | KanjiTest.Online",
  description:
    "Master all 79 JLPT N5 kanji with Kanji Test Online. Study with example words, flip flashcards, and test your knowledge with 20 quiz sets. Free forever.",
  keywords: kw(["kanji test online", "free JLPT N5 practice", "learn Japanese kanji online", "JLPT N5 study guide", "Japanese kanji quiz", "beginner kanji practice", "online kanji flashcards"]),
  openGraph: {
    title: "Kanji Test Online — Free JLPT N5 Kanji Practice",
    description:
      "Master all 79 JLPT N5 kanji with readings, examples, flashcards, and quizzes.",
    url: "https://kanjitest.online",
  },
  twitter: {
    title: "Kanji Test Online — Free JLPT N5 Kanji Practice",
    description: "Master all 79 JLPT N5 kanji with readings, examples, flashcards, and quizzes.",
  },
  alternates: { canonical: "https://kanjitest.online" },
}

export default function Home() {
  const all = getAll()
  const samples = all.slice(0, 8)

  const jsonLd = collectionPageSchema("Kanji Test Online — Free JLPT N5 Kanji Practice", "Master all 79 JLPT N5 kanji with readings, examples, flashcards, and quizzes.", "/")

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black text-ink">Kanji Test</h1>
        <p className="text-base text-ink/50 mt-1">Online</p>
        <p className="text-sm text-ink/60 mt-4">JLPT N5 Kanji — Study, Flip, Test</p>
        <Link
          href="/n5/study/1/"
          className="inline-flex items-center mt-8 h-12 px-8 bg-ink text-white rounded-lg text-sm font-medium hover:bg-ink/80 transition-all"
        >
          Start learning
        </Link>
      </div>

      {/* Three Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
        <ModeCard icon="📖" title="Study" desc="Browse every N5 kanji with readings, examples, and sample sentences." href="/n5/study/" />
        <ModeCard icon="🃏" title="Flashcards" desc="Flip through all 79 kanji. Know it? Mark it and track your progress." href="/n5/flashcards/" />
        <ModeCard icon="✍️" title="Test" desc="20 sets of 20 questions. Test your kanji reading and recognition skills." href="/n5/sets/" />
      </div>

      {/* How It Works */}
      <div className="mb-14">
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-6">How It Works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Step number="1" title="Study" desc="Learn each kanji with kun/on readings, example words, and real sentences." />
          <Step number="2" title="Flip" desc="Use flashcards to test recall. Mark known cards and focus on what you don&apos;t know." />
          <Step number="3" title="Test" desc="Take 20-question sets that mix reading and kanji recognition in context." />
        </div>
      </div>

      {/* Sample Kanji */}
      <div className="border-t border-ink/20 my-6" />
      <div className="mb-14">
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-4">Sample Kanji</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {samples.map((k) => (
            <Link
              key={k.id}
              href={`/n5/study/${k.id}/`}
              className="border border-ink/20 rounded-xl p-3 text-center bg-white hover:border-ink/40 transition-all"
            >
              <span className="text-lg font-bold text-ink">{k.kanji}</span>
              <span className="block text-[10px] text-ink/60 mt-0.5">
                {k.kun[0]?.replace(/\..+$/, "") || k.on[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* All Levels */}
      <div className="border border-ink/20 rounded-xl bg-white px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-3">All JLPT Levels</p>
        <div className="flex gap-2">
          <Link href="/n5/" className="flex-1 py-2.5 rounded-lg bg-ink/10 text-center hover:bg-ink/20 transition-all">
            <span className="text-xs font-medium text-ink/70">N5</span>
          </Link>
          <Link href="/n4/" className="flex-1 py-2.5 rounded-lg bg-ink/10 text-center hover:bg-ink/20 transition-all">
            <span className="text-xs font-medium text-ink/70">N4</span>
          </Link>
          <Link href="/n3/" className="flex-1 py-2.5 rounded-lg bg-ink/5 text-center hover:bg-ink/10 transition-all">
            <span className="text-xs font-medium text-ink/50">N3</span>
          </Link>
          <Link href="/n2/" className="flex-1 py-2.5 rounded-lg bg-ink/5 text-center hover:bg-ink/10 transition-all">
            <span className="text-xs font-medium text-ink/50">N2</span>
          </Link>
          <Link href="/n1/" className="flex-1 py-2.5 rounded-lg bg-ink/5 text-center hover:bg-ink/10 transition-all">
            <span className="text-xs font-medium text-ink/50">N1</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ModeCard({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="border border-ink/20 rounded-xl p-6 bg-white hover:border-ink/40 transition-all block">
      <span className="text-2xl block mb-3">{icon}</span>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="text-xs text-ink/70 mt-1">{desc}</p>
    </Link>
  )
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div>
      <div className="w-8 h-8 rounded-full bg-ink text-white text-xs font-medium flex items-center justify-center mb-3">{number}</div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="text-xs text-ink/70 mt-1">{desc}</p>
    </div>
  )
}
