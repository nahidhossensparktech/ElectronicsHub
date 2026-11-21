import type { Metadata } from 'next'
import { VendorHeader, VendorProfileView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Vendor Profile - Vendor Center',
}

export default function VendorProfilePage() {
  return (
    <>
      <VendorHeader
        title="Vendor Profile"
        subtitle="Trade License, National ID, and bKash payout account verification"
      />
      <main className="p-4 sm:p-8">
        <VendorProfileView />
      </main>
    </>
  )
}
