import { Store } from 'lucide-react'
import type { Order } from '@repo/types'
import { LinkButton, OrderStatusPill, Thumb } from '@repo/ui'
import { formatBDT } from '@repo/utils'

/** Order row card: id/date/shop, thumbnails, total and actions. */
export function OrderCard({ order }: { order: Order }) {
  return (
    <article className="rounded-2xl bg-canvas px-5 py-4">
      <header className="flex items-center gap-3 text-[13px]">
        <span className="font-display text-base font-bold text-ink">#{order.id}</span>
        <span className="text-muted">{order.date}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-ink"><Store className="size-3.5 text-muted" />{order.shopName}</span>
        <OrderStatusPill status={order.status} className="ml-auto" />
      </header>
      <div className="mt-3.5 flex items-center gap-3">
        {order.thumbnails.map((src, i) => <Thumb key={i} src={src} alt="" size={60} className="bg-white" />)}
        <div className="ml-auto mr-4 text-right">
          <p className="text-xs text-muted">Total</p>
          <p className="font-display text-base font-bold text-ink">{formatBDT(order.total)}</p>
        </div>
        <LinkButton href={`/account/orders/${order.id}`} variant="secondary" className="bg-line/60">View Details</LinkButton>
        <LinkButton href={`/account/orders/${order.id}`} variant="soft">Track</LinkButton>
      </div>
    </article>
  )
}
