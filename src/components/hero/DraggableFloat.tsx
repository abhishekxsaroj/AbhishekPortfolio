import { animate, motion, useMotionValue } from 'framer-motion'
import { useState, type CSSProperties, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type DraggableFloatProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  label?: string
  floatAmplitude?: number
  floatDuration?: number
  floatDelay?: number
  absolute?: boolean
  dropIn?: boolean
  dropDelay?: number
  dropDistance?: number
  restOpacity?: number
  active?: boolean
}

export function DraggableFloat({
  children,
  className,
  style,
  label,
  floatAmplitude = 0,
  floatDuration = 6,
  floatDelay = 0,
  absolute = false,
  dropIn = false,
  dropDelay = 0,
  dropDistance = 72,
  restOpacity = 1,
  active = true,
}: DraggableFloatProps) {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [dragging, setDragging] = useState(false)
  const [landed, setLanded] = useState(!dropIn || prefersReducedMotion)

  const springHome = () => {
    animate(x, 0, { type: 'spring', stiffness: 11, damping: 24, mass: 1.55 })
    animate(y, 0, { type: 'spring', stiffness: 11, damping: 24, mass: 1.55 })
  }

  const shouldDrop = dropIn && !prefersReducedMotion
  const waiting = shouldDrop && !active
  const dropping = shouldDrop && active && !landed
  const floating =
    landed && !dragging && !prefersReducedMotion && floatAmplitude > 0

  return (
    <motion.div
      className={cn(absolute ? 'absolute' : 'relative inline-block', className)}
      style={style}
      initial={
        shouldDrop
          ? { y: -dropDistance, opacity: 0 }
          : { y: 0, opacity: restOpacity }
      }
      animate={
        waiting
          ? { y: -dropDistance, opacity: 0 }
          : dropping
            ? { y: 0, opacity: restOpacity }
            : floating
              ? {
                  y: [0, -floatAmplitude, 0, floatAmplitude * 0.4, 0],
                  opacity: restOpacity,
                }
              : { y: 0, opacity: restOpacity }
      }
      transition={
        waiting
          ? { duration: 0 }
          : dropping
            ? {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: dropDelay,
              }
            : floating
              ? {
                  y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatDelay,
                  },
                  opacity: { duration: 0.2 },
                }
              : { duration: 0.25 }
      }
      onAnimationComplete={() => {
        if (shouldDrop && active) setLanded(true)
      }}
    >
      <motion.div
        role={label ? 'img' : undefined}
        aria-label={label ? `${label} — drag me` : undefined}
        title={label ? `Drag ${label}` : 'Drag me'}
        drag
        dragMomentum={false}
        dragElastic={0.12}
        style={{ x, y }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false)
          springHome()
        }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
        whileDrag={{ scale: 1.05, zIndex: 80, cursor: 'grabbing' }}
        className="h-full w-full touch-none select-none cursor-grab will-change-transform active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
