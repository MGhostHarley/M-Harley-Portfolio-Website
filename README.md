# M Harley Portfolio Website

Personal portfolio for Michael (Em) Harley. React and Vite, with a lightweight animated star background and a lazily loaded Three.js contact illustration.

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

```
src/
  data/        Editable content (profile, experience, projects, skills) and its types
  components/  One component per page section, plus small shared pieces
  graphics/    Framework-free canvas code: star field, planet scene, animation loop
  hooks/       useMediaQuery, useInView, useActiveSection
  utils/       Contact validation and EmailJS delivery
  motion.ts    Context that pauses animation (footer toggle or reduced-motion preference)
```

## Content

- `src/data/profile.ts`: biography, contact links, FAQs, site description, canonical URL.
- `src/data/experience.ts`: résumé-derived work history.
- `src/data/skills.ts`: services, skills, and technology icons.
- `src/data/projects.ts`: project descriptions and demo/source links. Omit `demo` or `source` to show the "unavailable" or "private" note.

The supplied July 2026 résumé is the source for historical roles. The owner confirmed Pacific Fusion and planned work using Kafka, Go, Python, and TypeScript for device telemetry, analysis, monitoring, and control. This is described as planned work, not completed achievements. The exact job title and start date remain to be supplied.

Page title, description, canonical URL, social metadata, and structured profile data in index.html are filled from profile.ts by the `siteMetadata` plugin in vite.config.ts. Stars respect reduced motion, can be paused using the footer button, and stop when the page is hidden. The contact scene loads near the viewport, limits resolution, and falls back gracefully when WebGL fails.

## Contact delivery

Existing EmailJS public service identifiers remain the defaults. Override through .env.local using .env.example. Never put a private key in a VITE_ variable: those values are public. Configure allowed origins and anti-abuse controls in the EmailJS account. Unit tests cover validation and template mapping; they do not send email. Real inbox delivery needs an owner-supervised test.

## Credits

The contact illustration uses “Stylized planet” by cmzw, licensed CC BY 4.0. Attribution is displayed next to the model; source and license are recorded in public/planet/license.txt.

## Review workflow

Stabilization work is on `update1`. See BASELINE-PLAN.md and STABILIZATION.md. Review locally before pushing, merging, or deploying.
