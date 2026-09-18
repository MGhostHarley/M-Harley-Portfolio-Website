import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Explicit extension: Vite's native config loader doesn't resolve bare paths.
import { profile } from './src/data/profile.ts'

const pageTitle = `${profile.name} | Senior Software Engineer`

/** Fills %PLACEHOLDER% values in index.html from profile data and emits SEO files. */
function siteMetadata(): Plugin {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.preferredName,
    url: profile.url,
    jobTitle: profile.title,
    sameAs: profile.socials.map((social) => social.url),
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'American University' },
  }
  const values: Record<string, string> = {
    SITE_URL: profile.url,
    SITE_TITLE: pageTitle,
    SITE_DESCRIPTION: profile.description,
    SITE_IMAGE_ALT: `${profile.name} — ${profile.title}`,
    CONTACT_EMAIL: profile.email,
    // Escape "<" so the JSON can't close the surrounding script tag.
    PROFILE_JSON: JSON.stringify(personSchema).replaceAll('<', '\\u003c'),
  }
  return {
    name: 'site-metadata',
    transformIndexHtml: (html) =>
      html.replace(/%(\w+)%/g, (match, key: string) => values[key] ?? match),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${profile.url}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${profile.url}/</loc></url></urlset>`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetadata()],
  // three.js (~600 kB) is only fetched lazily for the contact planet, so it
  // doesn't affect initial load; raise the limit rather than hand-split it.
  build: { chunkSizeWarningLimit: 650 },
})
