import { motion } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrollProgress'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type ScrollIndicatorProps = {
  className?: string
  label?: string
  href?: string
}

export function ScrollIndicator({
  className,
  label = 'Scroll',
  href = '#work',
}: ScrollIndicatorProps) {
  const scrolled = useScrolled(80)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.a
      href={href}
      aria-label={`${label} to continue`}
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: scrolled ? 0 : 1,
        y: scrolled ? 8 : 0,
        pointerEvents: scrolled ? 'none' : 'auto',
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'inline-flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-foreground-subtle',
        className,
      )}
      onClick={(event) => {
        event.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <span>{label}</span>
      <span className="relative flex h-10 w-5 items-start justify-center rounded-full border border-border pt-2">
        <motion.span
          className="block h-1.5 w-1 rounded-full bg-accent"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 12, 0],
                  opacity: [0.4, 1, 0.4],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </span>
    </motion.a>
  )
}
