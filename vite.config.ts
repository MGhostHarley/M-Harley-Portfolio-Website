import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Explicit extension: Vite's native config loader doesn't resolve bare paths.
import { pages, siteMetadata } from './build/siteMetadata.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetadata()],
  build: {
    rolldownOptions: {
      // One HTML entry per page (index.html, case-studies/index.html, …).
      input: Object.fromEntries(
        Object.entries(pages).map(([name, { path }]) => [
          name,
          fileURLToPath(new URL(`.${path}index.html`, import.meta.url)),
        ]),
      ),
    },
  },
})
