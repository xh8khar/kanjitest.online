import type { Metadata } from "next"
import { webPageSchema, keywords as kw } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "KanjiTest.Online privacy policy. We do not collect personal data. Flashcard progress is stored locally in your browser only.",
  keywords: kw(["KanjiTest.Online privacy", "JLPT study privacy policy", "kanji website privacy"]),
  openGraph: {
    title: "Privacy Policy",
    description: "KanjiTest.Online privacy policy. No personal data collected.",
    url: "https://www.kanjitest.online/privacy",
  },
  twitter: { title: "Privacy Policy", description: "KanjiTest.Online privacy policy." },
  alternates: { canonical: "https://www.kanjitest.online/privacy" },
}

export default function PrivacyPage() {
  const pageSchema = webPageSchema("Privacy Policy — KanjiTest.Online", "KanjiTest.Online privacy policy. No personal data collected.")
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <div className="border border-ink/20 rounded-xl px-5 sm:px-8 py-6 sm:py-8 bg-white">
        <h1 className="text-lg sm:text-xl font-bold text-ink mb-3 sm:mb-4">Privacy Policy</h1>
        <p className="text-[11px] sm:text-xs text-ink/50 mb-5 sm:mb-6">Last updated: July 2026</p>
        <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm text-ink/60 leading-relaxed">
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">1. No Data Collection</h2>
            <p>KanjiTest.Online does not collect, store, or transmit any personal data. Your flashcard progress is stored locally in your browser and never sent to any server.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">2. Third-Party Services</h2>
            <p>We display advertisements via Google AdSense. Google may use cookies to serve personalized ads. Learn more at <a href="https://policies.google.com/technologies/partner-sites" className="text-ink/70 hover:text-ink transition-colors" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">3. No Registration</h2>
            <p>We do not offer user accounts or login systems. All data remains on your device.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">4. Changes</h2>
            <p>We may update this policy to reflect changes in our practices. Updates will be posted on this page.</p>
          </section>
          <section>
            <h2 className="font-medium text-ink mb-1.5 sm:mb-2">5. Contact</h2>
            <p>Questions? Email <a href="mailto:hello@kanjitest.online" className="text-ink/70 hover:text-ink transition-colors">hello@kanjitest.online</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
