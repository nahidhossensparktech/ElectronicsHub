import type { Metadata } from 'next'
import { AdminHeader, AdminShopsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Active Shops - Admin Panel',
}

export default function AdminShopsPage() {
  return (
    <>
      <AdminHeader
        title="Active Shops"
        subtitle="1,716 verified vendor storefronts across Bangladesh"
      />
      <main className="p-4 sm:p-8">
        <AdminShopsView />
      </main>
    </>
  )
}
