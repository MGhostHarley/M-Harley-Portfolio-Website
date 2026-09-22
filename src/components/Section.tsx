import type { ReactNode } from 'react'
import { headingStyles, sectionBandStyles, type SectionSpacing } from './styles'

interface SectionProps {
  id: string
  /** Only the hidden Projects section still uses one; visible sections let the heading speak. */
  eyebrow?: string
  title: string
  /** Short text shown opposite the heading on wide screens. */
  aside?: ReactNode
  /** Vertical breathing room; vary it so sections don't all share one rhythm. */
  spacing?: SectionSpacing
  children: ReactNode
}

export default function Section({
  id,
  eyebrow,
  title,
  aside,
  spacing,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={sectionBandStyles(spacing)}
    >
      <div className="page">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            {eyebrow && (
              <p className="mb-4 eyebrow text-sm md:text-base">{eyebrow}</p>
            )}
            <h2 id={headingId} className={headingStyles}>
              {title}
            </h2>
          </div>
          {aside && <div className="max-w-[30em] text-muted">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}
