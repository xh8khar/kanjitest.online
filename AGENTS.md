<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Objective
- Add a /learn/ section with enriched radicals, hiragana, katakana pages and create a comprehensive grammar section for every JLPT level

## Important Details
- Site domain is www.kanjitest.online; sitemap URLs use www.
- Brand text: KanjiTest.Online (capital O).
- radicals.json has all 214 Kangxi radicals with id, radical, strokes, meaning, reading, variants, examples, desc.
- Radical detail pages use English-meaning slugs (e.g., /learn/radicals/one/) with id appended for duplicates (bird-172, bird-196, spear-62, spear-110, go-34, go-144).
- radical detail pages enriched with cross-referenced kanji data from JLPT level files — shows readings, on/kun, meanings, example word with sentence.
- Shared lib at src/lib/radicals.ts exports toSlug(), getBySlug(), getKanjiByChar().
- Grammar data file src/data/grammar.json with 76 entries across N5–N1 (each has id, level, title, meaning, formation, usage, 5 examples, related).
- Shared lib at src/lib/grammar.ts exports getGrammar(level), getAllGrammar().
- Shared components: src/components/level/GrammarIndex.astro, GrammarDetailPage.astro.
- Level grammar pages: src/pages/{n5,n4,n3,n2,n1}/grammar/index.astro and [slug].astro.
- Navbar SUB_LINKS array includes grammar entry with 📋 icon.
- Sitemap includes grammar index and detail page routes.
- Build: `npm run build` (outputs to dist/).

## Completed
- Created src/data/radicals.json with 214 enriched radicals (reading, variants, examples, desc).
- Created /api/radicals.json.ts endpoint.
- Created /learn/ index page (3-card grid: Radicals, Hiragana, Katakana).
- Created /learn/radicals/ index (grouped by stroke count, cards link to detail pages).
- Created /learn/hiragana/ and /learn/katakana/ pages with proper kana-table styles.
- Added "Learn" dropdown to Navbar (desktop and mobile).
- Added /learn/ routes to sitemap.xml.ts.
- Replaced numeric ID URLs ([id].astro) with slug URLs ([slug].astro) for radicals.
- Added enriched example kanji display on radical detail page (readings, meanings, sentences).
- Created src/lib/radicals.ts with shared toSlug(), getBySlug(), getKanjiByChar().
- Created src/data/grammar.json with 76 grammar entries (N5–N1, 5+ examples each).
- Created src/lib/grammar.ts with getGrammar(), getAllGrammar().
- Created src/components/level/GrammarIndex.astro and GrammarDetailPage.astro.
- Created grammar page wrappers for all 5 levels (index + [slug] at src/pages/{n5,n4,n3,n2,n1}/grammar/).
- Added grammar to SUB_LINKS in Navbar.astro.
- Added grammar routes to sitemap.xml.ts.
- Build verified: 25,412 pages built successfully.

## Relevant Files
- src/data/grammar.json: 76 grammar entries (20 N5, 14 N4, 12 N3, 14 N2, 16 N1)
- src/lib/grammar.ts: getGrammar(level), getAllGrammar()
- src/components/level/GrammarIndex.astro: level grammar listing page
- src/components/level/GrammarDetailPage.astro: grammar detail with formation, usage, examples, related
- src/pages/n5/grammar/index.astro, [slug].astro (same pattern for n4/n3/n2/n1)
- src/components/Navbar.astro: SUB_LINKS with grammar entry
- src/pages/sitemap.xml.ts: grammar index + detail page entries
