import Link from "next/link"
import { getVocabulary } from "@/lib/kanji"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { keywords as kw } from "@/lib/seo"

export async function generateStaticParams() {
  return getVocabulary("n3").map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const vocab = getVocabulary("n3").find((v) => v.slug === decoded)
  if (!vocab) return {}
  return {
    title: `${vocab.word} (${vocab.reading}) — JLPT N3 Vocabulary`,
    description: `${vocab.word} (${vocab.reading}) — ${vocab.english}. Example sentences and associated kanji for JLPT N3.`,
    keywords: kw([`${vocab.word} meaning`, `${vocab.word} reading`, `JLPT N3 ${vocab.word}`, `${vocab.word} example sentence`]),
    openGraph: {
      title: `${vocab.word} (${vocab.reading}) — JLPT N3 Vocabulary`,
      description: `${vocab.word} (${vocab.reading}) — ${vocab.english}. JLPT N3 vocabulary with example sentences.`,
      url: `https://www.kanjitest.online/n3/vocabulary/${slug}`,
    },
    twitter: { title: `${vocab.word} (${vocab.reading}) — JLPT N3 Vocabulary`, description: `${vocab.word} (${vocab.reading}) — ${vocab.english}.` },
    alternates: { canonical: `https://www.kanjitest.online/n3/vocabulary/${slug}` },
  }
}

export default async function N3VocabDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const vocab = getVocabulary("n3").find((v) => v.slug === decoded)
  if (!vocab) notFound()

  const idx = getVocabulary("n3").findIndex((v) => v.slug === decoded)
  const prev = idx > 0 ? getVocabulary("n3")[idx - 1] : null
  const next = idx < getVocabulary("n3").length - 1 ? getVocabulary("n3")[idx + 1] : null

  return (
    <div className="px-4 py-6 sm:py-8">
      <Link href="/n3/vocabulary/" className="text-xs text-ink/60 hover:text-ink transition-colors">&larr; All Vocabulary</Link>

      <div className="mt-5 sm:mt-6 border border-ink/20 rounded-lg sm:rounded-xl bg-white px-4 sm:px-6 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-black text-ink">{vocab.word} <span className="text-xs sm:text-sm font-normal text-ink/60">({vocab.english})</span></h1>
        <p className="text-sm sm:text-base text-ink/70 mt-1">{vocab.reading}</p>

        {vocab.kanjiChars.length > 0 && (
          <div className="mt-4 sm:mt-5">
            <p className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-ink/50 mb-1.5 sm:mb-2">Contains Kanji</p>
            <div className="flex gap-1.5 sm:gap-2">
              {vocab.kanjiIds.map((id, i) => (
                <Link
                  key={id}
                  href={`/n3/study/${vocab.kanjiChars[i]}/`}
                  className="border border-ink/20 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-ink hover:border-ink/40 transition-all"
                >
                  {vocab.kanjiChars[i]}
                </Link>
              ))}
            </div>
          </div>
        )}

        {vocab.sentences.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <p className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-ink/50 mb-2 sm:mb-3">Example Sentences</p>
            <div className="space-y-2 sm:space-y-3">
              {vocab.sentences.slice(0, 3).map((s, i) => (
                <div key={i} className="border border-ink/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
                  <p className="text-xs sm:text-sm text-ink">{s.sentence}</p>
                  <p className="text-[11px] sm:text-xs text-ink/60 mt-0.5 sm:mt-1">{s.sentenceEnglish}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5 sm:mt-6">
        {prev ? (
          <Link href={`/n3/vocabulary/${prev.slug}/`} className="text-xs sm:text-sm text-ink/60 hover:text-ink transition-colors">&larr; {prev.word}</Link>
        ) : <div />}
        {next ? (
          <Link href={`/n3/vocabulary/${next.slug}/`} className="text-xs sm:text-sm text-ink/60 hover:text-ink transition-colors">{next.word} &rarr;</Link>
        ) : <div />}
      </div>
    </div>
  )
}
