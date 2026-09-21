// Plain data only: vite.config.ts imports this file (for FAQ structured data).
import type { FaqGroup } from './types.ts'

// Answers are drawn from the September 2026 resume.
export const faqGroups: FaqGroup[] = [
  {
    title: 'About me',
    faqs: [
      {
        question: 'What should I call you?',
        answer: 'My name is Michael Harley, but most people call me Em.',
      },
      {
        question: 'Where are you based?',
        answer:
          'San Francisco, California. I work at Pacific Fusion in San Leandro.',
      },
      {
        question: 'Where did you study?',
        answer:
          'American University in Washington, D.C., where I earned a B.S. in Computer Science in 2016.',
      },
    ],
  },
  {
    title: 'My work',
    faqs: [
      {
        question: 'What kind of engineering do you do?',
        answer:
          'Full-stack: React, Next.js, and TypeScript on the front end, Go and Python on the back end, deployed on AWS. Over the past few years I have focused on putting AI and LLMs into production.',
      },
      {
        question: 'What do you work on at Pacific Fusion?',
        answer:
          "I'm a Senior Full Stack Developer building the front-end interfaces and end-to-end data flow for the pulser factory hardware testing systems behind Pacific Fusion's inertial fusion Demonstration System. That means Kafka and MQTT streaming pipelines, time-series and SQL storage, and working closely with fusion scientists.",
      },
      {
        question: 'What languages do you use?',
        answer:
          'Go, Python, TypeScript, JavaScript, C#, and SQL (mostly PostgreSQL).',
      },
      {
        question: 'What has your AI work involved?',
        answer:
          'LLM triage in a customer-service queue that cut wait time from 7 minutes to 2, LLM-generated Medicare-compliant documents (more than 2 million), an ML redaction engine for medical documents, and sentiment analysis of 100,000+ public comments on government regulations.',
      },
    ],
  },
  {
    title: 'Working together',
    faqs: [
      {
        question: 'Can I see your resume?',
        answer:
          'Yes. Use the Resume button at the top of any page to download a PDF.',
      },
      {
        question: "What's the best way to reach you?",
        answer:
          'Send a message through the contact form, or connect with me on LinkedIn.',
      },
    ],
  },
]
