import { getAll } from "@/lib/kanji"
import type { Level } from "@/lib/kanji"

const LEVELS: Level[] = ["n5", "n4", "n3", "n2", "n1"]

export function GET() {
  const all = LEVELS.flatMap((level) =>
    getAll(level).map((k) => ({
      kanji: k.kanji,
      kun: k.kun,
      on: k.on,
      meanings: k.meanings,
      strokes: k.strokes,
      level,
      examples: k.examples.slice(0, 2),
    }))
  )
  return new Response(JSON.stringify(all), {
    headers: { "Content-Type": "application/json" },
  })
}
