import type { Metadata } from 'next'
import { Save } from 'lucide-react'
import { VendorAddProductView, VendorHeader } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Edit Product - Vendor Center',
}

export default async function VendorEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <VendorHeader
        title="Edit Product"
        subtitle="Update inventory, pricing, and technical datasheets"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9.5 items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <Save className="size-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        }
      />
      <main className="p-4 sm:p-8">
        <VendorAddProductView productId={decodeURIComponent(id)} />
      </main>
    </>
  )
}
