import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { GalleryItem } from '@/data/gallery'

type GalleryViewerProps = {
  items: GalleryItem[]
  activeId: string | null
  onClose: () => void
  onChange: (id: string) => void
}

export function GalleryViewer({
  items,
  activeId,
  onClose,
  onChange,
}: GalleryViewerProps) {
  const open = Boolean(activeId)
  const touchStartX = useRef<number | null>(null)

  const index = useMemo(
    () => items.findIndex((item) => item.id === activeId),
    [items, activeId],
  )
  const item = index >= 0 ? items[index] : null

  const go = useCallback(
    (direction: -1 | 1) => {
      if (!items.length || index < 0) return
      const next = (index + direction + items.length) % items.length
      onChange(items[next].id)
    },
    [items, index, onChange],
  )

  useEffect(() => {
    if (!open) return undefined
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, go])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="gallery-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Creative gallery viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/92"
          onClick={onClose}
        >
          <div
            className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-4 md:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <p className="text-sm font-medium text-white">{item.filter}</p>
              <p className="text-xs text-white/50">
                {index + 1} / {items.length}
                {item.client ? ` · ${item.client}` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/90 transition hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            aria-label="Previous item"
            onClick={(event) => {
              event.stopPropagation()
              go(-1)
            }}
            className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 md:inline-flex"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next item"
            onClick={(event) => {
              event.stopPropagation()
              go(1)
            }}
            className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 md:inline-flex"
          >
            →
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto flex max-h-[84dvh] w-[min(92vw,980px)] items-center justify-center px-2"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current == null) return
              const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current
              if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
              touchStartX.current = null
            }}
          >
            <div className="glass-strong overflow-hidden rounded-[1.4rem] p-2 md:p-3">
              {item.type === 'video' ? (
                <video
                  key={item.src}
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="max-h-[76dvh] w-auto max-w-full rounded-[1rem] object-contain"
                />
              ) : (
                <img
                  src={item.src}
                  alt=""
                  className="max-h-[76dvh] w-auto max-w-full rounded-[1rem] object-contain"
                />
              )}
            </div>
          </motion.div>

          <p className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-[10px] tracking-[0.18em] text-white/40 uppercase">
            Swipe or use arrows · Esc to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
