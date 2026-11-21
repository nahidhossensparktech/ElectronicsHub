import type { Metadata } from 'next'
import { VendorHeader, VendorMessagesView } from '@/features/vendor'

export const metadata: Metadata = {
  title: 'Customer Inquiries & Messages - Vendor Center',
}

export default function VendorMessagesPage() {
  return (
    <>
      <VendorHeader
        title="Messages"
        subtitle="Chat directly with buyers, answer technical pinout questions, and negotiate bulk quotes"
      />
      <main className="p-4 sm:p-8">
        <VendorMessagesView />
      </main>
    </>
  )
}
