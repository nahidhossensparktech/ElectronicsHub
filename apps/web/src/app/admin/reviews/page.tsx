import type { Metadata } from 'next'
import { AdminHeader, AdminReviewsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Reviews Moderation - Admin Panel',
}

export default function AdminReviewsPage() {
  return (
    <>
      <AdminHeader
        title="Reviews & Ratings"
        subtitle="Monitor buyer feedback, detect spam links, and maintain marketplace trust"
      />
      <main className="p-4 sm:p-8">
        <AdminReviewsView />
      </main>
    </>
  )
}
