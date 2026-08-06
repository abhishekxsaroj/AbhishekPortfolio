import { motion } from 'framer-motion'
import type { ProjectAccent as AccentKind } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ProjectAccentProps = {
  kind: AccentKind
  color: string
}

export function ProjectAccent({ kind, color }: ProjectAccentProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${color}33, transparent 45%)`,
        }}
      />
    )
  }

  switch (kind) {
    case 'ring':
      return (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[18%] h-40 w-40 rounded-full border md:h-56 md:w-56"
          style={{ borderColor: `${color}66` }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-4 rounded-full border"
            style={{ borderColor: `${color}44` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )
    case 'shimmer':
      return (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-[12%] top-[22%] h-px overflow-hidden md:top-[18%]"
        >
          <motion.div
            className="h-full w-1/3"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
            animate={{ x: ['-120%', '320%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )
    case 'reel':
      return (
        <div aria-hidden className="pointer-events-none absolute right-[6%] top-[20%] flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-16 w-3 rounded-full md:h-24"
              style={{ backgroundColor: `${color}55` }}
              animate={{ y: [0, -12, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{
                duration: 2.2,
                delay: index * 0.18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )
    case 'wave':
      return (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[18%] left-[10%] h-24 w-[55%] rounded-full blur-2xl md:h-32"
          style={{ backgroundColor: `${color}33` }}
          animate={{ x: [0, 40, 0], scaleX: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      )
    case 'orbit':
      return (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[12%] top-[24%] h-28 w-28 md:h-36 md:w-36"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          <span
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 18px ${color}` }}
          />
          <span
            className="absolute inset-0 rounded-full border border-dashed opacity-40"
            style={{ borderColor: color }}
          />
        </motion.div>
      )
    case 'pulse':
      return (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[10%] top-[22%] h-32 w-32 rounded-full md:h-44 md:w-44"
          style={{
            background: `radial-gradient(circle, ${color}55, transparent 70%)`,
          }}
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )
    default:
      return null
  }
}
