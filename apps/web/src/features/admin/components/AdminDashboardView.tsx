'use client'

import { ChevronDown, ChevronRight, Store } from 'lucide-react'
import Link from 'next/link'
import { adminActivities, adminMetrics, adminVendors } from '../data/mock-admin'
import { AdminMetricCard } from './AdminMetricCard'

const monthlyBars = [
  { month: 'Jan', height: 42 },
  { month: 'Feb', height: 50 },
  { month: 'Mar', height: 46 },
  { month: 'Apr', height: 60 },
  { month: 'May', height: 68 },
  { month: 'Jun', height: 62 },
  { month: 'Jul', height: 75 },
  { month: 'Aug', height: 78 },
  { month: 'Sep', height: 76 },
  { month: 'Oct', height: 86 },
  { month: 'Nov', height: 92 },
  { month: 'Dec', height: 100, active: true },
]

const categoryShares = [
  { label: 'Microcontrollers', pct: 34, color: '#2563EB' },
  { label: 'Sensors & Modules', pct: 24, color: '#60A5FA' },
  { label: 'Passive parts', pct: 18, color: '#14213D' },
  { label: 'Power supply', pct: 14, color: '#93C5FD' },
  { label: 'Other', pct: 10, color: '#CBD5E1' },
]

export function AdminDashboardView() {
  const pendingVendors = adminVendors.filter((v) => v.status === 'Under review' || v.status === 'Pending').concat(adminVendors.slice(0, 2))

  return (
    <div className="space-y-6">
      {/* 8 Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminMetrics.map((metric) => (
          <AdminMetricCard key={metric.title} metric={metric} />
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Overview Bar Chart */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">Sales overview</h2>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
              <span>2026</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-8">
            <div>
              <p className="text-xs text-slate-500 font-medium">Gross merchandise value</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-0.5">৳ 3,21,48,000</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Orders</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-0.5">6,214</p>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="mt-8 flex h-52 items-end justify-between gap-2 pt-6">
            {monthlyBars.map((b) => (
              <div key={b.month} className="flex flex-1 flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full max-w-[34px] rounded-t-lg transition-all hover:opacity-85"
                  style={{
                    height: `${b.height}%`,
                    backgroundColor: b.active ? '#2563EB' : '#BFDBFE',
                  }}
                  title={`${b.month}: ${b.height}%`}
                />
                <span className="text-[11px] font-semibold text-slate-500">{b.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Category Donut Chart */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <h2 className="font-display text-lg font-bold text-slate-900">Orders by category</h2>

          {/* SVG Donut */}
          <div className="relative my-4 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="size-44 -rotate-90">
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#CBD5E1" strokeWidth="14" />
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#2563EB" strokeWidth="14" strokeDasharray="81 238" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#60A5FA" strokeWidth="14" strokeDasharray="57 238" strokeDashoffset="-81" />
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#14213D" strokeWidth="14" strokeDasharray="43 238" strokeDashoffset="-138" />
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#93C5FD" strokeWidth="14" strokeDasharray="33 238" strokeDashoffset="-181" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-slate-900">100%</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Category mix</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {categoryShares.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-600 font-medium truncate max-w-[150px]">{c.label}</span>
                </div>
                <span className="font-bold text-slate-900">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activities & Pending Vendor Approvals */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-display text-base font-bold text-slate-900">Recent activities</h3>
            <Link href="/admin/reports" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
              <span>View all</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {adminActivities.map((act) => (
              <div key={act.id} className="py-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 size-2 rounded-full bg-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{act.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{act.subtitle}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 whitespace-nowrap">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Vendor Approvals */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-display text-base font-bold text-slate-900">Pending vendor approvals</h3>
            <Link href="/admin/vendor-approvals" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
              <span>27 pending</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {pendingVendors.map((vendor) => (
              <div key={vendor.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold text-white shrink-0 ${vendor.avatarColor}`}>
                    {vendor.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{vendor.shopName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{vendor.ownerName} · {vendor.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/vendor-approvals`}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
