'use client'

import { Check, Heart, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { ProductDetail } from '@repo/types'
import { Button, buttonVariants, QuantityStepper } from '@repo/ui'
import { cn, formatBDT } from '@repo/utils'
import { addToCart, toggleWishlist, useAppStore } from '@/lib/store'
import { AvailabilityBox } from './AvailabilityBox'
import { PriceTiers } from './PriceTiers'

/** Tiers, availability, quantity and actions; tier price follows the chosen quantity. */
export function ProductPurchase({ product }: { product: ProductDetail }) {
  const [qty, setQty] = useState(Math.min(5, Math.max(1, product.stock)))
  const [added, setAdded] = useState(false)
  const wishlist = useAppStore((s) => s.wishlist)
  const saved = wishlist.includes(product.slug)
  const tier = [...product.priceTiers].reverse().find((t) => qty >= t.minQty) ?? product.priceTiers[0]!
  const out = product.stock <= 0
  return (
    <>
      <div className="mt-6">
        <PriceTiers tiers={product.priceTiers} quantity={qty} />
      </div>
      <div className="mt-5">
        <AvailabilityBox stock={product.stock} minOrder={product.minOrder} delivery={product.delivery} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, product.stock)} size="lg" className="h-[52px] w-[156px] justify-between px-1.5" />
        <Button
          size="xl"
          className="w-40"
          disabled={out}
          onClick={() => {
            addToCart({ ...product, price: tier.price }, qty)
            setAdded(true)
            setTimeout(() => setAdded(false), 1500)
          }}
        >
          {added ? <Check className="size-4" strokeWidth={2.5} /> : <Plus className="size-4" strokeWidth={2.25} />}
          {out ? 'Out of stock' : added ? 'Added' : 'Add to Cart'}
        </Button>
        <Link href={`/account/messages?shop=${product.shop.slug}`} className={cn(buttonVariants({ variant: 'secondary', size: 'xl' }), 'w-[159px]')}>
          Message Seller
        </Link>
        <Button size="xl" variant="secondary" aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} className="w-[52px] px-0" onClick={() => toggleWishlist(product.slug)}>
          <Heart className={cn('size-5', saved && 'fill-danger text-danger')} strokeWidth={1.75} />
        </Button>
      </div>
      {!out ? (
        <p className="mt-3 text-[13px] text-muted">
          {qty} × {formatBDT(tier.price)} = <span className="font-semibold text-ink">{formatBDT(Math.round(qty * tier.price * 100) / 100)}</span>
        </p>
      ) : null}
    </>
  )
}
