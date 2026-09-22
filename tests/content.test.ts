import { describe, expect, it } from 'vitest'
import { navLinks, profile } from '../src/data/profile'
import { experiences } from '../src/data/experience'
import { projects } from '../src/data/projects'
import { caseStudies } from '../src/data/caseStudies'
import { skillGroups } from '../src/data/skills'

const unique = (values: string[]) => new Set(values).size === values.length

describe('content', () => {
  it.each([
    ['navigation hrefs', navLinks.map((link) => link.href)],
    ['experience ids', experiences.map((entry) => entry.id)],
    ['project ids', projects.map((project) => project.id)],
    ['case study ids', caseStudies.map((study) => study.id)],
    [
      'skill names',
      skillGroups.flatMap((group) => group.skills.map((s) => s.name)),
    ],
  ])('%s are unique', (_, values) => {
    expect(unique(values)).toBe(true)
  })

  it('highlights a part of the name that appears exactly once', () => {
    expect(profile.name.split(profile.highlightedName)).toHaveLength(2)
  })

  it('every project links to a demo or its source', () => {
    for (const project of projects)
      expect(project.demo ?? project.source).toBeTruthy()
  })

  it('every experience entry has a company logo', () => {
    for (const entry of experiences) expect(entry.logo).toBeTruthy()
  })

  it('every skill has an icon or a badge', () => {
    for (const { skills } of skillGroups)
      for (const skill of skills) expect(skill.icon ?? skill.badge).toBeTruthy()
  })
})
