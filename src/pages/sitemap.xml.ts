import type { APIRoute } from "astro"
import { siteUrl } from "@/lib/seo"
import { getAllEntries, MAX_URLS } from "@/lib/sitemap"

export const GET: APIRoute = async () => {
  const BASE = siteUrl()
  const now = new Date().toISOString().split("T")[0]
  const allEntries = await getAllEntries()
  const totalPages = Math.ceil(allEntries.length / MAX_URLS)

  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: totalPages }, (_, i) => `  <sitemap><loc>${BASE}/sitemap-${i + 1}.xml</loc><lastmod>${now}</lastmod></sitemap>`).join("\n")}
</sitemapindex>`

  return new Response(index, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
