import FlashcardsClient from "./FlashcardsClient"
import { getAll, getById } from "@/lib/kanji"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { keywords as kw } from "@/lib/seo"

export function generateStaticParams() {
  return getAll().map((k) => ({ id: String(k.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const k = getById(parseInt(id))
  if (!k) return {}
  return {
    title: `Flashcard: ${k.kanji} (${k.meanings[0]}) — JLPT N5`,
    description: `Flashcard for JLPT N5 kanji ${k.kanji} (${k.meanings[0]}). Flip to see readings, meanings, and example words.`,
    keywords: kw([`${k.kanji} flashcard`, `${k.kanji} kanji practice`, "JLPT N5 flashcards"]),
    openGraph: {
      title: `Flashcard: ${k.kanji} — JLPT N5`,
      description: `Learn JLPT N5 kanji ${k.kanji} with flashcards.`,
      url: `https://www.kanjitest.online/n5/flashcards/${k.id}/`,
    },
    twitter: { title: `Flashcard: ${k.kanji} — JLPT N5`, description: `JLPT N5 kanji ${k.kanji} flashcard.` },
    alternates: { canonical: `https://www.kanjitest.online/n5/flashcards/${k.id}/` },
  }
}

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const k = getById(parseInt(id))
  if (!k) notFound()
  return <FlashcardsClient id={parseInt(id)} />
}
