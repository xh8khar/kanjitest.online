import { getDeck } from "@/lib/deck"

export function GET() {
  return new Response(JSON.stringify(getDeck("n4")), {
    headers: { "Content-Type": "application/json" },
  })
}
