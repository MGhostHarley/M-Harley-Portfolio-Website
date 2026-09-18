import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  intro?: string
  children: ReactNode
}

export default function Section({ id, title, intro, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <h2 id={headingId} className="section-heading">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
      {children}
    </section>
  )
}
