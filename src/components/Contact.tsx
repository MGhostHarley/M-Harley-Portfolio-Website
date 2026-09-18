import Section from './Section'
import SocialLinks from './SocialLinks'
import ContactForm from './ContactForm'
import ContactScene from './ContactScene'
import { profile } from '../data/profile'
import { textLinkStyles } from './styles'

const paragraphStyles = 'my-4 leading-[1.7]'
const noteStyles =
  'my-[1em] text-[0.9rem] leading-[1.7] text-muted wrap-anywhere'

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0 rounded-2xl bg-surface p-5.5 md:p-8">
          <p className={paragraphStyles}>
            Have a question or a project to discuss? Send me a message.
          </p>
          <SocialLinks />
          <ContactForm className="mt-7" />
          <p className={noteStyles}>
            You can also email{' '}
            <a className={textLinkStyles} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
          <p className={noteStyles}>
            Messages are delivered through EmailJS. Your name, email, and
            message are used to respond to your inquiry.
          </p>
        </div>
        <ContactScene />
      </div>
    </Section>
  )
}
