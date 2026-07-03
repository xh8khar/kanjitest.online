import Sidebar from "@/components/Sidebar"

export default function N4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto flex">
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-20">
          <Sidebar level="n4" />
        </div>
      </aside>

      <div className="lg:hidden w-full overflow-x-auto px-4 py-3 scrollbar-none">
        <MobileN4Chips />
      </div>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

function MobileN4Chips() {
  return (
    <div className="flex gap-2 pb-1">
      <a href="/n4/study/" className="shrink-0 border border-ink/20 rounded-lg h-11 px-4 text-sm text-ink/70 hover:border-ink/40 transition-all bg-white flex items-center">Study</a>
      <a href="/n4/flashcards/" className="shrink-0 border border-ink/20 rounded-lg h-11 px-4 text-sm text-ink/70 hover:border-ink/40 transition-all bg-white flex items-center">Flashcards</a>
      <a href="/n4/sets/" className="shrink-0 border border-ink/20 rounded-lg h-11 px-4 text-sm text-ink/70 hover:border-ink/40 transition-all bg-white flex items-center">Test</a>
      <a href="/n4/" className="shrink-0 border border-ink/20 rounded-lg h-11 px-4 text-sm text-ink/70 hover:border-ink/40 transition-all bg-white flex items-center">Hub</a>
    </div>
  )
}
