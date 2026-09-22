import { ContactButton } from './ContactDialog'
import SocialLinks from './SocialLinks'
import { headingStyles, sectionBandStyles } from './styles'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={sectionBandStyles('roomy')}
    >
      <div className="page grid items-center gap-10 rounded-3xl border border-line bg-surface p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-14">
        <div>
          <h2 id="contact-heading" className={`mb-4 ${headingStyles}`}>
            Let's talk
          </h2>
          <p className="text-lg text-muted">
            Hiring for a senior role, or working on a hard data problem? I'd
            like to hear about it.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <ContactButton />
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}
