import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import { leadSchema, type LeadInput } from '@/lib/schema'
import { computeEstimate } from '@/lib/estimator'

type ResendClient = { emails: { send: InstanceType<typeof Resend>['emails']['send'] } }

function makeResend(key: string | undefined): ResendClient {
  // The Resend constructor may be mocked as a plain function in tests.
  // Use a try/new pattern so the real class works in production.
  try {
    return new Resend(key)
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (Resend as unknown as (k: string | undefined) => ResendClient)(key)
  }
}

export async function processLead(raw: unknown): Promise<{ ok: true }> {
  const data: LeadInput = leadSchema.parse(raw)
  const estimate = computeEstimate({ projectType: data.projectType, timelineNeed: data.timelineNeed })
  const resend = makeResend(process.env['RESEND_API_KEY'])
  const from = process.env['LEAD_FROM_EMAIL'] as string
  const to = process.env['LEAD_TO_EMAIL'] as string

  const lead = await resend.emails.send({
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
  })
  if (lead.error) throw new Error(lead.error.message)

  const ack = await resend.emails.send({
    from,
    to: data.email,
    subject: 'Thanks — I will be in touch',
    text: `Hi ${data.name},\n\nThanks for reaching out about your ${data.projectType} project. `
      + `Your ballpark is ${estimate.range} over roughly ${estimate.weeks} weeks. `
      + `I will review your message and reply personally soon.\n\n— HRN`,
  })
  if (ack.error) throw new Error(ack.error.message)

  return { ok: true }
}

export const sendLead = createServerFn({ method: 'POST' })
  .validator((d: unknown) => d)
  .handler(async ({ data }) => processLead(data))
