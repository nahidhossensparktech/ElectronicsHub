import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@repo/utils'

export interface Subcategory {
  label: string
  icon: string
  href: string
  active?: boolean
}

/** Row of small sub-category cards. */
export function SubcategoryList({ items }: { items: Subcategory[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {items.map((item) => (
        <Link key={item.label} href={item.href} scroll={false} className={cn('flex h-[54px] items-center gap-2.5 rounded-xl px-4 text-sm font-semibold text-ink hover:bg-brand-50', item.active ? 'bg-brand-50 ring-1 ring-brand-200' : 'bg-canvas')}>
          <span className="relative h-5 w-7 shrink-0">
            <Image unoptimized src={item.icon} alt="" fill className="object-contain" />
          </span>
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
