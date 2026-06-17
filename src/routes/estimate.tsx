import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
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
    onError: () => toast.error('Something went wrong. Email me directly at hello@example.com.'),
  })

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="font-display text-4xl font-extrabold">Start your project</h1>
      <p className="mt-2 text-muted-foreground">
        Pick a few options for an instant ballpark, then send it over — it reaches me directly.
      </p>
      {mutation.isSuccess ? (
        <div className="mt-10 glass rounded-3xl p-10 text-center">
          <h2 className="font-display text-2xl font-extrabold">Message sent 🎉</h2>
          <p className="mt-2 text-muted-foreground">I will review it and reply personally. Check your email for a confirmation.</p>
        </div>
      ) : (
        <div className="mt-10">
          <EstimatorForm onSubmit={(d) => mutation.mutate(d)} pending={mutation.isPending} />
        </div>
      )}
    </main>
  )
}
