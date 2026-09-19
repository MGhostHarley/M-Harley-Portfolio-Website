import { profile } from '../data/profile'
import PhotoCarousel from './PhotoCarousel'
import SocialLinks from './SocialLinks'
import { buttonStyles, highlightStyles } from './styles'

export default function Hero() {
  // Text on either side of the highlight keeps its spaces, e.g. "Michael " + "".
  const [beforeHighlight, afterHighlight] = profile.name.split(
    profile.highlightedName,
  )
  return (
    <header
      id="home"
      className="page grid flex-1 content-center items-center gap-10 py-12 md:grid-cols-[1.35fr_0.65fr] md:gap-16 md:py-16"
    >
      <div>
        <p className="eyebrow text-xs md:text-sm">
          {profile.title} · {profile.location.split(',')[0]}
        </p>
        <h1 className="mt-5 mb-7 font-serif text-[length:clamp(2.8rem,6vw,4.6rem)] leading-[1.08] font-bold">
          {beforeHighlight}
          <span className="inline-block px-3.5 pb-2.5 bg-brush text-shadow-[0_2px_6px_var(--color-ink)]">
            {profile.highlightedName}
          </span>
          {afterHighlight}
        </h1>
        <p className="mb-4 text-xl leading-relaxed text-snow">
          Most people call me{' '}
          <mark className={`${highlightStyles} font-semibold`}>
            {profile.preferredName}
          </mark>
          .
        </p>
        <p className="mb-8 max-w-[38em] text-lg leading-relaxed text-body">
          {profile.introduction}
        </p>
        <div className="flex flex-wrap gap-3.5">
          <a className={buttonStyles.primary} href="/case-studies/">
            Read case studies <span aria-hidden="true">→</span>
          </a>
          <a className={buttonStyles.secondary} href="#contact">
            Get in touch
          </a>
        </div>
        <SocialLinks className="mt-7" />
      </div>
      <PhotoCarousel />
    </header>
  )
}
