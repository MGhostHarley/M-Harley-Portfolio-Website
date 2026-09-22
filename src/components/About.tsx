import { useId, useState } from 'react'
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
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  // Hiding a single skill behind a toggle costs more than showing it.
  if (skills.length <= VISIBLE_SKILLS + 1) return <SkillChips skills={skills} />
  const hidden = skills.length - VISIBLE_SKILLS
  return (
    <>
      <div id={listId}>
        <SkillChips
          skills={expanded ? skills : skills.slice(0, VISIBLE_SKILLS)}
        />
      </div>
      {/* After the chips, so it stays at the end whether open or closed. */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={() => setExpanded(!expanded)}
        className="mt-1 inline-flex min-h-11 items-center text-sm text-accent hover:text-snow"
      >
        {expanded ? 'Show fewer' : `+${hidden} more`}
      </button>
    </>
  )
}

export default function About() {
  return (
    <Section id="about" title={`Hi, I'm ${profile.preferredName}.`}>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="max-w-[36em] text-lg text-body">
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
