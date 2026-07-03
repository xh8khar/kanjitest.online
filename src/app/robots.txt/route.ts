export const dynamic = "force-static"

export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://kanjitest.online/sitemap.xml
`
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  })
}
