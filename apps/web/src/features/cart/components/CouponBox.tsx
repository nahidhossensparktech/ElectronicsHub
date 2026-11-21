'use client'

import { Tag } from 'lucide-react'
import { useState } from 'react'
import { applyCoupon, removeCoupon, type CartTotals } from '@/lib/store'

/** Applied-coupon chip, or a code input with Apply. Shows why a code doesn't apply. */
export function CouponBox({ code, totals }: { code: string | null; totals: CartTotals }) {
  const [value, setValue] = useState('')
  if (code) {
    const valid = Boolean(totals.coupon)
    return (
      <div>
        <div className="flex h-12 items-center justify-between rounded-xl bg-white px-3.5 text-sm">
          <span className={`inline-flex items-center gap-2 font-semibold ${valid ? 'text-success' : 'text-warning-700'}`}>
            <Tag className="size-4 text-muted" />
            {code} {valid ? 'applied' : 'not applied'}
          </span>
          <button type="button" onClick={removeCoupon} className="text-muted hover:text-danger">Remove</button>
        </div>
        {totals.couponError ? <p className="mt-1.5 text-xs text-warning-700">{totals.couponError}</p> : null}
        {!valid && !totals.couponError ? <p className="mt-1.5 text-xs text-danger">This code is not valid.</p> : null}
      </div>
    )
  }
  return (
    <form
      className="flex h-12 items-center gap-2 rounded-xl bg-white pr-1.5 pl-3.5"
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim()) applyCoupon(value)
      }}
    >
      <Tag className="size-4 text-muted" />
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Coupon code (try TECH50)" aria-label="Coupon code" className="h-full flex-1 bg-transparent text-sm uppercase outline-none placeholder:normal-case placeholder:text-subtle" />
      <button type="submit" className="h-9 rounded-lg bg-brand-50 px-3.5 text-[13px] font-semibold text-brand hover:bg-brand-100">Apply</button>
    </form>
  )
}
