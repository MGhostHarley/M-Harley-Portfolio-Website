import { profile } from '../data/profile'
import type { SocialIcon } from '../data/types'
import ExternalLink from './ExternalLink'

const iconPaths: Record<SocialIcon, string> = {
  linkedin:
    'M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8 19H5V9h3v10ZM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-5.2c0-1.24-.44-2.08-1.55-2.08-.84 0-1.34.57-1.56 1.12-.08.2-.1.48-.1.76V19h-3V9h2.87v1.37c.4-.63 1.12-1.53 2.73-1.53 2 0 3.61 1.31 3.61 4.13V19Z',
  x: 'M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-7.4L5.6 22H2.47l8.14-9.3L2.1 2h6.4l4.42 6.75L18.9 2ZM17.8 20h1.73L7.5 3.9H5.64L17.8 20Z',
  github:
    'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.58 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
}

export default function SocialLinks({
  className = '',
}: {
  className?: string
}) {
  return (
    <ul className={`flex gap-2 ${className}`} aria-label="Social profiles">
      {profile.socials.map(({ name, url, icon }) => (
        <li key={name}>
          <ExternalLink
            href={url}
            aria-label={`${name} (opens in new tab)`}
            className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={iconPaths[icon]} />
            </svg>
          </ExternalLink>
        </li>
      ))}
    </ul>
  )
}
