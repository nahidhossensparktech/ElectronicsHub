import type { Metadata } from 'next'
import { AdminHeader, AdminSettingsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Settings - Admin Panel',
}

export default function AdminSettingsPage() {
  return (
    <>
      <AdminHeader
        title="Platform Settings"
        subtitle="Configure commission cuts, delivery matrices, gateways, and platform policies"
      />
      <main className="p-4 sm:p-8">
        <AdminSettingsView />
      </main>
    </>
  )
}
