import type { Plugin } from 'vite'
// Explicit extensions: Vite's native config loader doesn't resolve bare paths.
import { profile } from '../src/data/profile.ts'
import { faqGroups } from '../src/data/faqs.ts'

const siteName = 'Em Harley'
/** Every name people search for; kept in titles, descriptions, and structured data. */
const nameVariants = [
  'Em Harley',
  'Michael Harley',
  'M. Harley',
  'M Harley',
  'Michael R. Harley',
]
const linkedIn = profile.socials.find(
  (social) => social.icon === 'linkedin',
)!.url

interface PageMeta {
  path: string
  title: string
  description: string
  /** Extra schema.org nodes for this page. */
  schema?: object[]
}

/** Each page is its own HTML entry, so it works on plain static hosting. */
export const pages: Record<string, PageMeta> = {
  home: {
    path: '/',
    title: `Em Harley (Michael Harley) | ${profile.title}`,
    description:
      'Em Harley (Michael Harley, M. Harley) is a senior full-stack software engineer at Pacific Fusion, building data systems for fusion hardware testing with Go, Python, React, and Kafka.',
  },
  caseStudies: {
    path: '/case-studies/',
    title: 'Case Studies | Em Harley, Senior Software Engineer',
    description:
      'Case studies from Em Harley (Michael Harley): LLM-generated Medicare documents at Deloitte, invoice reconciliation that saved FDOT $1.8M, and AI support triage that cut wait times from 7 to 2 minutes.',
  },
  faq: {
    path: '/faq/',
    title: 'FAQ | Em Harley (Michael Harley)',
    description:
      'Answers about Em Harley (Michael Harley): work at Pacific Fusion, languages, AI experience, education, and how to get in touch.',
    schema: [
      {
        '@type': 'FAQPage',
        mainEntity: faqGroups.flatMap(({ faqs }) =>
          faqs.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        ),
      },
    ],
  },
}

// One Person and one WebSite, referenced by id from every page.
const person = {
  '@type': 'Person',
  '@id': `${profile.url}/#person`,
  name: profile.name,
  alternateName: nameVariants.filter((name) => name !== profile.name),
  givenName: 'Michael',
  familyName: 'Harley',
  url: profile.url,
  image: `${profile.url}/social-preview.png`,
  jobTitle: profile.title,
  worksFor: { '@type': 'Organization', name: 'Pacific Fusion' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'American University' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
  },
  knowsAbout: [
    'Go',
    'Python',
    'TypeScript',
    'React',
    'Kafka',
    'Data engineering',
    'LLM integration',
  ],
  sameAs: profile.socials.map((social) => social.url),
}
const website = {
  '@type': 'WebSite',
  '@id': `${profile.url}/#website`,
  name: siteName,
  alternateName: nameVariants.filter((name) => name !== siteName),
  url: `${profile.url}/`,
  publisher: { '@id': person['@id'] },
}

function structuredData(page: PageMeta) {
  const url = `${profile.url}${page.path}`
  const graph = [
    person,
    website,
    page.path === '/'
      ? {
          // ProfilePage requires mainEntity (not about), or Search Console
          // reports it as a critical issue.
          '@type': 'ProfilePage',
          url,
          name: page.title,
          mainEntity: { '@id': person['@id'] },
        }
      : {
          '@type': 'WebPage',
          url,
          name: page.title,
          about: { '@id': person['@id'] },
        },
    ...(page.schema ?? []),
  ]
  // Escape "<" so the JSON can't close the surrounding script tag.
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replaceAll('<', '\\u003c')
}

const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')

/** Fills %PLACEHOLDER% values in each HTML page and emits robots.txt and sitemap.xml. */
export function siteMetadata(): Plugin {
  return {
    name: 'site-metadata',
    transformIndexHtml(html, context) {
      const path = context.path.replace(/index\.html$/, '')
      const page = Object.values(pages).find(
        (candidate) => candidate.path === path,
      )
      if (!page) throw new Error(`No metadata for ${context.path}`)
      const values: Record<string, string> = {
        PAGE_TITLE: escapeHtml(page.title),
        PAGE_DESCRIPTION: escapeHtml(page.description),
        PAGE_URL: `${profile.url}${page.path}`,
        OG_TYPE: page.path === '/' ? 'profile' : 'website',
        SITE_NAME: siteName,
        SITE_URL: profile.url,
        AUTHOR: 'Em Harley (Michael Harley)',
        IMAGE_ALT: escapeHtml(`Em Harley (${profile.name}), ${profile.title}`),
        LINKEDIN_URL: linkedIn,
        STRUCTURED_DATA: structuredData(page),
      }
      return html.replace(
        /%(\w+)%/g,
        (match, key: string) => values[key] ?? match,
      )
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${profile.url}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.values(
          pages,
        )
          .map(
            ({ path }) =>
              `  <url><loc>${profile.url}${path}</loc><lastmod>${today}</lastmod></url>`,
          )
          .join('\n')}\n</urlset>\n`,
      })
    },
  }
}
