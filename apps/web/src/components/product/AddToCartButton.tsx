'use client'

import { Check, Plus } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@repo/types'
import { addToCart } from '@/lib/store'
import { useTranslation } from '@/lib/i18n'

/** Card-sized Add to Cart; confirms briefly after adding. */
export function AddToCartButton({ product }: { product: Product }) {
  const { t } = useTranslation()
  const [added, setAdded] = useState(false)
  const out = product.stock <= 0

  return (
    <button
      type="button"
      disabled={out}
      onClick={() => {
        addToCart(product, 1)
        setAdded(true)
        setTimeout(() => setAdded(false), 1200)
      }}
      className="inline-flex h-[34px] w-full items-center justify-center gap-1.5 rounded-[10px] bg-brand-50 text-[13px] font-semibold text-brand transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:bg-surface disabled:text-subtle"
    >
      {added ? <Check className="size-3.5" strokeWidth={2.5} /> : <Plus className="size-3.5" strokeWidth={2.25} />}
      {out ? t('product.outOfStock') : added ? t('product.added') : t('product.addToCart')}
    </button>
  )
}
