import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'
import { fieldVariants } from './fieldStyles'

export interface TextareaProps
  extends ComponentProps<'textarea'>,
    Pick<VariantProps<typeof fieldVariants>, 'tone'> {}

export function Textarea({ className, tone, rows = 5, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(fieldVariants({ tone }), 'h-auto resize-none py-3', className)}
      {...props}
    />
  )
}
