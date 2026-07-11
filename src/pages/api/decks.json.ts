import { getAll } from "@/lib/kanji"
import type { Level } from "@/lib/kanji"

const levels: Level[] = ["n5", "n4", "n3", "n2", "n1"]

export function GET() {
  const decks = Object.fromEntries(
    levels.map((l) => [l, getAll(l)])
  )
  return new Response(JSON.stringify(decks, null, 2), {
    headers: { "Content-Type": "application/json" },
  })
}
