import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { createAnimationLoop } from './animationLoop'

const MODEL_URL = '/planet/scene.gltf'
const MAX_PIXEL_RATIO = 1.5
const ROTATION_SPEED = 0.12 // radians per second

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.geometry.dispose()
    const materials: THREE.Material[] = [child.material].flat()
    for (const material of materials) {
      for (const value of Object.values(material))
        if (value instanceof THREE.Texture) value.dispose()
      material.dispose()
    }
  })
}

/**
 * Renders the rotating planet model into `host`. Throws if WebGL is
 * unavailable; later failures (model load, lost context) call `onError`.
 */
export function createPlanetScene(host: HTMLElement, onError: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO),
  )
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.set(-4, 3, 6)
  camera.lookAt(0, 0, 0)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x302050, 2))
  const light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(4, 4, 4)
  scene.add(light)

  let model: THREE.Object3D | undefined
  let disposed = false
  const render = () => renderer.render(scene, camera)

  const loop = createAnimationLoop((delta) => {
    if (model) model.rotation.y += delta * ROTATION_SPEED
    render()
  })

  const resize = () => {
    const width = host.clientWidth || 320
    const height = host.clientHeight || 320
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    render()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)

  const onContextLost = (event: Event) => {
    event.preventDefault()
    loop.setRunning(false)
    onError()
  }
  renderer.domElement.addEventListener('webglcontextlost', onContextLost)

  new GLTFLoader().load(
    MODEL_URL,
    (gltf) => {
      if (disposed) return disposeObject(gltf.scene)
      model = gltf.scene
      model.scale.setScalar(2)
      scene.add(model)
      render()
    },
    undefined,
    () => {
      if (!disposed) onError()
    },
  )

  return {
    setAnimating: loop.setRunning,
    dispose() {
      disposed = true
      loop.setRunning(false)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      if (model) disposeObject(model)
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    },
  }
}

export type PlanetScene = ReturnType<typeof createPlanetScene>
