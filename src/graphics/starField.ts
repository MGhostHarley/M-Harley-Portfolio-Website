import { createAnimationLoop } from './animationLoop'

interface Star {
  x: number
  y: number
  z: number
  size: number
  brightness: number
}

const STAR_COLOR = '242, 114, 200'
const SPHERE_RADIUS = 1.2
const CAMERA_DISTANCE = 1.8
const MAX_PIXEL_RATIO = 1.5
const MOBILE_WIDTH = 768
const STAR_COUNT = { mobile: 650, desktop: 1500 }
// Seconds per radian of rotation around each axis.
const ROTATION_PERIOD = { x: 10, y: 15 }

/** Uniformly distributed points inside a sphere. */
function createStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    const radius = SPHERE_RADIUS * Math.cbrt(Math.random())
    const azimuth = Math.random() * Math.PI * 2
    const vertical = Math.random() * 2 - 1
    const ring = Math.sqrt(1 - vertical * vertical)
    return {
      x: radius * ring * Math.cos(azimuth),
      y: radius * ring * Math.sin(azimuth),
      z: radius * vertical,
      size: 0.6 + Math.random() * 0.9,
      brightness: 0.35 + Math.random() * 0.55,
    }
  })
}

/** Draws a slowly rotating sphere of stars onto a viewport-sized canvas. */
export function createStarField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return undefined

  let stars: Star[] = []
  let width = 0
  let height = 0
  let angleX = 0
  let angleY = 0

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
      context.fillStyle = `rgba(${STAR_COLOR}, ${opacity})`
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

  return {
    setAnimating: loop.setRunning,
    dispose() {
      loop.setRunning(false)
      window.removeEventListener('resize', resize)
    },
  }
}
