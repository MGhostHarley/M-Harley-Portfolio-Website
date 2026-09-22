import { PauseIcon, PlayIcon } from './icons'

interface PauseButtonProps {
  paused: boolean
  onToggle: () => void
  /** Placement, e.g. floating on wide screens or inline in the footer. */
  className?: string
}

/** Pauses the star field and photo rotation. */
export default function PauseButton({
  paused,
  onToggle,
  className = '',
}: PauseButtonProps) {
  const label = paused ? 'Resume motion and photos' : 'Pause motion and photos'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      className={`grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent ${className}`}
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
    </button>
  )
}
