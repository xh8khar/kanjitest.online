import sharp from "sharp"
import { readFileSync, mkdirSync, writeFileSync, existsSync, readdirSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const levelLabels = { n5: "N5", n4: "N4", n3: "N3", n2: "N2", n1: "N1" }
const levelColors = {
  n5: { from: "#059669", to: "#0d9488" },
  n4: { from: "#0284c7", to: "#2563eb" },
  n3: { from: "#7c3aed", to: "#9333ea" },
  n2: { from: "#ea580c", to: "#d97706" },
  n1: { from: "#e11d48", to: "#db2777" },
}

const BLOG_DIR = resolve(__dirname, "../src/content/blog")
const OUT = resolve(__dirname, "../public/og")
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const fm = {}
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.+)$/)
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "")
  }
  const tagsMatch = content.match(/^tags:\s*\[([\s\S]*?)\]/m)
  if (tagsMatch) {
    fm.tags = tagsMatch[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, ""))
  }
  const kanjiMatch = content.match(/^kanji:\s*"(.+?)"/m)
  if (kanjiMatch) fm.kanji = kanjiMatch[1]
  return fm
}

function blogOgSvg(kanji, title, level, label) {
  const c = levelColors[level]

  const words = title.split(" ")
  const titleLines = []
  let line = ""
  for (const word of words) {
    if ((line + " " + word).length > 28) {
      titleLines.push(line)
      line = word
    } else {
      line = (line ? line + " " : "") + word
    }
  }
  if (line) titleLines.push(line)

  const maxLines = 3
  const displayLines = titleLines.slice(0, maxLines)
  if (titleLines.length > maxLines) {
    const last = displayLines[displayLines.length - 1]
    displayLines[displayLines.length - 1] = last.slice(0, last.length - 3) + "…"
  }

  const fontSize = displayLines.length === 1 ? 44 : displayLines.length === 2 ? 38 : 32
  const lineHeight = fontSize + 12
  const totalHeight = displayLines.length * lineHeight
  const barTop = 340
  const barPad = 28
  const textStartY = barTop + barPad + fontSize

  const barBottom = barTop + barPad * 2 + totalHeight
  const barH = barBottom - barTop

  const titleElements = displayLines.map((l, i) =>
    `<text x="600" y="${textStartY + i * lineHeight}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="800" fill="white">${l.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>`
  ).join("\n")

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c.from}"/>
      <stop offset="100%" style="stop-color:${c.to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <circle cx="1000" cy="-100" r="450" fill="rgba(255,255,255,0.05)"/>
  <circle cx="200" cy="700" r="400" fill="rgba(255,255,255,0.04)"/>

  <rect x="40" y="40" rx="20" ry="20" width="76" height="40" fill="rgba(255,255,255,0.2)"/>
  <text x="78" y="67" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="white">${label}</text>

  <text x="600" y="220" text-anchor="middle" font-family="'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif" font-size="200" font-weight="900" fill="rgba(255,255,255,0.06)">${kanji}</text>

  <rect x="120" y="${barTop}" width="960" height="${barH}" rx="16" ry="16" fill="rgba(0,0,0,0.35)"/>

  ${titleElements}

  <text x="600" y="590" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="rgba(255,255,255,0.45)">KanjiTest.Online — Free JLPT Kanji Practice</text>
</svg>`
}

async function generate() {
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
  let total = 0
  const errors = []

  for (const file of files) {
    const content = readFileSync(resolve(BLOG_DIR, file), "utf-8")
    const fm = parseFrontmatter(content)
    if (!fm) continue

    const slug = file.replace(/\.md$/, "")
    const title = fm.title || slug
    const tags = fm.tags || []
    const kanji = fm.kanji

    const levelTag = tags.find((t) => Object.values(levelLabels).includes(t))
    if (!levelTag) continue

    const level = Object.keys(levelLabels).find((k) => levelLabels[k].toLowerCase() === levelTag.toLowerCase())
    if (!level) continue

    const label = levelLabels[level]
    const displayKanji = kanji || "漢字"

    const svgStr = blogOgSvg(displayKanji, title, level, label)
    const filename = `og-blog-${slug}.png`

    try {
      await sharp(Buffer.from(svgStr)).resize(1200, 630).png().toFile(resolve(OUT, filename))
      console.log(`  ✓ ${filename}`)
      total++
    } catch (e) {
      errors.push({ file: filename, error: e.message })
      writeFileSync(resolve(OUT, `og-blog-${slug}.svg`), svgStr)
      console.log(`  → ${filename} (SVG fallback)`)
      total++
    }
  }

  console.log(`\nDone! Generated ${total} blog OG images.`)
  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`)
    for (const e of errors) {
      console.log(`  ✗ ${e.file}: ${e.error}`)
    }
  }
}

generate().catch(console.error)
