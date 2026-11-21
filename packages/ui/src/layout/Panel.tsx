import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'

/** Rounded canvas-colored card used for most content blocks. */
export function Panel({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('rounded-2xl bg-canvas', className)} {...props} />
}

/** Panel title (20px). */
export function PanelTitle({ className, ...props }: ComponentProps<'h2'>) {
  return <h2 className={cn('font-display text-xl leading-7 font-bold text-ink', className)} {...props} />
}
