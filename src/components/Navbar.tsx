import { useEffect, useRef, useState } from 'react'
import { navLinks, resumeUrl } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'
import { CloseIcon, DownloadIcon, MenuIcon } from './icons'

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
      className="sticky top-0 z-20 pt-3 [view-transition-name:site-nav]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close()
      }}
    >
      {/* A floating pill over the star field. It wraps to a second row
          instead of overflowing when text is enlarged. */}
      <div className="relative page flex min-h-14 flex-wrap items-center gap-x-1 gap-y-1 rounded-[28px] border border-line bg-night/90 py-1 pr-1.5 pl-4 backdrop-blur-md sm:gap-x-4 sm:pl-5 lg:gap-x-6">
        <a
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center font-serif text-xl font-bold"
          onClick={close}
        >
          {/* Wrapped so the flex link doesn't drop the space between words. */}
          <span>
            Em <span className="text-muted">Harley</span>
          </span>
        </a>
        {/* Below lg the list is a dropdown under the menu button. */}
        <ul
          id="main-navigation"
          className={`${open ? 'flex' : 'hidden'} ml-auto gap-1 text-[0.92rem] text-muted max-lg:absolute max-lg:top-full max-lg:right-0 max-lg:mt-2 max-lg:min-w-52 max-lg:flex-col max-lg:gap-0 max-lg:rounded-2xl max-lg:border max-lg:border-line max-lg:bg-night max-lg:p-2 lg:flex`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={currentFor(link)}
                onClick={close}
                className="inline-flex min-h-11 items-center rounded-full px-3.5 whitespace-nowrap hover:text-snow aria-[current=location]:bg-accent/10 aria-[current=location]:text-accent aria-[current=page]:bg-accent/10 aria-[current=page]:text-accent max-lg:w-full"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={resumeUrl}
          download
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium whitespace-nowrap text-accent hover:bg-accent/10 max-lg:ml-auto sm:px-3.5"
        >
          Resume
          <DownloadIcon />
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line hover:border-accent lg:hidden"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <CloseIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </div>
    </nav>
  )
}
