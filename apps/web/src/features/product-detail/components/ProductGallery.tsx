'use client'

import { useState } from 'react'
import { ProductImage } from '@repo/ui'
import { cn } from '@repo/utils'

/** Large image + four selectable thumbnails. */
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  return (
    <div className="w-full lg:w-[600px]">
      <ProductImage src={images[active]!} alt={alt} fillX={0.58} fillY={0.42} className="h-[300px] sm:h-[500px]" />
      <div className="mt-3.5 grid grid-cols-4 gap-3.5">
        {images.map((src, i) => (
          <button key={i} type="button" aria-label={`Show image ${i + 1}`} aria-pressed={i === active} onClick={() => setActive(i)} className="block">
            <ProductImage src={src} alt="" fillX={0.6} fillY={0.5} className={cn('h-[110px] transition-colors', i === active && 'bg-brand-50')} />
          </button>
        ))}
      </div>
    </div>
  )
}
