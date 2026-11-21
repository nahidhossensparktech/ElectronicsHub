'use client'

import {
  Bell,
  Heart,
  LayoutGrid,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Settings,
  ShoppingCart,
  Store,
  UserRound,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Avatar, CountBadge } from '@repo/ui'
import { cn } from '@repo/utils'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { demoUser } from '@/lib/session'
import { useAppStore } from '@/lib/store'

interface NavItemConfig {
  href: string
  labelKey: TranslationKey
  icon: typeof LayoutGrid
  badge?: 'messages'
}

const navGroupConfigs: { titleEn: string; titleBn: string; items: NavItemConfig[] }[] = [
  {
    titleEn: 'Shopping',
    titleBn: 'শপিং',
    items: [
      { href: '/account', labelKey: 'account.overview', icon: LayoutGrid },
      { href: '/account/orders', labelKey: 'account.orders', icon: Package },
      { href: '/cart', labelKey: 'account.cart', icon: ShoppingCart },
      { href: '/account/wishlist', labelKey: 'account.wishlist', icon: Heart },
    ],
  },
  {
    titleEn: 'Communication',
    titleBn: 'যোগাযোগ',
    items: [
      { href: '/account/messages', labelKey: 'account.messages', icon: MessageCircle, badge: 'messages' },
      { href: '/account/notifications', labelKey: 'account.notifications', icon: Bell },
    ],
  },
  {
    titleEn: 'Account',
    titleBn: 'অ্যাকাউন্ট',
    items: [
      { href: '/account/profile', labelKey: 'account.profile', icon: UserRound },
      { href: '/account/addresses', labelKey: 'account.addresses', icon: MapPin },
      { href: '/account/settings', labelKey: 'account.settings', icon: Settings },
    ],
  },
]

// Flat list for horizontal mobile tabs
const quickTabConfigs: NavItemConfig[] = [
  { href: '/account', labelKey: 'account.overview', icon: LayoutGrid },
  { href: '/account/orders', labelKey: 'account.orders', icon: Package },
  { href: '/account/messages', labelKey: 'account.messages', icon: MessageCircle, badge: 'messages' },
  { href: '/account/wishlist', labelKey: 'account.wishlist', icon: Heart },
  { href: '/account/profile', labelKey: 'account.profile', icon: UserRound },
  { href: '/account/addresses', labelKey: 'account.addresses', icon: MapPin },
  { href: '/account/settings', labelKey: 'account.settings', icon: Settings },
]

function isActive(pathname: string, href: string) {
  return href === '/account' ? pathname === '/account' : pathname.startsWith(href)
}

/** Customer account navigation (desktop sidebar + mobile top bar with drawer). */
export function AccountSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t, isBn } = useTranslation()
  const conversations = useAppStore((s) => s.conversations)
  const unreadMessages = Array.isArray(conversations)
    ? conversations.reduce((n, c) => n + (c?.unread || 0), 0)
    : 0
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* ============================================================== */}
      {/* MOBILE / TABLET NAVIGATION (< lg)                             */}
      {/* ============================================================== */}
      <div className="sticky top-0 z-40 w-full border-b border-line/80 bg-white shadow-2xs lg:hidden">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between px-3 sm:px-4">
          <Link href="/" className="flex items-center">
            <Image src="/brand/logo.png" alt="Electronic Hub.bd" width={135} height={36} priority className="h-7 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher compact />
            <Link href="/account/profile" className="flex items-center gap-1.5 rounded-xl bg-canvas py-1 px-2">
              <Avatar initials={demoUser.initials} color="navy" size="xs" round className="size-6 text-[10px]" />
              <span className="text-xs font-semibold text-ink">{demoUser.firstName}</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open navigation menu'}
              className="inline-flex size-9 items-center justify-center rounded-xl bg-canvas text-ink transition-colors hover:bg-line/60"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Quick Tabs horizontal scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-3 sm:px-4 pb-2.5 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickTabConfigs.map(({ href, labelKey, icon: Icon, badge }) => {
            const active = isActive(pathname, href)
            const label = t(labelKey)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
                  active
                    ? 'bg-brand font-semibold text-white shadow-xs'
                    : 'bg-canvas text-ink/80 hover:bg-line/50',
                )}
              >
                <Icon className={cn('size-3.5', active ? 'text-white' : 'text-muted')} strokeWidth={1.75} />
                <span>{label}</span>
                {badge && unreadMessages ? (
                  <span className={cn('ml-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold', active ? 'bg-white text-brand' : 'bg-brand text-white')}>
                    {unreadMessages}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileOpen ? (
          <div className="border-t border-line/70 bg-canvas px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {navGroupConfigs.map((group) => (
              <div key={group.titleEn}>
                <p className="px-2.5 text-[11px] font-bold tracking-wider text-subtle uppercase">
                  {isBn ? group.titleBn : group.titleEn}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {group.items.map(({ href, labelKey, icon: Icon, badge }) => {
                    const active = isActive(pathname, href)
                    const label = t(labelKey)
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            'flex h-10 items-center gap-3 rounded-xl px-2.5 text-sm font-medium transition-colors',
                            active
                              ? 'bg-brand font-semibold text-white'
                              : 'text-ink hover:bg-white',
                          )}
                        >
                          <Icon className={cn('size-[18px]', active ? 'text-white' : 'text-muted')} strokeWidth={1.75} />
                          <span className="flex-1">{label}</span>
                          {badge && unreadMessages ? (
                            <CountBadge count={unreadMessages} className={cn(active ? 'bg-white text-brand' : 'bg-brand text-white')} />
                          ) : null}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
            <div className="border-t border-line/70 pt-2 space-y-1">
              <Link
                href="/"
                className="flex h-9.5 items-center gap-3 rounded-xl px-2.5 text-sm font-medium text-ink hover:bg-white"
              >
                <Store className="size-[18px] text-muted" />
                <span>{t('nav.store')}</span>
              </Link>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex h-9.5 w-full items-center gap-3 rounded-xl px-2.5 text-sm font-medium text-danger hover:bg-danger-50"
              >
                <LogOut className="size-[18px]" />
                <span>{t('account.logout')}</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* ============================================================== */}
      {/* DESKTOP SIDEBAR (>= lg)                                       */}
      {/* ============================================================== */}
      <aside className="sticky top-0 hidden h-screen w-[272px] shrink-0 flex-col border-r border-line/80 bg-canvas px-4 pt-5 pb-6 lg:flex">
        {/* Brand Logo & Language Switcher */}
        <div className="flex items-center justify-between px-1">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <Image src="/brand/logo.png" alt="Electronic Hub.bd" width={140} height={38} priority className="h-8.5 w-auto object-contain" />
          </Link>
          <LanguageSwitcher compact />
        </div>

        {/* User Profile Card */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-line/70 bg-white p-2.5 shadow-2xs">
          <Avatar initials={demoUser.initials} color="navy" size="sm" round className="size-9 shadow-xs" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{demoUser.name}</p>
            <p className="truncate text-xs font-medium text-muted">{t('account.customer')}</p>
          </div>
          <span className="size-2 rounded-full bg-success ring-4 ring-success/15" title="Online" />
        </div>

        {/* Grouped Navigation Links */}
        <nav className="mt-4 flex-1 space-y-4 overflow-y-auto pr-0.5">
          {navGroupConfigs.map((group) => (
            <div key={group.titleEn}>
              <p className="px-2.5 text-[11px] font-bold tracking-wider text-subtle uppercase">
                {isBn ? group.titleBn : group.titleEn}
              </p>
              <ul className="mt-1.5 space-y-1">
                {group.items.map(({ href, labelKey, icon: Icon, badge }) => {
                  const active = isActive(pathname, href)
                  const label = t(labelKey)
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'group flex h-10 items-center gap-3 rounded-xl px-2.5 text-sm font-medium transition-all duration-150',
                          active
                            ? 'bg-brand font-semibold text-white shadow-xs shadow-brand/20'
                            : 'text-ink/80 hover:bg-white hover:text-brand hover:shadow-2xs',
                        )}
                      >
                        <Icon
                          className={cn(
                            'size-[18px] transition-colors',
                            active ? 'text-white' : 'text-muted group-hover:text-brand',
                          )}
                          strokeWidth={active ? 2 : 1.75}
                        />
                        <span className="flex-1 truncate">{label}</span>
                        {badge && unreadMessages ? (
                          <CountBadge
                            count={unreadMessages}
                            className={cn(active ? 'bg-white text-brand' : 'bg-brand text-white')}
                          />
                        ) : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Navigation */}
        <div className="mt-auto space-y-1 border-t border-line/70 pt-3">
          <Link
            href="/"
            className="flex h-9.5 items-center gap-3 rounded-xl px-2.5 text-sm font-medium text-ink/75 transition-colors hover:bg-white hover:text-brand"
          >
            <Store className="size-[18px] text-muted" strokeWidth={1.75} />
            <span>{t('nav.store')}</span>
          </Link>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex h-9.5 w-full items-center gap-3 rounded-xl px-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger-50"
          >
            <LogOut className="size-[18px]" strokeWidth={1.75} />
            <span>{t('account.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
