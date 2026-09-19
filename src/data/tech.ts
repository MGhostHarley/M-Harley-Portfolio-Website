import { siSupabase, siVercel, type SimpleIcon } from 'simple-icons'
import { skillGroups } from './skills'

// Every skill with a logo, plus tools that only appear in projects.
const icons = new Map<string, SimpleIcon>([
  ...skillGroups.flatMap(({ skills }) =>
    skills.flatMap(({ name, icon }) => (icon ? [[name, icon] as const] : [])),
  ),
  ['Supabase', siSupabase],
  ['Vercel', siVercel],
])

/** The brand logo for a technology name, if there is one. */
export function techIcon(name: string) {
  return icons.get(name)
}
