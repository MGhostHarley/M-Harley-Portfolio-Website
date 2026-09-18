import Section from './Section'
import { faqs, profile } from '../data/profile'
import { services } from '../data/skills'

export default function About() {
  return (
    <Section id="about" title="About Me" intro={profile.summary}>
      <p className="section-intro">{profile.approach}</p>
      <ul className="service-grid">
        {services.map(({ name, icon }) => (
          <li className="service-card" key={name}>
            <img src={icon} alt="" width="64" height="64" loading="lazy" />
            <h3>{name}</h3>
          </li>
        ))}
      </ul>
      <h3 className="subheading">FAQs about me</h3>
      <div className="accordion">
        {faqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
