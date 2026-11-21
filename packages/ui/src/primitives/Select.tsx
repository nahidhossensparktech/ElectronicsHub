import type { VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'
import { fieldVariants } from './fieldStyles'

export interface SelectProps
  extends Omit<ComponentProps<'select'>, 'size'>,
    VariantProps<typeof fieldVariants> {
  options: string[]
}

/** Native select with the shared field look and a chevron. */
export function Select({ className, tone, size, options, ...props }: SelectProps) {
  return (
    <div className={cn('relative', className)}>
      <select className={cn(fieldVariants({ tone, size }), 'appearance-none pr-9')} {...props}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" />
    </div>
  )
}
