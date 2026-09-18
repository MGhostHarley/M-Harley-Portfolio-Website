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
      className="navbar"
      aria-label="Main navigation"
      ref={navRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close()
      }}
    >
      <div className="nav-inner">
        <a href="#home" className="brand" onClick={close}>
          <img src={logo} width="36" height="36" alt="" />
          <span>
            Em <span className="brand-surname">| Harley</span>
          </span>
        </a>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <ul
          id="main-navigation"
          className={open ? 'nav-links is-open' : 'nav-links'}
        >
          {navLinks.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={close}
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
