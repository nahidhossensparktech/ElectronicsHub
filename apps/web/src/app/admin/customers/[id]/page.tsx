import type { Metadata } from 'next'
import { AdminCustomerDetailView, AdminHeader } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Customer Details - Admin Panel',
}

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <AdminHeader
        title="Customer Details"
        subtitle="Account summary, delivery addresses and order history"
      />
      <main className="p-4 sm:p-8">
        <AdminCustomerDetailView id={decodeURIComponent(id)} />
      </main>
    </>
  )
}
