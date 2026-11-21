import type { Metadata } from 'next'
import { VendorDashboardView, VendorHeader } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Dashboard - Vendor Center',
}

export default function VendorDashboardPage() {
  return (
    <>
      <VendorHeader
        title="Dashboard"
        subtitle="Tech Electronics · Patuatuli, Dhaka"
      />
      <main className="p-4 sm:p-8">
        <VendorDashboardView />
      </main>
    </>
  )
}
