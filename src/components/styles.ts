// Tailwind class lists shared by elements that look the same in several places.

const buttonBase =
  'inline-flex min-h-12 items-center justify-center rounded-[5px] border border-violet px-6 py-3 font-bold transition-[filter] duration-200 hover:brightness-115'

export const buttonStyles = {
  primary: `${buttonBase} bg-linear-to-r/srgb from-accent via-pink to-gold text-ink`,
  secondary: `${buttonBase} bg-surface-raised text-snow`,
}

export const textLinkStyles =
  'inline-flex min-h-11 items-center text-link underline underline-offset-4 wrap-anywhere'
