import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Flashcards — JLPT N5 Kanji Practice",
  description:
    "Flip through all 79 JLPT N5 kanji flashcards. Tap to reveal readings and meanings. Track your progress with Know/Again.",
  keywords: kw(["kanji flashcards online", "JLPT N5 flash cards", "Japanese kanji memorization"]),
  openGraph: {
    title: "Flashcards — JLPT N5 Kanji Practice",
    description: "Flip through all 79 JLPT N5 kanji flashcards. Track your progress with Know/Again.",
    url: "https://www.kanjitest.online/n5/flashcards",
  },
  twitter: { title: "Flashcards — JLPT N5 Kanji Practice", description: "Flip through all 79 JLPT N5 kanji flashcards." },
  alternates: { canonical: "https://www.kanjitest.online/n5/flashcards" },
}

export default function FlashcardsIndex() {
  redirect("/n5/flashcards/1/")
}
