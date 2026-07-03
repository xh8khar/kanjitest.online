import type { Metadata } from "next"
import { webPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for KanjiTest.Online. All features are free. Kanji data is provided for educational purposes.",
  keywords: kw(["KanjiTest.Online terms", "JLPT study terms of use", "kanji website terms"]),
  openGraph: {
    title: "Terms of Use",
    description: "Terms of use for KanjiTest.Online. Free JLPT N5, N4, N3 kanji study.",
    url: "https://www.kanjitest.online/terms",
  },
  twitter: { title: "Terms of Use", description: "Terms of use for KanjiTest.Online." },
  alternates: { canonical: "https://www.kanjitest.online/terms" },
}

export default function TermsPage() {
  const pageSchema = webPageSchema("Terms of Use — KanjiTest.Online", "Terms of use for KanjiTest.Online. Free JLPT N5, N4, N3 kanji study.")
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <div className="border border-ink/20 rounded-xl px-5 sm:px-8 py-6 sm:py-8 bg-white">
        <h1 className="text-lg sm:text-xl font-bold text-ink mb-3 sm:mb-4">Terms of Use</h1>
        <p className="text-[11px] sm:text-xs text-ink/50 mb-5 sm:mb-6">Last updated: July 2026</p>
        <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm text-ink/60 leading-relaxed">
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">1. Acceptance</h2>
            <p>By using KanjiTest.Online, you agree to these terms. If you do not agree, please discontinue use.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">2. Free Use</h2>
            <p>All features are provided free of charge. We may display advertisements to support operating costs.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">3. Accuracy</h2>
            <p>Kanji readings and example content are provided for educational purposes and may contain errors. Cross-reference with official JLPT materials.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">4. Intellectual Property</h2>
            <p>The website design, code, and content are our intellectual property. Kanji data is derived from public sources for educational use.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">5. Limitation of Liability</h2>
            <p>We are not liable for any damages arising from your use of this website. The service is provided &ldquo;as is&rdquo; without warranty.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">6. Contact</h2>
            <p>Questions? Email <a href="mailto:hello@kanjitest.online" className="text-ink/70 hover:text-ink transition-colors">hello@kanjitest.online</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
