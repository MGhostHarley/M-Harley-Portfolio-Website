import { profile } from '../data/profile'
import SocialLinks from './SocialLinks'
import { sectionStyles } from './Section'
import { buttonStyles } from './styles'
import portrait from '../assets/optimized/portrait.webp'

const paragraphStyles = 'my-4.5 text-[1.15rem] leading-[1.7]'

export default function Hero() {
  // Text on either side of the highlight keeps its spaces, e.g. "Michael " + "".
  const [beforeHighlight, afterHighlight] = profile.name.split(
    profile.highlightedName,
  )
  return (
    <div className="relative before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-hero">
      <section
        id="home"
        className={`${sectionStyles} grid grid-cols-1 items-center gap-8 pt-25 md:min-h-[min(900px,100svh)] md:grid-cols-[1.1fr_1fr] md:gap-10 md:pt-32.5 lg:gap-20`}
        aria-labelledby="home-heading"
      >
        <div>
          <h1
            id="home-heading"
            className="mb-6 text-[length:clamp(2.5rem,10vw,3.8rem)] leading-[1.2] font-bold md:text-[length:clamp(2.75rem,5vw,4.5rem)]"
          >
            {beforeHighlight}
            <span className="inline-block px-3 pb-3 text-snow bg-brush text-shadow-[0_2px_5px_var(--color-ink)]">
              {profile.highlightedName}
            </span>
            {afterHighlight}
          </h1>
          <p className={`${paragraphStyles} font-bold text-lavender`}>
            {profile.title}
          </p>
          <p className={paragraphStyles}>{profile.introduction}</p>
          <p className={paragraphStyles}>{profile.currentContext}</p>
          <div className="mt-7.5 flex flex-wrap gap-3">
            <a className={buttonStyles.primary} href="#contact">
              Contact me
            </a>
            <a className={buttonStyles.secondary} href="#projects">
              View my work
            </a>
          </div>
          <SocialLinks />
        </div>
        {/* From md up, an offset outline frame sits behind the portrait. */}
        <div className="relative w-full max-w-70 justify-self-center md:max-w-100 md:justify-self-end md:before:absolute md:before:inset-[-30px_30px_30px_-30px] md:before:-z-1 md:before:rounded-2xl md:before:border-2 md:before:border-accent">
          <img
            src={portrait}
            width="600"
            height="800"
            alt={`${profile.name} with his dog`}
            fetchPriority="high"
            className="h-auto w-full rounded-2xl border-2 border-accent"
          />
        </div>
      </section>
    </div>
  )
}
