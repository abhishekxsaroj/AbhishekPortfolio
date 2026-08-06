import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import type { GalleryItem } from '@/data/gallery'
import { LazyImage } from '@/components/ui/LazyImage'
import { LazyVideo } from '@/components/ui/LazyVideo'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type GalleryCardProps = {
  item: GalleryItem
  index: number
  onOpen: (id: string) => void
}

function aspectClass(aspect: string) {
  switch (aspect) {
    case '9:16':
      return 'aspect-[9/16]'
    case '1:1':
      return 'aspect-square'
    case '16:9':
      return 'aspect-video'
    case '4:5':
    default:
      return 'aspect-[4/5]'
  }
}

function GalleryCardComponent({ item, index, onOpen }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index % 6, 4) * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onOpen(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`Open ${item.filter} piece${item.client ? ` for ${item.client}` : ''}`}
      className={cn(
        'group relative mb-3 break-inside-avoid overflow-hidden rounded-[1.1rem] border border-white/8 bg-white/[0.02] text-left transition-[transform,filter,border-color,box-shadow] duration-300 will-change-transform',
        'hover:-translate-y-1.5 hover:border-white/16 hover:brightness-110 focus-visible:-translate-y-1.5 focus-visible:brightness-110',
        !prefersReducedMotion && hovered && 'shadow-[0_18px_50px_rgb(0_0_0_/_0.35)]',
      )}
    >
      <div className={cn('relative w-full overflow-hidden', aspectClass(item.aspect))}>
        {item.type === 'video' ? (
          <LazyVideo src={item.src} active={hovered} />
        ) : (
          <LazyImage
            src={item.src}
            alt=""
            className={cn(
              'transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
              hovered && !prefersReducedMotion && 'scale-[1.04]',
            )}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/70">
            {item.filter}
          </span>
          {item.type === 'video' && (
            <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] tracking-[0.12em] text-white/80 backdrop-blur-sm">
              Video
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

export const GalleryCard = memo(GalleryCardComponent)
