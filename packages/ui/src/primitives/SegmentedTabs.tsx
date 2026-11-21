'use client'

import { cn } from '@repo/utils'

export interface SegmentedTabsProps {
  items: { value: string; label: string }[]
  value: string
  onChange?: (value: string) => void
  className?: string
}

/** Surface track with a white active pill (order filters, notification filters, product tabs). */
export function SegmentedTabs({ items, value, onChange, className }: SegmentedTabsProps) {
  return (
    <div role="tablist" className={cn('inline-flex rounded-xl bg-surface p-1', className)}>
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange?.(item.value)}
            className={cn(
              'h-9 rounded-[10px] px-4 text-sm font-medium whitespace-nowrap transition-colors',
              active ? 'bg-white font-semibold text-ink shadow-card' : 'text-muted hover:text-ink',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
