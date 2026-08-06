import { motion } from 'framer-motion'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { fadeUp, staggerContainer } from '@/lib/animations'

const points = [
  'IT background with hands-on website development experience.',
  'Build responsive business websites and modern front-end interfaces.',
  'Work daily with React, JavaScript, Firebase, and current frontend tooling.',
  'Currently based in Dubai as a Logistics Associate at Amazon, while continuing to ship digital work.',
  'Focused on digital experiences that are fast, clear, and memorable.',
  'Always learning — sharpening both engineering craft and product taste.',
]

export function About() {
  return (
    <section id="about" aria-label="About" className="relative content-auto py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid items-start gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12"
        >
          <motion.div variants={fadeUp}>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
              About
            </p>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl"
            >
              Web developer with a systems mind and a design eye.
            </AnimatedHeading>
          </motion.div>

          <motion.ul variants={fadeUp} className="grid gap-2.5 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point}
                className="glass rounded-[1rem] px-4 py-3.5 text-sm leading-relaxed text-foreground-muted"
              >
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
