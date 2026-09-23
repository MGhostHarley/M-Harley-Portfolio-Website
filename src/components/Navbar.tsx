import { useEffect, useId, useRef, useState } from 'react'
import { navLinks, resumeUrl } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'
import { CloseIcon, DownloadIcon, MenuIcon, StarIcon } from './icons'
import SkyControls, { type SkyControlsProps } from './SkyControls'

const sectionIds = navLinks.flatMap((link) => link.sectionId ?? [])

type Panel = 'menu' | 'sky' | null

interface NavbarProps {
  /** href of the page being shown, so its link is marked as current. */
  currentPage?: string
  /** Star brightness and pause, reachable from the top of every page. */
  sky?: SkyControlsProps
}

const panelStyles =
  'absolute top-full right-0 mt-2 rounded-2xl border border-line bg-night p-2'

export default function Navbar({ currentPage, sky }: NavbarProps) {
  const [open, setOpen] = useState<Panel>(null)
  const activeSection = useActiveSection(sectionIds)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const skyButtonRef = useRef<HTMLButtonElement>(null)
  const skyPanelId = useId()
  const close = () => setOpen(null)
  const toggle = (panel: Panel) => setOpen(open === panel ? null : panel)

  // Close the menu or sky panel on Escape or on a click outside the navigation.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const button = open === 'sky' ? skyButtonRef : menuButtonRef
      setOpen(null)
      button.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null)
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

  const linkStyles =
    'inline-flex min-h-11 items-center rounded-full px-3.5 whitespace-nowrap hover:text-snow max-lg:w-full'

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
      <div className="relative page flex min-h-14 flex-wrap items-center gap-x-1 gap-y-1 rounded-[28px] border border-line bg-night/95 py-1 pr-1.5 pl-4 backdrop-blur-md sm:gap-x-2 sm:pl-5 lg:gap-x-4">
        <a
          href="/"
          className="mr-auto inline-flex min-h-11 shrink-0 items-center font-serif text-xl font-bold"
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
          className={`${open === 'menu' ? 'flex' : 'hidden'} gap-1 text-[0.92rem] text-muted max-lg:absolute max-lg:top-full max-lg:right-0 max-lg:mt-2 max-lg:min-w-52 max-lg:flex-col max-lg:gap-0 max-lg:rounded-2xl max-lg:border max-lg:border-line max-lg:bg-night max-lg:p-2 lg:flex`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={currentFor(link)}
                onClick={close}
                className={`${linkStyles} aria-[current=location]:bg-accent/10 aria-[current=location]:text-accent aria-[current=page]:bg-accent/10 aria-[current=page]:text-accent`}
              >
                {link.title}
              </a>
            </li>
          ))}
          {/* On phones Resume lives in the menu, making room for the sky button. */}
          <li className="sm:hidden">
            <a
              href={resumeUrl}
              download
              onClick={close}
              className={`${linkStyles} gap-1.5 text-accent`}
            >
              Resume <DownloadIcon />
            </a>
          </li>
        </ul>
        <a
          href={resumeUrl}
          download
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium whitespace-nowrap text-accent hover:bg-accent/10 max-sm:hidden"
        >
          Resume
          <DownloadIcon />
        </a>
        {sky && (
          <div className="relative">
            <button
              ref={skyButtonRef}
              type="button"
              className="grid size-11 place-items-center rounded-full text-muted hover:text-accent aria-expanded:bg-accent/10 aria-expanded:text-accent"
              aria-expanded={open === 'sky'}
              aria-controls={skyPanelId}
              aria-label="Star field: brightness and pause"
              title="Star field"
              onClick={() => toggle('sky')}
            >
              <StarIcon className="size-5" />
            </button>
            <div
              id={skyPanelId}
              className={`${open === 'sky' ? 'block' : 'hidden'} ${panelStyles}`}
            >
              <SkyControls {...sky} />
            </div>
          </div>
        )}
        <button
          ref={menuButtonRef}
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line hover:border-accent lg:hidden"
          aria-expanded={open === 'menu'}
          aria-controls="main-navigation"
          aria-label={open === 'menu' ? 'Close navigation' : 'Open navigation'}
          onClick={() => toggle('menu')}
        >
          {open === 'menu' ? (
            <CloseIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </div>
    </nav>
  )
}
