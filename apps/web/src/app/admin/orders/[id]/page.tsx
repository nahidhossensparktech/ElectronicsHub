import type { Metadata } from 'next'
import { AdminHeader, AdminOrderDetailView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Order Details - Admin Panel',
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <AdminHeader
        title="Order Details"
        subtitle="Platform transaction breakdown and invoice"
      />
      <main className="p-4 sm:p-8">
        <AdminOrderDetailView id={decodeURIComponent(id)} />
      </main>
    </>
  )
}
