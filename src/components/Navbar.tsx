"use client"

import { useState, useEffect } from "react"

const LEVELS = [
  { label: "N5", prefix: "/n5", exists: true },
  { label: "N4", prefix: "/n4", exists: true },
  { label: "N3", prefix: "/n3", exists: true },
  { label: "N2", prefix: "/n2", exists: true },
  { label: "N1", prefix: "/n1", exists: true },
] as const

const SUB_LINKS = [
  { id: "study", label: "Study" },
  { id: "flashcards", label: "Flashcards" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "sets", label: "Test" },
] as const

export default function Navbar() {
  const [path, setPath] = useState("")
  const [open, setOpen] = useState(false)
  const [mobileLevel, setMobileLevel] = useState<string | null>(null)

  useEffect(() => {
    setPath(window.location.pathname)
    const handler = () => setPath(window.location.pathname)
    window.addEventListener("popstate", handler)
    return () => window.removeEventListener("popstate", handler)
  }, [])

  useEffect(() => { setOpen(false) }, [path])

  const isLevelActive = (prefix: string) => path.startsWith(prefix + "/") || path === prefix
  const isSubActive = (prefix: string, subId: string) => path.startsWith(`${prefix}/${subId}/`)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 h-[3.25rem] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-black text-ink">KanjiTest<span className="text-blue-500">.Online</span></span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center h-full gap-1">
          {LEVELS.map((lv) => (
            <div key={lv.prefix} className="relative h-full group">
              <a
                href={`${lv.prefix}/`}
                className={`h-full flex items-center px-2.5 text-sm transition-all border-b-2 whitespace-nowrap ${
                  isLevelActive(lv.prefix)
                    ? "border-ink text-ink font-medium"
                    : "border-transparent text-ink/70 hover:text-ink hover:border-ink/40"
                }`}
              >
                {lv.label}
                <svg className="ml-0.5 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <div className="absolute top-full left-0 pt-1 hidden group-hover:block min-w-[128px]">
                <div className="bg-white border border-ink/20 rounded-lg shadow-lg py-1">
                  {SUB_LINKS.map((sub) => (
                    <a
                      key={sub.id}
                      href={lv.exists ? `${lv.prefix}/${sub.id}/` : `${lv.prefix}/`}
                      className={`block px-4 py-2.5 text-sm transition-all ${
                        isSubActive(lv.prefix, sub.id)
                          ? "text-ink font-medium bg-ink/10"
                          : "text-ink/70 hover:text-ink hover:bg-ink/10"
                      }`}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-11 h-11 -mr-1 flex items-center justify-center text-ink/70 hover:text-ink transition-all"
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-white max-h-[85vh] overflow-y-auto shadow-lg">
          {LEVELS.map((lv) => (
            <div key={lv.prefix}>
              <button
                onClick={() => setMobileLevel(mobileLevel === lv.prefix ? null : lv.prefix)}
                className={`w-full flex items-center justify-between px-5 h-13 text-sm transition-all ${
                  isLevelActive(lv.prefix)
                    ? "text-ink font-medium bg-ink/5"
                    : "text-ink/70 hover:text-ink hover:bg-ink/5"
                }`}
              >
                <span>{lv.label}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${mobileLevel === lv.prefix ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  mobileLevel === lv.prefix ? "max-h-64" : "max-h-0"
                }`}
              >
                <div className="bg-ink/[0.03] border-t border-b border-ink/5">
                  {SUB_LINKS.map((sub) => (
                    <a
                      key={sub.id}
                      href={lv.exists ? `${lv.prefix}/${sub.id}/` : `${lv.prefix}/`}
                      className={`block pl-9 pr-5 h-13 flex items-center text-sm transition-all ${
                        isSubActive(lv.prefix, sub.id)
                          ? "text-ink font-medium bg-ink/10"
                          : "text-ink/70 hover:text-ink hover:bg-ink/5"
                      }`}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}
