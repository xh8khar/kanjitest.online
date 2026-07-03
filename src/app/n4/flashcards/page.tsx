import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "JLPT N4 Kanji Flashcards — Flip & Memorize",
  description: "Flip through all 171 JLPT N4 kanji flashcards. Tap to reveal readings and meanings. Track your progress with Know/Again.",
  keywords: kw(["kanji flashcards online", "JLPT N4 flash cards", "Japanese kanji memorization"]),
  openGraph: {
    title: "JLPT N4 Kanji Flashcards — Flip & Memorize",
    description: "Flip through all 171 JLPT N4 kanji flashcards. Track your progress with Know/Again.",
    url: "https://www.kanjitest.online/n4/flashcards",
  },
  twitter: { title: "JLPT N4 Kanji Flashcards — Flip & Memorize", description: "Flip through all 171 JLPT N4 kanji flashcards." },
  alternates: { canonical: "https://www.kanjitest.online/n4/flashcards" },
}

export default function FlashcardsIndex() {
  redirect("/n4/flashcards/%E4%B8%8D/")
}
