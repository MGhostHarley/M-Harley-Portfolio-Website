import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from 'react'
import { photos } from '../data/photos'
import { useMotionEnabled } from '../motion'
import { ArrowRightIcon, CloseIcon } from './icons'

const INTERVAL_MS = 15_000

/**
 * Cross-fades through the photos. Stops when animation is paused or reduced,
 * and holds while a mouse is over it or focus is inside it (WCAG 2.2.2).
 */
export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [held, setHeld] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const viewerRef = useRef<HTMLDialogElement>(null)
  const rotating = useMotionEnabled() && !held && !viewerOpen
  // Only mount the photo on show and the next one, so the rest aren't
  // downloaded until shortly before they appear.
  const next = (current + 1) % photos.length
  const [mounted, setMounted] = useState(() => new Set([current, next]))
  if (!mounted.has(current) || !mounted.has(next))
    setMounted(new Set([...mounted, current, next]))

  // Restarts on every photo change and every release of a hold, in step with
  // the progress fill below, which remounts on the same changes.
  useEffect(() => {
    if (!rotating) return
    const timer = setInterval(
      () => setCurrent((index) => (index + 1) % photos.length),
      INTERVAL_MS,
    )
    return () => clearInterval(timer)
  }, [rotating, current])

  // Touch "hovers" never end, so only a real mouse holds the photo.
  const onPointer = (hold: boolean) => (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setHeld(hold)
  }
  const onBlur = (event: FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
  }
  const openViewer = () => {
    setViewerOpen(true)
    viewerRef.current?.showModal()
  }
  const closeViewer = () => viewerRef.current?.close()
  const changePhoto = (direction: -1 | 1) =>
    setCurrent((index) => (index + direction + photos.length) % photos.length)

  return (
    <figure
      className="relative w-full max-w-52 justify-self-center md:max-w-none"
      onPointerEnter={onPointer(true)}
      onPointerLeave={onPointer(false)}
      onFocus={() => setHeld(true)}
      onBlur={onBlur}
    >
      <button
        type="button"
        onClick={openViewer}
        aria-label={`View ${photos[current].alt} full screen`}
        className="relative block aspect-4/5 w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-line"
      >
        {photos.map(
          ({ src, alt }, index) =>
            mounted.has(index) && (
              <img
                key={src}
                src={src}
                alt={alt}
                width="800"
                height="1000"
                aria-hidden={index !== current}
                fetchPriority={index === 0 ? 'high' : 'low'}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
              />
            ),
        )}
      </button>
      <figcaption className="mt-3 flex justify-center">
        {photos.map(({ alt }, index) => {
          const active = index === current
          return (
            <button
              key={alt}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show photo ${index + 1} of ${photos.length}`}
              aria-current={active}
              className="grid size-11 place-items-center"
            >
              <span
                className={`relative block h-1.5 overflow-hidden rounded-full ${active ? 'w-5 bg-accent/30' : 'w-1.5 bg-faint'}`}
              >
                {/* Fills over the interval, so it's visible that the photo
                    changes on a timer; solid while held or paused. */}
                {active && (
                  <span
                    key={`${current}-${rotating}`}
                    className="absolute inset-0 origin-left bg-accent"
                    style={
                      rotating
                        ? { animation: `dot-fill ${INTERVAL_MS}ms linear` }
                        : undefined
                    }
                  />
                )}
              </span>
            </button>
          )
        })}
      </figcaption>
      <dialog
        ref={viewerRef}
        aria-label="Full-screen photo"
        onClose={() => setViewerOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            changePhoto(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-night/95 p-4 text-snow backdrop:bg-night/95"
      >
        <button
          type="button"
          onClick={closeViewer}
          aria-label="Close photo"
          className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full border border-line bg-night/90 text-snow hover:border-accent hover:text-accent"
        >
          <CloseIcon className="size-5" />
        </button>
        {viewerOpen && (
          <div className="flex h-full w-full items-center justify-center pt-12 pb-16">
            <img
              src={photos[current].src}
              alt={photos[current].alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => changePhoto(-1)}
            aria-label="Previous photo"
            className="grid size-11 place-items-center rounded-full border border-line bg-night/90 text-snow hover:border-accent hover:text-accent"
          >
            <ArrowRightIcon className="size-5 rotate-180" />
          </button>
          <span
            className="min-w-14 text-center text-sm text-muted"
            aria-live="polite"
          >
            {current + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={() => changePhoto(1)}
            aria-label="Next photo"
            className="grid size-11 place-items-center rounded-full border border-line bg-night/90 text-snow hover:border-accent hover:text-accent"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </dialog>
    </figure>
  )
}
