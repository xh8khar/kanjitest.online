import FlashcardsClient from "./FlashcardsClient"
import { getAll, getByKanji } from "@/lib/kanji"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { siteUrl, keywords as kw } from "@/lib/seo"

export function generateStaticParams() {
  return getAll("n4").map((k) => ({ kanji: k.kanji }))
}

export async function generateMetadata({ params }: { params: Promise<{ kanji: string }> }): Promise<Metadata> {
  const { kanji } = await params
  const decoded = decodeURIComponent(kanji)
  const k = getByKanji(decoded, "n4")
  if (!k) return {}
  return {
    title: `Flashcard: ${k.kanji} (${k.meanings[0]}) — JLPT N4`,
    description: `Flashcard for JLPT N4 kanji ${k.kanji} (${k.meanings[0]}). Flip to see readings, meanings, and example words.`,
    keywords: kw([`${k.kanji} flashcard`, `${k.kanji} kanji practice`, "JLPT N4 flashcards"]),
    openGraph: {
      title: `Flashcard: ${k.kanji} — JLPT N4`,
      description: `Learn JLPT N4 kanji ${k.kanji} with flashcards.`,
      url: siteUrl(`/n4/flashcards/${k.kanji}/`),
    },
    twitter: { title: `Flashcard: ${k.kanji} — JLPT N4`, description: `JLPT N4 kanji ${k.kanji} flashcard.` },
    alternates: { canonical: siteUrl(`/n4/flashcards/${k.kanji}/`) },
  }
}

export default async function FlashcardsPage({ params }: { params: Promise<{ kanji: string }> }) {
  const { kanji } = await params
  const decoded = decodeURIComponent(kanji)
  const k = getByKanji(decoded, "n4")
  if (!k) notFound()
  return <FlashcardsClient kanji={decoded} />
}
