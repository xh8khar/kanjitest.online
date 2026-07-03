import type { APIRoute } from "astro"
import { siteUrl } from "@/lib/seo"
import { getAll, getVocabulary } from "@/lib/kanji"

export const GET: APIRoute = () => {
  const BASE = siteUrl()
  const urls: string[] = [
    BASE,
    `${BASE}/about/`,
    `${BASE}/privacy/`,
    `${BASE}/terms/`,
  ]

  for (const level of ["n5", "n4", "n3", "n2", "n1"] as const) {
    const all = getAll(level)

    urls.push(`${BASE}/${level}/`)
    urls.push(`${BASE}/${level}/study/`)
    urls.push(`${BASE}/${level}/flashcards/`)
    urls.push(`${BASE}/${level}/sets/`)
    urls.push(`${BASE}/${level}/vocabulary/`)

    for (const k of all) {
      urls.push(`${BASE}/${level}/study/${k.kanji}/`)
      urls.push(`${BASE}/${level}/flashcards/${k.kanji}/`)
    }

    for (let i = 1; i <= 20; i++) {
      urls.push(`${BASE}/${level}/sets/${i}/`)
    }

    const vocab = getVocabulary(level)
    for (const v of vocab) {
      urls.push(`${BASE}/${level}/vocabulary/${v.slug}/`)
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  })
}
