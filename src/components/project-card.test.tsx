import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from './project-card'
import { sampleWebsite } from '@/content/projects/sample-website'

describe('ProjectCard', () => {
  it('shows title, tagline and category badge', () => {
    render(<ProjectCard project={sampleWebsite} asLink={false} />)
    expect(screen.getByText('Brightcup Coffee')).toBeInTheDocument()
    expect(screen.getByText(/warm, fast marketing site/i)).toBeInTheDocument()
    expect(screen.getByText('Websites')).toBeInTheDocument()
  })
})
