import type { CartLine, Coupon } from '@repo/types'
import { findCoupon } from '@/lib/mock-db/coupons'

export const DELIVERY_PER_SHOP = 60

export interface CartTotals {
  itemCount: number
  shopCount: number
  subtotal: number
  delivery: number
  discount: number
  total: number
  coupon?: Coupon
  couponError?: string
}

/** Totals for the selected cart lines; a coupon only applies when its minimum is met. */
export function computeTotals(lines: CartLine[], couponCode: string | null): CartTotals {
  const selected = lines.filter((l) => l.selected)
  const subtotal = round2(selected.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0))
  const shopCount = new Set(selected.map((l) => l.shopSlug)).size
  const delivery = shopCount * DELIVERY_PER_SHOP
  let discount = 0
  const coupon = couponCode ? findCoupon(couponCode) : undefined
  let couponError: string | undefined
  if (coupon) {
    if (subtotal < (coupon.minSubtotal ?? 0)) {
      couponError = `Add ৳${(coupon.minSubtotal ?? 0) - subtotal} more to use ${coupon.code}`
    } else if (coupon.kind === 'flat') discount = coupon.value ?? 0
    else if (coupon.kind === 'percent') discount = Math.round((subtotal * (coupon.value ?? 0)) / 100)
    else if (coupon.kind === 'free-delivery') {
      discount = delivery
    }
  }
  return {
    itemCount: selected.length,
    shopCount,
    subtotal,
    delivery,
    discount,
    total: Math.max(0, round2(subtotal + delivery - discount)),
    coupon: couponError ? undefined : coupon,
    couponError,
  }
}

/** Unit price for a quantity using the product's wholesale tiers (mirrors product page tiers). */
export function tierPrice(basePrice: number, quantity: number): number {
  const factor = quantity >= 100 ? 0.894 : quantity >= 50 ? 0.923 : quantity >= 10 ? 0.952 : 1
  return basePrice < 20 ? round2(basePrice * factor) : Math.round(basePrice * factor)
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}
