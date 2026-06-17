import { z } from 'zod'

export const leadSchema = z.object({
  projectType: z.enum(['website', 'mobile', 'saas', 'desktop', 'dashboard', 'other']),
  budgetBracket: z.enum(['<$5k', '$5k–$15k', '$15k–$50k', '$50k+']),
  timelineNeed: z.enum(['ASAP', '1–3 months', 'Flexible']),
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Tell me a bit more (10+ characters)'),
  website: z.string().max(0, 'Spam detected').optional().default(''),
})

export type LeadInput = z.infer<typeof leadSchema>
