const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? "https://kanjitest.online"
const SITE_NAME = "Kanji Test Online"

export function siteUrl(path = ""): string {
  return `${SITE_URL}${path}`
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Free JLPT N5 kanji learning platform with flashcards, quizzes, and 79 detailed kanji pages.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/n5/study/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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

export function keywords(list: string[]): string {
  return list.join(", ")
}

const LEVEL_NAMES: Record<string, string> = {
  n5: "N5", n4: "N4", n3: "N3", n2: "N2", n1: "N1",
}

export function pageKeywords(pathname: string): string {
  const segs = pathname.replace(/\/+$/, "").split("/").filter(Boolean)
  const level = segs[0] && LEVEL_NAMES[segs[0]] ? segs[0] : null
  const label = level ? LEVEL_NAMES[level] : ""
  const pageType = segs[1] ?? ""
  const param = decodeURIComponent(segs[2] ?? "")

  const base = level
    ? [`JLPT ${label}`, `JLPT ${label} kanji`, "learn Japanese", "Japanese language"]
    : ["kanji", "JLPT", "learn Japanese", "Japanese writing"]

  switch (pageType) {
    case "study": {
      if (param && !param.includes("index")) {
        const extras = [param, `${label} ${param}`, "kanji meaning", "kanji readings", "kunyomi", "onyomi"]
        return keywords([...base, ...extras])
      }
      return keywords([...base, "kanji list", "kanji readings", "kunyomi", "onyomi", "study kanji"])
    }
    case "flashcards": {
      if (param && !param.includes("index")) {
        const extras = [param, `${label} ${param}`, "kanji flashcard", "flashcard", "memorize kanji"]
        return keywords([...base, ...extras])
      }
      return keywords([...base, "kanji flashcards", "flip cards", "memorize kanji", "flashcard deck"])
    }
    case "vocabulary": {
      if (param && !param.includes("index")) {
        return keywords([...base, param, "Japanese vocabulary", "Japanese word", "vocabulary"].filter(Boolean))
      }
      return keywords([...base, "Japanese vocabulary", "vocabulary list", "Japanese words", "word list"])
    }
    case "sets": {
      if (param && !isNaN(Number(param))) {
        return keywords([...base, `set ${param}`, "kanji quiz", "kanji test", "practice test", "JLPT quiz", `${label} set ${param}`])
      }
      return keywords([...base, "kanji test", "kanji quiz", "practice test", "JLPT practice", "test your knowledge"])
    }
    default: {
      if (level) {
        return keywords([...base, "kanji list", "learn kanji", "Japanese characters", "kanji study"])
      }
      return keywords(["JLPT", "kanji", "learn Japanese", "Japanese study", "kanji flashcards", "kanji quiz"])
    }
  }
}
