import type { Metadata } from 'next'
import { AdminCustomersView, AdminHeader } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Customers - Admin Panel',
}

export default function AdminCustomersPage() {
  return (
    <>
      <AdminHeader
        title="Customers"
        subtitle="25,482 registered customers across Bangladesh"
        action={
          <button
            type="button"
            className="hidden sm:inline-flex h-9.5 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            Export CSV
          </button>
        }
      />
      <main className="p-4 sm:p-8">
        <AdminCustomersView />
      </main>
    </>
  )
}
