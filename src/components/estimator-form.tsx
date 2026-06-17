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

const selectClass =
  'mt-2 h-11 w-full rounded-lg border border-input bg-background px-3.5 text-base shadow-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50'

function RequiredMark() {
  return <span className="text-destructive" aria-hidden="true"> *</span>
}

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
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="projectType">Project type<RequiredMark /></Label>
          <select id="projectType" className={selectClass} {...register('projectType')}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="budgetBracket">Budget<RequiredMark /></Label>
            <select id="budgetBracket" className={selectClass} {...register('budgetBracket')}>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <p className="mt-1.5 text-xs text-muted-foreground">A rough range is fine.</p>
          </div>
          <div>
            <Label htmlFor="timelineNeed">Timeline<RequiredMark /></Label>
            <select id="timelineNeed" className={selectClass} {...register('timelineNeed')}>
              {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <p className="mt-1.5 text-xs text-muted-foreground">When do you want to start?</p>
          </div>
        </div>

        <div>
          <Label htmlFor="name">Name<RequiredMark /></Label>
          <Input id="name" autoComplete="name" className="mt-2" {...register('name')} />
          {errors.name && <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email<RequiredMark /></Label>
          <Input id="email" type="email" autoComplete="email" aria-describedby="email-hint" className="mt-2" {...register('email')} />
          {errors.email
            ? <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.email.message}</p>
            : <p id="email-hint" className="mt-1.5 text-xs text-muted-foreground">I’ll only use this to reply — no spam.</p>}
        </div>
        <div>
          <Label htmlFor="message">Project details<RequiredMark /></Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="A sentence or two about your goals, key features, and anything important."
            aria-describedby="message-hint"
            className="mt-2"
            {...register('message')}
          />
          {errors.message
            ? <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.message.message}</p>
            : <p id="message-hint" className="mt-1.5 text-xs text-muted-foreground">The more context, the sharper the estimate.</p>}
        </div>

        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
               className="hidden" {...register('website')} />

        <Button type="submit" size="lg" disabled={pending} className="w-full font-semibold sm:w-auto">
          {pending ? 'Sending…' : 'Get my estimate'}
        </Button>
      </form>
      <div className="lg:sticky lg:top-24 lg:self-start"><EstimatePanel estimate={estimate} /></div>
    </div>
  )
}
