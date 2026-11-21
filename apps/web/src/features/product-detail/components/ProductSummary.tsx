import { RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import type { ProductDetail } from '@repo/types'
import { RatingStars, Tag } from '@repo/ui'
import { formatBDT } from '@repo/utils'
import { ProductPurchase } from './ProductPurchase'

/** Right column of the product page: identity, price, tiers, availability and actions. */
export function ProductSummary({ product, categoryName }: { product: ProductDetail; categoryName: string }) {
  const save = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2.5">
        <Tag className="px-2.5">{categoryName}</Tag>
        <span className="text-xs text-muted">Brand: {product.brand}</span>
      </div>
      <h1 className="mt-4 font-display text-[32px] leading-[38px] font-bold text-ink">{product.name}</h1>
      <p className="mt-2.5 text-sm text-muted">
        Model: {product.model} · SKU: {product.sku}
      </p>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <RatingStars value={product.rating} />
        <span className="font-semibold text-ink">{product.rating}</span>
        <span className="text-muted">
          · {product.reviewCount} reviews · {product.soldCount} sold
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="font-display text-[40px] leading-[48px] font-bold text-ink">{formatBDT(product.price)}</span>
        {product.compareAtPrice ? <span className="text-base text-subtle line-through">{formatBDT(product.compareAtPrice)}</span> : null}
        {save > 0 ? (
          <span className="inline-flex h-[22px] items-center rounded-md bg-success-50 px-2 text-xs font-semibold text-success">Save {save}%</span>
        ) : null}
      </div>
      <ProductPurchase product={product} />
      <ul className="mt-5 flex flex-wrap gap-6 text-[13px] font-medium text-ink">
        <li className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-brand" /> Verified seller</li>
        <li className="inline-flex items-center gap-1.5"><Truck className="size-4 text-brand" /> Cash on delivery</li>
        <li className="inline-flex items-center gap-1.5"><RotateCcw className="size-4 text-brand" /> 7-day return</li>
      </ul>
    </div>
  )
}
