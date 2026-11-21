import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'

/** Chip that navigates (URL-driven filters). */
export function ChipLink({ active, className, ...props }: ComponentProps<typeof Link> & { active?: boolean }) {
  return (
    <Link
      aria-current={active ? 'true' : undefined}
      className={cn(
        'inline-flex h-[38px] shrink-0 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors',
        active ? 'bg-ink font-semibold text-white' : 'bg-surface text-ink hover:bg-line',
        className,
      )}
      {...props}
    />
  )
}
