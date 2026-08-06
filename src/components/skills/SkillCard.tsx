import { motion } from 'framer-motion'
import type { Skill } from '@/data/skills'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type SkillCardProps = {
  skill: Skill
  index: number
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index, 8) * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
      className={cn(
        'glass group rounded-[1rem] p-3.5 transition-[border-color] duration-300',
        'hover:border-accent/30',
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-display text-[10px] tracking-[-0.02em] text-accent-soft">
        {skill.icon}
      </div>
      <h3 className="mt-3 font-display text-sm tracking-[-0.02em] text-foreground md:text-base">
        {skill.title}
      </h3>
      <p className="mt-1.5 text-[11px] leading-relaxed text-foreground-muted md:text-xs">
        {skill.description}
      </p>
    </motion.article>
  )
}
