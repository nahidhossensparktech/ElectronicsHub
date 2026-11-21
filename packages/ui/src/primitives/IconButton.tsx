import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@repo/utils'
import { CountBadge } from './CountBadge'

export interface IconButtonProps extends ComponentProps<'button'> {
  label: string
  icon: ReactNode
  count?: number
  size?: 'sm' | 'md'
}

/** Square surface-colored icon button (header actions), with an optional count bubble. */
export function IconButton({ label, icon, count, size = 'md', className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl bg-surface text-ink transition-colors hover:bg-line',
        size === 'md' ? 'size-[46px]' : 'size-9',
        className,
      )}
      {...props}
    >
      {icon}
      {count ? <CountBadge count={count} className="absolute -top-1 -right-2" /> : null}
    </button>
  )
}
