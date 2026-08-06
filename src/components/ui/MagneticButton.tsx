import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  useRef,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  strength?: number
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  'aria-label'?: string
}

const variantStyles = {
  primary:
    'bg-accent text-canvas hover:bg-accent-soft shadow-[0_0_0_1px_rgb(255_107_44_/_0.35),0_12px_40px_rgb(255_107_44_/_0.22)]',
  secondary:
    'glass text-foreground hover:bg-white/[0.06]',
  ghost:
    'bg-transparent text-foreground-muted hover:text-foreground hover:bg-white/[0.03]',
}

export function MagneticButton({
  children,
  className,
  variant = 'primary',
  strength = 0.35,
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-[-0.01em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
