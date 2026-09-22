import { PauseIcon, PlayIcon } from './icons'

interface PauseButtonProps {
  paused: boolean
  onToggle: () => void
}

/** Pauses the star field and photo rotation. Sits inside SkyControls. */
export default function PauseButton({ paused, onToggle }: PauseButtonProps) {
  const label = paused ? 'Resume motion and photos' : 'Pause motion and photos'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      className="grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-accent"
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
    </button>
  )
}
