import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

const tone = {
  brand: 'bg-brand-50 text-brand',
  success: 'bg-success-50 text-success',
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-danger-50 text-danger',
  neutral: 'bg-surface text-muted',
} as const

export type PillTone = keyof typeof tone

export interface StatusPillProps {
  tone?: PillTone
  dot?: boolean
  children: ReactNode
  className?: string
}

/** Small rounded label with an optional leading dot ("Shipped", "Verified seller"). */
export function StatusPill({ tone: t = 'brand', dot = true, children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold whitespace-nowrap',
        tone[t],
        className,
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  )
}
