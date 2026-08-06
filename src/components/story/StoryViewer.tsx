import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PROFILE_SRC, storyScenes } from '@/data/storyScenes'
import { StoryProgress } from './StoryProgress'
import {
  SceneCreativity,
  SceneIntro,
  SceneJourney,
  SceneOutro,
  SceneProjects,
  SceneVision,
  SceneWeb,
} from './StoryScenes'

const SCENE_MAP = {
  intro: SceneIntro,
  creativity: SceneCreativity,
  web: SceneWeb,
  projects: SceneProjects,
  journey: SceneJourney,
  vision: SceneVision,
  outro: SceneOutro,
} as const

type StoryViewerProps = {
  open: boolean
  onClose: () => void
}

export function StoryViewer({ open, onClose }: StoryViewerProps) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [holding, setHolding] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(0)
  const elapsedRef = useRef(0)
  const indexRef = useRef(0)
  const holdStarted = useRef(0)
  const skipClick = useRef(false)

  const scene = storyScenes[index]
  const SceneComponent = SCENE_MAP[scene?.type] ?? SceneIntro
  const isPaused = paused || holding

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const goTo = useCallback((nextIndex: number) => {
    const clamped = Math.max(0, Math.min(storyScenes.length - 1, nextIndex))
    setIndex(clamped)
    elapsedRef.current = 0
    startRef.current = performance.now()
    setProgress(0)
    setPaused(false)
  }, [])

  const goNext = useCallback(() => {
    const i = indexRef.current
    if (i >= storyScenes.length - 1) {
      setProgress(1)
      setPaused(true)
      return
    }
    goTo(i + 1)
  }, [goTo])

  const goPrev = useCallback(() => {
    const i = indexRef.current
    if (elapsedRef.current > storyScenes[i].duration * 0.2 || i === 0) {
      elapsedRef.current = 0
      startRef.current = performance.now()
      setProgress(0)
      return
    }
    goTo(i - 1)
  }, [goTo])

  const handleExplore = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined

    setIndex(0)
    setPaused(false)
    setHolding(false)
    elapsedRef.current = 0
    startRef.current = performance.now()
    setProgress(0)
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [open])

  useEffect(() => {
    if (!open || !scene) return undefined

    let cancelled = false
    const tick = (now: number) => {
      if (cancelled) return

      if (isPaused) {
        startRef.current = now - elapsedRef.current
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      elapsedRef.current = now - startRef.current
      const pct = Math.min(1, elapsedRef.current / scene.duration)
      setProgress(pct)

      if (pct >= 1) {
        if (scene.pauseAtEnd) {
          setPaused(true)
          setProgress(1)
          return
        }
        goNext()
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    startRef.current = performance.now() - elapsedRef.current
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [open, scene, index, isPaused, goNext])

  useEffect(() => {
    if (!open) return undefined

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        setPaused((value) => !value)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, goNext, goPrev])

  const onTap = (clientX: number, target: EventTarget | null) => {
    if (!(target instanceof Element)) return
    if (skipClick.current) {
      skipClick.current = false
      return
    }
    if (target.closest('[data-story-ui]')) return
    const stage = target.closest('[data-story-stage]')
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const x = clientX - rect.left
    if (x < rect.width * 0.35) goPrev()
    else goNext()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && scene && (
        <motion.div
          key="story-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`story-overlay fixed inset-0 z-[80] flex max-w-[100vw] items-center justify-center bg-black/95 ${
            isPaused ? 'story-paused' : ''
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Cinematic intro story"
        >
          <motion.div
            data-story-stage
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-dvh w-full max-w-lg flex-col overflow-hidden bg-black shadow-2xl sm:max-h-[92dvh] sm:rounded-2xl md:max-w-md"
            onPointerDown={(event) => {
              if ((event.target as Element).closest('[data-story-ui]')) return
              holdStarted.current = Date.now()
              setHolding(true)
            }}
            onPointerUp={() => {
              if (Date.now() - holdStarted.current > 220) skipClick.current = true
              setHolding(false)
            }}
            onPointerCancel={() => {
              skipClick.current = true
              setHolding(false)
            }}
            onPointerLeave={() => setHolding(false)}
            onClick={(event) => onTap(event.clientX, event.target)}
          >
            <div
              data-story-ui
              className="absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/55 to-transparent pb-4"
            >
              <StoryProgress
                scenes={storyScenes}
                index={index}
                progress={progress}
                paused={isPaused}
              />
              <div className="flex items-center gap-2 px-3 py-2.5">
                <img
                  src={PROFILE_SRC}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-white/30"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">Abhishek</p>
                  <p className="text-[10px] text-white/55">
                    {scene.label} · {index + 1}/{storyScenes.length}
                    {isPaused ? ' · Paused' : ''}
                  </p>
                </div>
                <button
                  type="button"
                  data-story-ui
                  onClick={(event) => {
                    event.stopPropagation()
                    setPaused((value) => !value)
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
                  aria-label={isPaused ? 'Resume story' : 'Pause story'}
                >
                  {isPaused ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  data-story-ui
                  onClick={(event) => {
                    event.stopPropagation()
                    onClose()
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
                  aria-label="Close story"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1">
              <SceneComponent key={scene.id} onExplore={handleExplore} />
            </div>

            <div
              data-story-ui
              className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center"
            >
              <p className="rounded-full bg-black/35 px-3 py-1 text-[10px] tracking-wide text-white/45 backdrop-blur-sm">
                Tap sides · hold to pause · space · ← →
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
