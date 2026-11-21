import type { Metadata } from 'next'
import { AdminHeader, AdminVendorApprovalsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Vendor Approvals - Admin Panel',
}

export default function AdminVendorApprovalsPage() {
  return (
    <>
      <AdminHeader
        title="Vendor Approvals"
        subtitle="27 pending seller applications awaiting Trade License & NID verification"
      />
      <main className="p-4 sm:p-8">
        <AdminVendorApprovalsView />
      </main>
    </>
  )
}
