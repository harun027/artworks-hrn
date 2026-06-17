import { Badge } from '@/components/ui/badge'
import type { Project } from '@/lib/types'

export function InfoPanel({ project }: { project: Project }) {
  return (
    <aside className="glass rounded-2xl p-6">
      <h3 className="font-display text-lg font-bold">What it took</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div><dt className="text-muted-foreground">Timeline</dt><dd className="font-medium">{project.timeline}</dd></div>
        <div><dt className="text-muted-foreground">Team</dt><dd className="font-medium">{project.teamSize}</dd></div>
        <div><dt className="text-muted-foreground">Effort range</dt><dd className="font-medium">{project.effortRange}</dd></div>
        <div>
          <dt className="text-muted-foreground">Tech stack</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
          </dd>
        </div>
      </dl>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer"
           className="mt-5 inline-block font-medium text-primary hover:underline">
          Visit live project →
        </a>
      )}
    </aside>
  )
}
