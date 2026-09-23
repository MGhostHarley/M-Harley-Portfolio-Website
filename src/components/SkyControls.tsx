import PauseButton from './PauseButton'

export interface SkyControlsProps {
  brightness: number
  onBrightnessChange: (value: number) => void
  paused: boolean
  onTogglePause: () => void
  /** With reduced motion nothing animates, so there is nothing to pause. */
  canPause: boolean
}

/** A vertical star brightness slider above the pause button. */
export default function SkyControls({
  brightness,
  onBrightnessChange,
  paused,
  onTogglePause,
  canPause,
}: SkyControlsProps) {
  return (
    <div
      role="group"
      aria-label="Star field"
      className="flex flex-col items-center gap-1"
    >
      {/* A horizontal range turned upright works in every browser, including
          touch dragging. The box reserves the rotated footprint, and the input
          is centered in it by its own midpoint. Muted lavender, not cyan: a
          quiet setting shouldn't compete with the page's links. */}
      <div className="relative h-32 w-11">
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={brightness}
          onChange={(event) => onBrightnessChange(Number(event.target.value))}
          aria-label="Star brightness"
          aria-orientation="vertical"
          aria-valuetext={`${Math.round(brightness * 100)}%`}
          className="absolute top-1/2 left-1/2 m-0 block h-11 w-32 -translate-x-1/2 -translate-y-1/2 -rotate-90 cursor-pointer accent-muted"
        />
      </div>
      {canPause && <PauseButton paused={paused} onToggle={onTogglePause} />}
    </div>
  )
}
