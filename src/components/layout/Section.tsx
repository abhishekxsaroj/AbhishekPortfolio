import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  animate?: boolean
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  animate = true,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={animate ? staggerContainer : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={animate ? viewportOnce : undefined}
      className={cn('relative py-14 md:py-20', className)}
    >
      <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', containerClassName)}>
        {(eyebrow || title || description) && (
          <header className="mb-8 max-w-2xl md:mb-10">
            {eyebrow && (
              <motion.p
                variants={animate ? fadeUp : undefined}
                className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft"
              >
                {eyebrow}
              </motion.p>
            )}
            {title && <div>{title}</div>}
            {description && (
              <motion.p
                variants={animate ? fadeUp : undefined}
                className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg"
              >
                {description}
              </motion.p>
            )}
          </header>
        )}
        {children}
      </div>
    </motion.section>
  )
}
