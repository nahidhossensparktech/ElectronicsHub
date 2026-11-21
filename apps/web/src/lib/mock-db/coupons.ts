import type { Coupon } from '@repo/types'

export const coupons: Coupon[] = [
  { title: '৳50 OFF', condition: 'Orders over ৳1,000', code: 'TECH50', shopName: 'Tech Electronics', kind: 'flat', value: 50, minSubtotal: 1000 },
  { title: '10% OFF', condition: 'Sensors & modules', code: 'MAKER10', shopName: 'Maker Store', kind: 'percent', value: 10, minSubtotal: 0 },
  { title: 'Free delivery', condition: 'Dhaka · over ৳800', code: 'RTFREE', shopName: 'RoboTech BD', kind: 'free-delivery', value: 0, minSubtotal: 800 },
  { title: '৳100 OFF', condition: 'Wholesale over ৳5,000', code: 'BULK100', shopName: 'Circuit Bazar', kind: 'flat', value: 100, minSubtotal: 5000 },
]

export function findCoupon(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase())
}
