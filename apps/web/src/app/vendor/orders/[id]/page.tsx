import type { Metadata } from 'next'
import { VendorHeader, VendorOrderDetailView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Order Details - Vendor Center',
}

export default async function VendorOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <VendorHeader
        title="Order Details"
        subtitle="Manage fulfillment, package items, and dispatch via courier"
      />
      <main className="p-4 sm:p-8">
        <VendorOrderDetailView id={decodeURIComponent(id)} />
      </main>
    </>
  )
}
