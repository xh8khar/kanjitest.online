import FlashcardsClient from "./FlashcardsClient"
import { getAll, getByKanji } from "@/lib/kanji"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { siteUrl, keywords as kw } from "@/lib/seo"

export function generateStaticParams() {
  return getAll("n3").map((k) => ({ kanji: k.kanji }))
}

export async function generateMetadata({ params }: { params: Promise<{ kanji: string }> }): Promise<Metadata> {
  const { kanji } = await params
  const decoded = decodeURIComponent(kanji)
  const k = getByKanji(decoded, "n3")
  if (!k) return {}
  return {
    title: `Flashcard: ${k.kanji} (${k.meanings[0]}) — JLPT N3`,
    description: `Flashcard for JLPT N3 kanji ${k.kanji} (${k.meanings[0]}). Flip to see readings, meanings, and example words.`,
    keywords: kw([`${k.kanji} flashcard`, `${k.kanji} kanji practice`, "JLPT N3 flashcards"]),
    openGraph: {
      title: `Flashcard: ${k.kanji} — JLPT N3`,
      description: `Learn JLPT N3 kanji ${k.kanji} with flashcards.`,
      url: siteUrl(`/n3/flashcards/${k.kanji}/`),
    },
    twitter: { title: `Flashcard: ${k.kanji} — JLPT N3`, description: `JLPT N3 kanji ${k.kanji} flashcard.` },
    alternates: { canonical: siteUrl(`/n3/flashcards/${k.kanji}/`) },
  }
}

export default async function FlashcardsPage({ params }: { params: Promise<{ kanji: string }> }) {
  const { kanji } = await params
  const decoded = decodeURIComponent(kanji)
  const k = getByKanji(decoded, "n3")
  if (!k) notFound()
  return <FlashcardsClient kanji={decoded} />
}
