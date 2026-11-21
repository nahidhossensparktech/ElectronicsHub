import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { VendorHeader, VendorInventoryView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Inventory Management - Vendor Center',
}

export default function VendorInventoryPage() {
  return (
    <>
      <VendorHeader
        title="Inventory"
        subtitle="Manage component stock levels, low stock alerts, and quick restock"
        action={
          <Link
            href="/vendor/products/new"
            className="inline-flex h-9.5 items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <Plus className="size-4" />
            <span>Add Component</span>
          </Link>
        }
      />
      <main className="p-4 sm:p-8">
        <VendorInventoryView />
      </main>
    </>
  )
}
