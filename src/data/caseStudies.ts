import type { CaseStudy } from './types'

// Facts come from the resume; diagrams are simplified from the listed stack.
export const caseStudies: CaseStudy[] = [
  {
    id: 'medicare-documents',
    sector: 'Healthcare',
    title: 'Medicare-compliant documents at scale',
    company: 'Deloitte',
    period: '2023–2026',
    result: { value: '2M+ PDFs', label: 'generated and stored' },
    problem:
      'A program handling millions of medical records a week needed a way to work with them and produce documents that met Medicare requirements.',
    approach:
      'A Next.js and Node dashboard over MongoDB, plus a Go and Python service using an LLM to generate the documents, all containerized on AWS ECS.',
    outcome:
      '3M records a week through the dashboard, and more than 2M generated PDFs stored in S3.',
    diagram: [
      {
        label: 'records',
        nodes: [
          { title: 'Medical records', detail: '3M / week' },
          { title: 'Dashboard', detail: 'Next.js · MUI' },
          { title: 'API', detail: 'Node · TS' },
          { title: 'MongoDB', detail: 'storage', kind: 'store' },
        ],
      },
      {
        label: 'documents',
        nodes: [
          { title: 'Generator', detail: 'Go · Python', kind: 'ai' },
          { title: 'LLM', detail: 'ChatGPT', kind: 'ai' },
          { title: 'Compliant PDF', detail: 'Medicare' },
          { title: 'S3', detail: '2M+ files', kind: 'store' },
        ],
      },
    ],
    keyDecision: {
      title: 'Generate documents with an LLM, not hard-coded templates',
      detail:
        'New document types no longer needed a developer. End users created the documents they needed, when they needed them, instead of waiting on the dev team.',
    },
    stack: [
      'TypeScript',
      'Next.js',
      'Go',
      'Python',
      'MongoDB',
      'AWS ECS',
      'S3',
    ],
  },
  {
    id: 'invoice-reconciliation',
    sector: 'Government',
    title: 'Reconciling 600,000 invoices',
    company: 'KPMG',
    detail: 'Florida Department of Transportation',
    period: '2018–2021',
    result: { value: '$1.8M saved', label: 'and 20,000 work hours' },
    problem:
      "600,000 PDF invoices had to be reconciled against FDOT's financial database.",
    approach:
      "A Python tool that extracted invoice data from the PDFs and automated the reconciliation with the department's records.",
    outcome: '$1.8 million and 20,000 work hours saved.',
    diagram: [
      {
        nodes: [
          { title: 'PDF invoices', detail: '600,000' },
          { title: 'Python tool', detail: 'extract · match', kind: 'ai' },
          { title: 'Financial DB', detail: 'FDOT', kind: 'store' },
        ],
      },
    ],
    keyDecision: {
      title: 'Send uncertain matches to people, not guesses to the ledger',
      detail:
        'Mismatched or unreadable invoices went to a manual review queue. We tuned the confidence thresholds closely, and a large existing dataset gave us plenty to train the models on.',
    },
    stack: ['Python', 'PDF extraction', 'SQL'],
  },
  {
    id: 'support-triage',
    sector: 'Customer support',
    title: 'AI triage for a support queue',
    company: '24 Hour Fitness',
    detail: 'Platform team',
    period: '2022–2023',
    result: { value: '7 → 2 min', label: 'average customer wait' },
    problem:
      'Members were waiting around seven minutes in the customer-service queue, often with high-level product questions.',
    approach:
      'ChatGPT integrated into the queue with Go, Node.js, and a React front end to handle those questions.',
    outcome: 'Customer wait time fell from 7 minutes to 2.',
    diagram: [
      {
        nodes: [
          { title: 'Member request', detail: 'support queue' },
          { title: 'Triage service', detail: 'Go · Node', kind: 'ai' },
          { title: 'LLM', detail: 'ChatGPT', kind: 'ai' },
          { title: 'Agent console', detail: 'React' },
        ],
      },
    ],
    keyDecision: {
      title: 'Let the model answer only the basics',
      detail:
        'Anything complicated went straight to a trusted person. A weekly sample of calls was reviewed to confirm quality held up.',
    },
    stack: ['Go', 'Node.js', 'React', 'ChatGPT'],
  },
]
