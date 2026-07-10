import sharp from "sharp"
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const levels = ["n5", "n4", "n3", "n2", "n1"]
const levelLabels = { n5: "N5", n4: "N4", n3: "N3", n2: "N2", n1: "N1" }
const levelColors = {
  n5: { from: "#10b981", to: "#14b8a6" },
  n4: { from: "#0ea5e9", to: "#3b82f6" },
  n3: { from: "#8b5cf6", to: "#a855f7" },
  n2: { from: "#f97316", to: "#f59e0b" },
  n1: { from: "#f43f5e", to: "#ec4899" },
}

const kanjiData = {}
for (const level of levels) {
  const filePath = resolve(__dirname, `../src/data/${level}.json`)
  kanjiData[level] = JSON.parse(readFileSync(filePath, "utf-8"))
}

// Pick top kanji per level. Use a deterministic subset based on interesting characters
const picks = {
  n5: [0, 3, 5, 8, 12, 15, 20, 25, 30, 40],
  n4: [0, 3, 5, 8, 10, 15, 20, 30, 40, 50],
  n3: [0, 5, 10, 15, 20, 30, 40, 50, 60, 70],
  n2: [0, 5, 10, 15, 20, 30, 40, 50, 60, 80],
  n1: [0, 5, 10, 15, 20, 30, 40, 50, 60, 100],
}

const OUT = resolve(__dirname, "../public/og")
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

function ogSvg(kanji, meaning, level, label) {
  const c = levelColors[level]
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c.from}"/>
      <stop offset="100%" style="stop-color:${c.to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="-80" r="400" fill="rgba(255,255,255,0.06)"/>
  <circle cx="100" cy="700" r="350" fill="rgba(255,255,255,0.04)"/>
  <rect x="40" y="40" rx="24" ry="24" width="80" height="44" fill="rgba(255,255,255,0.2)"/>
  <text x="80" y="69" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="white">${label}</text>
  <text x="600" y="370" text-anchor="middle" font-family="'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif" font-size="340" font-weight="900" fill="white">${kanji}</text>
  <text x="600" y="450" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="rgba(255,255,255,0.85)">${meaning}</text>
  <text x="600" y="575" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="rgba(255,255,255,0.5)">KanjiTest.Online — Free JLPT Kanji Practice</text>
</svg>`
}

function hubSvg(level, label, count) {
  const c = levelColors[level]
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c.from}"/>
      <stop offset="100%" style="stop-color:${c.to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="-80" r="400" fill="rgba(255,255,255,0.06)"/>
  <circle cx="100" cy="700" r="350" fill="rgba(255,255,255,0.04)"/>
  <text x="600" y="320" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="800" fill="white">JLPT ${label}</text>
  <text x="600" y="400" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="36" fill="rgba(255,255,255,0.85)">Kanji Test Online</text>
  <text x="600" y="460" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="rgba(255,255,255,0.6)">${count} kanji · Flashcards · Practice Tests</text>
  <text x="600" y="575" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="rgba(255,255,255,0.5)">KanjiTest.Online — Free JLPT Kanji Practice</text>
</svg>`
}

async function generate() {
  let total = 0
  const errors = []

  for (const level of levels) {
    const label = levelLabels[level]
    const data = kanjiData[level]

    // Hub image
    const hubSvgStr = hubSvg(level, label, data.length)
    const hubFilename = `og-${level}.png`
    try {
      await sharp(Buffer.from(hubSvgStr)).resize(1200, 630).png().toFile(resolve(OUT, hubFilename))
      console.log(`  ✓ ${hubFilename}`)
      total++
    } catch (e) {
      errors.push({ file: hubFilename, error: e.message })
      // Fallback: save SVG
      writeFileSync(resolve(OUT, `og-${level}.svg`), hubSvgStr)
      console.log(`  → ${hubFilename} (fallback SVG)`)
      total++
    }

    // Individual kanji images per level (10 each = 45 total, plus 5 hub = 50)
    const selected = picks[level]
    for (const idx of selected) {
      if (idx >= data.length) continue
      const k = data[idx]
      const meaning = k.meanings[0]
      const slug = encodeURIComponent(k.kanji)
      const svgStr = ogSvg(k.kanji, meaning, level, label)
      const filename = `og-${level}-${slug}.png`
      try {
        await sharp(Buffer.from(svgStr)).resize(1200, 630).png().toFile(resolve(OUT, filename))
        console.log(`  ✓ ${filename}`)
        total++
      } catch (e) {
        errors.push({ file: filename, error: e.message })
        writeFileSync(resolve(OUT, `og-${level}-${slug}.svg`), svgStr)
        console.log(`  → ${filename} (fallback SVG)`)
        total++
      }
    }
  }

  // Create a default fallback OG image
  const defaultSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d9482f"/>
      <stop offset="100%" style="stop-color:#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="-80" r="400" fill="rgba(255,255,255,0.06)"/>
  <circle cx="100" cy="700" r="350" fill="rgba(255,255,255,0.04)"/>
  <text x="600" y="300" text-anchor="middle" font-family="'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif" font-size="280" font-weight="900" fill="white">漢字</text>
  <text x="600" y="400" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="white">KanjiTest.Online</text>
  <text x="600" y="460" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">Free JLPT N5–N1 Kanji Practice &amp; Quiz</text>
  <text x="600" y="575" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="rgba(255,255,255,0.5)">KanjiTest.Online — Free JLPT Kanji Practice</text>
</svg>`
  try {
    await sharp(Buffer.from(defaultSvg)).resize(1200, 630).png().toFile(resolve(OUT, "og-default.png"))
    console.log(`  ✓ og-default.png`)
    total++
  } catch (e) {
    writeFileSync(resolve(OUT, "og-default.svg"), defaultSvg)
    console.log(`  → og-default.png (fallback SVG)`)
    total++
  }

  console.log(`\nDone! Generated ${total} OG images.`)
  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`)
    for (const e of errors) {
      console.log(`  ✗ ${e.file}: ${e.error}`)
    }
  }
}

generate().catch(console.error)
