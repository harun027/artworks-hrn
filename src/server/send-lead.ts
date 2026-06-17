import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import { leadSchema, type LeadInput } from '@/lib/schema'
import { computeEstimate } from '@/lib/estimator'

export async function processLead(raw: unknown): Promise<{ ok: true }> {
  const data: LeadInput = leadSchema.parse(raw)
  const estimate = computeEstimate({ projectType: data.projectType, timelineNeed: data.timelineNeed })

  const from = process.env['LEAD_FROM_EMAIL']
  const to = process.env['LEAD_TO_EMAIL']
  if (!from || !to) {
    throw new Error('Missing LEAD_FROM_EMAIL or LEAD_TO_EMAIL env var')
  }

  const resend = new Resend(process.env['RESEND_API_KEY'])

  // The two emails are independent — send them concurrently.
  const [lead, ack] = await Promise.all([
    resend.emails.send({
      from,
      to,
      subject: `New lead: ${data.projectType} — ${data.name}`,
      text: [
        `Name: ${data.name}`, `Email: ${data.email}`,
        `Project: ${data.projectType}`, `Budget: ${data.budgetBracket}`,
        `Timeline: ${data.timelineNeed}`,
        `Estimate shown: ${estimate.range} / ${estimate.weeks} weeks${estimate.rush ? ' (rush)' : ''}`,
        ``, `Message:`, data.message,
      ].join('\n'),
    }),
    resend.emails.send({
      from,
      to: data.email,
      subject: 'Thanks — I will be in touch',
      text: `Hi ${data.name},\n\nThanks for reaching out about your ${data.projectType} project. `
        + `Your ballpark is ${estimate.range} over roughly ${estimate.weeks} weeks. `
        + `I will review your message and reply personally soon.\n\n— HRN`,
    }),
  ])
  if (lead.error) throw new Error(lead.error.message)
  if (ack.error) throw new Error(ack.error.message)

  return { ok: true }
}

export const sendLead = createServerFn({ method: 'POST' })
  // Validate here so invalid input surfaces as a structured error, not a 500.
  .validator((d: unknown) => leadSchema.parse(d))
  .handler(async ({ data }) => processLead(data))
