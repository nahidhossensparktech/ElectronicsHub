import type { Review } from '@repo/types'
import { Button, RatingStars } from '@repo/ui'
import { ReviewCard } from './ReviewCard'

export function ShopReviews({ rating, count, reviews }: { rating: number; count: number; reviews: Review[] }) {
  return (
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display text-[40px] leading-none font-bold text-ink">{rating}</span>
          <div>
            <RatingStars value={rating} size={16} filled />
            <p className="mt-1 text-[13px] text-muted">Based on {count} reviews</p>
          </div>
        </div>
        <Button variant="outline">Write a review</Button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </section>
  )
}
