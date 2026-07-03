import Link from "next/link"
import { getByKanji, getPrevNext, getAll, getSetForKanji } from "@/lib/kanji"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { siteUrl, breadcrumbSchema, definedTermSchema, keywords as kw } from "@/lib/seo"

export function generateStaticParams() {
  return getAll().map((k) => ({ kanji: k.kanji }))
}

export function generateMetadata({ params }: { params: Promise<{ kanji: string }> }): Promise<Metadata> {
  return params.then(async ({ kanji }) => {
    const decoded = decodeURIComponent(kanji)
    const k = getByKanji(decoded)
    if (!k) return {}
    const example = k.examples[0]
    const desc = `Learn the JLPT N5 kanji ${k.kanji} (${k.meanings[0]}). Example: ${example?.word} (${example?.reading}) — ${example?.english}.`
    return {
      title: `${k.kanji} (${k.meanings[0]}) — JLPT N5 Kanji`,
      description: desc,
      keywords: kw([
        `${k.kanji} kanji`,
        `${k.kanji} meaning ${k.meanings[0]}`,
        `kanji ${k.kanji} reading`,
        `JLPT N5 ${k.kanji}`,
        `learn kanji ${k.kanji}`,
        `Japanese kanji ${k.kanji}`,
        `how to read ${k.kanji}`,
        "JLPT N5 kanji list",
        "beginner Japanese kanji",
        "free kanji study online",
      ]),
      openGraph: {
        title: `${k.kanji} (${k.meanings[0]}) — JLPT N5 Kanji`,
        description: desc,
        url: siteUrl(`/n5/study/${k.kanji}/`),
      },
      twitter: {
        title: `${k.kanji} (${k.meanings[0]}) — JLPT N5 Kanji`,
        description: desc,
      },
      alternates: { canonical: siteUrl(`/n5/study/${k.kanji}/`) },
    }
  })
}

export default async function KanjiDetail({
  params,
}: {
  params: Promise<{ kanji: string }>
}) {
  const { kanji } = await params
  const decoded = decodeURIComponent(kanji)
  const k = getByKanji(decoded)
  if (!k) notFound()

  const { prev, next } = getPrevNext(k.id)
  const setNum = getSetForKanji(k.id)
  const ex = k.examples.slice(0, 3)

  const termSchema = definedTermSchema(k.kanji, k.meanings.join(", "), k.id)
  const breadSchema = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "N5", url: "/n5/" },
    { name: "Study", url: "/n5/study/" },
    { name: k.kanji, url: `/n5/study/${k.kanji}/` },
  ])

  return (
    <div className="px-4 py-6 sm:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }} />

      <nav className="text-[11px] sm:text-xs text-ink/50 mb-3 sm:mb-4 flex flex-wrap items-center gap-0.5">
        <a href="/" className="text-ink/50 hover:text-ink transition-colors px-1.5 sm:px-2 py-1.5">Home</a>
        <span>/</span>
        <a href="/n5/" className="text-ink/50 hover:text-ink transition-colors px-1.5 sm:px-2 py-1.5">N5</a>
        <span>/</span>
        <a href="/n5/study/" className="text-ink/50 hover:text-ink transition-colors px-1.5 sm:px-2 py-1.5">Study</a>
        <span>/</span>
        <span className="text-ink/70 px-1.5 sm:px-2 py-1">{k.kanji}</span>
      </nav>

      <div className="border border-ink/20 rounded-xl bg-white mb-4 sm:mb-5">
        <div className="text-5xl sm:text-6xl text-center py-6 sm:py-8 font-black text-ink">
          {k.kanji}
        </div>
        {k.strokes > 0 && (
          <p className="text-xs text-ink/50 text-center -mt-2 sm:-mt-3 pb-1 sm:pb-2">{k.strokes} strokes</p>
        )}
        <div className="px-4 sm:px-5 pb-3 sm:pb-4 flex flex-wrap justify-center gap-1 sm:gap-1.5">
          {k.meanings.map((m) => (
            <span key={m} className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md bg-ink/10 text-xs text-ink/70">{m}</span>
          ))}
        </div>

        <div className="px-4 sm:px-5 pb-4 sm:pb-5 grid grid-cols-2 gap-2">
          {k.kun.length > 0 && (
            <div className="border border-ink/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
              <p className="text-[11px] sm:text-xs text-ink/50 uppercase mb-0.5 sm:mb-1">kun</p>
              <p className="text-sm text-ink">{k.kun.map((r) => r.replace(/\..+$/, "")).join("、")}</p>
            </div>
          )}
          {k.on.length > 0 && (
            <div className="border border-ink/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
              <p className="text-[11px] sm:text-xs text-ink/50 uppercase mb-0.5 sm:mb-1">on</p>
              <p className="text-sm text-ink">{k.on.join("、")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 sm:mb-6">
        <div className="border-t border-ink/20 my-5 sm:my-6" />
        <p className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-ink/50 mb-3 sm:mb-4">Example Words</p>
        <div className="space-y-1.5 sm:space-y-2">
          {ex.map((e, i) => (
            <div key={i} className="border border-ink/20 rounded-xl px-4 sm:px-5 py-3 sm:py-4 bg-white">
              <p className="text-sm sm:text-base font-bold text-ink">{e.word}</p>
              <p className="text-[11px] sm:text-xs text-ink/70 mt-0.5">{e.reading}</p>
              {e.sentence && (
                <p className="text-xs sm:text-sm text-ink/70 mt-1.5 sm:mt-2">{e.sentence}</p>
              )}
              <p className="text-[11px] sm:text-xs text-ink/60 mt-1">{e.sentenceEnglish || e.english}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
        <Link href="/n5/flashcards/" className="border border-ink/20 rounded-lg h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center gap-1">
          🃏 Flashcards
        </Link>
        <Link href={`/n5/sets/${setNum}/`} className="border border-ink/20 rounded-lg h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center gap-1">
          ✍️ Test (Set {setNum})
        </Link>
      </div>

      <div className="flex gap-2">
        {prev ? (
          <Link href={`/n5/study/${prev.kanji}/`} className="flex-1 border border-ink/20 rounded-lg h-12 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 text-xs sm:text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all">
            <span>&larr;</span>
            <span>{prev.kanji}</span>
            <span className="hidden sm:inline text-ink/50 text-[11px]">#{prev.id}</span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link href={`/n5/study/${next.kanji}/`} className="flex-1 border border-ink/20 rounded-lg h-12 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 justify-end text-xs sm:text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all">
            <span className="hidden sm:inline text-ink/50 text-[11px]">#{next.id}</span>
            <span>{next.kanji}</span>
            <span>&rarr;</span>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
