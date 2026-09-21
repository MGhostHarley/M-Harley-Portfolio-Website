import { useEffect, useRef, useState } from 'react'
import { navLinks, resumeUrl } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'
import { buttonStyles } from './styles'

const sectionIds = navLinks.flatMap((link) => link.sectionId ?? [])

interface NavbarProps {
  /** href of the page being shown, so its link is marked as current. */
  currentPage?: string
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

  // Close the mobile menu on Escape or on a click outside the navigation.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const currentFor = ({ href, sectionId }: (typeof navLinks)[number]) => {
    if (href === currentPage) return 'page'
    if (!currentPage && sectionId && sectionId === activeSection)
      return 'location'
    return undefined
  }

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="sticky top-0 z-20 border-b border-line bg-night/80 backdrop-blur-md [view-transition-name:site-nav]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close()
      }}
    >
      {/* Wraps to a second row instead of overflowing when text is enlarged. */}
      <div className="page flex min-h-16 flex-wrap items-center gap-x-6 gap-y-2 py-2">
        <a
          href="/"
          className="shrink-0 font-serif text-xl font-bold"
          onClick={close}
        >
          Em <span className="text-muted">Harley</span>
        </a>
        {/* Below lg the list is a dropdown under the menu button. */}
        <ul
          id="main-navigation"
          className={`${open ? 'flex' : 'hidden'} ml-auto gap-1 text-[0.92rem] text-muted max-lg:absolute max-lg:top-full max-lg:right-4 max-lg:min-w-52 max-lg:flex-col max-lg:gap-0 max-lg:rounded-xl max-lg:border max-lg:border-line max-lg:bg-night max-lg:p-2 lg:flex`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={currentFor(link)}
                onClick={close}
                className="inline-flex min-h-10 items-center rounded-lg px-3 hover:text-snow aria-[current=location]:bg-accent/10 aria-[current=location]:text-accent aria-[current=page]:bg-accent/10 aria-[current=page]:text-accent max-lg:w-full"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={resumeUrl}
          download
          className={`${buttonStyles.small} max-lg:ml-auto`}
        >
          Resume
          <span aria-hidden="true">↓</span>
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="grid size-11 place-items-center rounded-lg border border-line text-xl lg:hidden"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>
    </nav>
  )
}
