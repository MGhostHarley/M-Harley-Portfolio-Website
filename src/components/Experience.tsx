import Section from './Section'
import AiInProduction from './AiInProduction'
import { experiences } from '../data/experience'
import { resumeUrl } from '../data/profile'
import { textLinkStyles } from './styles'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Ten years in production"
      aside={
        <>
          Full details in my{' '}
          <a className={textLinkStyles} href={resumeUrl} download>
            resume
          </a>
          .
        </>
      }
    >
      <ol className="border-t border-line">
        {experiences.map(({ id, company, title, date, summary }, index) => (
          <li
            key={id}
            className="grid gap-2 border-b border-line py-7 md:grid-cols-[230px_1fr_1.3fr] md:items-baseline md:gap-8"
          >
            <p
              className={`font-mono text-[0.95rem] ${index === 0 ? 'text-live' : 'text-muted'}`}
            >
              {date}
            </p>
            <div>
              <h3 className="text-lg font-semibold">{company}</h3>
              <p className="text-muted">{title}</p>
            </div>
            <p className="text-[1.02rem] text-body">{summary}</p>
          </li>
        ))}
      </ol>
      <AiInProduction />
    </Section>
  )
}
