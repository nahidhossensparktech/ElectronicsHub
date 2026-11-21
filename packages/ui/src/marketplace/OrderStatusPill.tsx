import type { OrderStatus } from '@repo/types'
import { StatusPill, type PillTone } from '../primitives/StatusPill'

const map: Record<OrderStatus, { label: string; tone: PillTone }> = {
  pending: { label: 'Pending', tone: 'warning' },
  processing: { label: 'Processing', tone: 'brand' },
  shipped: { label: 'Shipped', tone: 'brand' },
  delivered: { label: 'Delivered', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
}

export function OrderStatusPill({ status, className }: { status: OrderStatus; className?: string }) {
  const { label, tone } = map[status]
  return (
    <StatusPill tone={tone} className={className}>
      {label}
    </StatusPill>
  )
}
