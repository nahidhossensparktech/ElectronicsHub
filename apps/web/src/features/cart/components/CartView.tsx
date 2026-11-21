'use client'

import { ShoppingCart } from 'lucide-react'
import { useMemo } from 'react'
import type { CartLine } from '@repo/types'
import { Checkbox, LinkButton } from '@repo/ui'
import { computeTotals, removeSelected, setAllSelected, useAppStore } from '@/lib/store'
import { CartShopCard } from './CartShopCard'
import { CouponBox } from './CouponBox'
import { OrderSummaryCard } from './OrderSummaryCard'

/** Interactive cart: shop groups, selection, quantities, coupon and summary. */
export function CartView() {
  const cart = useAppStore((s) => s.cart)
  const couponCode = useAppStore((s) => s.couponCode)
  const totals = useMemo(() => computeTotals(cart, couponCode), [cart, couponCode])
  const groups = useMemo(() => {
    const map = new Map<string, CartLine[]>()
    for (const l of cart) map.set(l.shopSlug, [...(map.get(l.shopSlug) ?? []), l])
    return [...map.entries()]
  }, [cart])
  const allSelected = cart.length > 0 && cart.every((l) => l.selected)

  if (cart.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center rounded-2xl bg-canvas px-6 py-20 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-white text-brand"><ShoppingCart className="size-7" /></span>
        <h2 className="mt-5 font-display text-xl font-bold text-ink">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted">Browse components from verified shops and add them here.</p>
        <LinkButton href="/products" size="lg" className="mt-6">Browse products</LinkButton>
      </div>
    )
  }

  return (
    <>
      <p className="-mt-8 mb-2 text-right text-sm text-muted">
        {cart.length} item{cart.length === 1 ? '' : 's'} from {groups.length} shop{groups.length === 1 ? '' : 's'}
      </p>
      <div className="mt-6 flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <Checkbox label={<span className="font-semibold">Select all ({cart.length})</span>} checked={allSelected} onChange={(e) => setAllSelected(e.target.checked)} />
            <button type="button" disabled={!cart.some((l) => l.selected)} onClick={removeSelected} className="text-[13px] font-semibold text-danger disabled:opacity-40">Remove selected</button>
          </div>
          {groups.map(([shopSlug, lines]) => <CartShopCard key={shopSlug} shopSlug={shopSlug} lines={lines} />)}
        </div>
        <OrderSummaryCard
          title="Order summary"
          totals={totals}
          coupon={<CouponBox code={couponCode} totals={totals} />}
          action={
            totals.itemCount > 0 ? (
              <LinkButton href="/checkout" size="xl" block>Proceed to Checkout</LinkButton>
            ) : (
              <p className="rounded-[10px] bg-white py-3.5 text-center text-sm text-muted">Select items to check out</p>
            )
          }
        />
      </div>
    </>
  )
}
