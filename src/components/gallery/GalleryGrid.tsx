import { AnimatePresence } from 'framer-motion'
import type { GalleryItem } from '@/data/gallery'
import { GalleryCard } from './GalleryCard'

type GalleryGridProps = {
  items: GalleryItem[]
  onOpen: (id: string) => void
}

export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onOpen={onOpen}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
