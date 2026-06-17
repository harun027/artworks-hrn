import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EstimatorForm } from './estimator-form'

describe('EstimatorForm', () => {
  it('shows a live estimate for the chosen project type', () => {
    render(<EstimatorForm onSubmit={vi.fn()} pending={false} />)
    expect(screen.getByText('$3k–$8k')).toBeInTheDocument()
  })
  it('validates required fields before submitting', async () => {
    const onSubmit = vi.fn()
    render(<EstimatorForm onSubmit={onSubmit} pending={false} />)
    await userEvent.click(screen.getByRole('button', { name: /get my estimate/i }))
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })
  it('submits clean data', async () => {
    const onSubmit = vi.fn()
    render(<EstimatorForm onSubmit={onSubmit} pending={false} />)
    await userEvent.type(screen.getByLabelText(/name/i), 'Ada')
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await userEvent.type(screen.getByLabelText(/project details/i), 'I need a marketing website soon.')
    await userEvent.click(screen.getByRole('button', { name: /get my estimate/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].name).toBe('Ada')
  })
})
