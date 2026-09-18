interface FooterProps {
  paused: boolean
  reducedMotion: boolean
  onTogglePause: () => void
}

export default function Footer({
  paused,
  reducedMotion,
  onTogglePause,
}: FooterProps) {
  const label = reducedMotion
    ? 'Reduced motion enabled'
    : paused
      ? 'Resume animation'
      : 'Pause animation'
  return (
    <footer className="page-footer">
      <p>© {new Date().getFullYear()} Michael Harley</p>
      <button
        type="button"
        className="text-link"
        onClick={onTogglePause}
        disabled={reducedMotion}
        aria-pressed={paused || reducedMotion}
      >
        {label}
      </button>
    </footer>
  )
}
