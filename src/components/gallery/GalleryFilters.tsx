import type { GalleryFilter } from '@/data/gallery'
import { galleryFilters } from '@/data/gallery'
import { cn } from '@/lib/utils'

type GalleryFiltersProps = {
  active: GalleryFilter
  onChange: (filter: GalleryFilter) => void
}

export function GalleryFilters({ active, onChange }: GalleryFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Gallery filters"
      className="flex flex-wrap gap-2"
    >
      {galleryFilters.map((filter) => {
        const isActive = filter === active
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              'rounded-full px-3.5 py-2 text-xs tracking-[0.06em] transition-colors duration-300',
              isActive
                ? 'bg-white text-canvas'
                : 'border border-white/10 text-foreground-muted hover:border-white/20 hover:text-foreground',
            )}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}
