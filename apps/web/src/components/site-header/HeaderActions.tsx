'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { CountBadge } from '@repo/ui'
import { useAppStore } from '@/lib/store'

function HeaderAction({ href, label, count, children }: { href: string; label: string; count: number; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={`${label} (${count})`}
      className="relative inline-flex size-9 sm:size-[46px] items-center justify-center rounded-xl bg-surface text-ink transition-colors hover:bg-line"
    >
      {children}
      {count > 0 ? <CountBadge count={count} className="absolute -top-1 -right-0.5" /> : null}
    </Link>
  )
}

/** Wishlist + cart buttons with live counts from the store. */
export function HeaderActions({ showWishlistCount }: { showWishlistCount?: boolean }) {
  const cart = useAppStore((s) => s.cart)
  const wishlist = useAppStore((s) => s.wishlist)
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5">
      <HeaderAction href="/account/wishlist" label="Wishlist" count={showWishlistCount ? wishlist.length : 0}>
        <Heart className="size-4.5 sm:size-5" strokeWidth={1.75} />
      </HeaderAction>
      <HeaderAction href="/cart" label="Cart" count={cart.length}>
        <ShoppingCart className="size-4.5 sm:size-5" strokeWidth={1.75} />
      </HeaderAction>
    </div>
  )
}
