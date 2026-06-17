import { describe, it, expect } from 'vitest'
import { computeEstimate } from './estimator'

describe('computeEstimate', () => {
  it('returns base range and timeline for a website', () => {
    const e = computeEstimate({ projectType: 'website', timelineNeed: 'Flexible' })
    expect(e.range).toBe('$3k–$8k')
    expect(e.weeks).toBe('3–6')
    expect(e.rush).toBe(false)
  })
  it('flags rush when timeline is ASAP', () => {
    const e = computeEstimate({ projectType: 'saas', timelineNeed: 'ASAP' })
    expect(e.range).toBe('$20k–$60k')
    expect(e.rush).toBe(true)
    expect(e.note).toMatch(/rush/i)
  })
  it('handles "other" as a conversation', () => {
    const e = computeEstimate({ projectType: 'other', timelineNeed: 'Flexible' })
    expect(e.range).toBe("Let's talk")
    expect(e.weeks).toBe('Varies')
  })
})
