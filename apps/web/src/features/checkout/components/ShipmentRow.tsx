import type { AvatarColor } from '@repo/types'
import { Avatar, StatusPill } from '@repo/ui'

export function ShipmentRow({ initials, color, shop, note }: { initials: string; color: AvatarColor; shop: string; note: string }) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5">
      <Avatar initials={initials} color={color} size="sm" />
      <span className="flex-1">
        <span className="block text-sm font-semibold text-ink">{shop}</span>
        <span className="block text-xs text-muted">{note}</span>
      </span>
      <StatusPill tone="warning">Awaiting confirmation</StatusPill>
    </li>
  )
}
