import { cn } from '@repo/utils'

/** Small round brand bubble with a number (cart count, unread messages). */
export function CountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[11px] leading-none font-semibold text-white',
        className,
      )}
    >
      {count}
    </span>
  )
}
