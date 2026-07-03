import { siteUrl } from "@/lib/seo"

export const dynamic = "force-static"

export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${siteUrl()}/sitemap.xml
`
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  })
}
