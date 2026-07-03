import Link from "next/link"

const LEVELS = [
  { label: "N5", prefix: "/n5", exists: true },
  { label: "N4", prefix: "/n4", exists: true },
  { label: "N3", prefix: "/n3", exists: true },
  { label: "N2", prefix: "/n2", exists: false },
  { label: "N1", prefix: "/n1", exists: false },
] as const

export default function Footer() {
  return (
    <footer className="border-t border-ink/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
          {LEVELS.map((lv) => (
            <div key={lv.prefix}>
              <Link
                href={`${lv.prefix}/`}
                className="text-sm font-semibold text-ink hover:text-ink/80 transition-all"
              >
                {lv.label}
              </Link>
              {lv.exists ? (
                <div className="flex flex-col gap-0.5 mt-1.5">
                  <Link href={`${lv.prefix}/study/`} className="text-xs sm:text-sm text-ink/60 hover:text-ink transition-colors">Study</Link>
                  <Link href={`${lv.prefix}/flashcards/`} className="text-xs sm:text-sm text-ink/60 hover:text-ink transition-colors">Flashcards</Link>
                  <Link href={`${lv.prefix}/vocabulary/`} className="text-xs sm:text-sm text-ink/60 hover:text-ink transition-colors">Vocabulary</Link>
                  <Link href={`${lv.prefix}/sets/`} className="text-xs sm:text-sm text-ink/60 hover:text-ink transition-colors">Test</Link>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-ink/40 mt-1.5">Coming soon</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-1 text-xs sm:text-sm mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-ink/10">
          <Link href="/about/" className="text-ink/60 hover:text-ink transition-colors">About</Link>
          <Link href="/privacy/" className="text-ink/60 hover:text-ink transition-colors">Privacy</Link>
          <Link href="/terms/" className="text-ink/60 hover:text-ink transition-colors">Terms</Link>
          <span className="text-[11px] sm:text-xs text-ink/40">&copy; 2026 www.kanjitest.online</span>
        </div>
      </div>
    </footer>
  )
}
