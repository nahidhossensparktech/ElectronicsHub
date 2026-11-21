'use client'

import { CircleCheck, MessageCircle, Percent, ShieldCheck, Tag, Truck } from 'lucide-react'
import Link from 'next/link'
import type { AppNotification, NotificationKind } from '@repo/types'
import { cn } from '@repo/utils'
import { markNotificationRead } from '@/lib/store'

const meta: Record<NotificationKind, { Icon: typeof Truck; className: string; href: string }> = {
  order: { Icon: Truck, className: 'text-brand', href: '/account/orders' },
  message: { Icon: MessageCircle, className: 'text-brand', href: '/account/messages' },
  offer: { Icon: Percent, className: 'text-warning-700', href: '/account/wishlist' },
  delivered: { Icon: CircleCheck, className: 'text-success', href: '/account/orders' },
  security: { Icon: ShieldCheck, className: 'text-brand', href: '/account/settings' },
  deal: { Icon: Tag, className: 'text-warning', href: '/deals' },
}

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const { Icon, className, href } = meta[notification.kind]
  return (
    <li>
      <Link href={href} onClick={() => markNotificationRead(notification.id)} className={cn('flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors', notification.unread ? 'bg-brand-50 hover:bg-brand-100' : 'bg-canvas hover:bg-surface')}>
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white"><Icon className={cn('size-[18px]', className)} strokeWidth={1.75} /></span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">{notification.title}</p>
          <p className="mt-0.5 text-[13px] text-muted">{notification.body}</p>
        </div>
        <span className="text-xs text-muted">{notification.time}</span>
        {notification.unread ? <span className="size-2 rounded-full bg-brand" aria-label="Unread" /> : null}
      </Link>
    </li>
  )
}
