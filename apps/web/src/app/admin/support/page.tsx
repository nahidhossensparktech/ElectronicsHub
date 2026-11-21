import type { Metadata } from 'next'
import { AdminHeader, AdminSupportView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Support Tickets - Admin Panel',
}

export default function AdminSupportPage() {
  return (
    <>
      <AdminHeader
        title="Support & Help Desk"
        subtitle="Manage inquiries from both customers and verified vendor shops"
      />
      <main className="p-4 sm:p-8">
        <AdminSupportView />
      </main>
    </>
  )
}
