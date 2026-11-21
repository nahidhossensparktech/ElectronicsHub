import type { Shop } from '@repo/types'
import { Avatar, LinkButton, ShopName } from '@repo/ui'
import { formatNumber } from '@repo/utils'

/** Compact shop identity bar for sub-pages (shop products). */
export function ShopMiniHeader({ shop }: { shop: Shop }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <Avatar initials={shop.initials} color={shop.color} size="lg" />
      <div className="flex-1">
        <ShopName name={shop.name} iconSize={16} className="font-display text-2xl font-bold text-ink" />
        <p className="mt-1 text-sm text-muted">
          {shop.location} · {formatNumber(shop.productCount)} products · {shop.rating} ★
        </p>
      </div>
      <LinkButton href={`/shops/${shop.slug}`} variant="white" size="lg">Back to shop</LinkButton>
      <LinkButton href={`/account/messages?shop=${shop.slug}`} size="lg">Contact Seller</LinkButton>
    </div>
  )
}
