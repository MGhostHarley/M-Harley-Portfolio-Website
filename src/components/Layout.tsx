import { useLayoutEffect, type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import PauseButton from './PauseButton'
import Stars from './Stars'
import { MotionContext } from '../motion'
import useMediaQuery from '../hooks/useMediaQuery'
import useStoredToggle from '../hooks/useStoredToggle'

interface LayoutProps {
  /** href of this page, so the navigation can mark it as current. */
  currentPage?: string
  children: ReactNode
}

const SETTLE_MS = 2000
const READER_INPUT = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const

/**
 * The browser tries to jump to a URL's #section before React has rendered it,
 * so links like /#experience from another page would land at the top. Scroll
 * there once it exists, and keep it in view while fonts and images reflow the
 * page, until the page settles or the reader starts scrolling themselves.
 */
/** The URL fragment as an element id, or '' if it is malformed (e.g. "#%E0%A4"). */
function fragmentId() {
  try {
    return decodeURIComponent(window.location.hash.slice(1))
  } catch {
    return ''
  }
}

function useScrollToHash() {
  // A layout effect runs before the first paint, so the reader never sees the
  // top of the page flash before it jumps to the section.
  useLayoutEffect(() => {
    const target = document.getElementById(fragmentId())
    if (!target) return
    const scroll = () => target.scrollIntoView({ behavior: 'instant' })
    scroll()

    const observer = new ResizeObserver(scroll)
    observer.observe(document.body)
    const stop = () => {
      observer.disconnect()
      clearTimeout(timer)
      for (const type of READER_INPUT) window.removeEventListener(type, stop)
    }
    const timer = setTimeout(stop, SETTLE_MS)
    for (const type of READER_INPUT)
      window.addEventListener(type, stop, { passive: true })
    return stop
  }, [])
}

/** Shell shared by every page: star background, navigation, and footer. */
export default function Layout({ currentPage, children }: LayoutProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [paused, togglePaused] = useStoredToggle('animation-paused')
  useScrollToHash()

  return (
    <MotionContext value={!reducedMotion && !paused}>
      <a
        href="#main-content"
        className="fixed -top-25 left-4 z-100 rounded-lg bg-snow px-5 py-3.5 text-night focus:top-3"
      >
        Skip to content
      </a>
      <Stars />
      <Navbar currentPage={currentPage} />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-1 focus:outline-none"
      >
        {children}
      </main>
      <Footer />
      {/* With reduced motion nothing animates, so there is nothing to pause. */}
      {!reducedMotion && (
        <PauseButton paused={paused} onToggle={togglePaused} />
      )}
    </MotionContext>
  )
}
