import type { Project } from '@/lib/types'

export const sampleWebsite: Project = {
  slug: 'brightcup-coffee',
  title: 'Brightcup Coffee',
  category: 'website',
  tagline: 'A warm, fast marketing site for a local roastery.',
  thumbnail: '/projects/brightcup-thumb.svg',
  heroImage: '/projects/brightcup-hero.svg',
  gallery: ['/projects/brightcup-1.svg', '/projects/brightcup-2.svg'],
  problem: 'Brightcup had no web presence and lost online orders to competitors.',
  solution: 'A responsive marketing site with menu, story, and online-order links.',
  outcome: 'Launched in 4 weeks; online orders became a real revenue channel.',
  results: [
    { label: 'Load time', value: '0.9s' },
    { label: 'Lighthouse', value: '98' },
    { label: 'Online orders', value: '+ new channel' },
  ],
  techStack: ['React', 'TanStack Start', 'Tailwind'],
  timeline: '4 weeks',
  teamSize: 'Solo',
  effortRange: '$4k–$7k',
  liveUrl: 'https://example.com',
  featured: true,
}
