import { cn } from '@/lib/utils'

type ProjectActionsProps = {
  liveUrl?: string
  githubUrl?: string
  className?: string
}

const baseLink =
  'inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium tracking-[0.04em] transition-colors duration-300'

export function ProjectActions({
  liveUrl,
  githubUrl,
  className,
}: ProjectActionsProps) {
  if (!liveUrl && !githubUrl) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {liveUrl && (
        <a
          href={liveUrl}
          target={liveUrl.startsWith('http') ? '_blank' : undefined}
          rel={liveUrl.startsWith('http') ? 'noreferrer' : undefined}
          className={cn(
            baseLink,
            'bg-accent text-canvas hover:bg-accent-soft shadow-[0_10px_30px_rgb(255_107_44_/_0.2)]',
          )}
        >
          Live Demo
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(baseLink, 'glass text-foreground hover:bg-white/[0.07]')}
        >
          Github
        </a>
      )}
    </div>
  )
}
