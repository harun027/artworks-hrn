import { GhostLetter } from '@/components/ghost-letter'
import type { Project } from '@/lib/types'

export function InfoPanel({ project }: { project: Project }) {
  return (
    <aside className="panel-dark relative overflow-hidden rounded-[1.5rem] p-6">
      <GhostLetter char={project.title} className="-bottom-6 -right-2 text-[8rem] text-white/[0.05]" />
      <div className="relative">
        <h3 className="font-display text-lg font-extrabold text-white">What it took</h3>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">Timeline</dt>
            <dd className="mt-0.5 font-semibold text-white">{project.timeline}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">Team</dt>
            <dd className="mt-0.5 font-semibold text-white">{project.teamSize}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">Effort range</dt>
            <dd className="mt-0.5 font-semibold text-white">{project.effortRange}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">Tech stack</dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <span key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white/90"
          >
            Visit live project →
          </a>
        )}
      </div>
    </aside>
  )
}
