import Link from 'next/link'
import type { Order } from '@repo/types'
import { OrderStatusPill } from '@repo/ui'
import { cn, formatBDT, plural } from '@repo/utils'

/** Compact order table: header row on surface, alternating white rows. */
export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  const cols = 'grid grid-cols-[130px_150px_230px_130px_80px_1fr] items-center px-4 [&>*:last-child]:pl-[60px]'
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        <div className={cn(cols, 'h-10 rounded-[10px] bg-line/70 text-xs font-semibold text-muted')}>
          <span>Order</span><span>Date</span><span>Shop</span><span>Items</span><span className="text-right">Total</span><span>Status</span>
        </div>
        {orders.map((o, i) => (
          <Link key={o.id} href={`/account/orders/${o.id}`} className={cn(cols, 'h-12 rounded-[10px] text-sm text-ink hover:bg-brand-50', i % 2 === 1 && 'bg-white')}>
            <span className="font-medium">#{o.id}</span><span>{o.date}</span><span>{o.shopName}</span><span>{plural(o.itemCount, 'item')}</span>
            <span className="text-right">{formatBDT(o.total)}</span>
            <span><OrderStatusPill status={o.status} /></span>
          </Link>
        ))}
      </div>
    </div>
  )
}
