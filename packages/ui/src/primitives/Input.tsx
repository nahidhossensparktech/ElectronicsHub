import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@repo/utils'
import { fieldVariants } from './fieldStyles'

export interface InputProps
  extends Omit<ComponentProps<'input'>, 'size'>,
    VariantProps<typeof fieldVariants> {
  icon?: ReactNode
}

/** Text input; pass `icon` for a leading icon (search, mail). */
export function Input({ className, tone, size, icon, ...props }: InputProps) {
  if (!icon) return <input className={cn(fieldVariants({ tone, size }), className)} {...props} />
  return (
    <div className={cn('relative', className)}>
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle [&_svg]:size-4">
        {icon}
      </span>
      <input className={cn(fieldVariants({ tone, size }), 'pl-10')} {...props} />
    </div>
  )
}
