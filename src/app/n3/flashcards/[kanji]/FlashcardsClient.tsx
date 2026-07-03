"use client"

import { useEffect, useState, useCallback } from "react"
import { getAll, getByKanji } from "@/lib/kanji"
import { useRouter } from "next/navigation"
import Link from "next/link"

const STORAGE_KEY = "kanjitest_flashcards_n3"

interface FlashcardState {
  known: number[]
}

function loadState(): FlashcardState {
  if (typeof window === "undefined") return { known: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { known: [] }
}

function saveState(s: FlashcardState) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

export default function FlashcardsClient({ kanji }: { kanji: string }) {
  const all = getAll("n3")
  const router = useRouter()
  const [state, setState] = useState<FlashcardState>({ known: [] })
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setState(loadState())
  }, [])

  const k = getByKanji(kanji, "n3")

  const idx = all.findIndex((x) => x.kanji === kanji)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  const handleKnow = useCallback(() => {
    setFlipped(false)
    setState((prev) => {
      const known = prev.known.includes(k!.id) ? prev.known : [...prev.known, k!.id]
      const nextState = { ...prev, known }
      saveState(nextState)
      return nextState
    })
    if (next) router.push(`/n3/flashcards/${next.kanji}/`)
  }, [k, next, router])

  const handleAgain = useCallback(() => {
    setFlipped(false)
    setState((prev) => {
      const known = prev.known.filter((x) => x !== k!.id)
      const nextState = { ...prev, known }
      saveState(nextState)
      return nextState
    })
    if (next) router.push(`/n3/flashcards/${next.kanji}/`)
  }, [k, next, router])

  if (!k) return null

  const knownCount = state.known.length

  return (
    <div className="max-w-xl mx-auto px-4 py-5 sm:py-6">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-ink">Flashcards</h1>
          <p className="text-xs sm:text-sm text-ink/60">{knownCount} / {all.length} known</p>
        </div>
        <Link
          href="/n3/"
          className="text-xs sm:text-sm text-ink/60 hover:text-ink transition-colors"
        >
          Back to N3
        </Link>
      </div>

      <div
        className="bg-ink/5 border border-ink/20 rounded-xl min-h-[260px] sm:min-h-[340px] flex flex-col items-center justify-center cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        {!flipped ? (
          <>
            <span className="text-6xl sm:text-7xl font-black text-ink mb-2 leading-none">
              {k.kanji}
            </span>
            <span className="text-xs sm:text-sm text-ink/50">tap to flip</span>
          </>
        ) : (
          <div className="w-full px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-ink/50 uppercase tracking-wider">Readings</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                {k.kun.length > 0 && (
                  <span className="text-[11px] sm:text-xs bg-ink/10 text-ink/70 px-2 py-0.5 rounded-md">kun: {k.kun.join(", ")}</span>
                )}
                {k.on.length > 0 && (
                  <span className="text-[11px] sm:text-xs bg-ink/10 text-ink/70 px-2 py-0.5 rounded-md">on: {k.on.join(", ")}</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-ink/50 uppercase tracking-wider">Meanings</span>
              <p className="text-sm sm:text-base text-ink font-bold">{k.meanings.join(", ")}</p>
            </div>
            <hr className="border-t border-ink/10" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-ink/50 uppercase tracking-wider">Examples</span>
              {k.examples.slice(0, 2).map((ex, i) => (
                <div key={i} className="mt-1.5 sm:mt-2 p-2.5 sm:p-3 border border-ink/10 rounded-lg text-xs sm:text-sm">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="font-bold text-ink">{ex.word}</span>
                    <span className="text-ink/50">— {ex.reading}</span>
                    <span className="text-ink/40">({ex.english})</span>
                  </div>
                  <p className="mt-0.5 sm:mt-1 text-ink/60">{ex.sentence}</p>
                  <p className="text-ink/40 text-xs italic">{ex.sentenceEnglish}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-5 sm:mt-6 gap-2 sm:gap-3">
        <div className="flex gap-1.5 sm:gap-2">
          {prev && (
            <button
              className="h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm border border-ink/20 rounded-lg text-ink/60 hover:text-ink hover:border-ink/40 transition-colors"
              onClick={() => {
                setFlipped(false)
                router.push(`/n3/flashcards/${prev.kanji}/`)
              }}
            >
              ← {prev.kanji}
            </button>
          )}
          {next && (
            <button
              className="h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm border border-ink/20 rounded-lg text-ink/60 hover:text-ink hover:border-ink/40 transition-colors"
              onClick={() => {
                setFlipped(false)
                router.push(`/n3/flashcards/${next.kanji}/`)
              }}
            >
              {next.kanji} →
            </button>
          )}
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <button
            className="h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm border border-ink/30 rounded-lg font-bold text-ink hover:bg-ink/5 transition-colors flex-1 sm:flex-none"
            onClick={handleAgain}
          >
            Again
          </button>
          <button
            className="h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm bg-ink text-white rounded-lg font-bold hover:bg-ink/90 transition-colors flex-1 sm:flex-none"
            onClick={handleKnow}
          >
            Know it
          </button>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 bg-ink/5 rounded-full h-1.5 sm:h-2 overflow-hidden">
        <div
          className="bg-ink h-full rounded-full transition-all duration-300"
          style={{ width: `${(knownCount / all.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
