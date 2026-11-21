'use client'

import { ChevronDown, UserRound } from 'lucide-react'
import Link from 'next/link'
import { Avatar } from '@repo/ui'
import { useTranslation } from '@/lib/i18n'
import type { SessionUser } from '@/lib/session'

/** Guest: "Welcome / Login / Register". Signed in: avatar + "Hello, Nahid / My Account". */
export function AccountMenu({ user }: { user?: SessionUser }) {
  const { t, isBn } = useTranslation()

  if (!user) {
    return (
      <Link href="/account" className="flex shrink-0 items-center gap-2.5">
        <span className="inline-flex size-[42px] items-center justify-center rounded-full bg-surface text-ink">
          <UserRound className="size-[18px]" strokeWidth={1.75} />
        </span>
        <span className="leading-tight">
          <span className="block text-xs text-muted">{t('nav.welcome')}</span>
          <span className="block text-sm font-semibold text-ink">{t('nav.loginRegister')}</span>
        </span>
      </Link>
    )
  }
  return (
    <Link href="/account" className="flex shrink-0 items-center gap-2.5">
      <Avatar initials={user.initials} color="navy" size="md" round className="size-[42px]" />
      <span className="leading-tight">
        <span className="block text-xs text-muted">{isBn ? `হ্যালো, ${user.firstName}` : `Hello, ${user.firstName}`}</span>
        <span className="flex items-center gap-1 text-sm font-semibold text-ink">
          {t('nav.account')}
          <ChevronDown className="size-3.5 text-muted" />
        </span>
      </span>
    </Link>
  )
}
