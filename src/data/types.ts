export type SocialIcon = 'linkedin' | 'x' | 'github'

export interface SocialProfile {
  name: string
  url: string
  icon: SocialIcon
}

export interface Profile {
  name: string
  /** The portion of the name highlighted in the hero artwork. */
  highlightedName: string
  preferredName: string
  title: string
  location: string
  email: string
  url: string
  description: string
  introduction: string
  currentContext: string
  summary: string
  approach: string
  education: string
  socials: SocialProfile[]
}

export interface NavLink {
  id: string
  title: string
}

export interface Faq {
  question: string
  answer: string
}

export interface Experience {
  id: string
  company: string
  title: string
  date: string
  location?: string
  points: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  image: string
  /** Omitted when the demo is not currently working. */
  demo?: string
  /** Omitted when the repository is private. */
  source?: string
}

export interface IconItem {
  name: string
  icon: string
}

export interface SkillGroup {
  name: string
  items: string
}
