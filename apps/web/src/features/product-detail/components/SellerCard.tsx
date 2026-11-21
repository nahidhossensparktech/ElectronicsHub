import type { Shop } from '@repo/types'
import { Avatar, LinkButton, ShopName } from '@repo/ui'

/** "Sold by" card with shop stats and contact actions. */
export function SellerCard({ shop }: { shop: Shop }) {
  const stats = [
    { value: String(shop.rating), label: 'Rating' },
    { value: String(shop.productCount), label: 'Products' },
    { value: '~15 min', label: 'Reply time' },
  ]
  return (
    <aside className="w-full self-start rounded-[20px] bg-white p-6 lg:w-[420px]">
      <p className="text-[13px] text-muted">Sold by</p>
      <div className="mt-3.5 flex items-center gap-3.5">
        <Avatar initials={shop.initials} color={shop.color} size="lg" className="size-[60px] rounded-[14px] text-lg" />
        <div>
          <ShopName name={shop.name} iconSize={15} className="font-display text-xl font-bold text-ink" />
          <p className="mt-1 text-[13px] text-muted">{shop.location}</p>
        </div>
      </div>
      <div className="mt-[18px] grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white px-[13px] py-3">
            <p className="text-base font-bold text-ink">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-[18px] grid grid-cols-2 gap-2.5">
        <LinkButton href={`/account/messages?shop=${shop.slug}`} size="lg">Message Seller</LinkButton>
        <LinkButton href={`/shops/${shop.slug}`} size="lg" variant="secondary">
          Visit Shop
        </LinkButton>
      </div>
      <p className="mt-4 text-xs text-muted">Open Sat–Thu, 10 am – 9 pm · Accepts bKash, Nagad, COD</p>
    </aside>
  )
}
