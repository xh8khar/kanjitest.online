import Link from "next/link"
import { getById, getPrevNext, getAll, getSetForKanji } from "@/lib/kanji"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { breadcrumbSchema, definedTermSchema, keywords as kw } from "@/lib/seo"

export function generateStaticParams() {
  return getAll().map((k) => ({ id: String(k.id) }))
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params.then(async ({ id }) => {
    const k = getById(parseInt(id))
    if (!k) return {}
    const example = k.examples[0]
    const desc = `Learn the JLPT N5 kanji ${k.kanji} (${k.meanings[0]}). Example: ${example?.word} (${example?.reading}) — ${example?.english}.`
    return {
      title: `${k.kanji} (${k.meanings[0]}) Meaning, Examples — JLPT N5 Kanji`,
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
        url: `https://kanjitest.online/n5/study/${k.id}/`,
      },
      twitter: {
        title: `${k.kanji} (${k.meanings[0]}) — JLPT N5 Kanji`,
        description: desc,
      },
      alternates: { canonical: `https://kanjitest.online/n5/study/${k.id}/` },
    }
  })
}

export default async function KanjiDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const num = parseInt(id)
  const k = getById(num)
  if (!k) notFound()

  const { prev, next } = getPrevNext(num)
  const setNum = getSetForKanji(num)
  const ex = k.examples.slice(0, 3)

  const termSchema = definedTermSchema(k.kanji, k.meanings.join(", "), num)
  const breadSchema = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "N5", url: "/n5/" },
    { name: "Study", url: "/n5/study/" },
    { name: k.kanji, url: `/n5/study/${k.id}/` },
  ])

  return (
    <div className="px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }} />

      <nav className="text-xs text-ink/50 mb-4 flex flex-wrap items-center gap-0.5">
        <a href="/" className="text-ink/50 hover:text-ink transition-colors px-2 py-1.5">Home</a>
        <span>/</span>
        <a href="/n5/" className="text-ink/50 hover:text-ink transition-colors px-2 py-1.5">N5</a>
        <span>/</span>
        <a href="/n5/study/" className="text-ink/50 hover:text-ink transition-colors px-2 py-1.5">Study</a>
        <span>/</span>
        <span className="text-ink/70 px-2 py-1">{k.kanji}</span>
      </nav>

      {/* Hero card */}
      <div className="border border-ink/20 rounded-xl bg-white mb-5">
        <div className="text-6xl text-center py-8 font-black text-ink">
          {k.kanji}
        </div>
        {k.strokes > 0 && (
          <p className="text-xs text-ink/50 text-center -mt-3 pb-2">{k.strokes} strokes</p>
        )}
        <div className="px-5 pb-4 flex flex-wrap justify-center gap-1.5">
          {k.meanings.map((m) => (
            <span key={m} className="inline-flex items-center px-3 py-1 rounded-md bg-ink/10 text-xs text-ink/70">{m}</span>
          ))}
        </div>

        <div className="px-5 pb-5 grid grid-cols-2 gap-2">
          {k.kun.length > 0 && (
            <div className="border border-ink/20 rounded-lg px-4 py-3">
              <p className="text-xs text-ink/50 uppercase mb-1">kun</p>
              <p className="text-sm text-ink">{k.kun.map((r) => r.replace(/\..+$/, "")).join("、")}</p>
            </div>
          )}
          {k.on.length > 0 && (
            <div className="border border-ink/20 rounded-lg px-4 py-3">
              <p className="text-xs text-ink/50 uppercase mb-1">on</p>
              <p className="text-sm text-ink">{k.on.join("、")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className="mb-6">
        <div className="border-t border-ink/20 my-6" />
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 mb-4">Example Words</p>
        <div className="space-y-2">
          {ex.map((e, i) => (
            <div key={i} className="border border-ink/20 rounded-xl px-5 py-4 bg-white">
              <p className="text-base font-bold text-ink">{e.word}</p>
              <p className="text-xs text-ink/70 mt-0.5">{e.reading}</p>
              {e.sentence && (
                <p className="text-sm text-ink/70 mt-2">{e.sentence}</p>
              )}
              <p className="text-xs text-ink/60 mt-1">{e.sentenceEnglish || e.english}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/n5/flashcards/" className="border border-ink/20 rounded-lg h-11 px-5 text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center gap-1">
          🃏 Flashcards
        </Link>
        <Link href={`/n5/sets/${setNum}/`} className="border border-ink/20 rounded-lg h-11 px-5 text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center gap-1">
          ✍️ Test (Set {setNum})
        </Link>
      </div>

      {/* Prev / Next */}
      <div className="flex gap-2">
        {prev ? (
          <Link href={`/n5/study/${prev.id}/`} className="flex-1 border border-ink/20 rounded-lg h-12 flex items-center gap-2 px-4 text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all">
            <span>&larr;</span>
            <span className="hidden sm:inline">{prev.kanji}</span>
            <span className="text-ink/50 text-xs">#{prev.id}</span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link href={`/n5/study/${next.id}/`} className="flex-1 border border-ink/20 rounded-lg h-12 flex items-center gap-2 px-4 justify-end text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all">
            <span className="text-ink/50 text-xs">#{next.id}</span>
            <span className="hidden sm:inline">{next.kanji}</span>
            <span>&rarr;</span>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
