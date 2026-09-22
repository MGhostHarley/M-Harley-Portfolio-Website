import type { CSSProperties } from 'react'
import type { SimpleIcon } from 'simple-icons'
import { techIcon } from '../data/tech'

// WCAG relative luminance of an sRGB color.
function luminance([r, g, b]: number[]) {
  const linear = (channel: number) => {
    const c = channel / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

// Leave headroom for the chip's tinted surface, not just the night background.
const MIN_LUMINANCE = 0.23

/** The brand color, lightened toward white just enough to read on the background. */
function readableColor(hex: string) {
  const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
  for (let mix = 0; mix <= 1; mix += 0.05) {
    const candidate = rgb.map((c) => Math.round(c + (255 - c) * mix))
    if (luminance(candidate) >= MIN_LUMINANCE)
      return `rgb(${candidate.join(' ')})`
  }
  return 'white'
}

interface TechChipProps {
  name: string
  /** Defaults to the known logo for this name. */
  icon?: SimpleIcon
  /** "brand" tints with the logo color; "neutral" suits long lists. */
  tone?: 'brand' | 'neutral'
}

/** A technology name with its logo when known, tinted with its brand color or kept neutral. */
export default function TechChip({
  name,
  icon = techIcon(name),
  tone = 'brand',
}: TechChipProps) {
  const color =
    tone === 'neutral'
      ? 'var(--color-muted)'
      : icon
        ? readableColor(icon.hex)
        : 'var(--color-accent)'
  return (
    <span
      style={{ '--brand': color } as CSSProperties}
      className="inline-flex items-center gap-1.5 rounded-full border border-(--brand)/45 bg-(--brand)/10 px-2.5 py-1 font-mono text-xs font-medium whitespace-nowrap text-(--brand)"
    >
      {icon && (
        <svg
          viewBox="0 0 24 24"
          className="size-3.5 shrink-0"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      )}
      {name}
    </span>
  )
}
