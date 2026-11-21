'use client'

import Link from 'next/link'
import type { CartLine } from '@repo/types'
import { Avatar, ShopName } from '@repo/ui'
import { formatBDT } from '@repo/utils'
import { shops } from '@/lib/mock-db/shops'
import { DELIVERY_PER_SHOP } from '@/lib/store'
import { CartItemRow } from './CartItemRow'

/** All cart lines from one shop, with its delivery note and subtotal. */
export function CartShopCard({ shopSlug, lines }: { shopSlug: string; lines: CartLine[] }) {
  const shop = shops.find((s) => s.slug === shopSlug)
  const subtotal = lines.filter((l) => l.selected).reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
  return (
    <section className="rounded-2xl bg-canvas px-5 pt-4 pb-3">
      <header className="flex items-center gap-2.5 pb-1">
        <Avatar initials={shop?.initials ?? 'SH'} color={shop?.color} size="xs" className="size-[30px]" />
        <Link href={`/shops/${shopSlug}`}><ShopName name={lines[0]?.shopName ?? ''} iconSize={14} className="text-base font-semibold text-ink hover:text-brand" /></Link>
        {shop ? <span className="text-[13px] text-muted">· {shop.location}</span> : null}
        <Link href={`/account/messages?shop=${shopSlug}`} className="ml-auto text-[13px] font-semibold text-brand">Message seller</Link>
      </header>
      <ul>{lines.map((l) => <CartItemRow key={l.slug} line={l} />)}</ul>
      <footer className="flex items-center justify-between pt-1 pb-1 text-[13px]">
        <span className="text-muted">Delivery from this shop: Pathao courier · {formatBDT(DELIVERY_PER_SHOP)}</span>
        <span className="font-semibold text-ink">Shop subtotal {formatBDT(Math.round(subtotal * 100) / 100)}</span>
      </footer>
    </section>
  )
}
