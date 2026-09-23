import { profile } from '../data/profile'
import PhotoCarousel from './PhotoCarousel'
import SocialLinks from './SocialLinks'
import { ContactButton } from './ContactDialog'
import { experiences } from '../data/experience'
import { buttonStyles } from './styles'

export default function Hero() {
  // Text on either side of the highlight keeps its spaces, e.g. "Michael " + "".
  const [beforeHighlight, afterHighlight] = profile.name.split(
    profile.highlightedName,
  )
  return (
    <header
      id="home"
      className="page grid flex-1 content-center items-center gap-10 pt-10 pb-14 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] md:gap-16 md:pt-12 md:pb-16"
    >
      <div>
        <h1 className="mb-4 font-serif text-[length:clamp(2.8rem,6vw,4.6rem)] leading-[1.08] font-bold">
          {beforeHighlight}
          <span className="inline-block px-3.5 pb-2.5 bg-brush text-shadow-[0_2px_6px_var(--color-ink)]">
            {profile.highlightedName}
          </span>
          {afterHighlight}
        </h1>
        <p className="mb-6 max-w-[48rem] font-mono text-sm leading-relaxed font-medium tracking-[0.12em] text-pretty text-accent uppercase">
          {experiences[0].title} at {experiences[0].company},{' '}
          {profile.location.split(',')[0]}
        </p>
        <p className="mb-4 text-xl leading-relaxed text-snow">
          Most people call me{' '}
          <strong className="font-semibold">{profile.preferredName}</strong>.
        </p>
        <p className="mb-8 max-w-[36em] text-lg leading-relaxed text-body">
          {profile.introduction}
        </p>
        <div className="flex flex-wrap gap-3.5">
          <a className={buttonStyles.primary} href="/case-studies/">
            Read case studies <span aria-hidden="true">→</span>
          </a>
          <ContactButton label="Get in touch" variant="secondary" />
        </div>
        <SocialLinks className="mt-7 max-md:hidden" />
      </div>
      <PhotoCarousel />
    </header>
  )
}
