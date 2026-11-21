import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'

/** 20px radio dot. */
export function Radio({ className, ...props }: Omit<ComponentProps<'input'>, 'type'>) {
  return (
    <input
      type="radio"
      className={cn(
        'size-5 shrink-0 cursor-pointer appearance-none rounded-full bg-line checked:border-[6px] checked:border-brand checked:bg-white',
        className,
      )}
      {...props}
    />
  )
}
