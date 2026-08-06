import { motion, useScroll, useTransform } from 'framer-motion'
import { memo, useRef } from 'react'
import { LazyImage } from '@/components/ui/LazyImage'
import type { Project } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import { ProjectAccent } from './ProjectAccent'
import { ProjectActions } from './ProjectActions'

type ProjectSceneProps = {
  project: Project
  index: number
}

function ProjectSceneComponent({ project, index }: ProjectSceneProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const reversed = index % 2 === 1

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [36, -36])
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.04, 1, 1.02],
  )
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.8], [0.12, 0.4, 0.18])

  return (
    <article
      ref={ref}
      id={project.id}
      className="relative flex min-h-dvh items-center content-auto py-20 md:py-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at ${reversed ? '20%' : '80%'} 40%, ${project.accentColor}22, transparent 55%)`,
        }}
      />

      <ProjectAccent kind={project.accent} color={project.accentColor} />

      <div
        className={cn(
          'relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 md:grid-cols-12 md:gap-12 md:px-8',
          reversed && 'md:[&>*:first-child]:order-2',
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground-subtle">
            {String(index + 1).padStart(2, '0')} · {project.period}
          </p>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-balance md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground-muted md:text-base">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-[0.04em] text-foreground-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <ProjectActions
            className="mt-8"
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7"
        >
          <div className="glass-reflect relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.02] shadow-[0_30px_80px_rgb(0_0_0_/_0.45)]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            <motion.div style={{ y: imageY, scale: imageScale }} className="will-change-transform">
              <LazyImage
                src={project.image}
                alt={`${project.title} preview`}
                className="aspect-[4/5] sm:aspect-[16/11] md:min-h-[58vh]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </motion.div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24"
              style={{
                background: `linear-gradient(to top, ${project.accentColor}22, transparent)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </article>
  )
}

export const ProjectScene = memo(ProjectSceneComponent)
