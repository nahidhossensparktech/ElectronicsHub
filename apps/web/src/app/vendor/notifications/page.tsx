import type { Metadata } from 'next'
import { VendorHeader, VendorNotificationsView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Notifications & Alerts - Vendor Center',
}

export default function VendorNotificationsPage() {
  return (
    <>
      <VendorHeader
        title="Notifications"
        subtitle="Stay updated with incoming orders, low stock warnings, and weekly bKash payouts"
      />
      <main className="p-4 sm:p-8">
        <VendorNotificationsView />
      </main>
    </>
  )
}
