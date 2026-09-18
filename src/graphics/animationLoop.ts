// Cap each step so a long pause (e.g. a backgrounded tab) doesn't cause a jump.
const MAX_STEP_SECONDS = 0.05

/**
 * Runs `step` once per animation frame while running.
 * Browsers pause animation frames in hidden tabs, so no visibility handling is needed.
 */
export function createAnimationLoop(step: (deltaSeconds: number) => void) {
  let frame = 0
  let last = 0
  let running = false

  const tick = (now: number) => {
    const delta = last ? Math.min((now - last) / 1000, MAX_STEP_SECONDS) : 0
    last = now
    step(delta)
    frame = requestAnimationFrame(tick)
  }

  return {
    setRunning(next: boolean) {
      if (next === running) return
      running = next
      cancelAnimationFrame(frame)
      last = 0
      if (running) frame = requestAnimationFrame(tick)
    },
  }
}
