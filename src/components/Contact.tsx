import Section from './Section'
import SocialLinks from './SocialLinks'
import ContactForm from './ContactForm'
import ContactScene from './ContactScene'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="contact-layout">
        <div className="contact-panel">
          <p>Have a question or a project to discuss? Send me a message.</p>
          <SocialLinks />
          <ContactForm />
          <p className="contact-note">
            You can also email{' '}
            <a className="text-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
          <p className="contact-note">
            Messages are delivered through EmailJS. Your name, email, and
            message are used to respond to your inquiry.
          </p>
        </div>
        <ContactScene />
      </div>
    </Section>
  )
}
