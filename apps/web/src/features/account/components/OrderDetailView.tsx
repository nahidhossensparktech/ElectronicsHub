'use client'

import { CircleCheck } from 'lucide-react'
import { useState } from 'react'
import type { OrderStatus } from '@repo/types'
import { Button, LinkButton, OrderStatusPill, Thumb } from '@repo/ui'
import { formatBDT } from '@repo/utils'
import { SummaryRows } from '@/features/cart'
import { cancelOrder, useAppStore } from '@/lib/store'
import { AccountPageHeader } from './AccountPageHeader'
import { AccountPanel } from './AccountPanel'
import { OrderTracker } from './OrderTracker'

const stepIndex: Record<OrderStatus, number> = { pending: 0, processing: 1, shipped: 3, delivered: 5, cancelled: 0 }

export function OrderDetailView({ id }: { id: string }) {
  const order = useAppStore((s) => s.orders.find((o) => o.id === id))
  const [returnRequested, setReturnRequested] = useState(false)
  if (!order) {
    return (
      <>
        <AccountPageHeader title="Order not found" subtitle={`We couldn't find order #${id}`} />
        <LinkButton href="/account/orders" variant="secondary" size="lg">Back to orders</LinkButton>
      </>
    )
  }
  const steps = [
    { label: 'Order placed', time: order.date },
    { label: 'Confirmed', time: order.status === 'pending' ? 'Waiting for shop' : order.date },
    { label: 'Shipped', time: stepIndex[order.status] >= 3 ? order.date : '—' },
    { label: 'Out for delivery', time: order.status === 'shipped' ? 'Expected tomorrow' : stepIndex[order.status] > 3 ? order.date : '—' },
    { label: 'Delivered', time: order.status === 'delivered' ? order.date : '—' },
  ]
  const lines = order.lines ?? []
  return (
    <>
      <AccountPageHeader title={`Order #${order.id}`} subtitle={`Placed on ${order.date} · ${order.shopName}`} actions={<LinkButton href="/account/orders" variant="secondary" size="lg">Back to orders</LinkButton>} />
      <AccountPanel>
        <div className="mb-6 flex items-center justify-between"><h2 className="font-display text-xl font-bold text-ink">Order status</h2><OrderStatusPill status={order.status} /></div>
        {order.status === 'cancelled' ? <p className="text-sm text-danger">This order was cancelled.</p> : <OrderTracker current={stepIndex[order.status]} steps={steps} />}
      </AccountPanel>
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <AccountPanel title={`Items from ${order.shopName}`} className="self-start">
          <ul className="space-y-4">
            {lines.map((l) => (
              <li key={l.name} className="flex items-center gap-4">
                <Thumb src={l.image} alt={l.name} size={60} className="bg-white" />
                <div className="flex-1"><p className="text-sm font-semibold text-ink">{l.name}</p><p className="text-xs text-muted">{l.spec}</p></div>
                <span className="w-24 text-sm text-muted">× {l.quantity}</span>
                <span className="w-20 text-right text-sm font-bold text-ink">{formatBDT(Math.round(l.total * 100) / 100)}</span>
              </li>
            ))}
          </ul>
        </AccountPanel>
        <div className="space-y-6">
          <AccountPanel title="Summary">
            <SummaryRows
              totalLabel={order.paymentMethod === 'Cash on Delivery' ? 'Total due' : 'Total paid'}
              total={formatBDT(order.total)}
              rows={[
                { label: 'Subtotal', value: formatBDT(order.subtotal ?? order.total) },
                { label: `Delivery (${order.deliveryMethod ?? 'Courier'})`, value: formatBDT(order.deliveryFee ?? 0) },
                ...(order.discount ? [{ label: `Discount${order.couponCode ? ` (${order.couponCode})` : ''}`, value: `− ${formatBDT(order.discount)}` }] : []),
              ]}
            />
            <p className="mt-3 flex items-center gap-2 text-xs text-muted"><CircleCheck className="size-4 text-success" />{order.paymentMethod === 'Cash on Delivery' ? 'Pay the courier on delivery' : `Paid with ${order.paymentMethod ?? 'bKash'}`}</p>
          </AccountPanel>
          {order.address ? (
            <AccountPanel title="Delivery address">
              <p className="text-sm font-semibold text-ink">{order.address.recipient} · {order.address.phone}</p>
              <p className="mt-3 text-sm text-muted">{order.address.line}</p>
              <p className="mt-3 text-[13px] text-muted">{order.deliveryMethod ?? 'Courier'}</p>
            </AccountPanel>
          ) : null}
        </div>
      </div>
      {returnRequested ? <p className="rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success">Return requested. {order.shopName} will respond within 48 hours.</p> : null}
      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="secondary" size="lg" onClick={() => window.print()}>Download Invoice</Button>
        <LinkButton href={`/account/messages?shop=${order.shopSlug ?? ''}`} variant="soft" size="lg">Message Seller</LinkButton>
        {order.status === 'pending' ? (
          <Button variant="danger" size="lg" onClick={() => confirm('Cancel this order?') && cancelOrder(order.id)}>Cancel Order</Button>
        ) : order.status === 'delivered' ? (
          <Button variant="danger" size="lg" disabled={returnRequested} onClick={() => setReturnRequested(true)}>Request Return</Button>
        ) : null}
      </div>
    </>
  )
}
