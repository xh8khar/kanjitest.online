import { siteUrl } from "@/lib/seo"
import { getCollection } from "astro:content"
import { LEVEL_IDS, SETS_PER_LEVEL } from "@/lib/levels"
import { getAll, getVocabulary } from "@/lib/kanji"
import { getAllGrammar } from "@/lib/grammar"
import { radicals, toSlug } from "@/lib/radicals"

export const MAX_URLS = 5000

export interface SitemapEntry {
  loc: string
  priority: string
  changefreq: string
}

type Level = "n5" | "n4" | "n3" | "n2" | "n1"

const LEVELS: Level[] = ["n5", "n4", "n3", "n2", "n1"]

function push(entries: SitemapEntry[], path: string, priority: string, changefreq: string): void {
  entries.push({ loc: path, priority, changefreq })
}

export async function getAllEntries(): Promise<SitemapEntry[]> {
  const BASE = siteUrl()
  const entries: SitemapEntry[] = []

  // static pages
  push(entries, `${BASE}/`, "1.0", "weekly")
  push(entries, `${BASE}/about/`, "0.5", "monthly")
  push(entries, `${BASE}/privacy/`, "0.3", "monthly")
  push(entries, `${BASE}/terms/`, "0.3", "monthly")
  push(entries, `${BASE}/open-source/`, "0.6", "monthly")
  push(entries, `${BASE}/word-of-the-day/`, "0.7", "daily")
  push(entries, `${BASE}/stories/`, "0.7", "weekly")

  // blog
  const blogPosts = await getCollection("blog")
  const publishedBlogPosts = blogPosts.filter((p) => !p.data.draft)
  push(entries, `${BASE}/blog/`, "0.8", "weekly")
  for (const p of publishedBlogPosts) {
    push(entries, `${BASE}/blog/${p.id}/`, "0.7", "monthly")
  }

  // tools
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
  push(entries, `${BASE}/tools/`, "0.8", "weekly")
  for (const slug of toolSlugs) {
    push(entries, `${BASE}/tools/${slug}/`, "0.7", "monthly")
  }

  // learn section
  push(entries, `${BASE}/learn/`, "0.8", "weekly")
  push(entries, `${BASE}/learn/radicals/`, "0.7", "monthly")
  push(entries, `${BASE}/learn/hiragana/`, "0.7", "monthly")
  push(entries, `${BASE}/learn/katakana/`, "0.7", "monthly")
  push(entries, `${BASE}/learn/particles/`, "0.7", "monthly")

  // radical detail pages
  for (const r of radicals) {
    push(entries, `${BASE}/learn/radicals/${toSlug(r.radical)}/`, "0.6", "monthly")
  }

  for (const level of LEVELS) {
    // level hub pages
    push(entries, `${BASE}/${level}/`, "0.9", "weekly")
    push(entries, `${BASE}/${level}/study/`, "0.9", "weekly")
    push(entries, `${BASE}/${level}/flashcards/`, "0.8", "weekly")
    push(entries, `${BASE}/${level}/sets/`, "0.8", "weekly")
    push(entries, `${BASE}/${level}/vocabulary/`, "0.8", "weekly")
    push(entries, `${BASE}/${level}/grammar/`, "0.8", "weekly")

    // sets
    for (let i = 1; i <= SETS_PER_LEVEL; i++) {
      push(entries, `${BASE}/${level}/sets/${i}/`, "0.7", "monthly")
    }

    // study detail pages (one per kanji character)
    const kanjiList = getAll(level)
    for (const k of kanjiList) {
      push(entries, `${BASE}/${level}/study/${k.kanji}/`, "0.8", "monthly")
    }

    // flashcard detail pages
    for (const k of kanjiList) {
      push(entries, `${BASE}/${level}/flashcards/${k.kanji}/`, "0.7", "monthly")
    }

    // vocabulary detail pages
    const vocabList = getVocabulary(level)
    for (const v of vocabList) {
      push(entries, `${BASE}/${level}/vocabulary/${v.slug}/`, "0.7", "monthly")
    }
  }

  // grammar detail pages across all levels
  const allGrammar = getAllGrammar()
  for (const g of allGrammar) {
    const level = g.level.toLowerCase() as Level
    push(entries, `${BASE}/${level}/grammar/${g.id}/`, "0.7", "monthly")
  }

  return entries
}