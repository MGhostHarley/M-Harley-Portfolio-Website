import Section from './Section'
import { skillGroups, technologies } from '../data/skills'

export default function Skills() {
  return (
    <Section id="tech" title="Technologies I Use">
      <ul className="technology-grid">
        {technologies.map(({ name, icon }) => (
          <li key={name}>
            <img src={icon} width="64" height="64" alt="" loading="lazy" />
            <span>{name}</span>
          </li>
        ))}
      </ul>
      <dl className="skill-groups">
        {skillGroups.map(({ name, items }) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
