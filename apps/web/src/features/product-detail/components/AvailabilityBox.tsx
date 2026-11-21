import { formatNumber } from '@repo/utils'

/** Stock, MOQ and delivery facts. */
export function AvailabilityBox({ stock, minOrder, delivery }: { stock: number; minOrder: number; delivery: string }) {
  const rows = [
    { label: 'Available quantity', value: <span className="text-success">{formatNumber(stock)} pcs in stock</span> },
    { label: 'Minimum order', value: `${minOrder} pc` },
    { label: 'Delivery', value: delivery },
  ]
  return (
    <dl className="space-y-3 rounded-2xl bg-canvas py-[18px] pr-[38px] pl-5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 text-[13px]">
          <dt className="text-muted">{row.label}</dt>
          <dd className="font-semibold text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
