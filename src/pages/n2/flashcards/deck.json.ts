import { getDeck } from "@/lib/deck"

export function GET() {
  return new Response(JSON.stringify(getDeck("n2")), {
    headers: { "Content-Type": "application/json" },
  })
}
