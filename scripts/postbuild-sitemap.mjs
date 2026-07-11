import { readdirSync, renameSync, rmSync, existsSync } from "node:fs"
import { join } from "node:path"

const dist = new URL("../dist/", import.meta.url)
const sitemapDir = new URL("sitemap/", dist)

if (!existsSync(sitemapDir)) {
  process.exit(0)
}

const files = readdirSync(sitemapDir)
const nums = files.filter((f) => /^\d+$/.test(f)).map(Number).sort((a, b) => a - b)

for (const n of nums) {
  const oldPath = join(sitemapDir.pathname, String(n))
  const newPath = join(dist.pathname, `sitemap-${n}.xml`)
  renameSync(oldPath, newPath)
}

rmSync(sitemapDir.pathname.slice(0, -1), { recursive: true })

console.log(`Renamed ${nums.length} sitemap sub-files to sitemap-{N}.xml`)
