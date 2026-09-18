import Section from './Section'
import { experiences } from '../data/experience'

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Work Experience"
      intro="Production systems, AI integration, and measurable results."
    >
      <ol className="timeline">
        {experiences.map(({ id, title, company, date, location, points }) => (
          <li key={id} className="timeline-entry">
            <article className="experience-card">
              <h3>{title}</h3>
              <p className="company">{company}</p>
              <p className="experience-meta">
                {date}
                {location && (
                  <>
                    <br />
                    {location}
                  </>
                )}
              </p>
              <ul>
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
