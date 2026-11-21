'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@repo/utils'

export interface WishlistButtonProps {
  /** Controlled state; omit to let the button manage itself. */
  active?: boolean
  defaultActive?: boolean
  onToggle?: () => void
  className?: string
}

/** Round white heart toggle placed on product images. */
export function WishlistButton({ active, defaultActive = false, onToggle, className }: WishlistButtonProps) {
  const [local, setLocal] = useState(defaultActive)
  const isActive = active ?? local
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={isActive ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={() => (onToggle ? onToggle() : setLocal(!local))}
      className={cn(
        'relative z-10 inline-flex size-[34px] items-center justify-center rounded-full bg-white text-ink transition-colors hover:text-danger',
        className,
      )}
    >
      <Heart className={cn('size-4', isActive && 'fill-danger text-danger')} strokeWidth={1.75} />
    </button>
  )
}
