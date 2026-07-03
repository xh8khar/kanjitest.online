import type { Metadata } from "next"
import { Zen_Maru_Gothic } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { websiteSchema, organizationSchema, keywords as kw } from "@/lib/seo"

const maru = Zen_Maru_Gothic({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-maru",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kanjitest.online"),
  title: {
    default: "Kanji Test Online — Free JLPT N5 Kanji Practice",
    template: "%s | Kanji Test Online",
  },
  description:
    "Free JLPT N5 kanji learning platform. Study all 79 kanji with readings and examples, flip flashcards, and test yourself with 20 quiz sets. Beautiful, cute, and free forever.",
  keywords: kw(["Kanji Test Online", "JLPT N5 kanji practice", "free Japanese kanji study", "learn kanji online", "Japanese reading practice", "JLPT N5 study"]),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kanji Test Online",
    title: "Kanji Test Online — Free JLPT N5 Kanji Practice",
    description:
      "Master all 79 JLPT N5 kanji with readings, examples, flashcards, and quizzes. Free forever.",
  },
  twitter: { card: "summary_large_image", title: "Kanji Test Online", description: "Free JLPT N5 kanji learning platform." },
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
    apple: { url: "/icon.svg", type: "image/svg+xml" },
  },
  other: { "theme-color": "#000000" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${maru.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="font-maru antialiased min-h-dvh flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
