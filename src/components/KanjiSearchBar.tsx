import { useMemo, useRef, useState, useEffect } from "react"
import { navigate } from "astro:transitions/client"

interface KanjiItem {
  kanji: string
  meaning: string
  level: string
  url: string
}

interface Props {
  items: KanjiItem[]
}

type Tab = "kanji" | "meaning" | "reading"

function matchScore(k: KanjiItem, query: string, activeTab: Tab): number {
  const q = query.toLowerCase()
  if (activeTab === "kanji") {
    if (k.kanji === query) return 100
    if (k.kanji.startsWith(query)) return 80
    if (k.kanji.includes(query)) return 60
  }
  if (activeTab === "meaning") {
    const m = k.meaning.toLowerCase()
    if (m === q) return 90
    if (m.startsWith(q)) return 70
    if (m.includes(q)) return 50
  }
  if (activeTab === "reading") {
    if (k.kanji === query) return 85
  }
  if (k.kanji === query) return 75
  if (k.kanji.startsWith(query)) return 55
  const m = k.meaning.toLowerCase()
  if (m.startsWith(q)) return 45
  if (m.includes(q)) return 25
  return 0
}

const LEVEL_ORDER: Record<string, number> = { n5: 0, n4: 1, n3: 2, n2: 3, n1: 4 }

export default function KanjiSearchBar({ items }: Props) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("kanji")
  const [highlightIdx, setHighlightIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim()
    const scored = items
      .map((k) => ({ k, score: matchScore(k, q, activeTab) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => {
        const la = LEVEL_ORDER[a.k.level] ?? 99
        const lb = LEVEL_ORDER[b.k.level] ?? 99
        return b.score - a.score || la - lb
      })
    return scored.slice(0, 10)
  }, [query, items, activeTab])

  useEffect(() => {
    setHighlightIdx(0)
  }, [query, activeTab])

  useEffect(() => {
    if (!focused) setQuery("")
  }, [focused])

  const go = (url: string) => {
    setQuery("")
    setFocused(false)
    navigate(url)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && results[highlightIdx]) {
      e.preventDefault()
      go(results[highlightIdx].k.url)
    } else if (e.key === "Escape") {
      setFocused(false)
      inputRef.current?.blur()
    }
  }

  const tabs: Tab[] = ["kanji", "meaning", "reading"]

  return (
    <div
      className="relative w-full max-w-xl mx-auto"
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
      }}
    >
      <div className="relative flex items-center bg-white border border-ink/12 rounded-2xl shadow-sm shadow-ink/5 has-[input:focus]:border-vermilion/50 has-[input:focus]:shadow-md has-[input:focus]:shadow-vermilion/5 transition-all duration-150">
        <svg className="absolute left-4 w-5 h-5 text-ink/30 pointer-events-none shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search kanji…"
          className="flex-1 bg-transparent pl-11 pr-4 h-12 sm:h-13 text-sm sm:text-base text-ink outline-none placeholder:text-ink/30"
          aria-label="Search kanji"
          role="combobox"
          aria-expanded={focused && results.length > 0}
          aria-autocomplete="list"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus() }}
            className="mr-2 w-7 h-7 flex items-center justify-center rounded-full text-ink/30 hover:text-ink/60 hover:bg-ink/5 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {focused && query.trim() && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-ink/10 rounded-2xl shadow-xl shadow-ink/10 z-50 overflow-hidden"
          role="listbox"
        >
          {/* Tab bar */}
          <div className="flex border-b border-ink/8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onMouseDown={(e) => { e.preventDefault(); setActiveTab(tab) }}
                className={`flex-1 h-9 text-xs font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "text-ink border-b-2 border-vermilion"
                    : "text-ink/40 hover:text-ink/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {results.length === 0 ? (
            <p className="text-sm text-ink/40 text-center py-8">No results for "{query}"</p>
          ) : (
            <div className="py-1.5 max-h-[320px] overflow-y-auto scrollbar-none">
              {results.map(({ k }, i) => (
                <button
                  key={`${k.level}-${k.kanji}`}
                  onMouseDown={(e) => { e.preventDefault(); go(k.url) }}
                  onMouseEnter={() => setHighlightIdx(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === highlightIdx ? "bg-ink/5" : ""
                  }`}
                  role="option"
                  aria-selected={i === highlightIdx}
                >
                  <span className="font-jp font-black text-xl sm:text-2xl text-ink w-9 text-center shrink-0">
                    {k.kanji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink truncate">{k.meaning}</div>
                    <div className="text-[11px] text-ink/35 mt-0.5">JLPT {k.level.toUpperCase()}</div>
                  </div>
                  <svg className="w-4 h-4 text-ink/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-ink/8 px-4 py-2 text-[11px] text-ink/30 flex items-center justify-between">
            <span><kbd className="font-sans font-semibold text-ink/40">↑↓</kbd> navigate · <kbd className="font-sans font-semibold text-ink/40">↵</kbd> open · <kbd className="font-sans font-semibold text-ink/40">esc</kbd> close</span>
            <span className="hidden sm:inline">{results.length} of {items.length} kanji</span>
          </div>
        </div>
      )}
    </div>
  )
}
