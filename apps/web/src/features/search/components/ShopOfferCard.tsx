import Link from 'next/link'
import type { Shop } from '@repo/types'
import { Avatar, ShopName } from '@repo/ui'
import { formatBDT } from '@repo/utils'

/** Compact shop row with the shop's price for the searched item. */
export function ShopOfferCard({ shop, price }: { shop: Shop; price: number }) {
  return (
    <Link href={`/shops/${shop.slug}`} className="flex items-center gap-3 rounded-2xl bg-canvas p-3.5 hover:bg-brand-50">
      <Avatar initials={shop.initials} color={shop.color} size="md" />
      <span className="min-w-0 flex-1">
        <ShopName name={shop.name} className="text-sm font-semibold text-ink" />
        <span className="block truncate text-xs text-muted">{shop.location}</span>
      </span>
      <span className="font-display text-base font-bold text-brand">{formatBDT(price)}</span>
    </Link>
  )
}
