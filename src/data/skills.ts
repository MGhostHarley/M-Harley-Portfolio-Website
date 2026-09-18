import python from '../assets/tech/python.png'
import go from '../assets/tech/golang.png'
import javascript from '../assets/tech/javascript.png'
import typescript from '../assets/tech/typescript.png'
import react from '../assets/tech/reactjs.png'
import node from '../assets/tech/nodejs.png'
import docker from '../assets/tech/docker.png'
import git from '../assets/tech/git.png'
import web from '../assets/web.png'
import backend from '../assets/backend.png'
import mobile from '../assets/mobile.png'
import creator from '../assets/creator.png'
import type { IconItem, SkillGroup } from './types'

export const services: IconItem[] = [
  { name: 'Full-Stack Engineering', icon: web },
  { name: 'API Development', icon: mobile },
  { name: 'Backend Systems', icon: backend },
  { name: 'AI Integration', icon: creator },
]

export const technologies: IconItem[] = [
  { name: 'Python', icon: python },
  { name: 'Go', icon: go },
  { name: 'JavaScript', icon: javascript },
  { name: 'TypeScript', icon: typescript },
  { name: 'React', icon: react },
  { name: 'Node.js', icon: node },
  { name: 'Docker', icon: docker },
  { name: 'Git', icon: git },
]

export const skillGroups: SkillGroup[] = [
  {
    name: 'Pacific Fusion · planned focus',
    items:
      'Kafka, Go, Python, TypeScript, device telemetry, data analysis, monitoring and control systems',
  },
  {
    name: 'Languages',
    items: 'Go, Python, TypeScript, JavaScript, C#, SQL / PostgreSQL',
  },
  { name: 'Cloud & infrastructure', items: 'AWS ECS, AWS S3, Docker, Git' },
  {
    name: 'Frameworks & tools',
    items:
      'React, Next.js, Node.js, Django, Flask, FastAPI, REST APIs, Tailwind CSS, Material UI, MongoDB, Elasticsearch',
  },
  {
    name: 'AI & machine learning',
    items: 'ChatGPT, Claude, LLM integration, TensorFlow, PyTorch, OCR',
  },
]
