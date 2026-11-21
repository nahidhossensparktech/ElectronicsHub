'use client'

import Link from 'next/link'
import { Container } from '@repo/ui'
import { footerColumns, paymentMethods } from '@/lib/navigation'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { Logo } from '../logo/Logo'
import { SocialLinks } from './SocialLinks'
import { useTranslation, type TranslationKey } from '@/lib/i18n'

const footerTitleMap: Record<string, TranslationKey> = {
  'Marketplace': 'footer.marketplace',
  'Customer Support': 'footer.support',
  'Company': 'footer.company',
}

const footerLabelMap: Record<string, TranslationKey> = {
  'All Products': 'nav.products',
  'All Categories': 'nav.categories',
  'Popular Shops': 'nav.shops',
  'Wholesale Products': 'nav.wholesale',
  'Deals & Offers': 'nav.deals',
  'Become a Vendor': 'vendorCta.btn',
  'Contact Us': 'nav.contact',
  'Help Center': 'nav.help',
  'About Us': 'nav.about',
}

const paymentBadges = [
  { name: 'bKash', color: 'text-[#e2136e] bg-[#e2136e]/10 border-[#e2136e]/20' },
  { name: 'Nagad', color: 'text-[#f7941d] bg-[#f7941d]/10 border-[#f7941d]/20' },
  { name: 'Rocket', color: 'text-[#9c27b0] bg-[#9c27b0]/10 border-[#9c27b0]/20' },
  { name: 'VISA', color: 'text-[#1a73e8] bg-[#1a73e8]/10 border-[#1a73e8]/20' },
  { name: 'Mastercard', color: 'text-[#ff5f00] bg-[#ff5f00]/10 border-[#ff5f00]/20' },
  { name: 'COD', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
]

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink text-footer-text border-t border-line/10">
      {/* Portals Switcher Bar (Customer, Vendor, Admin) */}
      <div className="border-b border-line/10 bg-ink-950/90 py-3">
        <Container className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-subtle font-medium">
            <span>✨ Portals &amp; Panels:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-ink-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand transition-colors"
            >
              <span>🛍️ Customer Store</span>
            </Link>
            <Link
              href="/vendor"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <span>🏪 Vendor Center</span>
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 px-3 py-1.5 text-xs font-semibold text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <span>🛡️ Admin Panel</span>
            </Link>
            <Link
              href="/vendor/onboarding"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
            >
              <span>🚀 Open a Shop</span>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {/* Column 1: Brand, Description, Social Links, Language Switcher */}
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-[320px] text-xs sm:text-sm leading-relaxed text-line/80">
            {t('footer.about')}
          </p>
          <div className="pt-1">
            <SocialLinks />
          </div>
          <div className="pt-2">
            <LanguageSwitcher theme="dark" />
          </div>
        </div>

        {/* Columns 2, 3, 4: Navigation Columns */}
        {footerColumns.map((column) => {
          const titleKey = footerTitleMap[column.title]
          const displayTitle = titleKey ? t(titleKey) : column.title
          return (
            <div key={column.title} className="pt-1">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                {displayTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                {column.links.map((link) => {
                  const labelKey = footerLabelMap[link.label]
                  const displayLabel = labelKey ? t(labelKey) : link.label
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-footer-text hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 group"
                      >
                        <span className="size-1 rounded-full bg-line/40 group-hover:bg-brand transition-colors" />
                        <span>{displayLabel}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </Container>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-line/10 bg-ink-950 py-4">
        <Container className="flex flex-col gap-4 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">{t('footer.rights')}</p>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="mr-1 text-[11px] text-muted">{t('footer.weAccept')}:</span>
            {paymentBadges.map(({ name, color }) => (
              <span
                key={name}
                className={`inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-bold ${color}`}
              >
                {name}
              </span>
            ))}
          </div>

          {/* Quick Legal links */}
          <div className="flex items-center justify-center gap-4 text-line/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/help" className="hover:text-white transition-colors">Support</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
