"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { getAll } from "@/lib/kanji"
import type { Level } from "@/lib/kanji"

export default function Sidebar({ level = "n5" }: { level?: Level }) {
  const path = usePathname()
  const all = getAll(level)
  const prefix = `/${level}`
  const isActive = (href: string) => path.startsWith(href)
  const setCount = 20

  return (
    <div className="space-y-6 py-6 pr-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div>
        <Link href={`${prefix}/study/`} className={`block border-b border-ink/20 py-2.5 text-sm transition-colors ${isActive(`${prefix}/study/`) ? "text-ink font-medium" : "text-ink/70 hover:text-ink"}`}>
          Study
        </Link>
        <Link href={`${prefix}/flashcards/`} className={`block border-b border-ink/20 py-2.5 text-sm transition-colors ${isActive(`${prefix}/flashcards/`) ? "text-ink font-medium" : "text-ink/70 hover:text-ink"}`}>
          Flashcards
        </Link>
        <Link href={`${prefix}/sets/`} className={`block border-b border-ink/20 py-2.5 text-sm transition-colors ${isActive(`${prefix}/sets/`) ? "text-ink font-medium" : "text-ink/70 hover:text-ink"}`}>
          Tests
        </Link>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 px-3 mb-2">Jump to Kanji</p>
        <div className="grid grid-cols-8 gap-1 px-2">
          {all.map((k) => {
            const isDetail = path === `${prefix}/study/${k.kanji}/`
            return (
              <Link
                key={k.id}
                href={`${prefix}/study/${k.kanji}/`}
                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs transition-all ${
                  isDetail
                    ? "bg-ink text-white"
                    : "text-ink/60 hover:bg-ink/10"
                }`}
              >
                {k.kanji}
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-ink/50 px-3 mb-2">Test Sets</p>
        <div className="flex flex-wrap gap-1.5 px-2">
          {Array.from({ length: setCount }, (_, i) => i + 1).map((n) => (
            <Link
              key={`set-${n}`}
              href={`${prefix}/sets/${n}/`}
              className={`px-2 h-7 rounded-md text-xs flex items-center transition-all ${
                isActive(`${prefix}/sets/${n}/`)
                  ? "text-ink font-medium"
                  : "text-ink/50 hover:bg-ink/10"
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
