import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { EstimatorForm } from '@/components/estimator-form'
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
    <main className="mx-auto max-w-4xl px-6 py-14">
      <header className="max-w-xl">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Start your project</h1>
        <p className="mt-3 text-muted-foreground">
          Pick a few options for an instant ballpark, then send it over — it reaches me directly.
        </p>
      </header>

      {mutation.isSuccess ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-12 text-center card-soft">
          <CheckCircle2 className="mx-auto h-12 w-12 text-accent" strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">Message sent</h2>
          <p className="mt-2 text-muted-foreground">
            I will review it and reply personally. Check your email for a confirmation.
          </p>
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-border bg-card p-6 card-soft sm:p-8">
          <EstimatorForm onSubmit={(d) => mutation.mutate(d)} pending={mutation.isPending} />
        </div>
      )}
    </main>
  )
}
