import type { Metadata } from 'next'
import { AccountPageHeader, OrdersView } from '@/features/account'

export const metadata: Metadata = { title: 'My Orders' }

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <AccountPageHeader title="My Orders" subtitle="Track and manage your orders" />
      <OrdersView />
    </div>
  )
}
