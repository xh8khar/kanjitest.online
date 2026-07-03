export const dynamic = "force-static"

const BASE = "https://kanjitest.online"

export async function GET() {
  const urls: string[] = [
    BASE,
    `${BASE}/n5/`,
    `${BASE}/n5/study/`,
    `${BASE}/n5/flashcards/`,
    `${BASE}/n5/sets/`,
    `${BASE}/about/`,
    `${BASE}/privacy/`,
    `${BASE}/terms/`,
  ]

  for (let i = 1; i <= 79; i++) {
    urls.push(`${BASE}/n5/study/${i}/`)
  }

  for (let i = 1; i <= 20; i++) {
    urls.push(`${BASE}/n5/sets/${i}/`)
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  })
}
