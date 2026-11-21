'use client'

import {
  Heart,
  LayoutGrid,
  Menu,
  MessageCircle,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tag,
  UserRound,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Avatar, Container } from '@repo/ui'
import { cn } from '@repo/utils'
import { useTranslation } from '@/lib/i18n'
import type { SessionUser } from '@/lib/session'
import { useAppStore } from '@/lib/store'
import { Logo } from '../logo/Logo'
import { AccountMenu } from './AccountMenu'
import { HeaderActions } from './HeaderActions'
import { HeaderSearch } from './HeaderSearch'
import { LocationPicker } from './LocationPicker'

/** Fully responsive top bar with desktop search/actions and mobile drawer navigation. */
export function SiteHeader({ user }: { user?: SessionUser }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const { t, isBn } = useTranslation()
  const cart = useAppStore((s) => s.cart)
  const wishlist = useAppStore((s) => s.wishlist)

  // Close drawers when navigating
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileSearchOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white shadow-2xs">
      <Container className="flex h-16 md:h-[82px] items-center">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen((o) => !o)
            setMobileSearchOpen(false)
          }}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="mr-2.5 inline-flex size-9.5 items-center justify-center rounded-xl bg-canvas text-ink transition-colors hover:bg-line/60 md:hidden"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Brand Logo */}
        <Logo />

        {/* Desktop Search */}
        <div className="ml-7 hidden flex-1 md:flex">
          <HeaderSearch />
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3.5 pl-2 md:pl-9">
          {/* Desktop Location Picker */}
          <div className="hidden lg:block">
            <LocationPicker />
          </div>

          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen((o) => !o)
              setMobileMenuOpen(false)
            }}
            aria-label="Toggle search"
            className="inline-flex size-9 sm:size-[46px] items-center justify-center rounded-xl bg-surface text-ink transition-colors hover:bg-line md:hidden"
          >
            {mobileSearchOpen ? <X className="size-4" /> : <Search className="size-4" />}
          </button>

          {/* Wishlist & Cart Actions */}
          <HeaderActions showWishlistCount={Boolean(user)} />

          {/* Desktop Account Menu */}
          <div className="ml-4 hidden sm:block">
            <AccountMenu user={user} />
          </div>
        </div>
      </Container>

      {/* Mobile Search Bar Dropdown */}
      {mobileSearchOpen ? (
        <div className="border-t border-line/60 bg-white px-4 py-3 md:hidden animate-in slide-in-from-top-1">
          <form action="/search" className="flex h-11 items-center rounded-xl bg-surface px-3">
            <Search className="size-4.5 shrink-0 text-muted" />
            <input
              name="q"
              type="search"
              placeholder={isBn ? 'ইলেকট্রনিক্স কম্পোনেন্ট, পার্টস খুঁজুন...' : 'Search components, ICs, sensors...'}
              autoFocus
              className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-xs text-ink outline-none placeholder:text-subtle"
            />
            <button
              type="submit"
              className="h-8 shrink-0 rounded-lg bg-brand px-3.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {isBn ? 'অনুসন্ধান' : 'Search'}
            </button>
          </form>
        </div>
      ) : null}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen ? (
        <div className="border-t border-line/70 bg-canvas px-4 py-4 md:hidden animate-in slide-in-from-top-2 duration-150 shadow-xl max-h-[calc(100dvh-70px)] overflow-y-auto">
          {/* User Profile / Login row */}
          {user ? (
            <div className="flex items-center justify-between rounded-2xl border border-line/70 bg-white p-3 shadow-2xs">
              <Link href="/account" className="flex items-center gap-2.5 min-w-0">
                <Avatar initials={user.initials} color="navy" size="sm" round className="size-10 shadow-xs" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                  <p className="text-xs text-brand font-medium">{isBn ? 'আমার অ্যাকাউন্ট' : 'My Account'}</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-2xl border border-line/70 bg-white p-3 shadow-2xs">
              <Link href="/account" className="flex items-center gap-2 text-sm font-semibold text-ink">
                <UserRound className="size-5 text-muted" />
                <span>{isBn ? 'লগইন / রেজিস্টার' : 'Login / Register'}</span>
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <div className="mt-4 space-y-1">
            <p className="px-2 text-[11px] font-bold tracking-wider text-subtle uppercase">
              {isBn ? 'মেনু' : 'Menu'}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <Link
                href="/products"
                className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs font-semibold text-ink shadow-2xs hover:bg-brand-50 hover:text-brand"
              >
                <ShoppingBag className="size-4 text-brand" />
                <span>{t('nav.products')}</span>
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs font-semibold text-ink shadow-2xs hover:bg-brand-50 hover:text-brand"
              >
                <LayoutGrid className="size-4 text-brand" />
                <span>{t('nav.categories')}</span>
              </Link>
              <Link
                href="/shops"
                className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs font-semibold text-ink shadow-2xs hover:bg-brand-50 hover:text-brand"
              >
                <Store className="size-4 text-brand" />
                <span>{t('nav.shops')}</span>
              </Link>
              <Link
                href="/wholesale"
                className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs font-semibold text-ink shadow-2xs hover:bg-brand-50 hover:text-brand"
              >
                <Package className="size-4 text-brand" />
                <span>{t('nav.wholesale')}</span>
              </Link>
              <Link
                href="/deals"
                className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs font-semibold text-ink shadow-2xs hover:bg-brand-50 hover:text-brand"
              >
                <Tag className="size-4 text-brand" />
                <span>{t('nav.deals')}</span>
              </Link>
              <Link
                href="/account/messages"
                className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs font-semibold text-ink shadow-2xs hover:bg-brand-50 hover:text-brand"
              >
                <MessageCircle className="size-4 text-brand" />
                <span>{t('account.messages')}</span>
              </Link>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="mt-4 border-t border-line/70 pt-3 flex items-center justify-between text-xs text-muted px-1">
            <span className="flex items-center gap-1.5">
              <span>📍</span>
              <span>{isBn ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</span>
            </span>
            <Link href="/help" className="hover:text-brand font-medium">
              {t('nav.help')}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
