import type { Faq, NavLink, Profile } from './types.ts'

export const profile: Profile = {
  name: 'Michael Harley',
  highlightedName: 'Harley',
  preferredName: 'Em',
  title: 'Senior Full-Stack Software Engineer',
  location: 'San Francisco, CA',
  email: 'm.harley267@gmail.com',
  url: 'https://emharley.com',
  description:
    'Michael (Em) Harley — senior full-stack software engineer at Pacific Fusion, focused on scientific software, device telemetry, and data systems.',
  introduction:
    "I'm Michael, but most people call me Em. I'm a senior full-stack software engineer with 10 years of experience shipping production systems, from React and TypeScript interfaces to Go and Python services.",
  currentContext:
    "Now at Pacific Fusion, where I'll be working with Kafka, Go, Python, and TypeScript to turn large volumes of device telemetry into insights that support monitoring and control of nuclear-fusion systems.",
  summary:
    'My work spans data platforms, AI integrations, and full-stack applications. I have built systems processing 3 million medical records per week, managed more than 4 petabytes of security data, and delivered automation that saved $1.8 million and 20,000 work hours.',
  approach:
    'I work with stakeholders to turn complex requirements into useful software, own features through production, and measure the impact of what we build.',
  education: 'B.S. in Computer Science, American University, May 2016',
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/m-harley/',
      icon: 'linkedin',
    },
    { name: 'X', url: 'https://x.com/EmInProd', icon: 'x' },
    { name: 'GitHub', url: 'https://github.com/MGhostHarley', icon: 'github' },
  ],
}

export const navLinks: NavLink[] = [
  { id: 'about', title: 'About' },
  { id: 'experience', title: 'Experience' },
  { id: 'tech', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
]

export const faqs: Faq[] = [
  { question: 'Where are you based?', answer: profile.location },
  {
    question: 'What kind of engineering do you do?',
    answer:
      'Full-stack software engineering, spanning production systems, data platforms, and AI/LLM integration. My new role at Pacific Fusion focuses on software for nuclear-fusion monitoring and control.',
  },
  {
    question: 'What will you be working on at Pacific Fusion?',
    answer:
      "I'll be using Kafka, Go, Python, and TypeScript to build systems that collect, process, and analyze large volumes of telemetry from connected devices. The goal is to help engineers monitor equipment, understand system behavior, and support the control of nuclear-fusion systems.",
  },
  {
    question: 'What languages do you use?',
    answer: 'Go, Python, TypeScript, JavaScript, C#, and SQL.',
  },
  {
    question: 'What has your AI work involved?',
    answer:
      'Customer-service triage, medical-document generation, and sales automation, with an emphasis on useful production integrations.',
  },
  { question: 'Where did you study?', answer: profile.education },
]
