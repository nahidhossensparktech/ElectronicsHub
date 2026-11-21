import type { Product } from '@repo/types'
import { ProductCard } from '@repo/ui'
import { AddToCartButton } from './AddToCartButton'
import { WishlistToggle } from './WishlistToggle'

/** Product card wired to the cart and wishlist store. */
export function StoreProductCard({ product, layout }: { product: Product; layout?: 'grid' | 'list' }) {
  return (
    <ProductCard
      product={product}
      layout={layout}
      action={<AddToCartButton product={product} />}
      wishlist={<WishlistToggle slug={product.slug} />}
    />
  )
}
