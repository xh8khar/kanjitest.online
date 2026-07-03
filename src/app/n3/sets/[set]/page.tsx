import TestClient from "./TestClient"
import type { Metadata } from "next"
import { siteUrl, keywords as kw } from "@/lib/seo"

export function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ set: String(i + 1) }))
}

export async function generateMetadata({ params }: { params: Promise<{ set: string }> }): Promise<Metadata> {
  const { set } = await params
  const desc = `Practice JLPT N3 kanji with Set ${set} of 20 questions. Test your kanji-to-reading and reading-to-kanji skills.`
  return {
    title: `Kanji Test Online – JLPT N3 Kanji Quiz Set ${set} (20 Questions)`,
    description: desc,
    keywords: kw([`kanji test online set ${set}`, `JLPT N3 kanji test set ${set}`, `kanji quiz online set ${set}`, `N3 kanji quiz set ${set}`]),
    openGraph: {
      title: `Test Set ${set} — JLPT N3 Kanji Quiz`,
      description: desc,
      url: siteUrl(`/n3/sets/${set}/`),
    },
    twitter: { title: `Test Set ${set} — JLPT N3 Kanji Quiz`, description: desc },
    alternates: { canonical: siteUrl(`/n3/sets/${set}/`) },
  }
}

export default function TestSetPage({ params }: { params: Promise<{ set: string }> }) {
  return <TestClient params={params} />
}
