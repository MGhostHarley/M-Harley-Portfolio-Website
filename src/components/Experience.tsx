import Section from './Section'
import AiInProduction from './AiInProduction'
import { experiences } from '../data/experience'
import { resumeUrl } from '../data/profile'
import { textLinkStyles } from './styles'

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Ten years in production"
      spacing="tight"
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
        {experiences.map(
          ({ id, company, logo, title, date, summary }, index) => (
            <li
              key={id}
              className="grid gap-2 border-b border-line py-7 md:grid-cols-[230px_minmax(0,1fr)_minmax(0,1.3fr)] md:items-start md:gap-8"
            >
              <p
                className={`font-mono text-[0.95rem] md:pt-0.5 ${index === 0 ? 'text-live' : 'text-muted'}`}
              >
                {date}
              </p>
              <div className="flex items-start gap-3">
                {/* Decorative: the company name sits right beside it. */}
                <img
                  src={logo}
                  alt=""
                  width="96"
                  height="96"
                  loading="lazy"
                  decoding="async"
                  className="mt-0.5 size-7 shrink-0 rounded-md border border-line"
                />
                <div>
                  <h3 className="text-lg font-semibold">{company}</h3>
                  <p className="text-muted">{title}</p>
                </div>
              </div>
              <p className="text-[1.02rem] text-body md:pt-0.5">{summary}</p>
            </li>
          ),
        )}
      </ol>
      <AiInProduction />
    </Section>
  )
}
