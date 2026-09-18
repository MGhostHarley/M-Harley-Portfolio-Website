import type { Experience } from './types'

export const experiences: Experience[] = [
  {
    id: 'pacific-fusion',
    company: 'Pacific Fusion',
    title: 'Current role',
    date: 'Present',
    points: [
      'My work will focus on collecting, processing, and analyzing large volumes of device telemetry to support nuclear-fusion monitoring and control.',
      "I'll use Kafka, Go, Python, and TypeScript to connect device data with software services, analysis tools, and monitoring interfaces.",
      "I'll help engineers monitor connected equipment and understand system behavior, turning high-volume telemetry into information that supports control decisions.",
    ],
  },
  {
    id: 'deloitte',
    company: 'Deloitte',
    title: 'Full-Stack Software Engineer',
    date: 'November 2023 – July 2026',
    location: 'San Francisco, CA · Remote',
    points: [
      'Built a TypeScript, Next.js, Node.js, and Material UI dashboard that processed 3 million medical records per week, with MongoDB for storage.',
      'Built a Go, Python, and TypeScript tool using ChatGPT to generate medical PDF documents compliant with Medicare requirements.',
      'Deployed and operated containerized services on AWS ECS, with S3 storage for more than 2 million generated PDFs.',
      'Led feature development and worked with stakeholders to determine ROI and turn abstract ideas into production functionality.',
    ],
  },
  {
    id: 'fitness-product',
    company: '24 Hour Fitness',
    title: 'Product Manager',
    date: 'August 2023 – November 2023',
    location: 'San Francisco, CA',
    points: [
      'Managed the development and launch of a sales analytics dashboard tracking more than $5 million in transactions and club usage to inform strategic decisions.',
    ],
  },
  {
    id: 'fitness-engineering',
    company: '24 Hour Fitness',
    title: 'Software Engineer – Platform',
    date: 'September 2022 – August 2023',
    location: 'San Francisco, CA',
    points: [
      'Integrated ChatGPT into the customer-service queue using Go, JavaScript, React, and Node.js, reducing customer wait time from 7 minutes to 2 minutes.',
      'Integrated the ActiveCampaign API to send more than 3,000 customer deals, resulting in $25,000 in total bookings.',
    ],
  },
  {
    id: 'expel',
    company: 'Expel, Inc.',
    title: 'Software Engineer',
    date: 'May 2021 – September 2022',
    location: 'Herndon, VA · Remote',
    points: [
      'Implemented and managed Elasticsearch clusters containing more than 4 petabytes of data, using Go.',
      'Created more than 20 REST API endpoints in Python and Node.js and integrated more than 12 security services, including Microsoft Defender, Cloudflare, and CrowdStrike.',
    ],
  },
  {
    id: 'kpmg',
    company: 'KPMG',
    title: 'Software Developer',
    date: 'February 2018 – May 2021',
    location: 'McLean, VA · Hybrid',
    points: [
      'Built a Python tool that saved the Florida Department of Transportation $1.8 million and 20,000 work hours by reconciling 600,000 PDF invoices with its financial database.',
      'Developed a redaction engine using TensorFlow, PyTorch, Python, and UiPath to process 9,000 medical documents and redact personal information, reducing manual labor costs by $250,000.',
      'Led a team building a Python application to analyze sentiment and summarize more than 100,000 public comments on government regulations.',
    ],
  },
  {
    id: 'symantec',
    company: 'Symantec',
    title: 'Software Engineer',
    date: 'June 2016 – February 2018',
    location: 'Herndon, VA',
    points: [
      "Resolved issues in Symantec's log collection platform, used to detect malicious network traffic during the 2016 Rio Olympics.",
      'Built an internal Python, Django, and HTML application aggregating internal data and external threat-analysis sources.',
      'Supported hundreds of thousands of inbound requests and search across millions of security incidents and logs.',
    ],
  },
]
