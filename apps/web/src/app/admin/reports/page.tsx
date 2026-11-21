import type { Metadata } from 'next'
import { AdminHeader, AdminReportsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Reports & Disputes - Admin Panel',
}

export default function AdminReportsPage() {
  return (
    <>
      <AdminHeader
        title="Reports & Disputes"
        subtitle="Mediate disputes, enforce authenticity guidelines, and process escrow refunds"
      />
      <main className="p-4 sm:p-8">
        <AdminReportsView />
      </main>
    </>
  )
}
