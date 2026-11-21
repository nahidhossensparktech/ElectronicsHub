import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'

export interface ChipProps extends ComponentProps<'button'> {
  active?: boolean
  size?: 'sm' | 'md'
}

/** Rounded filter pill. Active = ink background. */
export function Chip({ active, size = 'md', className, type = 'button', ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors',
        size === 'md' ? 'h-[38px]' : 'h-9',
        active ? 'bg-ink font-semibold text-white' : 'bg-surface text-ink hover:bg-line',
        className,
      )}
      {...props}
    />
  )
}
