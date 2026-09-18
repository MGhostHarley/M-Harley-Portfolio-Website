import Section from './Section'
import { experiences } from '../data/experience'

// A vertical line with a dot per entry. Below md the line runs down the left
// edge; from md up it runs down the middle and entries alternate sides.
const timelineStyles =
  'relative mt-9 before:absolute before:inset-y-0 before:left-2.5 before:w-[3px] before:-translate-x-1/2 before:bg-snow md:before:left-1/2'
const entryStyles =
  'relative w-full pb-7 pl-8.5 after:absolute after:top-6 after:left-0 after:size-6.5 after:rounded-full after:border-3 after:border-snow after:bg-violet-deep md:w-1/2 md:pr-8 md:pb-8 md:pl-0 md:after:right-[-10px] md:after:left-auto md:even:ml-[50%] md:even:pr-0 md:even:pl-8 md:even:after:right-auto md:even:after:left-[-10px]'

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Work Experience"
      intro="Production systems, AI integration, and measurable results."
    >
      <ol className={timelineStyles}>
        {experiences.map(({ id, title, company, date, location, points }) => (
          <li key={id} className={entryStyles}>
            <article className="rounded-xl border-b-3 border-muted bg-surface-card p-5 md:p-6">
              <h3 className="mb-2 text-[1.25rem] font-bold">{title}</h3>
              <p className="mb-3 text-[1.1rem] font-semibold text-lavender">
                {company}
              </p>
              <p className="my-[1em] text-[0.95rem] leading-[1.6] text-muted">
                {date}
                {location && (
                  <>
                    <br />
                    {location}
                  </>
                )}
              </p>
              <ul className="mt-5 list-[circle] pl-5">
                {points.map((point) => (
                  <li key={point} className="mb-3 leading-[1.65]">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
