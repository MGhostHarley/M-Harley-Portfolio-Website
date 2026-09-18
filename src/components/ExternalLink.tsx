import type { ComponentProps } from 'react'

/** A link that opens in a new tab without giving the target access to this page. */
export default function ExternalLink({
  children,
  ...props
}: ComponentProps<'a'>) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
