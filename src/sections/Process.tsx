import { motion } from 'framer-motion'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { processSteps } from '@/data/process'
import { fadeUp } from '@/lib/animations'

export function Process() {
  return (
    <section id="process" aria-label="How I Build" className="relative content-auto py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mb-8 max-w-2xl md:mb-10"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
            Development Process
          </p>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl"
          >
            How I Build
          </AnimatedHeading>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted md:text-base">
            A clear workflow from problem framing to production.
          </p>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-4 md:gap-4">
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass glass-reflect h-full rounded-[1.35rem] p-5 md:p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                  0{index + 1}
                </p>
                <h3 className="mt-5 font-display text-2xl tracking-[-0.03em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {step.detail}
                </p>
              </motion.article>

              {index < processSteps.length - 1 && (
                <motion.div
                  aria-hidden
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute top-1/2 right-[-0.65rem] z-10 hidden origin-left text-accent/70 md:block"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
