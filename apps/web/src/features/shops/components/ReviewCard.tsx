import type { Review } from '@repo/types'
import { Avatar, RatingStars } from '@repo/ui'
import { initials } from '@repo/utils'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl bg-white p-5">
      <div className="flex items-center gap-3">
        <Avatar initials={initials(review.author)} color="slate" size="sm" round />
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">{review.author}</p>
          <p className="text-xs text-muted">{review.date}</p>
        </div>
        <RatingStars value={review.rating} size={13} filled />
      </div>
      <p className="mt-3.5 text-[13px] leading-5 text-ink">{review.body}</p>
    </article>
  )
}
