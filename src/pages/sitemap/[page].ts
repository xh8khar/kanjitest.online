import type { APIRoute } from "astro"
import { siteUrl } from "@/lib/seo"
import { getAllEntries, MAX_URLS } from "@/lib/sitemap"

export async function getStaticPaths() {
  const allEntries = await getAllEntries()
  const totalPages = Math.ceil(allEntries.length / MAX_URLS)

  return Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) },
  }))
}

export const GET: APIRoute = async ({ params }) => {
  const BASE = siteUrl()
  const now = new Date().toISOString().split("T")[0]
  const page = params.page!
  const pageNum = parseInt(page, 10)
  const allEntries = await getAllEntries()

  const start = (pageNum - 1) * MAX_URLS
  const chunk = allEntries.slice(start, start + MAX_URLS)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${now}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join("\n")}
</urlset>`

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
