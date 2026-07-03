import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="border border-ink/20 rounded-xl px-8 py-8 bg-white max-w-sm">
        <span className="text-4xl block mb-4">🍥</span>
        <h1 className="text-lg font-bold text-ink mb-2">This page wandered off to study kanji.</h1>
        <p className="text-sm text-ink/60 mb-6">
          It probably passed N1 by now. Come try our quizzes instead!
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/" className="h-11 px-5 rounded-lg bg-ink text-white text-sm font-medium hover:bg-ink/80 transition-all flex items-center">Home</Link>
          <Link href="/n5/study/" className="h-11 px-5 rounded-lg border border-ink/20 text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center">Study</Link>
          <Link href="/n5/flashcards/" className="h-11 px-5 rounded-lg border border-ink/20 text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center">Flashcards</Link>
          <Link href="/n5/sets/" className="h-11 px-5 rounded-lg border border-ink/20 text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center">Test</Link>
        </div>
      </div>
    </div>
  )
}
