import { describe, expect, it } from 'vitest'
import { navLinks } from '../src/data/profile'
import { experiences } from '../src/data/experience'
import { projects } from '../src/data/projects'

const ids = (items: { id: string }[]) => items.map((item) => item.id)

describe('content', () => {
  it.each([
    ['navigation', ids(navLinks)],
    ['experience', ids(experiences)],
    ['projects', ids(projects)],
  ])('%s entries have unique ids', (_, list) => {
    expect(new Set(list).size).toBe(list.length)
  })

  it('every project links to a demo or its source', () => {
    for (const project of projects)
      expect(project.demo ?? project.source).toBeTruthy()
  })
})
