import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AdminHeader, AdminProductsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Products Catalog - Admin Panel',
}

export default function AdminProductsPage() {
  return (
    <>
      <AdminHeader
        title="Products"
        subtitle="120,482 listed components across all verified shops"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden sm:inline-flex h-9.5 items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              Export CSV
            </button>
          </div>
        }
      />
      <main className="p-4 sm:p-8">
        <AdminProductsView />
      </main>
    </>
  )
}
