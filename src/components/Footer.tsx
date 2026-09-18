import { textLinkStyles } from './styles'

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
    <footer className="relative z-1 mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 p-6">
      <p className="my-4">© {new Date().getFullYear()} Michael Harley</p>
      <button
        type="button"
        className={`${textLinkStyles} px-1.5 py-px`}
        onClick={onTogglePause}
        disabled={reducedMotion}
        aria-pressed={paused || reducedMotion}
      >
        {label}
      </button>
    </footer>
  )
}
