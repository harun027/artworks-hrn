export type Category =
  | 'website' | 'mobile' | 'saas' | 'desktop' | 'dashboard' | 'other'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'website', label: 'Websites' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'saas', label: 'SaaS' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'dashboard', label: 'Dashboards' },
  { value: 'other', label: 'Other' },
]

export interface ProjectResult { label: string; value: string }

export interface Project {
  slug: string
  title: string
  category: Category
  tagline: string
  thumbnail: string
  heroImage: string
  gallery: string[]
  problem: string
  solution: string
  outcome: string
  results: ProjectResult[]
  techStack: string[]
  timeline: string
  teamSize: string
  effortRange: string
  liveUrl?: string
  featured?: boolean
}

export interface LeadSubmission {
  projectType: Category
  budgetBracket: string
  timelineNeed: string
  name: string
  email: string
  message: string
}
