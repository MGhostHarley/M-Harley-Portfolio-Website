import Section from './Section'
import TechChip from './TechChip'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'
import type { Skill } from '../data/types'
import { panelStyles } from './styles'

/** Enough to skim; the rest wait behind "+N more". Order in the data is priority. */
const VISIBLE_SKILLS = 5

function SkillChips({ skills }: { skills: Skill[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {skills.map(({ name, icon }) => (
        <li key={name}>
          <TechChip name={name} icon={icon} tone="neutral" />
        </li>
      ))}
    </ul>
  )
}

function SkillList({ skills }: { skills: Skill[] }) {
  // Hiding a single skill behind a toggle costs more than showing it.
  if (skills.length <= VISIBLE_SKILLS + 1) return <SkillChips skills={skills} />
  const more = skills.slice(VISIBLE_SKILLS)
  return (
    <>
      <SkillChips skills={skills.slice(0, VISIBLE_SKILLS)} />
      <details className="group mt-1">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-sm text-accent hover:text-snow [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">+{more.length} more</span>
          <span className="hidden group-open:inline">Show fewer</span>
        </summary>
        <SkillChips skills={more} />
      </details>
    </>
  )
}

export default function About() {
  return (
    <Section id="about" title={`Hi, I'm ${profile.preferredName}.`}>
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="text-lg text-body">
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
              <SkillList skills={skills} />
            </section>
          ))}
        </div>
      </div>
    </Section>
  )
}
