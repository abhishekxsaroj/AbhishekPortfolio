import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LazyImage } from '@/components/ui/LazyImage'
import { ProjectActions } from '@/components/work/ProjectActions'
import { projects } from '@/data/projects'
import { fadeUp, staggerContainer, transitionSoft } from '@/lib/animations'

export function ProjectsPage() {
  return (
    <section className="relative min-h-dvh pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
              All Projects
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Project archive
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground-muted">
              Full case studies — every build with context, stack, and live links.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm text-foreground-subtle transition-colors hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-14 md:gap-20"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              id={project.id}
              variants={fadeUp}
              transition={transitionSoft}
              className="grid items-start gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] md:sticky md:top-28">
                <LazyImage
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover"
                  wrapperClassName="absolute inset-0 h-full w-full"
                  sizes="(max-width: 768px) 100vw, 48vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${project.accentColor}, transparent 70%)`,
                  }}
                />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-subtle">
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(projects.length).padStart(2, '0')} · {project.period}
                </p>

                <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-balance md:text-3xl">
                  {project.fullTitle}
                </h2>

                {project.association && (
                  <p className="mt-2 text-sm text-accent-soft">{project.association}</p>
                )}

                <div className="mt-5 space-y-3 text-sm leading-relaxed text-foreground-muted">
                  {project.details.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground-muted">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <ul
                  className="mt-6 flex flex-wrap gap-1.5"
                  aria-label="Skills"
                >
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] tracking-[0.04em] text-foreground-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
