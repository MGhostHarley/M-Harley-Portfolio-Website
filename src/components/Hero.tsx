import { profile } from '../data/profile'
import SocialLinks from './SocialLinks'
import portrait from '../assets/optimized/portrait.webp'

export default function Hero() {
  const [firstName, lastName] = profile.name.split(' ')
  return (
    <div className="hero-background">
      <section
        id="home"
        className="section hero"
        aria-labelledby="home-heading"
      >
        <div className="hero-copy">
          <h1 id="home-heading">
            {firstName} <span>{lastName}</span>
          </h1>
          <p className="role">{profile.title}</p>
          <p>{profile.introduction}</p>
          <p>{profile.currentContext}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Contact me
            </a>
            <a className="button button-secondary" href="#projects">
              View my work
            </a>
          </div>
          <SocialLinks />
        </div>
        <div className="portrait-frame">
          <img
            src={portrait}
            width="600"
            height="800"
            alt={`${profile.name} with his dog`}
            fetchPriority="high"
          />
        </div>
      </section>
    </div>
  )
}
