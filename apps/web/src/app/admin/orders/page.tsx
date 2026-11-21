import type { Metadata } from 'next'
import { AdminHeader, AdminOrdersView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Platform Orders - Admin Panel',
}

export default function AdminOrdersPage() {
  return (
    <>
      <AdminHeader
        title="Orders"
        subtitle="48,920 total platform orders · 5% escrow commission"
        action={
          <button
            type="button"
            className="hidden sm:inline-flex h-9.5 items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            Export Orders
          </button>
        }
      />
      <main className="p-4 sm:p-8">
        <AdminOrdersView />
      </main>
    </>
  )
}
