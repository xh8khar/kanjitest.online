import { getAllGrammar } from "@/lib/grammar"

export function GET() {
  return new Response(JSON.stringify(getAllGrammar(), null, 2), {
    headers: { "Content-Type": "application/json" },
  })
}
