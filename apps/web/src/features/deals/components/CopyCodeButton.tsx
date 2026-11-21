'use client'

import { useState } from 'react'
import { applyCoupon } from '@/lib/store'

/** Copies the coupon code and saves it to the cart so checkout applies it. */
export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="text-[13px] font-semibold text-brand"
      onClick={async () => {
        await navigator.clipboard?.writeText(code).catch(() => {})
        applyCoupon(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
    >
      {copied ? 'Copied & applied' : 'Copy'}
    </button>
  )
}
