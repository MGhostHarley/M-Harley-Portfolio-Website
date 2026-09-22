import { profile, resumeUrl } from '../data/profile'

const links = [
  { title: 'Case studies', href: '/case-studies/' },
  { title: 'FAQ', href: '/faq/' },
  { title: 'Resume', href: resumeUrl, download: true },
]

// Extra bottom padding below lg keeps the links clear of the floating pause button.
export default function Footer() {
  return (
    <footer className="relative z-1 border-t border-line">
      <div className="page flex flex-wrap items-center justify-between gap-4 pt-10 pb-20 text-sm text-faint lg:pb-10">
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
      </div>
    </footer>
  )
}
