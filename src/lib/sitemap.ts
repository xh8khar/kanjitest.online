import { siteUrl } from "@/lib/seo"
import { getCollection } from "astro:content"
import { SETS_PER_LEVEL } from "@/lib/levels"

export const MAX_URLS = 5000

export interface SitemapEntry {
  loc: string
  priority: string
  changefreq: string
}

export async function getAllEntries(): Promise<SitemapEntry[]> {
  const BASE = siteUrl()

  const blogPosts = await getCollection("blog")
  const publishedBlogPosts = blogPosts.filter((p) => !p.data.draft)

  const toolSlugs = [
    "age-converter", "body-parts", "color-names", "counter-reference",
    "daily-challenge", "date-converter", "direction-words", "family-terms",
    "flashcard-exporter", "food-drink", "japanese-clock", "jlpt-countdown",
    "jlpt-level-guide", "jlpt-score-checker", "kana-chart", "kana-converter",
    "kana-quiz", "kanji-by-level", "kanji-dictionary", "kanji-flash-quiz",
    "kanji-grid", "kanji-highlighter", "memory-match", "name-to-katakana",
    "number-to-japanese", "professions", "random-kanji",
    "reading-quiz", "reading-time", "romaji-converter", "streak-tracker",
    "study-timer", "text-analyzer", "time-guide", "typing-practice",
    "vocab-quiz", "weather-vocab", "widget",
    "word-counter", "word-match",
    "n5-kanji-checklist", "kanji-worksheet",
  ]

  const entries: SitemapEntry[] = [
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
    { loc: `${BASE}/learn/hiragana/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${BASE}/learn/katakana/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${BASE}/learn/particles/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${BASE}/stories/`, priority: "0.7", changefreq: "weekly" },
    { loc: `${BASE}/word-of-the-day/`, priority: "0.7", changefreq: "daily" },
    { loc: `${BASE}/open-source/`, priority: "0.6", changefreq: "monthly" },
    { loc: `${BASE}/about/`, priority: "0.5", changefreq: "monthly" },
    { loc: `${BASE}/privacy/`, priority: "0.3", changefreq: "monthly" },
    { loc: `${BASE}/terms/`, priority: "0.3", changefreq: "monthly" },
  ]

  for (const level of ["n5", "n4", "n3", "n2", "n1"] as const) {
    entries.push({ loc: `${BASE}/${level}/`, priority: "0.9", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/study/`, priority: "0.9", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/flashcards/`, priority: "0.8", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/sets/`, priority: "0.8", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/vocabulary/`, priority: "0.8", changefreq: "weekly" })
    entries.push({ loc: `${BASE}/${level}/grammar/`, priority: "0.8", changefreq: "weekly" })

    for (let i = 1; i <= SETS_PER_LEVEL; i++) {
      entries.push({ loc: `${BASE}/${level}/sets/${i}/`, priority: "0.7", changefreq: "monthly" })
    }
  }

  return entries
}
