import PauseButton from './PauseButton'
import { StarIcon } from './icons'

interface SkyControlsProps {
  brightness: number
  onBrightnessChange: (value: number) => void
  paused: boolean
  onTogglePause: () => void
  /** With reduced motion nothing animates, so there is nothing to pause. */
  canPause: boolean
  /** Vertical floats in the page corner; horizontal sits in a row (the footer). */
  orientation: 'vertical' | 'horizontal'
  className?: string
}

/** Star brightness slider and the pause button, grouped in one pill. */
export default function SkyControls({
  brightness,
  onBrightnessChange,
  paused,
  onTogglePause,
  canPause,
  orientation,
  className = '',
}: SkyControlsProps) {
  const vertical = orientation === 'vertical'
  const slider = (
    <input
      type="range"
      min={0}
      max={1}
      step={0.05}
      value={brightness}
      onChange={(event) => onBrightnessChange(Number(event.target.value))}
      aria-label="Star brightness"
      aria-orientation={orientation}
      aria-valuetext={`${Math.round(brightness * 100)}%`}
      className="h-11 w-28 cursor-pointer"
    />
  )
  return (
    <div
      role="group"
      aria-label="Star field"
      className={`flex items-center gap-1 rounded-full border border-line bg-night/70 p-1 backdrop-blur-md ${vertical ? 'flex-col' : 'pl-3'} ${className}`}
    >
      <StarIcon className="size-4 shrink-0 text-muted" />
      {vertical ? (
        // A horizontal range turned upright works in every browser, including
        // touch dragging; the box reserves the rotated footprint.
        <div className="relative h-28 w-11">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
            {slider}
          </div>
        </div>
      ) : (
        slider
      )}
      {canPause && <PauseButton paused={paused} onToggle={onTogglePause} />}
    </div>
  )
}
