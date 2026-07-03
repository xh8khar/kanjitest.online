# KanjiTest.Online — Full Site Execution Spec (v2)

> **How to use this file:** Paste this entire document into Claude Code / Cursor / Replit as the build prompt. It is a complete, self-verifying specification. Build phase by phase, run the checklist at the end of each phase, and do not skip the SEO/interlink sections — they are the "million dollar" part.

---

## 1. Vision

A cute, beginner-friendly JLPT kanji learning website at **kanjitest.online**. Launch scope is **N5 (79 kanji)** with 3 modes (Study, Flashcards, Test), wrapped in a **full site shell** — global navbar, contextual sidebar, rich footer — where every page interlinks with every related page. The site must be deployable as a **static export to Cloudflare Pages** and be **AdSense-ready** (policy pages included) from day one.

Success criteria:
- A user can reach any page from any other page in ≤ 2 taps.
- Every kanji detail page is statically generated with unique title/description (79 indexable SEO pages).
- Lighthouse mobile: Performance ≥ 95, SEO = 100, Accessibility ≥ 95.

---

## 2. Tech Stack (locked — do not substitute)

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router, TypeScript, `output: 'export'` (static) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| Font | Zen Maru Gothic via `next/font/google`, weights 400/500/700/900, subsets `latin` + preload |
| Data | Static JSON in `/data/n5.json` (generated once from kanjiapi.dev, committed to repo — no runtime fetch) |
| Hosting | Cloudflare Pages (`npm run build` → `out/`) |
| State | React state + `localStorage` only. No backend, no DB, no auth. |

`next.config.ts`:
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,          // Cloudflare Pages friendly URLs
  images: { unoptimized: true } // required for static export
};
export default nextConfig;
```

---

## 3. Design Tokens (exact values)

```css
/* app/globals.css — Tailwind v4 theme */
@import "tailwindcss";

@theme {
  --color-cream:      #FFF9F0;  /* page background */
  --color-ink:        #4A3F3F;  /* primary text, warm dark brown */
  --color-candy:      #FF8FAB;  /* candy pink — brand accent */
  --color-candy-deep: #E5628A;  /* hover / active pink */
  --color-study:      #34D399;  /* emerald — Study mode */
  --color-cards:      #38BDF8;  /* sky — Flashcards mode */
  --color-test:       #FBBF24;  /* amber — Test mode */
  --color-mint:       #D1FAE5;  /* soft fills */
  --color-blush:      #FFE4EC;  /* soft pink fills */
  --radius-cute: 1.5rem;        /* default card radius */
}
```

Rules:
- Background is always `cream`. Cards are white with `rounded-[1.5rem]`, `border-2` in the mode color at 30% opacity, and `shadow-[0_4px_0_rgba(0,0,0,0.06)]` (soft "sticker" shadow, not blur-heavy).
- Each mode owns its color everywhere it appears: Study = emerald, Flashcards = sky, Test = amber. Never mix.
- Emoji are the icon system: 📖 Study, 🃏 Flashcards, ✍️ Test, 🏠 Home, 🌸 brand mark.
- Buttons: `rounded-full`, bold, 44px minimum tap height, pressed state translates down 2px (sticker-press effect).
- Font: Zen Maru Gothic on **everything**, including numbers.
- Mobile-first: design at 375px, then enhance at `md:` (768) and `lg:` (1024).

Signature element (the thing the site is remembered by): the **kanji sticker card** — every kanji everywhere (lists, flashcards, detail hero) renders inside the same rounded white sticker with the mode-colored border, so the whole site feels like a sticker book.

---

## 4. Route Map + Interlink Matrix

```
/                       Home
/n5/                    N5 hub (NEW — level landing page, links to all 3 modes)
/n5/study/              Numbered list 1–79
/n5/study/[id]/         Kanji detail ×79 (SSG)
/n5/flashcards/         Flashcard deck
/n5/sets/               Test set grid (20 sets)
/n5/sets/[set]/         Test page ×20 (SSG shell, client quiz)
/about/                 About the site + data attribution
/privacy/               Privacy policy (AdSense requirement)
/terms/                 Terms of use
/404                    Cute not-found page with links to all 3 modes
```

**Interlink matrix — every page MUST link to the pages listed on its row:**

| Page | Must link to |
|---|---|
| Home | N5 hub, Study, Flashcards, Sets, About |
| N5 hub | All 3 modes, first kanji (`/n5/study/1/`), Set 1 |
| Study list | Every kanji detail, Flashcards ("memorize these →"), Sets ("test yourself →") |
| Kanji detail | Prev/Next kanji, back to Study list, Flashcards, **the test set containing this kanji** |
| Flashcards | Study list ("see full list"), Sets ("ready to test?"), current card's detail page |
| Sets grid | Every set, Study, Flashcards |
| Test results | Retry same set, next set, **detail page of every kanji answered wrong** |
| Footer (global) | Home, all 3 modes, About, Privacy, Terms |

The wrong-answer → kanji-detail link on results is the highest-value interlink on the site. Do not omit it.

---

## 5. Global Shell Components

### 5.1 Navbar (`components/Navbar.tsx`, client component)
- Sticky top, cream background with `backdrop-blur` and bottom border `border-blush`.
- Left: 🌸 **KanjiTest** wordmark (font-black, candy pink) → links home.
- Desktop right: Study / Flashcards / Test / About, each pill-shaped, active route filled with its mode color, inactive is ink with mode-color hover.
- Mobile: hamburger (🍡 rotates to ✕) opening a full-width dropdown with the same links as large tap targets. Menu closes on route change.
- Active state derived from `usePathname()`.

### 5.2 Sidebar (`components/Sidebar.tsx`, server component)
- Rendered inside `app/n5/layout.tsx` — appears on **all N5 pages**, hidden below `lg:` (mobile gets the same links in a horizontal scroll chip row under the navbar instead).
- Sections:
  1. **Modes** — 3 mode links with emoji + progress hint ("79 kanji", "20 sets").
  2. **Jump to kanji** — 79-cell mini grid (each cell = the kanji char, links to its detail page). This makes every detail page 1 click from every N5 page → massive internal linking win.
  3. **Test sets** — chips 1–20.
- Sticky (`sticky top-20`), own scroll, width `w-64`.

### 5.3 Footer (`components/Footer.tsx`, server component)
- 3 columns on desktop, stacked on mobile: **Learn** (Home, N5 hub, Study, Flashcards, Test) / **Site** (About, Privacy, Terms) / **Credit** (kanjiapi.dev + EDICT/KANJIDIC attribution, MIT notice).
- Bottom line: `© 2026 kanjitest.online · Made with 🌸 for Japanese learners`.
- Blush background, generous padding, all links crawlable `<a>` via `next/link`.

---

## 6. Data Schema

`data/n5.json` — array of exactly 79 objects, ordered by frequency (same order as the current site):

```ts
// lib/types.ts
export interface KanjiEntry {
  id: number;              // 1–79, stable, used in URL
  kanji: string;           // "日"
  kun: string[];           // ["ひ", "-び", "-か"]
  on: string[];            // ["ニチ", "ジツ"]
  meanings: string[];      // ["day", "sun", "Japan"]
  strokes: number;
  examples: {
    word: string;          // "日本"
    reading: string;       // hiragana: "にほん"
    english: string;       // "Japan"
  }[];                     // exactly 3
}
```

- Katakana for examples is **derived, not stored**: `lib/kana.ts` exports `toKatakana(hira: string)` using code-point shift `+0x60` for the ひ–ゖ range.
- `lib/kanji.ts` exports: `getAll()`, `getById(id)`, `getPrevNext(id)`, `getSetQuestions(set)`.
- **Test sets are deterministic**: seeded PRNG (mulberry32, seed = set number) picks 20 questions + 3 distractors each from the pool. Same set always has the same questions → sets are SSG-safe, shareable, and retryable. Shuffle answer-option order on the client after mount to avoid hydration mismatch.
- Data generation script `scripts/fetch-data.mjs` (run once locally): fetch `https://kanjiapi.dev/v1/kanji/jlpt-5` → for each kanji fetch detail + words, pick the 3 most common N5-appropriate words, write `data/n5.json`. Commit the JSON; the site never fetches at runtime.

---

## 7. Page Specs

### 7.1 Home `/`
- Hero: 🌸 wordmark, one-line promise — "Learn all 79 JLPT N5 kanji. Study, flip, test. Free forever." — and a giant candy-pink **Start learning →** button to `/n5/study/`.
- N5 level card with the 3 mode buttons (emerald/sky/amber), each showing a one-line description and count.
- "How it works" strip: 3 sticker cards (Study 1–79 → Flip flashcards → Pass 20 tests).
- A row of 8 sample kanji stickers linking to their detail pages (crawl seeds on the homepage).
- Locked "Coming soon" chips for N4–N1 (grayed, `aria-disabled`, no link).

### 7.2 N5 hub `/n5/`
- Level intro (what N5 is, 79 kanji, ~how long it takes), 3 large mode cards, and a full 79-kanji sticker grid linking to every detail page.

### 7.3 Study list `/n5/study/`
- Numbered rows 1–79 inside sticker cards: number badge, big kanji, kun/on, first example word + English. Entire row is the link.
- Top toolbar: total count, link chips to Flashcards and Sets.

### 7.4 Kanji detail `/n5/study/[id]/` — `generateStaticParams` over 1–79
- Hero sticker: huge kanji (`text-8xl`), stroke count, meaning tags (pill chips).
- Readings block: kun (hiragana chips, mint) and on (katakana chips, blush).
- 3 example cards: word, hiragana, katakana (derived), English.
- Prev / Next kanji buttons (with the neighboring kanji character shown), back-to-list, "Practice in Flashcards", "Test this kanji → Set N" (compute which set contains it).
- `generateMetadata`: title `日 (day, sun) — JLPT N5 Kanji #1 | KanjiTest`, description built from readings + first example. Unique per page.
- JSON-LD `DefinedTerm` per kanji.

### 7.5 Flashcards `/n5/flashcards/` (client)
- One sticker card, 3D flip on tap (`transform-style: preserve-3d`, respects `prefers-reduced-motion` → instant swap).
- Front: kanji only. Back: kun/on, meanings, 3 examples.
- Controls: ← prev, flip, next →, 🔀 shuffle. Progress bar (candy pink) + "12 / 79".
- "Know it ✓ / Again ↻" buttons write to `localStorage("kt-n5-known")`; known cards show a small ✓ badge and can be filtered out with a toggle.
- Link under the card: "View full details →" to the current kanji's page.

### 7.6 Sets grid `/n5/sets/`
- 20 amber sticker cards (4×5 on desktop, 2-col mobile): "Set 7", "20 questions".
- Best score per set from `localStorage("kt-n5-scores")` shown as 🏆 % badge.

### 7.7 Test page `/n5/sets/[set]/` — `generateStaticParams` 1–20
- All 20 questions listed at once. Each: question number, prompt kanji (or meaning→kanji, alternate direction every other question), 2×2 option grid.
- Selected option fills amber; unanswered questions counted in a sticky bottom bar: "14 / 20 answered — Submit".
- Submit disabled until 20/20. On submit: score card (percentage, cheer emoji tier: 💮 ≥90, 🌸 ≥70, 🌱 else), per-question review with correct answer marked, **every wrong kanji links to its detail page**, buttons for Retry (fresh option shuffle) and Next set. Save best score to localStorage.

### 7.8 About / Privacy / Terms
- About: mission, data attribution (kanjiapi.dev, EDICT/KANJIDIC © EDRDG), contact email placeholder.
- Privacy: localStorage usage, analytics/AdSense disclosure blocks (write real AdSense/cookies language so the page passes review), effective date.
- Terms: content license, no-warranty, attribution requirements.

### 7.9 404
- Big 🍥, "This page wandered off to study kanji." Links to Home + 3 modes.

---

## 8. SEO (do all of it)

1. `app/layout.tsx` metadata: `metadataBase: new URL("https://kanjitest.online")`, title template `%s | KanjiTest — JLPT N5 Kanji`, default description, OpenGraph + Twitter card defaults.
2. `generateMetadata` on every dynamic page (kanji detail, set pages: "JLPT N5 Kanji Test — Set 7 (20 Questions)").
3. `app/sitemap.ts`: all static routes + 79 kanji pages + 20 set pages = 100+ URLs.
4. `app/robots.ts`: allow all, point to sitemap.
5. JSON-LD: `WebSite` on home, `DefinedTerm` on kanji pages, `Quiz` on set pages, `BreadcrumbList` on all N5 pages.
6. Semantic HTML: one `<h1>` per page, `<nav>`, `<main>`, `<footer>`, breadcrumbs as visible UI on N5 pages (Home › N5 › Study › 日).
7. `lang="ja"` on Japanese text spans, `lang="en"` on `<html>`.
8. Canonical URLs with trailing slash matching the export config.

---

## 9. Build Order (execute in this sequence)

1. **Scaffold**: Next 16 + TS + Tailwind v4, config files, globals.css tokens, Zen Maru Gothic in layout.
2. **Data**: write/verify `data/n5.json` (79 entries × 3 examples), `lib/kanji.ts`, `lib/kana.ts`, `lib/random.ts` (mulberry32). Unit-check: `getSetQuestions(1)` returns the same 20 IDs on every call.
3. **Shell**: Navbar, Footer, root layout, 404.
4. **N5 layout + Sidebar** (with mobile chip-row fallback).
5. **Pages** in order: Home → N5 hub → Study list → Kanji detail → Flashcards → Sets grid → Test page.
6. **Policy pages** (About/Privacy/Terms).
7. **SEO layer**: metadata, sitemap, robots, JSON-LD, breadcrumbs.
8. **Build + verify**: `npm run build` must succeed with 0 errors and emit ~110 static pages to `out/`.

---

## 10. Self-Verify Checklist (run before calling it done)

- [ ] `npm run build` succeeds; `out/` contains `n5/study/79/index.html` and `n5/sets/20/index.html`.
- [ ] Every route in the interlink matrix (§4) has all required outbound links — check each row.
- [ ] Sidebar kanji grid: 79 cells, every link resolves.
- [ ] Test set 7 shows identical questions after hard refresh (deterministic seed works).
- [ ] Wrong answers on results screen link to the correct kanji detail pages.
- [ ] Flashcard flip works with keyboard (Enter/Space) and respects reduced motion.
- [ ] All tap targets ≥ 44px; no horizontal scroll at 375px width.
- [ ] View source on `/n5/study/1/`: unique `<title>`, meta description, JSON-LD present (SSG, not client-rendered).
- [ ] `sitemap.xml` lists 100+ URLs with `https://kanjitest.online` host.
- [ ] Privacy page mentions localStorage, cookies, and Google AdSense.
- [ ] Lighthouse mobile: Perf ≥ 95, SEO 100, A11y ≥ 95.
- [ ] Zero `console.error` in browser on any page.

---

## 11. Deploy (Cloudflare Pages)

- Build command: `npm run build` · Output directory: `out` · Node 22.
- Add `public/_headers`:
  ```
  /*
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
  ```
- Custom domain `kanjitest.online` + `www` redirect to apex.

## 12. Future (do NOT build now — leave clean seams)

N4–N1 levels (route pattern already generalizes: `/[level]/...`), kana charts at `/kana/`, stroke-order SVGs (KanjiVG), SRS scheduling on top of the existing `kt-n5-known` store, dark mode via a `data-theme` attribute on `<html>`.