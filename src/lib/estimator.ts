import type { Category } from './types'

export interface EstimateInput { projectType: Category; timelineNeed: string }
export interface Estimate { range: string; weeks: string; rush: boolean; note: string }

const BASE: Record<Category, { range: string; weeks: string }> = {
  website:   { range: '$3k–$8k',    weeks: '3–6' },
  mobile:    { range: '$12k–$30k',  weeks: '8–16' },
  saas:      { range: '$20k–$60k',  weeks: '12–24' },
  desktop:   { range: '$15k–$40k',  weeks: '10–20' },
  dashboard: { range: '$8k–$20k',   weeks: '5–10' },
  other:     { range: "Let's talk", weeks: 'Varies' },
}

const INCLUDED: Record<Category, string> = {
  website: 'Design, build, responsive pages, and launch.',
  mobile: 'iOS + Android build, store submission, and QA.',
  saas: 'Auth, core features, billing wiring, and deploy.',
  desktop: 'Cross-platform app, packaging, and auto-update.',
  dashboard: 'Data wiring, charts, filters, and access control.',
  other: 'Scoped together based on your needs.',
}

export function computeEstimate(input: EstimateInput): Estimate {
  const base = BASE[input.projectType]
  const rush = input.timelineNeed === 'ASAP'
  const note = rush
    ? `Rush timeline — add a premium and we'll prioritize. ${INCLUDED[input.projectType]}`
    : INCLUDED[input.projectType]
  return { range: base.range, weeks: base.weeks, rush, note }
}
