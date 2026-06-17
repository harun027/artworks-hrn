import { GhostLetter } from '@/components/ghost-letter'

export function Footer() {
  return (
    <footer className="px-4 pb-4 pt-16">
      <div className="panel-dark relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-12">
        <GhostLetter char="H" className="-bottom-8 right-2 text-[12rem] text-white/[0.04]" />
        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-4xl font-extrabold text-white">
              HRN<span className="text-white/40">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/50">
              Websites, mobile apps, SaaS, desktop apps & dashboards — shipped fast.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:items-end">
            <div className="flex gap-5 text-white/70">
              <a className="transition hover:text-white" href="mailto:hello@example.com">Email</a>
              <a className="transition hover:text-white" href="https://github.com">GitHub</a>
              <a className="transition hover:text-white" href="https://linkedin.com">LinkedIn</a>
            </div>
            <p className="text-white/40">© 2026 HRN. Built with TanStack Start.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
