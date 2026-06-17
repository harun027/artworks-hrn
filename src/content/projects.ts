import type { Category, Project } from '@/lib/types'
import { sampleWebsite } from './projects/sample-website'
import { sampleDashboard } from './projects/sample-dashboard'

export const projects: Project[] = [sampleWebsite, sampleDashboard]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: Category | 'all'): Project[] {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

export const featuredProjects = projects.filter((p) => p.featured)
