'use client'

import { useMemo, useState } from 'react'
import { Button, Chip } from '@repo/ui'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProductBySlug } from '@/lib/mock-db/products'
import { addToCart, useAppStore } from '@/lib/store'
import { AccountPageHeader } from './AccountPageHeader'

const dropped = new Set(['arduino-uno-r3', 'dt-830d-multimeter'])

export function WishlistView() {
  const wishlist = useAppStore((s) => s.wishlist)
  const [filter, setFilter] = useState<'all' | 'stock' | 'dropped'>('all')
  const [msg, setMsg] = useState('')
  const products = useMemo(() => wishlist.map(getProductBySlug).filter((p) => p !== undefined), [wishlist])
  const visible = products.filter((p) => filter === 'all' || (filter === 'stock' ? p.stock > 0 : dropped.has(p.slug)))
  const flash = (text: string) => { setMsg(text); setTimeout(() => setMsg(''), 2000) }
  return (
    <>
      <AccountPageHeader title="Wishlist" subtitle={`${products.length} saved product${products.length === 1 ? '' : 's'}`} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2.5">
          <Chip active={filter === 'all'} onClick={() => setFilter('all')}>All ({products.length})</Chip>
          <Chip active={filter === 'stock'} onClick={() => setFilter('stock')}>In stock ({products.filter((p) => p.stock > 0).length})</Chip>
          <Chip active={filter === 'dropped'} onClick={() => setFilter('dropped')}>Price dropped ({products.filter((p) => dropped.has(p.slug)).length})</Chip>
        </div>
        <div className="flex items-center gap-2.5">
          {msg ? <span className="text-sm font-medium text-success">{msg}</span> : null}
          <Button variant="secondary" size="lg" onClick={async () => { await navigator.clipboard?.writeText(window.location.href).catch(() => {}); flash('Link copied') }}>Share list</Button>
          <Button size="lg" disabled={!products.some((p) => p.stock > 0)} onClick={() => { products.filter((p) => p.stock > 0).forEach((p) => addToCart(p, 1)); flash('Added to cart') }}>Add all to cart</Button>
        </div>
      </div>
      {products.length === 0 ? (
        <p className="rounded-2xl bg-canvas py-16 text-center text-sm text-muted">Your wishlist is empty. Tap the heart on any product to save it.</p>
      ) : (
        <ProductGrid columns={4} products={visible} />
      )}
    </>
  )
}
