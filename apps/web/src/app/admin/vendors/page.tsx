import type { Metadata } from 'next'
import { AdminHeader, AdminVendorsView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Vendors - Admin Panel',
}

export default function AdminVendorsPage() {
  return (
    <>
      <AdminHeader
        title="Vendors"
        subtitle="1,842 verified seller shops and authorized distributors"
        action={
          <button
            type="button"
            className="hidden sm:inline-flex h-9.5 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            Export Vendors
          </button>
        }
      />
      <main className="p-4 sm:p-8">
        <AdminVendorsView />
      </main>
    </>
  )
}
