import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { LazyImage } from '@/components/ui/LazyImage'
import { ProjectActions } from '@/components/work/ProjectActions'
import { projects } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

export function ProjectCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const prefersReducedMotion = useReducedMotion()
  const project = projects[index]

  const go = useCallback((next: number) => {
    const normalized = ((next % projects.length) + projects.length) % projects.length
    if (normalized === index) return
    setDirection(normalized > index ? 1 : -1)
    setIndex(normalized)
  }, [index])

  const goNext = useCallback(() => go(index + 1), [go, index])
  const goPrev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = window.setInterval(goNext, 7500)
    return () => window.clearInterval(timer)
  }, [goNext, prefersReducedMotion])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -56 || info.velocity.x < -400) goNext()
    else if (info.offset.x > 56 || info.velocity.x > 400) goPrev()
  }

  const containerVariants = {
    enter: {},
    center: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.02,
      },
    },
    exit: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        staggerDirection: 1,
      },
    },
  }

  const itemVariants = {
    enter: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : { x: dir > 0 ? 56 : -56, opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.5, ease },
    },
    exit: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            x: dir > 0 ? -56 : 56,
            opacity: 0,
            transition: { duration: 0.34, ease },
          },
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden touch-pan-y">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="flex cursor-grab flex-col gap-6 active:cursor-grabbing md:flex-row md:items-center md:gap-12 lg:gap-16"
          >
            <motion.div
              custom={direction}
              variants={itemVariants}
              className="relative aspect-[16/10] w-full min-w-0 shrink-0 overflow-hidden rounded-[1.15rem] md:w-[46%] md:max-w-[460px]"
            >
              <LazyImage
                src={project.image}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover"
                wrapperClassName="absolute inset-0 h-full w-full"
                sizes="(max-width: 768px) 100vw, 46vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/45 via-transparent to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                style={{
                  background: `linear-gradient(90deg, ${project.accentColor}, transparent 70%)`,
                }}
              />
            </motion.div>

            <motion.div
              custom={direction}
              variants={containerVariants}
              className="flex min-w-0 flex-1 flex-col gap-3 md:max-w-md md:gap-3.5"
            >
              <motion.p
                custom={direction}
                variants={itemVariants}
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-subtle"
              >
                {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} ·{' '}
                {project.period}
              </motion.p>

              <motion.h3
                custom={direction}
                variants={itemVariants}
                className="font-display text-xl font-semibold tracking-[-0.04em] text-balance sm:text-2xl md:text-3xl lg:text-[2.15rem]"
              >
                {project.title}
              </motion.h3>

              <motion.p
                custom={direction}
                variants={itemVariants}
                className="text-sm leading-relaxed text-foreground-muted"
              >
                {project.description}
              </motion.p>

              <motion.ul
                custom={direction}
                variants={itemVariants}
                className="flex flex-wrap gap-1.5"
                aria-label="Tech stack"
              >
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] tracking-[0.04em] text-foreground-muted"
                  >
                    {tag}
                  </li>
                ))}
              </motion.ul>

              <motion.div custom={direction} variants={itemVariants} className="pt-1">
                <ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-foreground-muted transition hover:border-white/25 hover:text-foreground"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-foreground-muted transition hover:border-white/25 hover:text-foreground"
          >
            →
          </button>
        </div>

        <div
          className="flex flex-wrap items-center justify-end gap-1"
          role="tablist"
          aria-label="Project slides"
        >
          {projects.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${item.title}`}
              onClick={() => go(i)}
              className="inline-flex h-11 min-w-11 items-center justify-center"
            >
              <span
                className={cn(
                  'block h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-accent' : 'w-1.5 bg-white/25',
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
