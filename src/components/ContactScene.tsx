import { useEffect, useRef, useState } from 'react'
import ExternalLink from './ExternalLink'
import useInView from '../hooks/useInView'
import { useMotionEnabled } from '../motion'
import type { PlanetScene } from '../graphics/planetScene'

/** The planet illustration, loaded only once it approaches the viewport. */
export default function ContactScene() {
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, '150px')
  const motionEnabled = useMotionEnabled()
  const [requested, setRequested] = useState(false)
  const [scene, setScene] = useState<PlanetScene>()
  const [failed, setFailed] = useState(false)

  // Start loading the first time the stage comes near; never unload afterwards.
  if (inView && !requested) setRequested(true)

  useEffect(() => {
    const stage = stageRef.current
    if (!requested || !stage) return
    let created: PlanetScene | undefined
    let cancelled = false
    import('../graphics/planetScene')
      .then(({ createPlanetScene }) => {
        if (cancelled) return
        created = createPlanetScene(stage, () => setFailed(true))
        setScene(created)
      })
      .catch(() => setFailed(true))
    return () => {
      cancelled = true
      created?.dispose()
    }
  }, [requested])

  useEffect(() => {
    scene?.setAnimating(inView && motionEnabled)
  }, [scene, inView, motionEnabled])

  return (
    <div className="contact-scene">
      <div className="planet-stage" ref={stageRef} aria-hidden="true">
        {(!scene || failed) && <div className="planet-fallback">✦</div>}
      </div>
      <p className="model-credit">
        <ExternalLink href="https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70">
          Stylized planet by cmzw
        </ExternalLink>
        {' · '}
        <ExternalLink href="https://creativecommons.org/licenses/by/4.0/">
          CC BY 4.0
        </ExternalLink>
      </p>
    </div>
  )
}
