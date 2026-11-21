import Link from 'next/link'
import type { Product } from '@repo/types'
import { ProductImage } from '@repo/ui'
import { formatBDT } from '@repo/utils'

/** Image + name + price tile (dashboard wishlist preview). */
export function MiniProductTile({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="block">
      <ProductImage src={product.image} alt={product.name} className="h-[140px] bg-white" fillX={0.4} fillY={0.6} />
      <p className="mt-3 truncate text-sm font-semibold text-ink">{product.name}</p>
      <p className="mt-1.5 font-display text-base font-bold text-ink">{formatBDT(product.price)}</p>
    </Link>
  )
}
