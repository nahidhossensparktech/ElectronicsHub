'use client'

import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { OrderStatus } from '@repo/types'
import { Pagination, SegmentedTabs } from '@repo/ui'
import { useAppStore } from '@/lib/store'
import { OrderCard } from './OrderCard'

const PAGE = 4
const statuses: ('all' | OrderStatus)[] = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

export function OrdersView() {
  const orders = useAppStore((s) => s.orders)
  const [tab, setTab] = useState<'all' | OrderStatus>('all')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const count = (s: 'all' | OrderStatus) => (s === 'all' ? orders.length : orders.filter((o) => o.status === s).length)
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return orders.filter(
      (o) =>
        (tab === 'all' || o.status === tab) &&
        (!term || o.id.toLowerCase().includes(term) || o.shopName.toLowerCase().includes(term) || o.lines?.some((l) => l.name.toLowerCase().includes(term))),
    )
  }, [orders, tab, q])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE))
  const current = Math.min(page, pageCount)
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SegmentedTabs
          value={tab}
          onChange={(v) => { setTab(v as typeof tab); setPage(1) }}
          items={statuses.map((s) => ({ value: s, label: `${s[0]!.toUpperCase()}${s.slice(1)} (${count(s)})` }))}
        />
        <label className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Search order ID or product" className="h-11 w-[260px] rounded-xl bg-surface pr-3 pl-10 text-sm outline-none placeholder:text-subtle focus:ring-2 focus:ring-brand/30" />
        </label>
      </div>
      {filtered.length ? (
        <div className="space-y-4">{filtered.slice((current - 1) * PAGE, current * PAGE).map((o) => <OrderCard key={o.id} order={o} />)}</div>
      ) : (
        <p className="rounded-2xl bg-canvas py-14 text-center text-sm text-muted">No orders match.</p>
      )}
      <Pagination page={current} totalPages={pageCount} onPageChange={setPage} />
    </>
  )
}
