import { motion } from 'framer-motion'
import { PROFILE_SRC } from '@/data/storyScenes'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type PortraitCardProps = {
  onOpenStory: () => void
  className?: string
}

export function PortraitCard({ onOpenStory, className }: PortraitCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative w-full max-w-[320px]', className)}
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -10, 0],
                rotate: [-1.2, 1.2, -1.2],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="glass-strong relative overflow-hidden rounded-[1.75rem] p-6 md:p-7"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-[#bc1888]/15 blur-3xl"
        />

        <div className="relative flex flex-col items-center text-center">
          <button
            type="button"
            onClick={onOpenStory}
            aria-label="Open cinematic story"
            className="story-ring h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44"
          >
            <div className="story-ring-inner h-full w-full">
              <img
                src={PROFILE_SRC}
                alt="Abhishek portrait"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </button>

          <p className="mt-6 font-display text-xl tracking-[-0.03em] text-foreground">
            Abhishek
          </p>
          <p className="mt-2 text-sm text-foreground-muted">Tap to enter the story</p>

          <button
            type="button"
            onClick={onOpenStory}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground-muted transition hover:border-accent/40 hover:text-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Watch story
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
