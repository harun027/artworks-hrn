import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryFilter } from './category-filter'

describe('CategoryFilter', () => {
  it('renders all categories plus All and calls onChange', async () => {
    const onChange = vi.fn()
    render(<CategoryFilter value="all" onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Dashboards' }))
    expect(onChange).toHaveBeenCalledWith('dashboard')
  })
})
