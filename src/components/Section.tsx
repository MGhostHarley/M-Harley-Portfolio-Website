import type { ReactNode } from 'react'

/** Page-width column shared by every section, including the hero. */
export const sectionStyles =
  'relative z-2 mx-auto w-[calc(100%-40px)] scroll-mt-20 py-10 md:w-[min(100%-48px,1160px)] md:py-16'

interface SectionProps {
  id: string
  title: string
  /** One or more introductory paragraphs shown under the heading. */
  intro?: string | string[]
  children: ReactNode
}

export default function Section({
  id,
  title,
  intro = [],
  children,
}: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} className={sectionStyles} aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-7.5 text-[length:clamp(2rem,4.5vw,3.75rem)] leading-[1.2] font-bold"
      >
        {title}
      </h2>
      {[intro].flat().map((paragraph) => (
        <p
          key={paragraph}
          className="my-[1em] max-w-[1000px] text-[length:clamp(1.05rem,2vw,1.4rem)] leading-[1.7]"
        >
          {paragraph}
        </p>
      ))}
      {children}
    </section>
  )
}
