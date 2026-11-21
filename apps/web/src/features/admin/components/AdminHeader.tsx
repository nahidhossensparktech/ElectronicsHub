'use client'

import { Bell, ChevronDown, Clock, Menu, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import { useAdmin } from '../context/AdminContext'

export function AdminHeader({
  title,
  subtitle,
  action,
  onMenuClick,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
  onMenuClick?: () => void
}) {
  const { openMenu } = useAdmin()
  const handleMenuClick = onMenuClick ?? openMenu

  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-8">
      {/* Title & mobile menu */}
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
        {/* Date Filter */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
          <Clock className="size-3.5 text-slate-500" />
          <span>Last 30 days</span>
          <ChevronDown className="size-3.5 text-slate-400" />
        </div>

        {/* Action Button */}
        {action ?? (
          <button
            type="button"
            className="hidden sm:inline-flex h-9.5 items-center justify-center rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            Export Report
          </button>
        )}

        {/* Search Icon */}
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

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#14213D] text-xs font-bold text-white shadow-2xs">
            AU
          </span>
          <div className="hidden xl:block leading-tight">
            <p className="text-xs font-bold text-slate-900">Admin User</p>
            <p className="text-[11px] text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
