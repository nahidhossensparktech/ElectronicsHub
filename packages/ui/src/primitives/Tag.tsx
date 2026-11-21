import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

/** Square-ish small label (product badges, "Microcontrollers" category tag). */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-md bg-brand-50 px-2 text-xs font-semibold text-brand',
        className,
      )}
    >
      {children}
    </span>
  )
}
