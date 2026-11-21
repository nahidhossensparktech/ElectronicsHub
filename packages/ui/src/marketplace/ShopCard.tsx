import { ChevronRight, MapPin, Package, Star } from 'lucide-react'
import Link from 'next/link'
import type { Shop } from '@repo/types'
import { cn, formatNumber } from '@repo/utils'
import { Avatar } from '../primitives/Avatar'
import { ShopName } from './ShopName'

/** Shop directory tile: avatar, name, location, blurb, stats and Visit Shop. */
export function ShopCard({ shop, className }: { shop: Shop; className?: string }) {
  return (
    <article className={cn('flex flex-col rounded-2xl bg-canvas p-5', className)}>
      <div className="flex items-center gap-3">
        <Avatar initials={shop.initials} color={shop.color} size="lg" />
        <div className="min-w-0">
          <ShopName name={shop.name} verified={shop.verified} iconSize={14} className="text-base font-semibold text-ink" />
          <p className="mt-1 flex items-center gap-1 text-[13px] text-muted">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{shop.location}</span>
          </p>
        </div>
      </div>
      <p className="mt-4 truncate text-[13px] text-muted">{shop.description}</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-ink">
        <span className="inline-flex items-center gap-1.5">
          <Package className="size-3.5 text-muted" />
          {formatNumber(shop.productCount)} products
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Star className="size-3.5 fill-warning text-warning" />
          {shop.rating} ({shop.reviewCount})
        </span>
      </div>
      <Link
        href={`/shops/${shop.slug}`}
        className="mt-4 inline-flex h-10 items-center justify-center gap-1 rounded-[10px] bg-white text-sm font-semibold text-brand transition-colors hover:bg-brand-50"
      >
        Visit Shop
        <ChevronRight className="size-4" />
      </Link>
    </article>
  )
}
