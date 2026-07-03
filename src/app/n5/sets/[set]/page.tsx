import TestClient from "./TestClient"
import type { Metadata } from "next"
import { keywords as kw } from "@/lib/seo"

export function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ set: String(i + 1) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ set: string }>
}): Promise<Metadata> {
  const { set } = await params
  const desc = `Practice JLPT N5 kanji with Set ${set} of 20 questions. Test your kanji-to-reading and reading-to-kanji skills with real sentence context.`
  return {
      title: `Kanji Test Online – JLPT N5 Kanji Quiz Set ${set} (20 Questions)`,
    description: desc,
    keywords: kw([
      `kanji test online`,
      `kanji test online set ${set}`,
      `online kanji test set ${set}`,
      `free kanji test online`,
      `JLPT N5 kanji test set ${set}`,
      `kanji quiz online set ${set}`,
      `Japanese kanji test online`,
      `kanji practice test set ${set}`,
      `N5 kanji quiz set ${set}`,
      `kanji reading test online`,
      `Japanese reading practice`,
      `learn Japanese kanji`,
      `beginner kanji test`,
      `JLPT practice quiz set ${set}`,
      `online Japanese kanji quiz`,
    ]),
    openGraph: {
      title: `Test Set ${set} — JLPT N5 Kanji Quiz`,
      description: desc,
      url: `https://www.kanjitest.online/n5/sets/${set}/`,
    },
    twitter: { title: `Test Set ${set} — JLPT N5 Kanji Quiz`, description: desc },
    alternates: { canonical: `https://www.kanjitest.online/n5/sets/${set}/` },
  }
}

export default function TestSetPage({
  params,
}: {
  params: Promise<{ set: string }>
}) {
  return <TestClient params={params} />
}
