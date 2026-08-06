import { motion } from 'framer-motion'
import { SkillCard } from '@/components/skills/SkillCard'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { skillCategories, skills } from '@/data/skills'
import { fadeUp } from '@/lib/animations'

export function TechStack() {
  return (
    <section id="skills" aria-label="Tech Stack" className="relative content-auto py-14 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[45%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgb(255_107_44_/_0.07),transparent_65%)]"
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mb-8 max-w-2xl md:mb-10"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
            Tech Stack
          </p>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl"
          >
            Tools I build with
          </AnimatedHeading>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted md:text-base">
            A practical stack for modern front-end development — grouped by how I actually use it.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          {skillCategories.map((category) => {
            const items = skills.filter((skill) => skill.category === category)
            return (
              <div key={category}>
                <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
                  {category}
                </h3>
                <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:grid-cols-6">
                  {items.map((skill, index) => (
                    <SkillCard key={skill.id} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
