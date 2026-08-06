import { useState } from 'react'
import { cn } from '@/lib/utils'

type LazyImageProps = {
  src: string
  alt?: string
  className?: string
  wrapperClassName?: string
  sizes?: string
}

export function LazyImage({
  src,
  alt = '',
  className,
  wrapperClassName,
  sizes,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-white/[0.03]', wrapperClassName)}>
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] via-accent/5 to-transparent transition-opacity duration-500',
          loaded && 'opacity-0',
        )}
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-[1.02]',
          className,
        )}
      />
    </div>
  )
}
