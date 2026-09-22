import Section from './Section'
import TechChip from './TechChip'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'
import { panelStyles } from './styles'

export default function About() {
  return (
    <Section id="about" title={`Hi, I'm ${profile.preferredName}.`}>
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="text-[1.08rem] text-body">
          <p className="mb-5">{profile.summary}</p>
          <p className="mb-8">{profile.approach}</p>
          <h3 className="mb-1.5 font-semibold text-snow">Education</h3>
          <p className="text-snow">{profile.education}</p>
        </div>

        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          {skillGroups.map(({ name, skills }, index) => (
            <section
              key={name}
              aria-labelledby={`skills-${index}`}
              className={`${panelStyles} min-w-0 p-5`}
            >
              <h3
                id={`skills-${index}`}
                className="mb-4 font-semibold text-snow"
              >
                {name}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {skills.map(({ name: skill, icon }) => (
                  <li key={skill}>
                    <TechChip name={skill} icon={icon} tone="neutral" />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Section>
  )
}
