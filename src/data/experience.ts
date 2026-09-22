import { companyLogos } from './impact'
import type { Experience } from './types'

// From the September 2026 resume.
export const experiences: Experience[] = [
  {
    id: 'pacific-fusion',
    company: 'Pacific Fusion',
    logo: companyLogos['Pacific Fusion'],
    title: 'Senior Full Stack Developer',
    date: 'September 2026 – Present',
    location: 'San Leandro, CA',
    summary:
      'Interfaces and end-to-end data flow for fusion hardware testing, over Kafka and MQTT.',
    points: [
      "Building the front-end interfaces and user experiences for the pulser factory hardware testing systems behind Pacific Fusion's inertial fusion Demonstration System.",
      'Architecting end-to-end data flow for the Demonstration System in React, Go, and Python, integrating multiple diagnostic sources through Kafka/MQTT streaming pipelines.',
      'Defining database schemas and deploying heterogeneous storage across timeseries (InfluxDB, TimescaleDB), SQL (MariaDB), and NoSQL (MongoDB) systems.',
      'Partnering with fusion scientists to accelerate the data lifecycle from experiment to analysis.',
    ],
  },
  {
    id: 'deloitte',
    company: 'Deloitte',
    logo: companyLogos.Deloitte,
    title: 'Full-Stack Software Engineer',
    date: 'November 2023 – July 2026',
    location: 'San Francisco, CA · Remote',
    summary:
      'A medical-records dashboard in Next.js and an LLM document generator, both running on AWS.',
    points: [
      'Built a custom dashboard in TypeScript, Next.js, Node.js, and Material UI that ingested and processed 3 million medical records per week, using MongoDB for storage.',
      'Built a tool in Go, Python, and TypeScript, leveraging AI (ChatGPT), that automatically generated PDF medical documents compliant with Medicare requirements.',
      'Deployed and operated the medical-records dashboard on AWS ECS, running containerized services in production, with S3-backed storage for 2M+ generated PDFs.',
      'Led feature development and determined ROI with stakeholders, turning abstract ideas into real-world functionality and integrating AI to increase team productivity.',
    ],
  },
  {
    id: 'fitness-product',
    company: '24 Hour Fitness',
    logo: companyLogos['24 Hour Fitness'],
    title: 'Product Manager',
    date: 'August 2023 – November 2023',
    location: 'San Francisco, CA',
    summary:
      'Launched a sales analytics dashboard tracking $5M+ in transactions.',
    points: [
      'Managed the development and launch of a sales analytics dashboard tracking $5M+ in transactions and club usage to inform strategic decisions.',
    ],
  },
  {
    id: 'fitness-engineering',
    company: '24 Hour Fitness',
    logo: companyLogos['24 Hour Fitness'],
    title: 'Software Engineer – Platform',
    date: 'September 2022 – August 2023',
    location: 'San Francisco, CA',
    summary:
      'Put ChatGPT into the customer-service queue and wired up ActiveCampaign for $25K in bookings.',
    points: [
      'Integrated ChatGPT with Go, JavaScript, React.js, and Node.js into the customer-service queue to handle high-level product questions, decreasing customer wait time from 7 minutes to 2 minutes.',
      'Integrated the ActiveCampaign API using JavaScript and Node.js to send 3,000+ customer deals, resulting in $25,000 in total bookings.',
    ],
  },
  {
    id: 'expel',
    company: 'Expel, Inc.',
    logo: companyLogos.Expel,
    title: 'Software Engineer',
    date: 'May 2021 – September 2022',
    location: 'Herndon, VA · Remote',
    summary:
      'Elasticsearch performance in Go, 20+ REST endpoints, and 12+ security integrations.',
    points: [
      'Implemented and managed the performance of Elasticsearch NoSQL clusters containing over 4 petabytes of data, using Go.',
      'Created 20+ REST API endpoints in Python and Node.js and integrated 12+ third-party security services, including Microsoft Defender, Cloudflare, and CrowdStrike, to automate workflows.',
    ],
  },
  {
    id: 'kpmg',
    company: 'KPMG',
    logo: companyLogos.KPMG,
    title: 'Software Developer',
    date: 'February 2018 – May 2021',
    location: 'McLean, VA · Hybrid',
    summary:
      'Invoice reconciliation for FDOT, an ML redaction engine, and a sentiment-analysis team I led.',
    points: [
      'Built a Python tool that saved the Florida Department of Transportation $1.8M and 20,000 work hours by automating reconciliation between 600,000 PDF invoices and their financial database.',
      'Developed a redaction engine using TensorFlow, PyTorch, Python, and UiPath to process 9,000 medical documents and redact PII, reducing manual labor costs by $250,000.',
      'Led a team that built a Python application to analyze sentiment and summarize 100,000+ public comments on government regulations, helping policymakers interpret the data.',
    ],
  },
  {
    id: 'symantec',
    company: 'Symantec',
    logo: companyLogos.Symantec,
    title: 'Software Engineer',
    date: 'June 2016 – February 2018',
    location: 'Herndon, VA',
    summary:
      'Log collection for threat detection during the 2016 Rio Olympics.',
    points: [
      "Resolved technical issues in Symantec's log collection platform, used to detect malicious network traffic during the 2016 Rio Olympics.",
      "Launched an internal web application in Python, Django, and HTML that aggregated data from Symantec's internal databases and external threat-analysis sources.",
    ],
  },
]
