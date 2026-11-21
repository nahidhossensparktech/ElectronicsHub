import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Upload } from 'lucide-react'
import { VendorHeader, VendorProductsView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Manage Products - Vendor Center',
}

export default function VendorProductsPage() {
  return (
    <>
      <VendorHeader
        title="Manage Products"
        subtitle="1,240 products in your shop"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden sm:inline-flex h-9.5 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            >
              <Upload className="size-3.5" />
              <span>Bulk Upload</span>
            </button>
            <Link
              href="/vendor/products/new"
              className="inline-flex h-9.5 items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <Plus className="size-4" />
              <span>Add Product</span>
            </Link>
          </div>
        }
      />
      <main className="p-4 sm:p-8">
        <VendorProductsView />
      </main>
    </>
  )
}
