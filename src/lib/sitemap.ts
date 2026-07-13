import { siteUrl } from "@/lib/seo"
import { getAll, getVocabulary } from "@/lib/kanji"
import { getCollection } from "astro:content"
import { radicals, toSlug } from "@/lib/radicals"
import { particles, toSlug as particleSlug } from "@/lib/particles"
import { getAllGrammar } from "@/lib/grammar"
import { SETS_PER_LEVEL } from "@/lib/levels"
import stories from "@/data/stories.json"

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
    ...radicals.map((r) => ({
      loc: `${BASE}/learn/radicals/${toSlug(r.radical)}/`,
      priority: "0.6" as const,
      changefreq: "monthly" as const,
    })),
    { loc: `${BASE}/learn/hiragana/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${BASE}/learn/katakana/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${BASE}/learn/particles/`, priority: "0.7", changefreq: "monthly" },
    ...particles.map((p) => ({
      loc: `${BASE}/learn/particles/${particleSlug(p)}/`,
      priority: "0.6" as const,
      changefreq: "monthly" as const,
    })),
    { loc: `${BASE}/stories/`, priority: "0.7", changefreq: "weekly" },
    ...stories.map((s) => ({
      loc: `${BASE}/stories/${s.kanji}/`,
      priority: "0.6" as const,
      changefreq: "monthly" as const,
    })),
    { loc: `${BASE}/word-of-the-day/`, priority: "0.7", changefreq: "daily" },
    { loc: `${BASE}/open-source/`, priority: "0.6", changefreq: "monthly" },
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

    for (let i = 1; i <= SETS_PER_LEVEL; i++) {
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

  return entries
}
