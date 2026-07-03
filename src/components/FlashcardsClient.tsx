"use client"

import { useEffect, useState, useCallback } from "react"
import { getAll, getByKanji } from "@/lib/kanji"
import type { Level } from "@/lib/kanji"

const STORAGE_KEY = "kanjitest_flashcards"

interface FlashcardState {
  known: number[]
}

function loadState(key: string): FlashcardState {
  if (typeof window === "undefined") return { known: [] }
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { known: [] }
}

function saveState(key: string, s: FlashcardState) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(s))
}

export default function FlashcardsClient({ kanji, level = "n5" }: { kanji: string; level?: Level }) {
  const all = getAll(level)
  const storageKey = `${STORAGE_KEY}_${level}`
  const [state, setState] = useState<FlashcardState>({ known: [] })
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setState(loadState(storageKey))
  }, [storageKey])

  const k = getByKanji(kanji, level)

  const idx = all.findIndex((x) => x.kanji === kanji)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  const navigate = (path: string) => {
    setFlipped(false)
    if (typeof window !== "undefined") window.location.href = path
  }

  const handleKnow = useCallback(() => {
    setFlipped(false)
    setState((prev) => {
      const known = prev.known.includes(k!.id) ? prev.known : [...prev.known, k!.id]
      const nextState = { ...prev, known }
      saveState(storageKey, nextState)
      return nextState
    })
    if (next) navigate(`/${level}/flashcards/${next.kanji}/`)
  }, [k, next, level, storageKey])

  const handleAgain = useCallback(() => {
    setFlipped(false)
    setState((prev) => {
      const known = prev.known.filter((x) => x !== k!.id)
      const nextState = { ...prev, known }
      saveState(storageKey, nextState)
      return nextState
    })
    if (next) navigate(`/${level}/flashcards/${next.kanji}/`)
  }, [k, next, level, storageKey])

  if (!k) return null

  const knownCount = state.known.length
  const prefix = `/${level}`

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-ink">Flashcards</h1>
          <p className="text-sm text-ink/60">{knownCount} / {all.length} known</p>
        </div>
        <a
          href={`${prefix}/`}
          className="text-sm text-ink/60 hover:text-ink transition-colors"
        >
          Back to {level.toUpperCase()}
        </a>
      </div>

      <div
        className="bg-ink/5 border border-ink/20 rounded-xl min-h-[280px] sm:min-h-[340px] flex flex-col items-center justify-center cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        {!flipped ? (
          <>
            <span className="text-7xl font-black text-ink mb-2 leading-none">
              {k.kanji}
            </span>
            <span className="text-sm text-ink/50">tap to flip</span>
          </>
        ) : (
          <div className="w-full px-6 py-4 space-y-4">
            <div>
              <span className="text-sm font-bold text-ink/50 uppercase tracking-wider">Readings</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {k.kun.length > 0 && (
                  <span className="text-xs bg-ink/10 text-ink/70 px-2 py-0.5 rounded-md">kun: {k.kun.join(", ")}</span>
                )}
                {k.on.length > 0 && (
                  <span className="text-xs bg-ink/10 text-ink/70 px-2 py-0.5 rounded-md">on: {k.on.join(", ")}</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-ink/50 uppercase tracking-wider">Meanings</span>
              <p className="text-base text-ink font-bold">{k.meanings.join(", ")}</p>
            </div>
            <hr className="border-t border-ink/10" />
            <div>
              <span className="text-sm font-bold text-ink/50 uppercase tracking-wider">Examples</span>
              {k.examples.slice(0, 2).map((ex, i) => (
                <div key={i} className="mt-2 p-3 border border-ink/10 rounded-lg text-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-ink">{ex.word}</span>
                    <span className="text-ink/50">— {ex.reading}</span>
                    <span className="text-ink/40">({ex.english})</span>
                  </div>
                  <p className="mt-1 text-ink/60">{ex.sentence}</p>
                  <p className="text-ink/40 text-xs italic">{ex.sentenceEnglish}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-6 gap-2 sm:gap-3">
        <div className="flex gap-2">
          {prev && (
            <button
              className="h-11 px-4 text-sm border border-ink/20 rounded-lg text-ink/60 hover:text-ink hover:border-ink/40 transition-colors"
              onClick={() => navigate(`/${level}/flashcards/${prev.kanji}/`)}
            >
              ← {prev.kanji}
            </button>
          )}
          {next && (
            <button
              className="h-11 px-4 text-sm border border-ink/20 rounded-lg text-ink/60 hover:text-ink hover:border-ink/40 transition-colors"
              onClick={() => navigate(`/${level}/flashcards/${next.kanji}/`)}
            >
              {next.kanji} →
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="h-11 px-5 text-sm border border-ink/30 rounded-lg font-bold text-ink hover:bg-ink/5 transition-colors"
            onClick={handleAgain}
          >
            Again
          </button>
          <button
            className="h-11 px-5 text-sm bg-ink text-white rounded-lg font-bold hover:bg-ink/90 transition-colors"
            onClick={handleKnow}
          >
            Know it
          </button>
        </div>
      </div>

      <div className="mt-6 bg-ink/5 rounded-full h-2 overflow-hidden">
        <div
          className="bg-ink h-full rounded-full transition-all duration-300"
          style={{ width: `${(knownCount / all.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
