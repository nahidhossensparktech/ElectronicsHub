import type { Metadata } from 'next'
import { Download } from 'lucide-react'
import { VendorHeader, VendorOrdersView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Orders - Vendor Center',
}

export default function VendorOrdersPage() {
  return (
    <>
      <VendorHeader
        title="Orders"
        subtitle="Accept new orders within 2 hours to keep your response rate high"
        action={
          <button
            type="button"
            className="hidden sm:inline-flex h-9.5 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Download className="size-3.5" />
            <span>Export Orders</span>
          </button>
        }
      />
      <main className="p-4 sm:p-8">
        <VendorOrdersView />
      </main>
    </>
  )
}
