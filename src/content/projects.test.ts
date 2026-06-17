import { describe, it, expect } from 'vitest'
import { projects, getProject, getProjectsByCategory } from './projects'

describe('projects content', () => {
  it('exposes all projects with unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(projects.length).toBeGreaterThan(0)
  })
  it('finds a project by slug', () => {
    expect(getProject('brightcup-coffee')?.title).toBe('Brightcup Coffee')
    expect(getProject('nope')).toBeUndefined()
  })
  it('filters by category', () => {
    expect(getProjectsByCategory('dashboard').every((p) => p.category === 'dashboard')).toBe(true)
    expect(getProjectsByCategory('all').length).toBe(projects.length)
  })
})
