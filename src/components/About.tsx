import Section from './Section'
import { faqs, profile } from '../data/profile'
import { services } from '../data/skills'

export default function About() {
  return (
    <Section
      id="about"
      title="About Me"
      intro={[profile.summary, profile.approach]}
    >
      <ul className="my-9 grid grid-cols-2 gap-3.5 md:gap-6 lg:grid-cols-4">
        {services.map(({ name, icon }) => (
          <li
            key={name}
            className="flex min-h-45 flex-col items-center justify-center gap-5 rounded-[20px] border border-violet bg-surface-raised px-3 py-4.5 text-center md:min-h-52.5 md:px-4 md:py-7"
          >
            <img src={icon} alt="" width="64" height="64" loading="lazy" />
            <h3 className="text-[1.15rem] font-bold">{name}</h3>
          </li>
        ))}
      </ul>
      <h3 className="mt-10 mb-5 text-[1.8rem] font-bold text-muted">
        FAQs about me
      </h3>
      <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
        {faqs.map(({ question, answer }) => (
          <details key={question}>
            <summary className="cursor-pointer px-6 py-5 text-[1.1rem] text-accent">
              {question}
            </summary>
            <p className="px-6 pb-6 leading-[1.7]">{answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
