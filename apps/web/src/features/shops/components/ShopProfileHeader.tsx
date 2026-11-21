import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import type { Shop } from '@repo/types'
import { Avatar, MetricTile, StatusPill, VerifiedIcon } from '@repo/ui'
import { formatNumber } from '@repo/utils'
import { ShopActions } from './ShopActions'

/** Banner, identity row, actions and five shop metrics. */
export function ShopProfileHeader({ shop }: { shop: Shop }) {
  const metrics = [
    { value: formatNumber(shop.productCount), label: 'Products' },
    { value: `${shop.rating} ★`, label: `${shop.reviewCount} reviews` },
    { value: '~20 min', label: 'Reply time' },
    { value: '98%', label: 'Positive feedback' },
    { value: 'Mar 2025', label: 'Joined' },
  ]

  return (
    <>
      {/* Shop Banner */}
      <div className="relative mt-4 sm:mt-[30px] h-[160px] sm:h-[220px] md:h-[260px] overflow-hidden rounded-2xl sm:rounded-3xl bg-brand shadow-xs">
        <Image unoptimized src="/brand/shop-banner.svg" alt="" fill priority className="object-cover" />
      </div>

      {/* Identity row with Avatar prominently positioned on top of the banner */}
      <div className="relative z-10 flex flex-col gap-4 px-3 sm:px-6 md:px-8 md:flex-row md:items-start">
        <Avatar
          initials={shop.initials}
          color={shop.color}
          className="relative z-20 -mt-10 sm:-mt-12 md:-mt-[56px] size-20 sm:size-24 md:size-28 shrink-0 rounded-2xl sm:rounded-3xl text-2xl sm:text-[32px] font-bold ring-4 ring-white shadow-lg"
        />

        <div className="flex-1 min-w-0 md:pt-4">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h1 className="font-display text-2xl sm:text-[32px] leading-tight font-bold text-ink truncate max-w-full">
              {shop.name}
            </h1>
            <VerifiedIcon size={20} />
            <StatusPill tone="success" className="px-3">Verified seller</StatusPill>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0 text-muted" />
              Shop 14, {shop.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-success">
              <Clock className="size-4 shrink-0 text-muted" />
              Open now · 10 am – 8 pm
            </span>
          </p>
        </div>

        <div className="md:pt-3">
          <ShopActions shopSlug={shop.slug} />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
        {metrics.map((m) => (
          <MetricTile
            key={m.label}
            value={m.value}
            label={m.label}
            className="rounded-[14px] px-3.5 sm:px-[19px] py-3.5 sm:py-[18px] [&>p:first-child]:text-lg sm:[&>p:first-child]:text-xl"
          />
        ))}
      </div>
    </>
  )
}
