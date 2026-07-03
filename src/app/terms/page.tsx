import type { Metadata } from "next"
import { webPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for Kanji Test Online. All features are free. Kanji data is provided for educational purposes.",
  keywords: kw(["Kanji Test Online terms", "JLPT study terms of use", "kanji website terms"]),
  openGraph: {
    title: "Terms of Use — Kanji Test Online",
    description: "Terms of use for Kanji Test Online. Free JLPT N5 kanji study.",
    url: "https://kanjitest.online/terms",
  },
  twitter: { title: "Terms of Use — Kanji Test Online", description: "Terms of use for Kanji Test Online." },
  alternates: { canonical: "https://kanjitest.online/terms" },
}

export default function TermsPage() {
  const pageSchema = webPageSchema("Terms of Use — Kanji Test Online", "Terms of use for Kanji Test Online. Free JLPT N5 kanji study.")
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <div className="border border-ink/20 rounded-xl px-8 py-8 bg-white">
        <h1 className="text-xl font-bold text-ink mb-4">Terms of Use</h1>
        <p className="text-xs text-ink/50 mb-6">Last updated: July 2026</p>
        <div className="space-y-4 text-sm text-ink/60 leading-relaxed">
          <section>
            <h2 className="font-medium text-ink mb-2">1. Acceptance</h2>
            <p>By using KanjiTest.online, you agree to these terms. If you do not agree, please discontinue use.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-2">2. Free Use</h2>
            <p>All features are provided free of charge. We may display advertisements to support operating costs.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-2">3. Accuracy</h2>
            <p>Kanji readings and example content are provided for educational purposes and may contain errors. Cross-reference with official JLPT materials.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-2">4. Intellectual Property</h2>
            <p>The website design, code, and content are our intellectual property. Kanji data is derived from public sources for educational use.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-2">5. Limitation of Liability</h2>
            <p>We are not liable for any damages arising from your use of this website. The service is provided &ldquo;as is&rdquo; without warranty.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-2">6. Contact</h2>
            <p>Questions? Email <a href="mailto:hello@kanjitest.online" className="text-ink/70 hover:text-ink transition-colors">hello@kanjitest.online</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
