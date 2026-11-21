import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'

/** Centered 1280px page container with 16px mobile gutters. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1312px] px-4', className)} {...props} />
}
