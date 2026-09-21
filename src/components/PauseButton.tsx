interface PauseButtonProps {
  paused: boolean
  onToggle: () => void
}

/** Small floating control that pauses the star field and photo rotation. */
export default function PauseButton({ paused, onToggle }: PauseButtonProps) {
  const label = paused ? 'Resume animation' : 'Pause animation'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      className="fixed right-4 bottom-4 z-30 grid size-10 place-items-center rounded-full border border-line bg-night/70 text-muted backdrop-blur-md transition-colors [view-transition-name:pause-button] hover:border-accent/60 hover:text-accent"
    >
      <svg
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="currentColor"
        aria-hidden="true"
      >
        {paused ? (
          <path d="M4 2.5v11l9-5.5z" />
        ) : (
          <path d="M4 2h3v12H4zM9 2h3v12H9z" />
        )}
      </svg>
    </button>
  )
}
