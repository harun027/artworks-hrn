import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMock = vi.fn()
// Use a real class so `new Resend(...)` in production code is constructable
// under the test mock (arrow-function mocks are not valid constructors).
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock }
  },
}))

import { processLead } from './send-lead'

const valid = {
  projectType: 'website', budgetBracket: '$5k–$15k', timelineNeed: 'Flexible',
  name: 'Ada', email: 'ada@example.com', message: 'I need a marketing site.', website: '',
}

describe('processLead', () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: '1' }, error: null })
    process.env['LEAD_FROM_EMAIL'] = 'leads@test.com'
    process.env['LEAD_TO_EMAIL'] = 'owner@test.com'
  })

  it('rejects invalid input without sending email', async () => {
    await expect(processLead({ ...valid, email: 'bad' })).rejects.toThrow()
    expect(sendMock).not.toHaveBeenCalled()
  })
  it('throws when destination env vars are missing', async () => {
    delete process.env['LEAD_FROM_EMAIL']
    delete process.env['LEAD_TO_EMAIL']
    await expect(processLead(valid)).rejects.toThrow(/LEAD_FROM_EMAIL|LEAD_TO_EMAIL/)
    expect(sendMock).not.toHaveBeenCalled()
  })
  it('sends two emails on a valid submission', async () => {
    const res = await processLead(valid)
    expect(res.ok).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(2)
  })
  it('surfaces a failure when the lead email errors', async () => {
    sendMock.mockReset()
    sendMock
      .mockResolvedValueOnce({ data: null, error: { message: 'boom' } })
      .mockResolvedValueOnce({ data: { id: '2' }, error: null })
    await expect(processLead(valid)).rejects.toThrow(/boom/)
  })
  it('surfaces a failure when the ack email errors', async () => {
    sendMock.mockReset()
    sendMock
      .mockResolvedValueOnce({ data: { id: '1' }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: 'ack-fail' } })
    await expect(processLead(valid)).rejects.toThrow(/ack-fail/)
  })
})
