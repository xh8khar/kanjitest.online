import Link from "next/link"
import { getAll, getVocabulary } from "@/lib/kanji"
import type { Metadata } from "next"
import { collectionPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Free JLPT Kanji Study, Quiz & Test | KanjiTest.Online",
  description:
    "Master JLPT N5 and N4 kanji with KanjiTest.Online — study with example words, flip flashcards, test your knowledge. N3, N2, N1 coming soon. Free forever.",
  keywords: kw(["kanji test online", "free JLPT practice", "learn Japanese kanji", "JLPT study guide", "Japanese kanji quiz"]),
  openGraph: {
    title: "KanjiTest.Online — Free JLPT Kanji Practice",
    description:
      "Master JLPT N5 and N4 kanji with readings, examples, flashcards, and quizzes. N3, N2, N1 coming soon.",
    url: "https://www.kanjitest.online",
  },
  twitter: {
    title: "KanjiTest.Online — Free JLPT Kanji Practice",
    description: "Master JLPT N5 and N4 kanji with readings, examples, flashcards, and quizzes.",
  },
  alternates: { canonical: "https://www.kanjitest.online" },
}

const levels = [
  { id: "n5", label: "N5", kanji: 79, vocab: 219, status: "ready" as const, color: "bg-ink text-white" },
  { id: "n4", label: "N4", kanji: 171, vocab: 473, status: "ready" as const, color: "bg-ink text-white" },
  { id: "n3", label: "N3", kanji: 367, vocab: "~1850", status: "soon" as const, color: "bg-ink/5 text-ink/50" },
  { id: "n2", label: "N2", kanji: 381, vocab: "~3750", status: "soon" as const, color: "bg-ink/5 text-ink/50" },
  { id: "n1", label: "N1", kanji: "~1200", vocab: "~8000", status: "soon" as const, color: "bg-ink/5 text-ink/50" },
]

const features = [
  { icon: "📖", title: "Study", desc: "Browse kanji with readings, examples, and sample sentences." },
  { icon: "🃏", title: "Flashcards", desc: "Flip through kanji. Know it? Mark it and track progress." },
  { icon: "📝", title: "Vocabulary", desc: "Explore words with readings, meanings, and associated kanji." },
  { icon: "✍️", title: "Test", desc: "20-question sets mixing reading and kanji recognition in context." },
]

export default function Home() {
  const n5 = getAll("n5").slice(0, 6)
  const n4 = getAll("n4").slice(0, 4)
  const samples = [...n5, ...n4]

  const jsonLd = collectionPageSchema(
    "KanjiTest.Online — Free JLPT Kanji Practice",
    "Master JLPT N5 and N4 kanji with readings, examples, flashcards, and quizzes. N3, N2, N1 coming soon.",
    "/"
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black text-ink">Kanji<span className="text-5xl font-black text-ink">Test</span></h1>
        <p className="text-base text-blue-500 mt-1 font-medium">.Online</p>
        <p className="text-sm text-ink/60 mt-3">JLPT N5 · N4 · N3 · N2 · N1</p>
        <p className="text-xs text-ink/50 mt-1">Study, Flashcards, Vocabulary & Tests — Free forever</p>
        <div className="flex justify-center gap-3 mt-7">
          <Link
            href="/n5/study/1/"
            className="inline-flex items-center h-11 px-7 bg-ink text-white rounded-lg text-sm font-medium hover:bg-ink/80 transition-all"
          >
            Start N5
          </Link>
          <Link
            href="/n4/study/80/"
            className="inline-flex items-center h-11 px-7 border border-ink/30 text-ink rounded-lg text-sm font-medium hover:bg-ink/5 transition-all"
          >
            Start N4
          </Link>
        </div>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14">
        {levels.map((l) => (
          <Link
            key={l.id}
            href={`/${l.id}/`}
            className={`border border-ink/20 rounded-xl p-5 bg-white hover:border-ink/40 transition-all ${l.status === "soon" ? "opacity-50 pointer-events-none" : ""}`}
          >
            <p className="text-lg font-bold text-ink">{l.label}</p>
            <p className="text-xs text-ink/60 mt-1">
              {l.kanji} kanji · {l.vocab} words
            </p>
            {l.status === "soon" && (
              <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-ink/40">Coming Soon</span>
            )}
            {l.status === "ready" && (
              <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-blue-500">Start</span>
            )}
          </Link>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="border-t border-ink/20 pt-10 mb-14">
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-5 text-center">What You Can Do</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f) => (
            <div key={f.title} className="border border-ink/20 rounded-xl p-5 bg-white">
              <span className="text-xl block mb-2">{f.icon}</span>
              <p className="text-sm font-semibold text-ink">{f.title}</p>
              <p className="text-xs text-ink/70 mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Kanji */}
      <div className="border-t border-ink/20 pt-10 mb-14">
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-4">Sample Kanji</p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {samples.map((k) => (
            <Link
              key={k.id}
              href={`/${k.id <= 79 ? "n5" : "n4"}/study/${k.id}/`}
              className="border border-ink/20 rounded-xl p-3 text-center bg-white hover:border-ink/40 transition-all"
            >
              <span className="text-lg font-bold text-ink">{k.kanji}</span>
              <span className="block text-[10px] text-ink/60 mt-0.5">
                {k.kun[0]?.replace(/\..+$/, "") || k.on[0]}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-4 gap-2">
          <span className="text-[10px] text-ink/40">N5</span>
          <span className="text-[10px] text-ink/20">·</span>
          <span className="text-[10px] text-ink/40">N4</span>
        </div>
      </div>

      {/* How It Works */}
      <div className="border-t border-ink/20 pt-10">
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-6 text-center">How It Works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Step number="1" title="Pick Your Level" desc="Choose N5 or N4 (N3-N1 coming soon). Each level has its own kanji, vocabulary, and tests." />
          <Step number="2" title="Study & Flip" desc="Learn each kanji with readings and examples. Use flashcards to drill what you don&apos;t know." />
          <Step number="3" title="Test Yourself" desc="Take 20-question sets that mix reading and kanji recognition with real sentence context." />
        </div>
      </div>
    </div>
  )
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-8 h-8 rounded-full bg-ink text-white text-xs font-medium flex items-center justify-center mx-auto mb-3">{number}</div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="text-xs text-ink/70 mt-1 leading-relaxed">{desc}</p>
    </div>
  )
}
