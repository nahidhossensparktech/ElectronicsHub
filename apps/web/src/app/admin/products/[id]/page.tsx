import type { Metadata } from 'next'
import { AdminHeader, AdminProductDetailView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Product Details - Admin Panel',
}

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <AdminHeader
        title="Product Details"
        subtitle="Review component specifications, pricing and status"
      />
      <main className="p-4 sm:p-8">
        <AdminProductDetailView id={decodeURIComponent(id)} />
      </main>
    </>
  )
}
