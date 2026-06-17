import type { Project } from '@/lib/types'

export const sampleDashboard: Project = {
  slug: 'fleetwatch-dashboard',
  title: 'FleetWatch Dashboard',
  category: 'dashboard',
  tagline: 'Real-time vehicle telemetry in one operations view.',
  thumbnail: '/projects/fleetwatch-thumb.svg',
  heroImage: '/projects/fleetwatch-hero.svg',
  gallery: ['/projects/fleetwatch-1.svg'],
  problem: 'Dispatchers juggled three tools to track vehicles and jobs.',
  solution: 'A single dashboard with live map, filters, and alert thresholds.',
  outcome: 'Cut average dispatch decision time and removed tool-switching.',
  results: [
    { label: 'Tools replaced', value: '3 → 1' },
    { label: 'Refresh', value: 'Real-time' },
  ],
  techStack: ['React', 'TanStack Query', 'WebSocket', 'Recharts'],
  timeline: '9 weeks',
  teamSize: '2 people',
  effortRange: '$12k–$18k',
  year: '2024',
  role: 'Frontend & Data Viz',
  services: ['Dashboard UX', 'Realtime data wiring', 'Charts & alerts'],
  featured: true,
}
