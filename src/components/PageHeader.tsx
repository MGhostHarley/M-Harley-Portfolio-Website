import type { ReactNode } from 'react'
import { headingStyles } from './styles'
import portrait from '../assets/photos/elephant.webp'

interface PageHeaderProps {
  title: string
  children: ReactNode
}

/** Opening band for pages other than the home page. */
export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-[linear-gradient(to_bottom,var(--color-band),transparent)]">
      <div className="page flex flex-col gap-6 py-12 md:flex-row md:items-center md:gap-7 md:py-24">
        <img
          src={portrait}
          alt=""
          width="800"
          height="1000"
          className="size-24 shrink-0 rounded-full border border-accent/35 object-cover object-top md:size-28"
        />
        <div>
          <h1 className={`mb-4 ${headingStyles}`}>{title}</h1>
          <div className="max-w-[60ch] text-lg text-muted">{children}</div>
        </div>
      </div>
    </header>
  )
}
