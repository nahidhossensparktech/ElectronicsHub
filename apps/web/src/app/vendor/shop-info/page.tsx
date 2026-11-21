import type { Metadata } from 'next'
import { VendorHeader, VendorShopInfoView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Shop Information - Vendor Center',
}

export default function VendorShopInfoPage() {
  return (
    <>
      <VendorHeader
        title="Shop Information"
        subtitle="Manage public branding, Patuatuli market location, and contact details"
      />
      <main className="p-4 sm:p-8">
        <VendorShopInfoView />
      </main>
    </>
  )
}
