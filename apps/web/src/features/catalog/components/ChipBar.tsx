import { ChipLink } from '@repo/ui'
import { cn } from '@repo/utils'

export interface ChipItem {
  label: string
  href: string
  active: boolean
}

/** Horizontal row of navigating filter chips. */
export function ChipBar({ items, className }: { items: ChipItem[]; className?: string }) {
  return (
    <div className={cn('flex gap-2.5 overflow-x-auto', className)}>
      {items.map((item) => (
        <ChipLink key={item.label} href={item.href} active={item.active} scroll={false}>
          {item.label}
        </ChipLink>
      ))}
    </div>
  )
}
