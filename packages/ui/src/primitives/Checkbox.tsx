import { Check } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@repo/utils'

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: ReactNode
  /** Right-aligned meta, e.g. a result count. */
  meta?: ReactNode
}

/** 20px rounded checkbox with optional label and trailing meta. */
export function Checkbox({ label, meta, className, ...props }: CheckboxProps) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-2.5 text-sm text-ink', className)}>
      <span className="relative inline-flex size-5 shrink-0">
        <input type="checkbox" className="peer size-5 appearance-none rounded-md bg-line checked:bg-brand" {...props} />
        <Check
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto size-3 text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label ? <span className="flex-1">{label}</span> : null}
      {meta ? <span className="text-xs text-subtle">{meta}</span> : null}
    </label>
  )
}
