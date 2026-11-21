import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Product, ProductBadge } from '@repo/types'
import { cn } from '@repo/utils'
import { Price } from './Price'
import { ProductImage } from './ProductImage'
import { ShopName } from './ShopName'
import { StockText } from './StockText'
import { WishlistButton } from './WishlistButton'

function badgeLabel(badge: ProductBadge): string {
  if (typeof badge === 'object') return `${badge.discountPercent}% OFF`
  return { wholesale: 'Wholesale', new: 'New', 'best-seller': '#1 Best seller' }[badge]
}

export interface ProductCardProps {
  product: Product
  /** Replaces the default (inert) Add to Cart button. */
  action?: ReactNode
  /** Replaces the default (uncontrolled) wishlist heart. */
  wishlist?: ReactNode
  layout?: 'grid' | 'list'
  className?: string
}

function DefaultAction() {
  return (
    <button
      type="button"
      className="inline-flex h-[34px] w-full items-center justify-center gap-1.5 rounded-[10px] bg-brand-50 text-[13px] font-semibold text-brand transition-colors hover:bg-brand-100"
    >
      <Plus className="size-3.5" strokeWidth={2.25} />
      Add to Cart
    </button>
  )
}

/** Marketplace product tile: image, shop, title, spec, price/stock and Add to Cart. */
export function ProductCard({ product, action, wishlist, layout = 'grid', className }: ProductCardProps) {
  const href = `/products/${product.slug}`
  const list = layout === 'list'
  return (
    <article className={cn(list ? 'flex gap-5 rounded-2xl bg-canvas p-3' : 'flex flex-col', className)}>
      <ProductImage src={product.image} alt={product.name} className={list ? 'size-[150px] shrink-0 bg-white' : 'aspect-[240/232]'}>
        {product.badge ? (
          <span className="absolute top-2.5 left-2.5 inline-flex h-6 items-center rounded-md bg-white px-2 text-xs font-semibold text-brand">
            {badgeLabel(product.badge)}
          </span>
        ) : null}
        <Link href={href} aria-label={product.name} className="absolute inset-0" tabIndex={-1} />
        <div className="absolute top-2.5 right-2.5">{wishlist ?? <WishlistButton />}</div>
      </ProductImage>

      <div className={cn('flex flex-1 flex-col px-0.5', list && 'justify-center py-1')}>
        <ShopName name={product.shop.name} verified={product.shop.verified} className={cn('text-xs text-muted', !list && 'mt-3')} />
        <h3 className="mt-1.5 truncate text-sm leading-5 font-semibold text-ink">
          <Link href={href} className="hover:text-brand" title={product.name}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 truncate text-[13px] text-muted">{product.spec}</p>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <Price amount={product.price} unit={product.unit} suffix={product.priceNote} />
          <StockText stock={product.stock} />
        </div>
        <div className={cn('mt-2', list && 'max-w-[220px]')}>{action ?? <DefaultAction />}</div>
      </div>
    </article>
  )
}
