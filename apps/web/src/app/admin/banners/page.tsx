import type { Metadata } from 'next'
import { AdminBannersView, AdminHeader } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Banners & Promotions - Admin Panel',
}

export default function AdminBannersPage() {
  return (
    <>
      <AdminHeader
        title="Banners & Promotions"
        subtitle="Manage storefront carousel hero slides, promotional cards, and announcement banners"
      />
      <main className="p-4 sm:p-8">
        <AdminBannersView />
      </main>
    </>
  )
}
