import { motion } from 'framer-motion'
import { StatCounter } from '@/components/achievements/StatCounter'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { achievements } from '@/data/achievements'
import { fadeUp } from '@/lib/animations'

export function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements" className="relative content-auto py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mb-8 max-w-2xl md:mb-10"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
            Achievements
          </p>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl"
          >
            Proof in the numbers
          </AnimatedHeading>
        </motion.div>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
          {achievements.map((item) => (
            <StatCounter
              key={item.id}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
