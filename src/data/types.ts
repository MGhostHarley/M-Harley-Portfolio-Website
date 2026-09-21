import type { SimpleIcon } from 'simple-icons'

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
  url: string
  introduction: string
  currentContext: string
  summary: string
  approach: string
  education: string
  socials: SocialProfile[]
}

export interface NavLink {
  title: string
  href: string
  /** Section id on the home page, used to highlight the link while scrolling. */
  sectionId?: string
}

export interface Experience {
  id: string
  company: string
  title: string
  date: string
  location?: string
  /** One line for the compact experience list. */
  summary: string
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

export interface Metric {
  value: string
  label: string
  company: string
}

export interface Faq {
  question: string
  answer: string
}

export interface FaqGroup {
  title: string
  faqs: Faq[]
}

export interface Skill {
  name: string
  /** Brand icon; skills without one are shown as a text badge. */
  icon?: SimpleIcon
  /** Short badge text when there is no icon, e.g. "C#". */
  badge?: string
}

export interface SkillGroup {
  name: string
  skills: Skill[]
}

export interface Photo {
  src: string
  alt: string
}

export interface DiagramNode {
  title: string
  detail: string
  kind?: 'ai' | 'store'
}

export interface CaseStudy {
  id: string
  sector: string
  title: string
  /** Key into companyLogos. */
  company: string
  /** Client or team within the company, if any. */
  detail?: string
  period: string
  result: { value: string; label: string }
  problem: string
  approach: string
  outcome: string
  /** Rows of the architecture diagram, each read left to right. */
  diagram: { label?: string; nodes: DiagramNode[] }[]
  /** The main trade-off: a short headline and why it mattered. */
  keyDecision: { title: string; detail: string }
  stack: string[]
}
