import Link from 'next/link'
import { cn, formatNumber } from '@repo/utils'

export interface ShopCategoryLink {
  label: string
  count: number
  href: string
  active: boolean
}

/** White card listing the shop's categories with counts. */
export function ShopCategoryNav({ categories }: { categories: ShopCategoryLink[] }) {
  return (
    <nav className="rounded-2xl bg-white p-4">
      <h2 className="px-2 pt-1 text-base font-semibold text-ink">Shop categories</h2>
      <ul className="mt-3 space-y-0.5">
        {categories.map((c) => (
          <li key={c.label}>
            <Link href={c.href} scroll={false} className={cn('flex h-10 items-center justify-between rounded-[10px] px-2.5 text-sm', c.active ? 'bg-brand font-semibold text-white' : 'font-semibold text-ink hover:bg-canvas')}>
              {c.label}
              <span className={cn('text-xs', c.active ? 'text-brand-100' : 'text-subtle')}>{formatNumber(c.count)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
