import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'
import logo from '../assets/optimized/logo.webp'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
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

  return (
    <nav
      className="fixed inset-x-0 top-0 z-20 bg-night/96"
      aria-label="Main navigation"
      ref={navRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close()
      }}
    >
      <div className="mx-auto flex min-h-16 max-w-[1280px] items-center justify-between gap-6 px-5 py-2 md:min-h-17 md:px-6 md:py-3">
        <a
          href="#home"
          className="flex items-center gap-2.5 text-[1.25rem] font-bold whitespace-nowrap"
          onClick={close}
        >
          <img src={logo} width="36" height="36" alt="" />
          <span>
            Em <span className="hidden md:inline">| Harley</span>
          </span>
        </a>
        <button
          ref={menuButtonRef}
          className="block size-11 rounded-md border border-line bg-surface-raised px-1.5 py-px text-[24px] text-snow md:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        {/* Below md the list is a dropdown under the menu button. */}
        <ul
          id="main-navigation"
          className={`${open ? 'flex' : 'hidden'} items-center gap-6 max-md:absolute max-md:top-16 max-md:right-5 max-md:min-w-47.5 max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:rounded-lg max-md:border max-md:border-line max-md:bg-surface-raised max-md:p-3 md:flex`}
        >
          {navLinks.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={close}
                className="inline-flex min-h-11 items-center text-muted underline-offset-6 hover:text-snow hover:underline aria-[current=location]:text-snow aria-[current=location]:underline max-md:px-3 max-md:py-2"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
