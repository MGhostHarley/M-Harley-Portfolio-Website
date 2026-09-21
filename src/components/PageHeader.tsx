import type { ReactNode } from 'react'
import { headingStyles } from './Section'
import portrait from '../assets/photos/elephant.webp'

interface PageHeaderProps {
  eyebrow: string
  title: string
  children: ReactNode
}

/** Opening band for pages other than the home page. */
export default function PageHeader({
  eyebrow,
  title,
  children,
}: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-[linear-gradient(to_bottom,rgb(17_14_42/55%),transparent)]">
      <div className="page flex flex-col gap-7 py-16 md:flex-row md:items-center md:py-24">
        <img
          src={portrait}
          alt=""
          width="800"
          height="1000"
          className="size-24 shrink-0 rounded-full border-2 border-violet object-cover object-top md:size-28"
        />
        <div>
          <p className="eyebrow text-sm md:text-base">{eyebrow}</p>
          <h1 className={`mt-4 mb-4 ${headingStyles}`}>{title}</h1>
          <div className="max-w-[44em] text-lg text-muted">{children}</div>
        </div>
      </div>
    </header>
  )
}
