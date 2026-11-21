import type { Metadata } from 'next'
import { AdminHeader, AdminProductApprovalsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Product Approvals - Admin Panel',
}

export default function AdminProductApprovalsPage() {
  return (
    <>
      <AdminHeader
        title="Product Approvals"
        subtitle="Review pending vendor component listings before publishing"
      />
      <main className="p-4 sm:p-8">
        <AdminProductApprovalsView />
      </main>
    </>
  )
}
