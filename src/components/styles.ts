// Tailwind class lists shared by elements that look the same in several places.

const buttonBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-[0.95rem] font-medium whitespace-nowrap transition-colors'

export const buttonStyles = {
  primary: `${buttonBase} border-accent bg-accent text-ink hover:bg-accent-hover`,
  secondary: `${buttonBase} border-accent/35 text-snow hover:border-accent`,
}

const bandSpacing = {
  tight: 'py-16 md:py-20',
  default: 'py-20 md:py-28',
  roomy: 'py-24 md:py-36',
}

export type SectionSpacing = keyof typeof bandSpacing

/**
 * Full-width band with a top rule and a soft glow, so every section has a
 * clear start. scroll-mt-17 matches the floating nav's height (4.25rem), so a
 * nav link lands with no sliver of the previous section showing.
 */
export function sectionBandStyles(spacing: SectionSpacing = 'default') {
  return `scroll-mt-17 border-t border-line bg-[linear-gradient(to_bottom,var(--color-band),transparent_240px)] ${bandSpacing[spacing]}`
}

/** Section heading type, shared by pages that build their own header. */
export const headingStyles =
  'font-serif text-[length:clamp(2.4rem,4.6vw,3.6rem)] leading-[1.1] font-bold'

export const textLinkStyles =
  'text-accent underline underline-offset-4 hover:text-snow'

/** Translucent bordered panel used for cards. */
export const panelStyles = 'rounded-2xl border border-line bg-surface'
