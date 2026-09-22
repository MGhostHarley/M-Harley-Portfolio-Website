import type { ReactNode } from 'react'
import { profile, resumeUrl } from '../data/profile'

const links = [
  { title: 'Case studies', href: '/case-studies/' },
  { title: 'FAQ', href: '/faq/' },
  { title: 'Resume', href: resumeUrl, download: true },
]

/**
 * children: extra controls for the end of the row (the pause button on
 * phones). Extra bottom padding from md to lg keeps the links clear of the
 * floating pause button there.
 */
export default function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="relative z-1 border-t border-line">
      <div className="page flex flex-wrap items-center justify-between gap-4 pt-10 pb-10 text-sm text-faint md:pb-20 lg:pb-10">
        <p>
          © {new Date().getFullYear()} Em Harley · {profile.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ title, href, download }) => (
            <li key={title}>
              <a
                href={href}
                download={download}
                className="inline-flex min-h-11 items-center hover:text-accent"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </footer>
  )
}
