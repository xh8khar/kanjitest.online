const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? "https://www.kanjitest.online"
const SITE_NAME = "KanjiTest.Online"

export function siteUrl(path = ""): string {
  return `${SITE_URL}${path}`
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Free JLPT N5, N4, N3, N2, and N1 kanji learning platform with flashcards, quizzes, vocabulary, and practice tests for all levels.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/n5/study/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://github.com/xh8khar/kanjitest.online",
    ],
  }
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function definedTermSchema(kanji: string, meaning: string, id: number, level = "N5") {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: kanji,
    description: `${kanji} — ${meaning}. JLPT ${level} kanji #${id}.`,
    inDefinedTermSet: `JLPT ${level} Kanji`,
    url: siteUrl(`/${level.toLowerCase()}/study/${encodeURIComponent(kanji)}/`),
  }
}

export function collectionPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
  }
}

export function webPageSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
  }
}

export function quizSchema(name: string, description: string, numQuestions: number, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    numberOfQuestions: numQuestions,
    educationalLevel: "Beginner",
    teaches: "JLPT Kanji",
  }
}

export function articleSchema(title: string, description: string, image?: string, datePublished?: string, dateModified?: string) {
  const result: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: "KanjiTest.Online",
    },
  }
  if (image) result.image = image
  if (datePublished) result.datePublished = datePublished
  if (dateModified) result.dateModified = dateModified
  return result
}

// Capped: search engines don't need thousands of entries, and uncapped
// lists added megabytes to the N1/N2 index pages.
const ITEM_LIST_MAX = 100

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.slice(0, ITEM_LIST_MAX).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

export function keywords(list: string[]): string {
  return list.join(", ")
}

const LEVEL_NAMES: Record<string, string> = {
  n5: "N5", n4: "N4", n3: "N3", n2: "N2", n1: "N1",
}

const LEVEL_KEYWORDS: Record<string, string[]> = {
  n5: [
    "JLPT N5 kanji test online", "JLPT N5 kanji quiz", "JLPT N5 kanji practice",
    "JLPT N5 kanji mock test", "JLPT N5 kanji exam", "JLPT N5 kanji test online free",
    "JLPT N5 kanji reading test", "JLPT N5 kanji writing test",
    "JLPT N5 kanji multiple choice quiz", "JLPT N5 kanji practice test with answers",
  ],
  n4: [
    "JLPT N4 kanji test online", "JLPT N4 kanji quiz", "JLPT N4 kanji practice",
    "JLPT N4 kanji mock test", "JLPT N4 kanji exam", "JLPT N4 kanji test online free",
    "JLPT N4 kanji reading quiz", "JLPT N4 kanji writing practice",
    "JLPT N4 kanji worksheet", "JLPT N4 kanji test with answers",
  ],
  n3: [
    "JLPT N3 kanji test online", "JLPT N3 kanji quiz", "JLPT N3 kanji practice",
    "JLPT N3 kanji mock test", "JLPT N3 kanji exam", "JLPT N3 kanji test online free",
    "JLPT N3 kanji reading practice", "JLPT N3 kanji vocabulary quiz",
    "JLPT N3 kanji challenge", "JLPT N3 kanji test with explanations",
  ],
  n2: [
    "JLPT N2 kanji test online", "JLPT N2 kanji quiz", "JLPT N2 kanji practice",
    "JLPT N2 kanji mock test", "JLPT N2 kanji exam", "JLPT N2 kanji test online free",
    "JLPT N2 advanced kanji quiz", "JLPT N2 kanji reading test",
    "JLPT N2 kanji challenge", "JLPT N2 kanji test with answers",
  ],
  n1: [
    "JLPT N1 kanji test online", "JLPT N1 kanji quiz", "JLPT N1 kanji practice",
    "JLPT N1 kanji mock test", "JLPT N1 kanji exam", "JLPT N1 kanji test online free",
    "JLPT N1 advanced kanji quiz", "JLPT N1 kanji reading challenge",
    "JLPT N1 difficult kanji test", "JLPT N1 kanji test with answers",
  ],
}

export function pageKeywords(pathname: string): string {
  const segs = pathname.replace(/\/+$/, "").split("/").filter(Boolean)
  const level = segs[0] && LEVEL_NAMES[segs[0]] ? segs[0] : null
  const label = level ? LEVEL_NAMES[level] : ""
  const pageType = segs[1] ?? ""
  const param = decodeURIComponent(segs[2] ?? "")

  const lvlKw = level ? LEVEL_KEYWORDS[level] : []

  const base = level
    ? [`JLPT ${label}`, `JLPT ${label} kanji`, "learn Japanese", "Japanese language"]
    : ["kanji", "JLPT", "learn Japanese", "Japanese writing"]

  switch (pageType) {
    case "study": {
      if (param && !param.includes("index")) {
        const extras = [param, `${label} ${param}`, "kanji meaning", "kanji readings", "kunyomi", "onyomi"]
        return keywords([...base, ...lvlKw, ...extras])
      }
      return keywords([
        ...base, ...lvlKw,
        "kanji list", "kanji readings", "kunyomi", "onyomi", "study kanji",
        "Japanese kanji test online", "Learn Japanese kanji online", "kanji practice test free",
      ])
    }
    case "flashcards": {
      if (param && !param.includes("index")) {
        const extras = [param, `${label} ${param}`, "kanji flashcard", "flashcard", "memorize kanji"]
        return keywords([...base, ...lvlKw, ...extras])
      }
      return keywords([
        ...base, ...lvlKw,
        "kanji flashcards", "flip cards", "memorize kanji", "flashcard deck",
        "Japanese kanji quiz for JLPT", "JLPT kanji practice",
      ])
    }
    case "vocabulary": {
      if (param && !param.includes("index")) {
        return keywords([...base, ...lvlKw, param, "Japanese vocabulary", "Japanese word", "vocabulary"].filter(Boolean))
      }
      return keywords([
        ...base, ...lvlKw,
        "Japanese vocabulary", "vocabulary list", "Japanese words", "word list",
        "JLPT kanji vocabulary quiz",
      ])
    }
    case "sets": {
      if (param && !isNaN(Number(param))) {
        return keywords([
          ...base, ...lvlKw,
          `set ${param}`, "kanji quiz", "kanji test", "practice test",
          "JLPT quiz", "JLPT kanji mock test", "JLPT kanji mock test online",
          "JLPT kanji practice test", "JLPT kanji quiz free",
          "JLPT kanji exam", "JLPT kanji questions", "JLPT kanji online test free",
          `${label} set ${param}`,
        ])
      }
      return keywords([
        ...base, ...lvlKw,
        "kanji test", "kanji quiz", "practice test", "JLPT practice",
        "JLPT kanji mock test", "JLPT kanji mock test online",
        "JLPT kanji practice test", "JLPT kanji quiz free",
        "JLPT kanji exam", "JLPT kanji test free",
        "JLPT kanji online test free", "test your knowledge",
      ])
    }
    default: {
      if (level) {
        return keywords([
          ...base, ...lvlKw,
          "kanji list", "learn kanji", "Japanese characters", "kanji study",
          "Japanese kanji test online", "JLPT kanji practice test",
          "JLPT kanji quiz free",
        ])
      }
      return keywords([
        "JLPT", "kanji", "learn Japanese", "Japanese study",
        "kanji flashcards", "kanji quiz",
        "JLPT kanji test online", "JLPT kanji practice",
        "Japanese kanji test online", "JLPT kanji questions",
        "JLPT kanji quiz free", "JLPT kanji practice test",
        "JLPT kanji mock test online",
      ])
    }
  }
}
