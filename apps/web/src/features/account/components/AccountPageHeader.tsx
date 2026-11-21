'use client'

import { Bell, Search } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Avatar, CountBadge } from '@repo/ui'
import { useAppStore } from '@/lib/store'

const iconBtn = 'relative inline-flex size-9 sm:size-[46px] items-center justify-center rounded-xl bg-surface text-ink transition-colors hover:bg-line shrink-0'

/** Page title + subtitle with search, notifications and the user chip on the right. */
export function AccountPageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  const profile = useAppStore((s) => s.profile)
  const notifications = useAppStore((s) => s.notifications)
  const unread = notifications.filter((n) => n.unread).length
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="font-display text-xl sm:text-2xl leading-7 sm:leading-8 font-bold text-ink">{title}</h1>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3.5">
        {actions}
        <Link href="/search" aria-label="Search products" className={iconBtn}><Search className="size-4 sm:size-[18px]" strokeWidth={1.75} /></Link>
        <Link href="/account/notifications" aria-label={`Notifications (${unread} unread)`} className={iconBtn}>
          <Bell className="size-4 sm:size-[18px]" strokeWidth={1.75} />
          {unread ? <CountBadge count={unread} className="absolute -top-1 -right-1" /> : null}
        </Link>
        <Link href="/account/profile" aria-label="My profile" className="flex h-9 sm:h-11 items-center gap-2 rounded-xl bg-surface px-2 sm:pr-3.5 sm:pl-1.5 hover:bg-line shrink-0">
          <Avatar initials={profile.initials} color="slate" size="sm" className="size-7 sm:size-8" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-ink">{profile.name}</span>
            <span className="block text-xs text-muted">Customer</span>
          </span>
        </Link>
      </div>
    </header>
  )
}
