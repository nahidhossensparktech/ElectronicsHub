import type { Metadata } from 'next'
import { AddressesView } from '@/features/account'

export const metadata: Metadata = { title: 'My Addresses' }

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <AddressesView />
    </div>
  )
}
