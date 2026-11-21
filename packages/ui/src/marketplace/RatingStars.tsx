import { Star } from 'lucide-react'
import { cn } from '@repo/utils'

/** Five amber stars, filled up to `value` (rounded). */
export function RatingStars({
  value,
  size = 14,
  filled: solid = false,
  className,
}: {
  value: number
  size?: number
  /** Solid stars (reviews) vs outline stars (product summary). */
  filled?: boolean
  className?: string
}) {
  const filled = Math.round(value)
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={cn(i < filled ? 'text-warning' : 'text-line-strong', solid && i < filled && 'fill-warning')}
          strokeWidth={1.75}
        />
      ))}
    </span>
  )
}
