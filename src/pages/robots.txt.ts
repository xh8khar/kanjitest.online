import type { APIRoute } from "astro"
import { siteUrl } from "@/lib/seo"

const AI_AGENTS = [
  "GPTBot",
  "Google-Extended",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "CCBot",
  "anthropic-ai",
  "DiffusionBot",
  "OAI-SearchBot",
]

export const GET: APIRoute = () => {
  const aiRules = AI_AGENTS.map((a) => `User-agent: ${a}\nAllow: /`).join("\n\n")
  const body = `# SEO
User-agent: *
Allow: /
Sitemap: ${siteUrl()}/sitemap.xml

# AI assistants & crawlers — all welcome
${aiRules}

# LLM discovery
LLMs.txt: ${siteUrl()}/llms.txt
`
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
