// Plain data only: vite.config.ts imports this file directly in Node.
import type { NavLink, Profile } from './types.ts'

export const profile: Profile = {
  name: 'Michael Harley',
  highlightedName: 'Harley',
  preferredName: 'Em',
  title: 'Senior Full-Stack Software Engineer',
  location: 'San Francisco, CA',
  url: 'https://emharley.com',
  introduction:
    'I build production systems end to end: data platforms, backend services in Go and Python, and the React interfaces people use to run them. Ten years across healthcare, security, government, and consumer products.',
  currentContext: 'Data systems for fusion hardware testing',
  summary:
    'I have spent ten years shipping production systems end to end: TypeScript, React, and Next.js on the front, Go and Python on the back, deployed on AWS. Over the past few years I have focused on putting AI and LLMs into production, from customer-service triage to medical-document generation.',
  approach:
    'I work with stakeholders to turn complex requirements into useful software, own features through production, and measure the impact of what we build. At Pacific Fusion I partner with fusion scientists to shorten the path from experiment to analysis.',
  education: 'B.S. Computer Science, American University, 2016',
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/m-harley/',
      icon: 'linkedin',
    },
    { name: 'GitHub', url: 'https://github.com/MGhostHarley', icon: 'github' },
    { name: 'X', url: 'https://x.com/EmInProd', icon: 'x' },
  ],
}

export const resumeUrl = '/Michael-Harley-Resume.pdf'

export const navLinks: NavLink[] = [
  { title: 'Case studies', href: '/case-studies/' },
  { title: 'Experience', href: '/#experience', sectionId: 'experience' },
  { title: 'About', href: '/#about', sectionId: 'about' },
  { title: 'FAQ', href: '/faq/' },
  { title: 'Contact', href: '/#contact', sectionId: 'contact' },
]

/** The stack highlighted in the "Now" strip under the hero. */
export const currentStack = ['Kafka', 'Go', 'Python', 'TypeScript']
