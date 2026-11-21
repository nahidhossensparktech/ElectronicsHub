import type { Metadata } from 'next'
import { VendorHeader, VendorSettingsView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Shop Settings - Vendor Center',
}

export default function VendorSettingsPage() {
  return (
    <>
      <VendorHeader
        title="Settings"
        subtitle="Fulfillment automation, courier integrations, and alert preferences"
      />
      <main className="p-4 sm:p-8">
        <VendorSettingsView />
      </main>
    </>
  )
}
