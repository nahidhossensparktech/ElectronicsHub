import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

export interface ProductImageProps {
  src: string
  alt: string
  /** Max fraction of the box width / height the image may fill (0–1). */
  fillX?: number
  fillY?: number
  className?: string
  children?: ReactNode
}

/** Surface-colored box with a centered, contained product image. Overlays go in `children`. */
export function ProductImage({ src, alt, fillX = 0.62, fillY = 0.48, className, children }: ProductImageProps) {
  const insetX = `${((1 - fillX) / 2) * 100}%`
  const insetY = `${((1 - fillY) / 2) * 100}%`
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-surface', className)}>
      <div className="absolute" style={{ left: insetX, right: insetX, top: insetY, bottom: insetY }}>
        <Image unoptimized src={src} alt={alt} fill sizes="240px" className="object-contain" />
      </div>
      {children}
    </div>
  )
}
