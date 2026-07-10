import type { APIRoute } from "astro"
import { siteUrl } from "@/lib/seo"
import { getAll, getVocabulary } from "@/lib/kanji"
import { getCollection } from "astro:content"
import { radicals, toSlug } from "@/lib/radicals"
import { getAllGrammar } from "@/lib/grammar"

export const GET: APIRoute = async () => {
  const BASE = siteUrl()
  const now = new Date().toISOString().split("T")[0]

  interface UrlEntry {
    loc: string
    priority: string
    changefreq: string
  }

  const blogPosts = await getCollection("blog")
  const publishedBlogPosts = blogPosts.filter((p) => !p.data.draft)

  const toolSlugs = [
    "age-converter", "body-parts", "color-names", "counter-reference",
    "daily-challenge", "date-converter", "direction-words", "family-terms",
    "flashcard-exporter", "food-drink", "japanese-clock", "jlpt-countdown",
    "jlpt-level-guide", "jlpt-score-checker", "kana-chart", "kana-converter",
    "kana-quiz", "kanji-by-level", "kanji-dictionary", "kanji-flash-quiz",
    "kanji-grid", "kanji-highlighter", "memory-match", "name-to-katakana",
    "number-to-japanese", "particle-guide", "professions", "random-kanji",
    "reading-quiz", "reading-time", "romaji-converter", "streak-tracker",
    "study-timer", "text-analyzer", "time-guide", "typing-practice",
    "vocab-quiz", "weather-vocab", "word-counter", "word-match",
  ]

const entries: UrlEntry[] = [
    { loc: BASE, priority: "1.0", changefreq: "weekly" },
    { loc: `${BASE}/blog/`, priority: "0.8", changefreq: "weekly" },
    ...publishedBlogPosts.map((p) => ({
      loc: `${BASE}/blog/${p.id}/`,
      priority: "0.7" as const,
      changefreq: "monthly" as const,
    })),
    { loc: `${BASE}/tools/`, priority: "0.8", changefreq: "weekly" },
    ...toolSlugs.map((slug) => ({
      loc: `${BASE}/tools/${slug}/`,
      priority: "0.7" as const,
      changefreq: "monthly" as const,
    })),
    { loc: `${BASE}/learn/`, priority: "0.8", changefreq: "weekly" },
    { loc: `${BASE}/learn/radicals/`, priority: "0.7", changefreq: "monthly" },
    ...radicals.map((r) => ({
      loc: `${BASE}/learn/radicals/${toSlug(r.meaning, r.id, r.slug)}/`,
      priority: "0.6" as const,
      changefreq: "monthly" as const,
    })),
    { loc: `${BASE}/learn/hiragana/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${BASE}/learn/katakana/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${BASE}/about/`, priority: "0.5", changefreq: "monthly" },
    { loc: `${BASE}/privacy/`, priority: "0.3", changefreq: "monthly" },
    { loc: `${BASE}/terms/`, priority: "0.3", changefreq: "monthly" },
  ]

  for (const level of ["n5", "n4", "n3", "n2", "n1"] as const) {
    const all = getAll(level)

    entries.push({ loc: `${BASE}/${level}/`, priority: "0.9", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/study/`, priority: "0.9", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/flashcards/`, priority: "0.8", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/sets/`, priority: "0.8", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/vocabulary/`, priority: "0.8", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/grammar/`, priority: "0.8", changefreq: "weekly" })

    for (const k of all) {
      entries.push({ loc: `${BASE}/${level}/study/${k.kanji}/`, priority: "0.7", changefreq: "monthly" })
      entries.push({ loc: `${BASE}/${level}/flashcards/${k.kanji}/`, priority: "0.6", changefreq: "monthly" })
    }

    for (let i = 1; i <= 20; i++) {
      entries.push({ loc: `${BASE}/${level}/sets/${i}/`, priority: "0.7", changefreq: "monthly" })
    }

    const vocab = getVocabulary(level)
    for (const v of vocab) {
      entries.push({ loc: `${BASE}/${level}/vocabulary/${v.slug}/`, priority: "0.6", changefreq: "monthly" })
    }

    const levelGrammar = getAllGrammar().filter((g) => g.level === level)
    for (const g of levelGrammar) {
      entries.push({ loc: `${BASE}/${level}/grammar/${g.id}/`, priority: "0.6", changefreq: "monthly" })
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${now}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join("\n")}
</urlset>`

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}