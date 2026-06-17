import { describe, it, expect } from 'vitest'
import { leadSchema } from './schema'

const valid = {
  projectType: 'website', budgetBracket: '$5k–$15k', timelineNeed: 'Flexible',
  name: 'Ada', email: 'ada@example.com', message: 'I need a site for my shop.',
  website: '',
}

describe('leadSchema', () => {
  it('accepts a valid submission', () => {
    expect(leadSchema.safeParse(valid).success).toBe(true)
  })
  it('rejects a bad email', () => {
    expect(leadSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false)
  })
  it('rejects a short message', () => {
    expect(leadSchema.safeParse({ ...valid, message: 'hi' }).success).toBe(false)
  })
  it('rejects when honeypot is filled (bot)', () => {
    expect(leadSchema.safeParse({ ...valid, website: 'http://spam' }).success).toBe(false)
  })
  it('rejects an unknown project type', () => {
    expect(leadSchema.safeParse({ ...valid, projectType: 'game' }).success).toBe(false)
  })
})
