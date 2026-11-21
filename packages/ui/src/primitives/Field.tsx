import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

export interface FieldProps {
  label: string
  htmlFor?: string
  children: ReactNode
  className?: string
}

/** Label + control stack used by every form. */
export function Field({ label, htmlFor, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-xs font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  )
}
