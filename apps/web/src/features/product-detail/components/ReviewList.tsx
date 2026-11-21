import type { Review } from '@repo/types'
import { Avatar, RatingStars } from '@repo/ui'
import { initials } from '@repo/utils'

export function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li key={r.id} className="rounded-2xl bg-canvas p-5">
          <div className="flex items-center gap-3">
            <Avatar initials={initials(r.author)} color="slate" size="sm" round />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">{r.author}</p>
              <p className="text-xs text-muted">{r.date}</p>
            </div>
            <RatingStars value={r.rating} size={13} filled />
          </div>
          <p className="mt-3 text-sm text-ink">{r.body}</p>
        </li>
      ))}
    </ul>
  )
}
