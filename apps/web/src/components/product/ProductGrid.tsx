import type { Product } from '@repo/types'
import { cn } from '@repo/utils'
import { StoreProductCard } from './StoreProductCard'

export interface ProductGridProps {
  products: Product[]
  columns?: 4 | 5
  view?: 'grid' | 'list'
  className?: string
}

/** Responsive grid (2 → 3 → `columns`) or a single-column list. */
export function ProductGrid({ products, columns = 5, view = 'grid', className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={cn('rounded-2xl bg-canvas px-6 py-16 text-center', className)}>
        <p className="text-base font-semibold text-ink">No products match these filters</p>
        <p className="mt-1 text-sm text-muted">Try removing a filter or searching for something else.</p>
      </div>
    )
  }
  if (view === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {products.map((p) => <StoreProductCard key={p.slug} product={p} layout="list" />)}
      </div>
    )
  }
  return (
    <div className={cn('grid grid-cols-2 gap-x-3.5 gap-y-6 sm:gap-x-5 sm:gap-y-8 sm:grid-cols-3', columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4', className)}>
      {products.map((p, i) => <StoreProductCard key={`${p.slug}-${i}`} product={p} />)}
    </div>
  )
}
