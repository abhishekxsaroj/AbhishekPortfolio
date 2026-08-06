import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { ProjectCarousel } from '@/components/work/ProjectCarousel'
import { fadeUp } from '@/lib/animations'

export function FeaturedProjects() {
  return (
    <section id="work" aria-label="Featured Projects" className="relative content-auto py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mb-6 flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
              Featured Projects
            </p>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-4xl"
            >
              Featured Projects
            </AnimatedHeading>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Selected builds — swipe or use the arrows to browse.
            </p>
          </div>

          <Link
            to="/projects"
            className="group inline-flex min-h-11 items-center gap-1.5 py-2 text-sm font-medium text-accent-soft transition-colors hover:text-accent"
          >
            See all
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </motion.div>

        <ProjectCarousel />
      </div>
    </section>
  )
}
