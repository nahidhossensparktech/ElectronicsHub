import type { Product } from '@repo/types'
import { cn } from '@repo/utils'
import { ProductCard } from './ProductCard'

/** Responsive product grid (2 → 3 → `columns` across). */
export function ProductGrid({
  products,
  columns = 5,
  className,
}: {
  products: Product[]
  columns?: 4 | 5
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3',
        columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={`${product.slug}-${i}`} product={product} />
      ))}
    </div>
  )
}
