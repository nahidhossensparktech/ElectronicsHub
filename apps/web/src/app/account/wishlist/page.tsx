import type { Metadata } from 'next'
import { WishlistView } from '@/features/account'

export const metadata: Metadata = { title: 'Wishlist' }

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <WishlistView />
    </div>
  )
}
