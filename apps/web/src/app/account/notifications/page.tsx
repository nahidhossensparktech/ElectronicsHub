import type { Metadata } from 'next'
import { AccountPageHeader, NotificationsView } from '@/features/account'

export const metadata: Metadata = { title: 'Notifications' }

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <AccountPageHeader title="Notifications" subtitle="Stay updated on orders, messages and offers" />
      <NotificationsView />
    </div>
  )
}
