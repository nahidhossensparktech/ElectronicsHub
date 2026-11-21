'use client'

import { WishlistButton } from '@repo/ui'
import { toggleWishlist, useAppStore } from '@/lib/store'

export function WishlistToggle({ slug, className }: { slug: string; className?: string }) {
  const wishlist = useAppStore((s) => s.wishlist)
  return <WishlistButton active={wishlist.includes(slug)} onToggle={() => toggleWishlist(slug)} className={className} />
}
