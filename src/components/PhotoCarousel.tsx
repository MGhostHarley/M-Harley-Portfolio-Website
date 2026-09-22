import { useEffect, useState } from 'react'
import { photos } from '../data/photos'
import { useMotionEnabled } from '../motion'

const INTERVAL_MS = 15_000

/** Cross-fades through the photos; stops when animation is paused or reduced. */
export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const motionEnabled = useMotionEnabled()
  // Only mount the photo on show and the next one, so the rest aren't
  // downloaded until shortly before they appear.
  const next = (current + 1) % photos.length
  const [mounted, setMounted] = useState(() => new Set([current, next]))
  if (!mounted.has(current) || !mounted.has(next))
    setMounted(new Set([...mounted, current, next]))

  useEffect(() => {
    if (!motionEnabled) return
    const timer = setInterval(
      () => setCurrent((index) => (index + 1) % photos.length),
      INTERVAL_MS,
    )
    return () => clearInterval(timer)
  }, [motionEnabled, current])

  return (
    <figure className="relative w-full max-w-65 justify-self-center md:max-w-none">
      <div className="relative aspect-4/5 overflow-hidden rounded-[20px] border border-accent/35">
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
      </div>
      <figcaption className="mt-3 flex justify-center">
        {photos.map(({ alt }, index) => (
          <button
            key={alt}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show photo ${index + 1} of ${photos.length}`}
            aria-current={index === current}
            className="grid size-11 place-items-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-[width,background-color] ${index === current ? 'w-5 bg-accent' : 'w-1.5 bg-faint'}`}
            />
          </button>
        ))}
      </figcaption>
    </figure>
  )
}
