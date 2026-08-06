import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type LazyVideoProps = {
  src: string
  className?: string
  active?: boolean
}

/** Loads video source only when near viewport; plays on demand. */
export function LazyVideo({ src, className, active = false }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const node = videoRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || ready) return
        node.src = src
        node.load()
        setReady(true)
        observer.disconnect()
      },
      { rootMargin: '240px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [src, ready])

  useEffect(() => {
    const node = videoRef.current
    if (!node || !ready) return

    if (active) {
      void node.play().catch(() => undefined)
    } else {
      node.pause()
      node.currentTime = 0
    }
  }, [active, ready])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
