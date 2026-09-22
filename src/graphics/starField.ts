import { createAnimationLoop } from './animationLoop'

interface Star {
  x: number
  y: number
  z: number
  size: number
  brightness: number
  /** "r, g, b" */
  color: string
}

// Real stars vary with temperature: mostly white, some blue-white, a few pale
// yellow and orange. Weights sum to 1.
const STAR_COLORS = [
  { rgb: '245, 246, 255', weight: 0.62 },
  { rgb: '200, 215, 255', weight: 0.18 },
  { rgb: '255, 238, 205', weight: 0.13 },
  { rgb: '255, 212, 175', weight: 0.07 },
]
const SPHERE_RADIUS = 1.2
const CAMERA_DISTANCE = 1.8
const MAX_PIXEL_RATIO = 1.5
const MOBILE_WIDTH = 768
const STAR_COUNT = { mobile: 650, desktop: 1500 }
// Seconds per radian of rotation around each axis.
const ROTATION_PERIOD = { x: 10, y: 15 }

// A fixed seed gives every page the same sky, so moving between pages is seamless.
const SEED = 20260918

/** Small deterministic random number generator (mulberry32). */
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickColor(roll: number) {
  let total = 0
  for (const { rgb, weight } of STAR_COLORS) {
    total += weight
    if (roll < total) return rgb
  }
  return STAR_COLORS[0].rgb
}

/** Uniformly distributed points inside a sphere. */
function createStars(count: number): Star[] {
  const random = seededRandom(SEED)
  // A separate sequence for colors, so star positions stay exactly as before.
  const colorRandom = seededRandom(SEED + 1)
  return Array.from({ length: count }, () => {
    const radius = SPHERE_RADIUS * Math.cbrt(random())
    const azimuth = random() * Math.PI * 2
    const vertical = random() * 2 - 1
    const ring = Math.sqrt(1 - vertical * vertical)
    return {
      x: radius * ring * Math.cos(azimuth),
      y: radius * ring * Math.sin(azimuth),
      z: radius * vertical,
      size: 0.6 + random() * 0.9,
      brightness: 0.35 + random() * 0.55,
      color: pickColor(colorRandom()),
    }
  })
}

// Where the sky was when the last page closed, so the next page picks up there.
const STORAGE_KEY = 'star-field-angles'
interface SavedAngles {
  x: number
  y: number
  time: number
}

function readSavedAngles(): SavedAngles | undefined {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null')
    return typeof saved?.x === 'number' ? saved : undefined
  } catch {
    return undefined
  }
}

/**
 * Draws a slowly rotating sphere of stars onto a viewport-sized canvas.
 * `startPaused` keeps a paused sky exactly where the previous page left it.
 */
export function createStarField(
  canvas: HTMLCanvasElement,
  { startPaused = false } = {},
) {
  const context = canvas.getContext('2d')
  if (!context) return undefined

  let stars: Star[] = []
  let width = 0
  let height = 0
  // Continue from the last page's sky, advanced by the time since if it was
  // moving; on a first visit, start from the clock.
  const saved = readSavedAngles()
  const now = Date.now()
  const elapsed = saved
    ? startPaused
      ? 0
      : (now - saved.time) / 1000
    : now / 1000
  const turn = Math.PI * 2
  let angleX = ((saved?.x ?? 0) - elapsed / ROTATION_PERIOD.x) % turn
  let angleY = ((saved?.y ?? 0) - elapsed / ROTATION_PERIOD.y) % turn

  const saveAngles = () => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ x: angleX, y: angleY, time: Date.now() }),
      )
    } catch {
      // Without storage the next page starts from the clock instead.
    }
  }

  const draw = () => {
    const cosX = Math.cos(angleX)
    const sinX = Math.sin(angleX)
    const cosY = Math.cos(angleY)
    const sinY = Math.sin(angleY)
    const tilt = Math.SQRT1_2
    context.clearRect(0, 0, width, height)
    for (const star of stars) {
      const y = star.y * cosX - star.z * sinX
      const z = star.y * sinX + star.z * cosX
      const x = star.x * cosY + z * sinY
      const depth = CAMERA_DISTANCE - (-star.x * sinY + z * cosY)
      const screenX = width / 2 + (((x - y) * tilt) / depth) * width * 0.85
      const screenY = height / 2 + (((x + y) * tilt) / depth) * height * 0.85
      const offscreen =
        screenX < -4 ||
        screenX > width + 4 ||
        screenY < -4 ||
        screenY > height + 4
      if (offscreen) continue
      const opacity = Math.min(0.9, star.brightness / depth)
      context.beginPath()
      context.fillStyle = `rgba(${star.color}, ${opacity})`
      context.arc(
        screenX,
        screenY,
        Math.min(2.2, star.size / depth),
        0,
        Math.PI * 2,
      )
      context.fill()
    }
  }

  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    const count = width < MOBILE_WIDTH ? STAR_COUNT.mobile : STAR_COUNT.desktop
    if (stars.length !== count) stars = createStars(count)
    draw()
  }

  const loop = createAnimationLoop((delta) => {
    angleX -= delta / ROTATION_PERIOD.x
    angleY -= delta / ROTATION_PERIOD.y
    draw()
  })

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pagehide', saveAngles)

  return {
    setAnimating: loop.setRunning,
    dispose() {
      loop.setRunning(false)
      saveAngles()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pagehide', saveAngles)
    },
  }
}
