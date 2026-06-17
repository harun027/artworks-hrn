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

export type BudgetBracket = '<$5k' | '$5k–$15k' | '$15k–$50k' | '$50k+'
export type TimelineNeed = 'ASAP' | '1–3 months' | 'Flexible'

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
  year?: string
  role?: string
  services?: string[]
  liveUrl?: string
  featured?: boolean
}

export interface LeadSubmission {
  projectType: Category
  budgetBracket: BudgetBracket
  timelineNeed: TimelineNeed
  name: string
  email: string
  message: string
}
