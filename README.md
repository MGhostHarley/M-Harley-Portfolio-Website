# emharley.com

Hi, I'm Michael Harley, though most people call me Em. I'm a senior full-stack engineer in San Francisco, and this repo is my portfolio site: https://emharley.com.

I've spent about ten years building production software end to end. That means React and TypeScript on the front, Go and Python on the back, and AWS underneath. I've worked in healthcare, security, government, and consumer products, and lately a lot of my work has been getting AI and LLM features into production and keeping them useful once they're there. Right now I'm at Pacific Fusion, building data systems for fusion hardware testing. I like working close to the people who use what I build, and I like being able to show that it made a difference.

## Why I redesigned it

The old version of this site was fun, but it wasn't really me anymore. It leaned on big 3D models that took a while to load, and it read more like a tour of tricks than a picture of the work I actually do. I wanted a visitor to know within a few seconds who I am, what I'm working on, and what I've shipped.

I also wasn't willing to give up on space. I love it, so the site had to feel like you're floating somewhere out past the atmosphere. The trick was keeping that feeling while making the whole thing look like a senior engineer's portfolio and not a screensaver.

So the background is a slowly turning field of stars, and there's no 3D library behind it. It's my own small renderer in `src/graphics/starField.ts`: 1,500 points placed at random inside a sphere (650 on phones), rotated a little on every animation frame, and projected through a simple perspective camera onto a canvas. Stars closer to the camera come out bigger and brighter, and that's where the depth comes from. The random numbers come from a fixed seed, so every page draws the exact same sky, and moving between pages feels like one continuous place. It also stops moving if you've asked your device to reduce motion, or if you hit the pause button in the footer.

It's a much lighter way to show 3D skills than shipping a pile of models. Honestly, I think it's more interesting too, because the math is sitting right there in the file.

## Why the layout looks the way it does

I built the layout around what a busy reader, like a recruiter or a hiring manager, wants to find first.

The home page opens on a full-screen hero with my name, a few rotating photos, and a line about what I'm doing right now. Under that are three case studies, each opening with its result, because that's usually the first question anyone has. Then come my experience, a short section on the AI work I've shipped, my skills, and a contact form that opens in a dialog so you never lose your place.

Case studies and the FAQ have their own pages. Each case study ends with the biggest decision I made on that project and why I made it. That's the part I most want people to read, since it says more about how I think than any list of technologies.

Each page is its own small HTML file, so the site runs on plain static hosting with no server. Pages fade into each other using the browser's view transitions, and since the stars are the same everywhere, the sky just stays put while the content changes.

## What it's built with

TypeScript runs through the whole codebase. It catches my mistakes before a visitor does, and it makes the content files feel like a form I fill in. The case studies, work history, FAQ, and skills all live in typed files under `src/data/`, so updating the site mostly means editing data, not components.

React 19 and Vite do the heavy lifting. Vite builds all three pages as separate entry points and keeps local development fast.

Tailwind CSS v4 handles the styling. I like keeping the styles right next to the markup, and Tailwind's theme tokens let me define the night-sky palette once (the deep navy background, the pink star glow) and use it everywhere. It's mobile first, so the phone layout came first and the bigger screens were built on top.

EmailJS sends the contact form. It lets a static site send email without a backend of my own. The form checks its input, hides a honeypot field that quietly drops bot submissions, and gives up politely if the request takes too long. The recipient address lives in the EmailJS template and not in the code, so nobody can reuse the form to email someone else.

For quality, there's Vitest with Testing Library, ESLint with accessibility rules, and Prettier. A GitHub Actions workflow runs all of them on every pull request, and every merge to `main` deploys to Hostinger automatically.

## Running it locally

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

## Deployment

`.github/workflows/deploy.yml` runs `npm run check` on every pull request. On every push to `main`, it runs the same checks and then uploads `dist/` to `/public_html/` on Hostinger over FTP, sending only the files that changed. It needs these repository secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, and `VITE_EMAILJS_TEMPLATE_ID`. The deploy never deletes old files from the server, so clean those up by hand when something is removed.
