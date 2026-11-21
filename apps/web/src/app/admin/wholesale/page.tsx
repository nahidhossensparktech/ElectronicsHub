import type { Metadata } from 'next'
import { AdminHeader, AdminWholesaleView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Wholesale & RFQ Management - Admin Panel',
}

export default function AdminWholesalePage() {
  return (
    <>
      <AdminHeader
        title="Wholesale & RFQ"
        subtitle="Enterprise and institutional bulk procurement requests"
      />
      <main className="p-4 sm:p-8">
        <AdminWholesaleView />
      </main>
    </>
  )
}
