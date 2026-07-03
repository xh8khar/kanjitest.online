import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Flashcards — JLPT N4 Kanji Practice",
  description: "Flip through all 171 JLPT N4 kanji flashcards. Tap to reveal readings and meanings. Track your progress with Know/Again.",
  keywords: kw(["kanji flashcards online", "JLPT N4 flash cards", "Japanese kanji memorization"]),
  openGraph: {
    title: "Flashcards — JLPT N4 Kanji Practice",
    description: "Flip through all 171 JLPT N4 kanji flashcards. Track your progress with Know/Again.",
    url: "https://kanjitest.online/n4/flashcards",
  },
  twitter: { title: "Flashcards — JLPT N4 Kanji Practice", description: "Flip through all 171 JLPT N4 kanji flashcards." },
  alternates: { canonical: "https://kanjitest.online/n4/flashcards" },
}

export default function FlashcardsIndex() {
  redirect("/n4/flashcards/80/")
}
