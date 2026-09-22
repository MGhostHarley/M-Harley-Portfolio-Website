import { PauseIcon, PlayIcon } from './icons'

interface PauseButtonProps {
  paused: boolean
  onToggle: () => void
}

/** Small floating control that pauses the star field and photo rotation. */
export default function PauseButton({ paused, onToggle }: PauseButtonProps) {
  const label = paused ? 'Resume motion and photos' : 'Pause motion and photos'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      className="fixed right-4 bottom-4 z-30 grid size-11 place-items-center rounded-full border border-line bg-night/70 text-muted backdrop-blur-md transition-colors [view-transition-name:pause-button] hover:border-accent/60 hover:text-accent"
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
    </button>
  )
}
