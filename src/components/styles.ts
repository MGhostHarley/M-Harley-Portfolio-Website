// Tailwind class lists shared by elements that look the same in several places.

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-[0.95rem] font-medium transition-colors'

export const buttonStyles = {
  primary: `${buttonBase} border-accent bg-accent text-ink hover:bg-accent-hover`,
  secondary: `${buttonBase} border-accent/35 text-snow hover:border-accent`,
  small:
    'inline-flex min-h-11 items-center gap-2 rounded-lg border border-accent/35 px-3.5 py-1.5 text-sm font-medium hover:border-accent',
}

export const textLinkStyles =
  'text-accent underline underline-offset-4 hover:text-snow'

/** Translucent bordered panel used for cards. */
export const panelStyles = 'rounded-2xl border border-line bg-surface'

/** Gradient highlighter, as on "Em" in the hero and the nav brand. */
export const highlightStyles =
  'rounded-md bg-linear-to-r/srgb from-accent via-pink to-gold px-1.5 text-ink'
