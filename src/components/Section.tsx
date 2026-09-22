import type { ReactNode } from 'react'

/**
 * Full-width band with a top rule and a soft glow, so every section has a
 * clear start. scroll-mt-17 matches the floating nav's height (4.25rem), so a
 * nav link lands with no sliver of the previous section showing.
 */
export const sectionBandStyles =
  'scroll-mt-17 border-t border-line bg-[linear-gradient(to_bottom,rgb(17_14_42/55%),transparent_240px)] py-20 md:py-28'

/** Section heading type, shared by pages that build their own header. */
export const headingStyles =
  'font-serif text-[length:clamp(2.4rem,4.6vw,3.6rem)] leading-[1.1] font-bold'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  /** Short text shown opposite the heading on wide screens. */
  aside?: ReactNode
  children: ReactNode
}

export default function Section({
  id,
  eyebrow,
  title,
  aside,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={sectionBandStyles}>
      <div className="page">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-sm md:text-base">{eyebrow}</p>
            <h2 id={headingId} className={`mt-4 ${headingStyles}`}>
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
