import { motion } from 'framer-motion'
import { CodePlayground } from '@/components/playground/CodePlayground'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { fadeUp } from '@/lib/animations'

export function Playground() {
  return (
    <section
      id="playground"
      aria-label="Code Playground"
      data-no-custom-cursor
      className="relative content-auto py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
              Playground
            </p>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-4xl"
            >
              Code it. See it live.
            </AnimatedHeading>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Pick a starter, edit HTML, CSS, or JavaScript, and watch the live preview update —
              12 ready-made experiments included.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <CodePlayground />
        </motion.div>
      </div>
    </section>
  )
}
