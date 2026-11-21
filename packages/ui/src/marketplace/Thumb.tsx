import Image from 'next/image'
import { cn } from '@repo/utils'

/** Square product thumbnail (cart rows, orders, chat context). */
export function Thumb({ src, alt, size = 48, className }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className={cn('relative inline-flex shrink-0 rounded-[10px] bg-surface', className)} style={{ width: size, height: size }}>
      <span className="absolute inset-[18%]">
        <Image unoptimized src={src} alt={alt} fill sizes={`${size}px`} className="object-contain" />
      </span>
    </span>
  )
}
