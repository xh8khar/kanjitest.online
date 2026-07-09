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

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
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
