import data from "@/data/radicals.json"

export function GET() {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  })
}
