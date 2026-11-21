'use client'

import { Check } from 'lucide-react'
import { useMemo } from 'react'
import { LinkButton } from '@repo/ui'
import { formatBDT } from '@repo/utils'
import { shops } from '@/lib/mock-db/shops'
import { useAppStore } from '@/lib/store'
import { ShipmentRow } from './ShipmentRow'

/** Confirmation for the orders just placed (ids come from ?orders=). */
export function OrderSuccessView({ orderIds }: { orderIds: string[] }) {
  const ids = orderIds
  const allOrders = useAppStore((s) => s.orders)
  const phone = useAppStore((s) => s.profile.phone)
  const orders = useMemo(() => allOrders.filter((o) => ids.includes(o.id)), [allOrders, ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps
  const list = orders.length ? orders : allOrders.slice(0, 1)
  const total = list.reduce((sum, o) => sum + o.total, 0)
  const facts = [
    ['Order ID', list.map((o) => `#${o.id}`).join(', ') || '—'],
    ['Date', list[0]?.date ?? '—'],
    ['Total', formatBDT(total)],
    ['Payment', list[0]?.paymentMethod ? `${list[0].paymentMethod}${list[0].paymentMethod === 'Cash on Delivery' ? '' : ' · Paid'}` : '—'],
  ]
  return (
    <div className="flex flex-col items-center pt-16 pb-20 text-center">
      <span className="inline-flex size-20 items-center justify-center rounded-full bg-success-50">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-success text-white"><Check className="size-7" strokeWidth={3} /></span>
      </span>
      <h1 className="mt-6 font-display text-[28px] leading-9 font-bold text-ink">Thank you! Your order is placed.</h1>
      <p className="mt-3 max-w-[460px] text-[15px] leading-6 text-muted">We&apos;ve sent the details to {phone}. Each shop will confirm your items shortly.</p>
      <div className="mt-8 grid w-full max-w-[600px] grid-cols-2 gap-3 text-left sm:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-canvas px-4 py-3.5">
            <p className="text-xs text-muted">{label}</p>
            <p className="mt-1 truncate text-sm font-bold text-ink" title={value}>{value}</p>
          </div>
        ))}
      </div>
      <section className="mt-5 w-full max-w-[600px] rounded-2xl bg-canvas p-5 text-left">
        <h2 className="font-display text-lg font-bold text-ink">Shipments</h2>
        <ul className="mt-4 space-y-3">
          {list.map((o) => {
            const shop = shops.find((s) => s.slug === o.shopSlug)
            return <ShipmentRow key={o.id} initials={shop?.initials ?? 'SH'} color={shop?.color ?? 'blue'} shop={o.shopName} note={`${o.itemCount} item${o.itemCount === 1 ? '' : 's'} · ${o.deliveryMethod ?? 'Courier'}`} />
          })}
        </ul>
      </section>
      <div className="mt-8 flex gap-3">
        <LinkButton href={list[0] ? `/account/orders/${list[0].id}` : '/account/orders'} size="xl">Track My Order</LinkButton>
        <LinkButton href="/products" size="xl" variant="secondary">Continue Shopping</LinkButton>
      </div>
    </div>
  )
}
