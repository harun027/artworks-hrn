import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMock = vi.fn()
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}))

import { processLead } from './send-lead'

const valid = {
  projectType: 'website', budgetBracket: '$5k–$15k', timelineNeed: 'Flexible',
  name: 'Ada', email: 'ada@example.com', message: 'I need a marketing site.', website: '',
}

describe('processLead', () => {
  beforeEach(() => { sendMock.mockReset(); sendMock.mockResolvedValue({ data: { id: '1' }, error: null }) })

  it('rejects invalid input without sending email', async () => {
    await expect(processLead({ ...valid, email: 'bad' })).rejects.toThrow()
    expect(sendMock).not.toHaveBeenCalled()
  })
  it('sends two emails on a valid submission', async () => {
    const res = await processLead(valid)
    expect(res.ok).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(2)
  })
  it('surfaces a failure when the email provider errors', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'boom' } })
    await expect(processLead(valid)).rejects.toThrow(/boom/)
  })
})
