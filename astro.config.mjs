// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  site: "https://kanjitest.online",
  trailingSlash: "always",
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
})
