import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { milestones } from '@/data/experience'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 75%'],
  })

  const lineScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [0, 1],
  )

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl">
      <div
        aria-hidden
        className="absolute left-4 top-2 bottom-2 w-px bg-white/10 md:left-6"
      />
      <motion.div
        aria-hidden
        className="absolute left-4 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent-soft to-transparent md:left-6"
        style={{ scaleY: lineScale }}
      />

      <ol className="relative space-y-3 md:space-y-3.5">
        {milestones.map((milestone) => (
          <li key={milestone.id} className="relative">
            <span
              aria-hidden
              className="absolute left-4 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full border border-accent/80 bg-canvas shadow-[0_0_18px_rgb(255_107_44_/_0.5)] md:left-6"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="pl-10 md:pl-16"
            >
              <article className="glass w-full rounded-[0.9rem] px-4 py-4 md:px-7 md:py-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg tracking-[-0.03em] text-foreground sm:text-xl md:text-2xl">
                      {milestone.role}
                    </h3>
                    <p className="mt-0.5 text-sm text-foreground-muted">{milestone.company}</p>
                  </div>
                  <div className="text-left text-[11px] uppercase tracking-[0.14em] text-accent-soft sm:text-right sm:tracking-[0.16em]">
                    <p>{milestone.period}</p>
                    {milestone.employmentType && (
                      <p className="mt-0.5 normal-case tracking-normal text-foreground-subtle">
                        {milestone.employmentType}
                      </p>
                    )}
                  </div>
                </div>

                {milestone.location && (
                  <p className="mt-1.5 text-xs text-foreground-subtle">{milestone.location}</p>
                )}

                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground-muted">
                  {milestone.summary}
                </p>

                <ul className="mt-3 grid gap-1.5 md:grid-cols-2">
                  {milestone.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-foreground-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {milestone.skills && milestone.skills.length > 0 && (
                  <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label="Skills">
                    {milestone.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] tracking-[0.04em] text-foreground-muted"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  )
}
