import { ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { formatBDT } from '@repo/utils'
import type { CartTotals } from '@/lib/store'
import { SummaryRows } from './SummaryRows'

export interface OrderSummaryCardProps {
  title: string
  totals: CartTotals
  /** Overrides for checkout (chosen delivery/COD fees). */
  deliveryOverride?: number
  extraRows?: { label: string; value: string }[]
  totalOverride?: number
  coupon?: ReactNode
  action: ReactNode
  children?: ReactNode
}

/** Cart/checkout summary: totals, coupon slot, optional item list and the primary action. */
export function OrderSummaryCard({ title, totals, deliveryOverride, extraRows = [], totalOverride, coupon, action, children }: OrderSummaryCardProps) {
  const rows = [
    { label: `Subtotal (${totals.itemCount} item${totals.itemCount === 1 ? '' : 's'})`, value: formatBDT(totals.subtotal) },
    { label: `Delivery (${totals.shopCount} shop${totals.shopCount === 1 ? '' : 's'})`, value: formatBDT(deliveryOverride ?? totals.delivery) },
    ...extraRows,
    ...(totals.coupon && totals.discount > 0 ? [{ label: `Coupon ${totals.coupon.code}`, value: `− ${formatBDT(totals.discount)}`, tone: 'success' as const }] : []),
  ]
  return (
    <aside className="w-full self-start rounded-2xl bg-canvas p-6 lg:sticky lg:top-6 lg:w-[420px]">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-5">
        <SummaryRows rows={rows} total={formatBDT(totalOverride ?? totals.total)} />
      </div>
      {coupon ? <div className="mt-4">{coupon}</div> : null}
      {children}
      <div className="mt-5">{action}</div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <ShieldCheck className="size-3.5" /> Secure checkout · Each shop ships its own items
      </p>
    </aside>
  )
}
