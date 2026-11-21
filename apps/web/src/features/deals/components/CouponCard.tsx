import type { Coupon } from '@repo/types'
import { CopyCodeButton } from './CopyCodeButton'

export function CouponCard({ coupon }: { coupon: Coupon }) {
  return (
    <article className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-5">
      <p className="font-display text-2xl font-bold text-brand">{coupon.title}</p>
      <p className="mt-1 text-xs text-muted">{coupon.condition}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex h-7 items-center rounded-md bg-white px-2.5 font-mono text-xs font-semibold tracking-wide text-ink">
          {coupon.code}
        </span>
        <CopyCodeButton code={coupon.code} />
      </div>
      <p className="mt-4 text-xs text-muted">{coupon.shopName}</p>
    </article>
  )
}
