import donation from '../assets/optimized/donation-dashboard.webp'
import movies from '../assets/optimized/moviebin.webp'
import bikes from '../assets/optimized/bikestar.webp'
import learned from '../assets/optimized/today-m-learned.webp'
import type { Project } from './types'

// Re-add a demo URL only after verifying the hosted app works.
export const projects: Project[] = [
  {
    id: 'donation-dashboard',
    name: 'Donation Dashboard',
    description:
      'A dashboard of donation data created for a local candidate. This portfolio version uses dummy data, shared with permission from the candidate.',
    tags: ['Python', 'React', 'FastAPI'],
    image: donation,
    demo: 'https://donationdashboard.fun/',
  },
  {
    id: 'moviebin',
    name: 'MovieBin',
    description:
      'A place for friends to share, review, and search movies. Built with Next.js, MongoDB, single sign-on, and movie search through RapidAPI.',
    tags: ['Next.js', 'Tailwind CSS', 'MongoDB'],
    image: movies,
    source: 'https://github.com/MGhostHarley/movieSIte',
  },
  {
    id: 'bikestar',
    name: 'BikeStar',
    description:
      'A dashboard exploring sales and predictions for a fictional bike brand, built with React, Node.js, Go, and Material UI.',
    tags: ['React', 'Material UI', 'Go'],
    image: bikes,
    source: 'https://github.com/MGhostHarley/financeDashboard',
  },
  {
    id: 'today-m-learned',
    name: 'Today-M-Learned',
    description:
      'A React application inspired by friends sharing a fact of the day during the pandemic, using Supabase to bring those discoveries together.',
    tags: ['React', 'Supabase', 'Vercel'],
    image: learned,
    source: 'https://github.com/MGhostHarley/today-i-learned',
  },
]
