import { getDeck } from "@/lib/deck"

export function GET() {
  return new Response(JSON.stringify(getDeck("n1")), {
    headers: { "Content-Type": "application/json" },
  })
}
