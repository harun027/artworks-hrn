import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadSchema, type LeadInput } from '@/lib/schema'
import { computeEstimate } from '@/lib/estimator'
import { CATEGORIES } from '@/lib/types'
import { EstimatePanel } from './estimate-panel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

// Derived from the schema so the selects stay in sync with validation.
const BUDGETS = leadSchema.shape.budgetBracket.options
const TIMELINES = leadSchema.shape.timelineNeed.options

export function EstimatorForm({
  onSubmit, pending,
}: { onSubmit: (data: LeadInput) => void; pending: boolean }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema) as never,
    defaultValues: {
      projectType: 'website', budgetBracket: '$5k–$15k', timelineNeed: 'Flexible',
      name: '', email: '', message: '', website: '',
    },
  })
  const projectType = watch('projectType')
  const timelineNeed = watch('timelineNeed')
  const estimate = computeEstimate({ projectType, timelineNeed })

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="projectType">Project type</Label>
          <select id="projectType" className="mt-1.5 w-full rounded-xl border border-input bg-card p-2.5 text-sm"
                  {...register('projectType')}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="budgetBracket">Budget</Label>
          <select id="budgetBracket" className="mt-1.5 w-full rounded-xl border border-input bg-card p-2.5 text-sm"
                  {...register('budgetBracket')}>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="timelineNeed">Timeline</Label>
          <select id="timelineNeed" className="mt-1.5 w-full rounded-xl border border-input bg-card p-2.5 text-sm"
                  {...register('timelineNeed')}>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" rows={4} {...register('message')} />
          {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
        </div>
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
               className="hidden" {...register('website')} />
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="rounded-full bg-ink px-7 font-semibold text-ink-foreground hover:bg-ink/90"
        >
          {pending ? 'Sending…' : 'Get my estimate'}
        </Button>
      </form>
      <div className="lg:sticky lg:top-24 lg:self-start"><EstimatePanel estimate={estimate} /></div>
    </div>
  )
}
