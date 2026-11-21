'use client'

import { Heart, MessageCircle, Package, Timer } from 'lucide-react'
import { useMemo } from 'react'
import { StatCard } from '@repo/ui'
import { getProductBySlug } from '@/lib/mock-db/products'
import { useAppStore } from '@/lib/store'
import { AccountPanel } from './AccountPanel'
import { GreetingBanner } from './GreetingBanner'
import { MiniProductTile } from './MiniProductTile'
import { RecentOrdersTable } from './RecentOrdersTable'

export function DashboardView() {
  const orders = useAppStore((s) => s.orders)
  const wishlist = useAppStore((s) => s.wishlist)
  const conversations = useAppStore((s) => s.conversations)
  const profile = useAppStore((s) => s.profile)
  const pending = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length
  const unread = Array.isArray(conversations) ? conversations.reduce((n, c) => n + (c?.unread || 0), 0) : 0
  const active = orders.find((o) => o.status === 'shipped') ?? orders.find((o) => o.status === 'pending')
  const saved = useMemo(() => wishlist.map(getProductBySlug).filter((p) => p !== undefined).slice(0, 4), [wishlist])
  return (
    <>
      <GreetingBanner name={profile.name.split(' ')[0]!} activeOrder={active} />
      <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value={orders.length} icon={<Package />} footer={<span className="text-xs text-muted"><span className="mr-2 rounded-md bg-success-50 px-1.5 py-0.5 font-semibold text-success">+{Math.max(0, orders.length - 4) + 3} this month</span>vs last month</span>} />
        <StatCard label="Pending" value={pending} icon={<Timer />} />
        <StatCard label="Wishlist" value={wishlist.length} icon={<Heart />} />
        <StatCard label="Unread messages" value={unread} icon={<MessageCircle />} />
      </div>
      <AccountPanel title="Recent orders" link={{ label: 'View all', href: '/account/orders' }}>
        {orders.length ? <RecentOrdersTable orders={orders.slice(0, 3)} /> : <p className="text-sm text-muted">No orders yet.</p>}
      </AccountPanel>
      <AccountPanel title="Wishlist" link={{ label: 'View all', href: '/account/wishlist' }}>
        {saved.length ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{saved.map((p) => <MiniProductTile key={p.slug} product={p} />)}</div>
        ) : (
          <p className="text-sm text-muted">Tap the heart on any product to save it here.</p>
        )}
      </AccountPanel>
    </>
  )
}
