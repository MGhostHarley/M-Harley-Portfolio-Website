# M Harley Portfolio Website

Personal portfolio for Michael (Em) Harley. React and Vite, with a lightweight animated star background.

## Development

Use Node.js 24 (see .nvmrc), then:

```sh
npm ci
npm run dev
```

The preview binds to localhost. To inspect a production build:

```sh
npm run build
npm run preview
```

## Checks

```sh
npm run check
```

This runs the TypeScript type check, accessibility-aware linting, formatting checks, Vitest unit tests, and the production build. Run `npm run format` to format source files.

## Structure

The site has three pages, each its own HTML entry so it works on plain static hosting. Moving between them uses cross-document view transitions where supported, and the star field is seeded so every page shows the same sky.

- `/` (`index.html` → `src/main.tsx` → `pages/HomePage.tsx`)
- `/case-studies/` (`case-studies/index.html` → `src/case-studies.tsx` → `pages/CaseStudiesPage.tsx`)
- `/faq/` (`faq/index.html` → `src/faq.tsx` → `pages/FaqPage.tsx`)

```
src/
  pages/       One component per page, built from sections inside a shared Layout
  components/  One component per section, plus shared pieces (Section, SocialLinks, ContactDialog)
  data/        Editable content and its types
  assets/      Images; photos/ holds the rotating hero photos (4:5, 800×1000)
  graphics/    Framework-free canvas code: star field and animation loop
  hooks/       useMediaQuery, useActiveSection
  utils/       Contact validation and EmailJS delivery
  motion.ts    Context that pauses animation (footer toggle or reduced-motion preference)
```

## Styling

Styles are Tailwind CSS v4 utility classes written directly on the components, mobile-first: unprefixed classes apply to phones, `md:` from 768px, and `lg:` from 1060px.

- `src/index.css` holds the design tokens (`@theme`: colors, fonts, breakpoints), the `page` (content column), `eyebrow` (small mono label), and `bg-brush` utilities, and a small base layer.
- Each `--color-*` token becomes utilities such as `bg-night`, `text-muted`, or `border-line`.
- Class lists reused in several places live in `src/components/styles.ts` (buttons, chips, panels, text links).
- Prettier sorts class names automatically (`prettier-plugin-tailwindcss`).

## Content

- `src/data/profile.ts`: biography, social links, navigation, current stack, site description. Plain data only, because vite.config.ts imports it directly.
- `src/data/experience.ts`: work history from the September 2026 resume, with a one-line summary per role.
- `src/data/caseStudies.ts`: case studies, each with its key decision.
- `src/data/impact.ts`: the impact numbers with company logos (`src/assets/logos`), and the AI highlights in About.
- `src/data/faqs.ts`: FAQ questions, grouped.
- `src/data/tech.ts`: looks up the brand logo and color for any technology name shown as a chip.
- `src/data/skills.ts`: skills grouped as on the resume, with Simple Icons logos or text badges.
- `src/data/projects.ts`: side projects. Omit `demo` or `source` to show the "private" note.
- `src/data/photos.ts`: hero photos and their alt text.
- `public/Michael-Harley-Resume.pdf`: the downloadable resume, a public copy with phone number and email removed.

Page title, description, canonical URL, social metadata, and structured profile data in both HTML pages are filled from profile.ts by the `siteMetadata` plugin in vite.config.ts, which also writes robots.txt and a sitemap listing every page. Stars and the hero photos respect reduced motion and the footer pause button.

## Favicon and social preview

`public/favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, and `social-preview.png` are generated from the site's fonts, colors, and hero photo by `scripts/brand-assets.py` (needs Python with `pillow` and `fonttools`). Rerun it after changing the name, title, stack, or photo.

## Contact delivery

Existing EmailJS public service identifiers remain the defaults. Override through .env.local using .env.example. Never put a private key in a VITE_ variable: those values are public. Configure allowed origins and anti-abuse controls in the EmailJS account. The form includes a hidden honeypot field that silently discards bot submissions, and stops waiting after 12 seconds with a message asking the visitor not to resend (the request may still arrive). Unit and component tests cover validation, template mapping, and these form states with a mocked sender; they do not send email. Real inbox delivery needs an owner-supervised test.

## Review workflow

Stabilization work is on `update1`. See BASELINE-PLAN.md and STABILIZATION.md. Review locally before pushing, merging, or deploying.
