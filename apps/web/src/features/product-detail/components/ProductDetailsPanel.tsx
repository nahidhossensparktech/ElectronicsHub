'use client'

import { useState } from 'react'
import type { ProductDetail, Review } from '@repo/types'
import { SegmentedTabs } from '@repo/ui'
import { SpecTable } from './SpecTable'
import { ReviewList } from './ReviewList'

/** White card with working tabs: specifications, description, reviews and delivery. */
export function ProductDetailsPanel({ product, reviews }: { product: ProductDetail; reviews: Review[] }) {
  const [tab, setTab] = useState('specs')
  return (
    <div className="min-w-0 flex-1 rounded-[20px] bg-white p-7">
      <SegmentedTabs
        value={tab}
        onChange={setTab}
        items={[
          { value: 'specs', label: 'Specifications' },
          { value: 'description', label: 'Description' },
          { value: 'reviews', label: `Reviews (${product.reviewCount})` },
          { value: 'delivery', label: 'Delivery & Returns' },
        ]}
        className="max-w-full overflow-x-auto [&_button]:h-10 [&_button]:px-[19px]"
      />
      <div className="mt-7">
        {tab === 'specs' ? (
          <>
            <SpecTable specs={product.specs} />
            <h2 className="mt-7 font-display text-lg font-bold text-ink">Description</h2>
            <p className="mt-3 text-[15px] leading-[26px] text-muted">{product.description}</p>
          </>
        ) : null}
        {tab === 'description' ? <p className="text-[15px] leading-[26px] text-muted">{product.description}</p> : null}
        {tab === 'reviews' ? <ReviewList reviews={reviews} /> : null}
        {tab === 'delivery' ? (
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[26px] text-muted">
            <li>{product.delivery}. Delivery fee is set by the shop (usually ৳60 inside Dhaka).</li>
            <li>Cash on delivery, bKash, Nagad and cards are accepted.</li>
            <li>Return within 7 days if the item is damaged, defective or not as described.</li>
          </ul>
        ) : null}
      </div>
    </div>
  )
}
