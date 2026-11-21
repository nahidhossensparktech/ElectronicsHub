import type { Metadata } from 'next'
import { AdminDashboardView, AdminHeader } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Dashboard - Admin Panel',
}

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="Marketplace overview · 21 Nov 2026"
      />
      <main className="p-4 sm:p-8">
        <AdminDashboardView />
      </main>
    </>
  )
}
