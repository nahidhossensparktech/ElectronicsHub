'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@repo/types'
import { Chip, ProductCard } from '@repo/ui'
import { AddToCartButton, WishlistToggle } from '@/components/product'

/** Chips that filter the trending row by category (client-side). */
export function TrendingFilters({ filters, products }: { filters: { label: string; category: string | null }[]; products: Product[] }) {
  const [active, setActive] = useState<string | null>(null)
  const visible = useMemo(() => (active ? products.filter((p) => p.categorySlug === active) : products), [active, products])
  return (
    <>
      <div className="mt-[30px] flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <Chip key={f.label} active={f.category === active} size="sm" onClick={() => setActive(f.category)}>
            {f.label}
          </Chip>
        ))}
      </div>
      <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} action={<AddToCartButton product={p} />} wishlist={<WishlistToggle slug={p.slug} />} />
        ))}
        {visible.length === 0 ? <p className="col-span-full rounded-2xl bg-canvas py-12 text-center text-sm text-muted">No trending products in this category right now.</p> : null}
      </div>
    </>
  )
}
