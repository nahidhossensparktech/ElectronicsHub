'use client'

import { useState } from 'react'
import { SegmentedTabs } from '@repo/ui'
import { markAllNotificationsRead, type NotificationEntry, useAppStore } from '@/lib/store'
import { NotificationItem } from './NotificationItem'

const tabs = [
  { value: 'all', label: 'All', kinds: null },
  { value: 'orders', label: 'Orders', kinds: ['order', 'delivered'] },
  { value: 'messages', label: 'Messages', kinds: ['message'] },
  { value: 'offers', label: 'Offers', kinds: ['offer', 'deal'] },
  { value: 'account', label: 'Account', kinds: ['security'] },
] as const

function Group({ title, items }: { title: string; items: NotificationEntry[] }) {
  if (items.length === 0) return null
  return (
    <section>
      <h2 className="text-xs font-semibold tracking-[0.06em] text-subtle uppercase">{title}</h2>
      <ul className="mt-3 space-y-3">{items.map((n) => <NotificationItem key={n.id} notification={n} />)}</ul>
    </section>
  )
}

export function NotificationsView() {
  const notifications = useAppStore((s) => s.notifications)
  const [tab, setTab] = useState<(typeof tabs)[number]['value']>('all')
  const kinds = tabs.find((t) => t.value === tab)!.kinds as readonly string[] | null
  const visible = notifications.filter((n) => !kinds || kinds.includes(n.kind))
  const unread = notifications.some((n) => n.unread)
  return (
    <>
      <div className="flex items-center justify-between">
        <SegmentedTabs value={tab} onChange={(v) => setTab(v as typeof tab)} items={tabs.map(({ value, label }) => ({ value, label }))} />
        <button type="button" disabled={!unread} onClick={markAllNotificationsRead} className="text-sm font-semibold text-brand disabled:text-subtle">Mark all as read</button>
      </div>
      <Group title="Today" items={visible.filter((n) => n.group === 'today')} />
      <Group title="Earlier" items={visible.filter((n) => n.group === 'earlier')} />
      {visible.length === 0 ? <p className="rounded-2xl bg-canvas py-14 text-center text-sm text-muted">You&apos;re all caught up.</p> : null}
    </>
  )
}
