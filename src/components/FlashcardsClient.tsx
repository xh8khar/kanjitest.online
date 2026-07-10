import { useEffect, useState, useCallback, useRef, useMemo } from "react"

const STORAGE_KEY = "kanjitest_flashcards"

export interface CardExample {
  word: string
  reading: string
  english: string
  sentence?: string
  sentenceEnglish?: string
}

export interface CardData {
  id: number
  kanji: string
  kun: string[]
  on: string[]
  meanings: string[]
  strokes: number
  examples: CardExample[]
}

interface Props {
  level: string
  /** the card this page was statically built for */
  entry: CardData
  startIndex: number
  total: number
}

interface FlashcardState {
  known: number[]
}

function loadState(key: string): FlashcardState {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { known: [] }
}

function saveState(key: string, s: FlashcardState) {
  try {
    localStorage.setItem(key, JSON.stringify(s))
  } catch {}
}

export default function FlashcardsClient({ level, entry: initialEntry, startIndex, total }: Props) {
  const prefix = `/${level}`
  const [mounted, setMounted] = useState(false)
  // Pages embed one card; the full deck arrives from deck.json (one small
  // cached fetch per level) and unlocks instant client-side navigation.
  const [cards, setCards] = useState<CardData[] | null>(null)
  const [currentIdx, setCurrentIdx] = useState(startIndex)
  const [flipped, setFlipped] = useState(false)
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null)
  const [enterDir, setEnterDir] = useState<"left" | "right" | null>(null)
  const [showJump, setShowJump] = useState(false)
  const [search, setSearch] = useState("")
  const touchX = useRef<number | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<FlashcardState>({ known: [] })
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    let alive = true
    fetch(`${prefix}/flashcards/deck.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((deck: CardData[] | null) => {
        if (alive && deck?.length) setCards(deck)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [prefix])

  const storageKey = `${STORAGE_KEY}_${level}`
  useEffect(() => { setState(loadState(storageKey)) }, [storageKey])

  const deckSize = cards?.length ?? total
  const entry = cards ? cards[currentIdx] : initialEntry

  // Sync URL without navigation
  useEffect(() => {
    if (entry) {
      window.history.replaceState(null, "", `${prefix}/flashcards/${entry.kanji}/`)
    }
  }, [entry, prefix])

  const nextKanji = cards && currentIdx < cards.length - 1 ? cards[currentIdx + 1].kanji : null
  const prevKanji = cards && currentIdx > 0 ? cards[currentIdx - 1].kanji : null

  const allKanji = useMemo(
    () => (cards ?? []).map((c) => ({ kanji: c.kanji, id: c.id, meaning: c.meanings[0] })),
    [cards]
  )

  const filtered = useMemo(() => {
    if (!search.trim()) return allKanji
    const q = search.trim().toLowerCase()
    return allKanji.filter(
      (k) => k.kanji.includes(q) || k.meaning.toLowerCase().includes(q)
    )
  }, [allKanji, search])

  useEffect(() => {
    if (showJump && searchRef.current) searchRef.current.focus()
  }, [showJump])

  const go = useCallback(
    (dir: "left" | "right") => {
      if (!cards) return
      const target = dir === "right" ? currentIdx + 1 : currentIdx - 1
      if (target < 0 || target >= cards.length) return
      // phase 1: fade the old card out, phase 2: swap and slide the new
      // card in from the direction of travel (keyed remount plays it)
      setLeaving(dir)
      setTimeout(() => {
        setFlipped(false)
        setCurrentIdx(target)
        setLeaving(null)
        setEnterDir(dir)
      }, 140)
    },
    [currentIdx, cards]
  )

  const mark = useCallback(
    (know: boolean) => {
      if (!entry) return
      setState((prev) => {
        const known = know
          ? prev.known.includes(entry.id)
            ? prev.known
            : [...prev.known, entry.id]
          : prev.known.filter((x) => x !== entry.id)
        const nextState = { known }
        saveState(storageKey, nextState)
        return nextState
      })
      // both answers continue forward — moving backwards was disorienting
      if (cards && currentIdx < cards.length - 1) go("right")
    },
    [entry, currentIdx, cards, storageKey, go]
  )

  const jumpTo = useCallback(
    (kanji: string) => {
      if (!cards) return
      const idx = cards.findIndex((c) => c.kanji === kanji)
      if (idx === -1) return
      setShowJump(false)
      setFlipped(false)
      setCurrentIdx(idx)
      setEnterDir("right")
    },
    [cards]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showJump) {
        if (e.key === "Escape") setShowJump(false)
        return
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === "ArrowLeft") {
        go("left")
      } else if (e.key === "ArrowRight") {
        go("right")
      } else if (e.key === "1" || e.key.toLowerCase() === "a") {
        mark(false)
      } else if (e.key === "2" || e.key.toLowerCase() === "k") {
        mark(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, mark, showJump])

  const isKnown = entry ? state.known.includes(entry.id) : false
  const knownCount = state.known.length
  const pct = deckSize > 0 ? Math.round(((currentIdx + 1) / deckSize) * 100) : 0

  if (!entry) return null

  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-up">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-black text-ink">Flashcards</h1>
            <p className="text-xs text-ink/55 mt-0.5">
              Card {currentIdx + 1} of {deckSize} · {knownCount} known
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setShowJump(true); setSearch("") }} className="btn btn-ghost h-9 px-3 text-xs">
            Jump to
          </button>
          <a href={`${prefix}/flashcards/`} className="btn btn-ghost h-9 px-3.5 text-xs">
            All cards
          </a>
        </div>
      </div>

      {/* Card */}
      <div
        style={{ opacity: mounted ? undefined : 0 }}
        className={`perspective-1200 select-none transition-opacity duration-150 ease-out ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          touchX.current = null
          if (dx < -60) go("right")
          else if (dx > 60) go("left")
        }}
      >
        <div
          key={currentIdx}
          role="button"
          tabIndex={0}
          aria-label={flipped ? "Show kanji" : "Reveal readings and meanings"}
          onClick={() => setFlipped((f) => !f)}
          className={`relative w-full min-h-[320px] sm:min-h-[380px] preserve-3d cursor-pointer transition-transform duration-[280ms] [transition-timing-function:cubic-bezier(0.34,1.3,0.5,1)] ${
            flipped ? "rotate-y-180" : ""
          } ${enterDir === "right" ? "animate-card-in-r" : enterDir === "left" ? "animate-card-in-l" : ""}`}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden card flex flex-col items-center justify-center shadow-lg shadow-ink/5">
            <div className="absolute top-4 left-4 chip">#{entry.id}</div>
            {isKnown && (
              <div className="absolute top-4 right-4 chip bg-emerald-500/10 text-emerald-600 animate-pop">
                ✓ known
              </div>
            )}
            <span className="text-8xl sm:text-9xl font-jp font-black text-ink leading-none animate-ink-in">
              {entry.kanji}
            </span>
            <span className="mt-6 text-xs text-ink/40">tap to flip · swipe to move</span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 card overflow-y-auto shadow-lg shadow-ink/5">
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-jp text-3xl font-black text-ink">{entry.kanji}</span>
                <span className="text-base font-bold text-ink">{entry.meanings.join(", ")}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entry.kun.length > 0 && (
                  <span className="chip">kun: {entry.kun.join("、")}</span>
                )}
                {entry.on.length > 0 && (
                  <span className="chip">on: {entry.on.join("、")}</span>
                )}
              </div>
              <hr className="border-ink/8" />
              <div className="space-y-2.5">
                {entry.examples.slice(0, 2).map((ex, i) => (
                  <div key={i} className="rounded-xl bg-ink/[0.03] border border-ink/8 px-3.5 py-3 text-sm">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-jp font-bold text-ink">{ex.word}</span>
                      <span className="text-ink/55 text-xs">{ex.reading}</span>
                      <span className="text-ink/45 text-xs">· {ex.english}</span>
                    </div>
                    {ex.sentence && <p className="mt-1.5 text-[13px] text-ink/70 font-jp leading-relaxed">{ex.sentence}</p>}
                    {ex.sentenceEnglish && <p className="text-ink/45 text-[11px] mt-0.5">{ex.sentenceEnglish}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Don't know / Know it */}
      <div className="grid grid-cols-2 gap-2.5 mt-5">
        <button
          className="btn h-12 text-sm border border-vermilion/30 bg-vermilion/5 text-vermilion hover:bg-vermilion/10 hover:border-vermilion/50"
          onClick={() => mark(false)}
        >
          ✗ Don't know
        </button>
        <button className="btn h-12 text-sm text-white bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30" onClick={() => mark(true)}>
          ✓ I know this
        </button>
      </div>
      <p className="text-[11px] text-ink/40 text-center mt-2">
        Be honest — either answer moves to the next card, and your progress saves automatically.
      </p>

      {/* Prev / next */}
      <div className="flex items-center justify-between mt-3">
        <button
          className={`btn btn-ghost h-10 px-4 text-sm font-jp ${!prevKanji ? "opacity-30 pointer-events-none" : ""}`}
          onClick={() => go("left")}
          disabled={!prevKanji}
        >
          ← {prevKanji ?? ""}
        </button>
        <span className="text-[11px] text-ink/35 hidden sm:block">space = flip · ←/→ = move · K = I know this</span>
        <button
          className={`btn btn-ghost h-10 px-4 text-sm font-jp ${!nextKanji ? "opacity-30 pointer-events-none" : ""}`}
          onClick={() => go("right")}
          disabled={!nextKanji}
        >
          {nextKanji ?? ""} →
        </button>
      </div>

      {/* Deck progress */}
      <div className="mt-6">
        <div className="flex justify-between text-[11px] text-ink/40 mb-1.5">
          <span>deck progress</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <div className="bg-ink/5 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-vermilion to-orange-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Jump-to-kanji overlay */}
      {showJump && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 animate-fade-in"
          onClick={() => setShowJump(false)}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl shadow-ink/20 border border-ink/10 max-h-[70vh] flex flex-col animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 p-4 border-b border-ink/8">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search kanji or meaning…"
                className="flex-1 bg-ink/[0.03] border border-ink/12 rounded-xl px-4 h-11 text-sm text-ink outline-none focus:border-vermilion/50 focus:bg-white transition-colors placeholder:text-ink/30"
              />
              <button
                onClick={() => setShowJump(false)}
                className="btn btn-ghost h-9 px-3 text-xs shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
              {filtered.length === 0 ? (
                <p className="text-sm text-ink/40 text-center py-8">
                  {cards ? `No kanji match "${search}"` : "Loading deck…"}
                </p>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                  {filtered.map((k) => (
                    <button
                      key={k.id}
                      onClick={() => jumpTo(k.kanji)}
                      className={`kanji-tile relative flex flex-col items-center justify-center py-2 px-1 cursor-pointer ${
                        k.id === entry.id
                          ? "ring-2 ring-vermilion bg-vermilion/5 border-vermilion/30"
                          : ""
                      }`}
                    >
                      <span className="text-lg font-jp font-black text-ink leading-none">{k.kanji}</span>
                      <span className="text-[9px] text-ink/40 mt-1 leading-tight text-center truncate w-full">
                        {k.meaning}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="px-4 py-2.5 border-t border-ink/8 text-[11px] text-ink/30 text-center">
              {filtered.length} of {allKanji.length} kanji
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
