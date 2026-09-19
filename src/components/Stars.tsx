import { useEffect, useRef } from 'react'
import { useMotionEnabled } from '../motion'
import { createStarField } from '../graphics/starField'

/** The rotating star background shown behind every section. */
export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fieldRef = useRef<ReturnType<typeof createStarField>>(undefined)
  const motionEnabled = useMotionEnabled()
  // Read once at creation: a paused sky should open where the last page froze it.
  const startedPaused = useRef(!motionEnabled)

  useEffect(() => {
    if (!canvasRef.current) return
    const field = createStarField(canvasRef.current, {
      startPaused: startedPaused.current,
    })
    fieldRef.current = field
    return () => field?.dispose()
  }, [])

  // Declared after the effect above, so the field exists when this first runs.
  useEffect(() => {
    fieldRef.current?.setAnimating(motionEnabled)
  }, [motionEnabled])

  return (
    <canvas
      className="pointer-events-none fixed inset-0 z-1 size-full [view-transition-name:stars]"
      ref={canvasRef}
      aria-hidden="true"
    />
  )
}
