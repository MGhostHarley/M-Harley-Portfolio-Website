import deloitte from '../assets/logos/deloitte.webp'
import expel from '../assets/logos/expel.webp'
import kpmg from '../assets/logos/kpmg.webp'
import fitness from '../assets/logos/24-hour-fitness.webp'
import pacificFusion from '../assets/logos/pacific-fusion.webp'
import symantec from '../assets/logos/symantec.webp'
import type { Metric } from './types'

/** 96px square logo tiles, keyed by company name. */
export const companyLogos: Record<string, string> = {
  'Pacific Fusion': pacificFusion,
  Deloitte: deloitte,
  Expel: expel,
  KPMG: kpmg,
  '24 Hour Fitness': fitness,
  Symantec: symantec,
}

/** Results at scale that have no case study of their own. */
export const scaleHighlights: Metric[] = [
  {
    value: '3M',
    label: 'medical records processed a week',
    company: 'Deloitte',
  },
  {
    value: '4 PB',
    label: 'of security data in Elasticsearch',
    company: 'Expel',
  },
]

/**
 * Production AI work, shown under the experience list. These deliberately avoid the numbers
 * already in the impact row and case studies, so each result appears once.
 */
export const aiHighlights = [
  {
    title: 'PII redaction',
    detail:
      'An ML engine that redacted personal data from 9,000 medical documents, saving $250K in manual work.',
    company: 'KPMG',
  },
  {
    title: 'Policy analysis',
    detail:
      'Summaries and sentiment scores for 100,000+ public comments on government regulations.',
    company: 'KPMG',
  },
  {
    title: 'Document generation',
    detail:
      'LLM-generated Medicare documents that users create on demand, without waiting on developers.',
    company: 'Deloitte',
  },
  {
    title: 'Support triage',
    detail:
      'An LLM that answers the basics and routes anything complex to a trusted person.',
    company: '24 Hour Fitness',
  },
]
