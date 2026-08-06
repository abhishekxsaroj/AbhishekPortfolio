import { motion } from 'framer-motion'
import { Timeline } from '@/components/experience/Timeline'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { fadeUp } from '@/lib/animations'

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="relative content-auto py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
            Experience
          </p>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl"
          >
            Career timeline
          </AnimatedHeading>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted md:text-base">
            From teaching and SEO to shipping websites — and now operations at Amazon in Dubai.
          </p>
        </motion.div>

        <Timeline />
      </div>
    </section>
  )
}
