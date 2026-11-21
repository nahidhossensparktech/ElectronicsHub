import type { Metadata } from 'next'
import { AdminHeader, AdminVendorDetailView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Vendor Details - Admin Panel',
}

export default async function AdminVendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <AdminHeader
        title="Vendor Details"
        subtitle="Verification documents, shop metrics and payout method"
      />
      <main className="p-4 sm:p-8">
        <AdminVendorDetailView id={decodeURIComponent(id)} />
      </main>
    </>
  )
}
