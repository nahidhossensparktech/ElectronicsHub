'use client'

import { Bell, Menu, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useVendor } from '../context/VendorContext'

export function VendorHeader({
  title,
  subtitle = 'Tech Electronics · Patuatuli, Dhaka',
  action,
  onMenuClick,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
  onMenuClick?: () => void
}) {
  const { openMenu } = useVendor()
  const handleMenuClick = onMenuClick ?? openMenu

  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-8">
      {/* Title & Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleMenuClick}
          className="inline-flex size-9.5 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Action Button */}
        {action ?? (
          <Link
            href="/vendor/products/new"
            className="inline-flex h-9.5 items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-3.5 sm:px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Add Product</span>
          </Link>
        )}

        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="inline-flex size-9 sm:size-9.5 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Search className="size-4" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-9 sm:size-9.5 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        {/* Vendor Avatar & Shop Name */}
        <Link href="/vendor/profile" className="flex items-center gap-2.5 pl-1 sm:pl-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#14213D] text-xs font-bold text-white shadow-2xs">
            KH
          </span>
          <div className="hidden xl:block leading-tight">
            <p className="text-xs font-bold text-slate-900">Kamrul Hasan</p>
            <p className="text-[11px] text-slate-500">Tech Electronics</p>
          </div>
        </Link>
      </div>
    </header>
  )
}
