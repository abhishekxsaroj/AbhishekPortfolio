import galleryJson from './gallery.json'

export type GalleryFilter = 'All' | 'Graphics' | 'Videos' | 'Social Media' | 'Branding'

export type GalleryItem = {
  id: string
  type: 'image' | 'video'
  src: string
  filter: Exclude<GalleryFilter, 'All'>
  client: string
  aspect: string
  width: number
  height: number
}

export const galleryFilters: GalleryFilter[] = [
  'All',
  'Graphics',
  'Videos',
  'Social Media',
  'Branding',
]

export const galleryItems = galleryJson as GalleryItem[]

export function filterGalleryItems(
  items: GalleryItem[],
  filter: GalleryFilter,
) {
  if (filter === 'All') return items
  return items.filter((item) => item.filter === filter)
}
