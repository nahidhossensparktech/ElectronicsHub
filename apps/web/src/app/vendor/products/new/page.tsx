import type { Metadata } from 'next'
import { Save, Trash2 } from 'lucide-react'
import { VendorAddProductView, VendorHeader } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Add / Edit Product - Vendor Center',
}

export default function VendorNewProductPage() {
  return (
    <>
      <VendorHeader
        title="Add Product"
        subtitle="List new electronics component in Tech Electronics"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9.5 items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <Save className="size-3.5" />
              <span>Save & Publish</span>
            </button>
          </div>
        }
      />
      <main className="p-4 sm:p-8">
        <VendorAddProductView />
      </main>
    </>
  )
}
