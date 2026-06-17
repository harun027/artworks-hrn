import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EstimatorForm } from '@/components/estimator-form'
import { GhostLetter } from '@/components/ghost-letter'
import { sendLead } from '@/server/send-lead'
import type { LeadInput } from '@/lib/schema'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/estimate')({
  head: () => ({ meta: seo({ title: 'Get an estimate — HRN', description: 'Tell me about your project and get an instant ballpark.' }) }),
  component: EstimatePage,
})

function EstimatePage() {
  const mutation = useMutation({
    mutationFn: (data: LeadInput) => sendLead({ data }),
    onSuccess: () => toast.success('Thanks! Check your inbox — I will be in touch.'),
    onError: () => toast.error('Something went wrong — please try again, or reach out directly.'),
  })

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 pt-6">
      <section className="panel-dark relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <GhostLetter char="?" className="-right-2 -top-10 text-[16rem] text-white/[0.04]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Estimate</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold text-white">Start your project</h1>
          <p className="mt-3 max-w-md text-white/60">
            Pick a few options for an instant ballpark, then send it over — it reaches me directly.
          </p>
        </div>
      </section>

      {mutation.isSuccess ? (
        <div className="panel-light rounded-[2rem] border border-border p-12 text-center">
          <h2 className="font-display text-3xl font-extrabold">Message sent 🎉</h2>
          <p className="mt-3 text-muted-foreground">
            I will review it and reply personally. Check your email for a confirmation.
          </p>
        </div>
      ) : (
        <div className="panel-light rounded-[2rem] border border-border p-8 sm:p-10">
          <EstimatorForm onSubmit={(d) => mutation.mutate(d)} pending={mutation.isPending} />
        </div>
      )}
    </main>
  )
}
