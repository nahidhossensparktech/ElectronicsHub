'use client'

import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { CartLine } from '@repo/types'
import { Checkbox, QuantityStepper, Thumb } from '@repo/ui'
import { formatBDT, formatNumber } from '@repo/utils'
import { removeFromCart, setQuantity, toggleSelected } from '@/lib/store'

export function CartItemRow({ line }: { line: CartLine }) {
  return (
    <li className="flex items-center gap-4 py-3.5">
      <Checkbox checked={line.selected} onChange={() => toggleSelected(line.slug)} aria-label={`Select ${line.name}`} />
      <Link href={`/products/${line.slug}`}><Thumb src={line.image} alt={line.name} size={84} className="rounded-xl bg-white" /></Link>
      <div className="min-w-0 flex-1">
        <Link href={`/products/${line.slug}`} className="block truncate text-sm font-semibold text-ink hover:text-brand">{line.name}</Link>
        <p className="mt-1 text-xs text-muted">{line.spec}</p>
        <p className="mt-1 text-xs font-medium text-success">{formatBDT(line.unitPrice)} /pc · {formatNumber(line.stock)} in stock</p>
      </div>
      <QuantityStepper value={line.quantity} max={Math.max(1, line.stock)} onChange={(q) => setQuantity(line.slug, q)} className="h-9 w-32 justify-between bg-white" />
      <span className="w-[86px] text-right text-base font-bold text-ink">{formatBDT(Math.round(line.unitPrice * line.quantity * 100) / 100)}</span>
      <button type="button" aria-label={`Remove ${line.name}`} onClick={() => removeFromCart(line.slug)} className="inline-flex size-8 items-center justify-center rounded-lg bg-white text-muted hover:text-danger">
        <Trash2 className="size-4" />
      </button>
    </li>
  )
}
