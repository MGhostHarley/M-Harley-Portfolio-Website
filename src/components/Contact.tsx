import ContactDialog from './ContactDialog'
import SocialLinks from './SocialLinks'
import { headingStyles, sectionBandStyles } from './styles'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={sectionBandStyles('roomy')}
    >
      <div className="page grid items-center gap-10 rounded-3xl border border-line bg-surface p-7 md:grid-cols-[1.1fr_0.9fr] md:p-14">
        <div>
          <p className="eyebrow text-sm md:text-base">Contact</p>
          <h2 id="contact-heading" className={`mt-4 mb-4 ${headingStyles}`}>
            Let's talk
          </h2>
          <p className="text-lg text-muted">
            Hiring for a senior role, or working on a hard data problem? I'd
            like to hear about it.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <ContactDialog />
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}
