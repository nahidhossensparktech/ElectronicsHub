'use client'

import { Edit, Eye, Filter, Plus, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { adminVendors } from '../data/mock-admin'

const vendorMetrics = [
  { title: 'Total vendors', value: '1,842', change: '+46 vs last month' },
  { title: 'Active', value: '1,716' },
  { title: 'Pending approval', value: '27' },
  { title: 'Suspended', value: '14' },
]

const tabs = ['All', 'Active', 'Pending', 'Suspended', 'Rejected'] as const

export function AdminVendorsView() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [search, setSearch] = useState('')

  const filtered = adminVendors.filter((v) => {
    if (activeTab === 'Active' && v.status !== 'Active') return false
    if (activeTab === 'Pending' && v.status !== 'Under review' && v.status !== 'Pending') return false
    if (activeTab === 'Suspended' && v.status !== 'Suspended') return false
    if (activeTab === 'Rejected' && v.status !== 'Rejected') return false
    if (search && !v.shopName.toLowerCase().includes(search.toLowerCase()) && !v.ownerName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vendorMetrics.map((m) => (
          <div key={m.title} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{m.title}</span>
              <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                🏪
              </span>
            </div>
            <p className="mt-3.5 font-display text-2xl sm:text-3xl font-bold text-slate-900">{m.value}</p>
            {m.change && (
              <p className="mt-2 text-xs font-semibold text-emerald-600">{m.change}</p>
            )}
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        {/* Toolbar: Filter Pills + Search */}
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100">
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100/80 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Shop, owner or phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9.5 w-60 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <button
              type="button"
              className="flex h-9.5 items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Filter className="size-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/60">
              <tr>
                <th className="py-3 px-6">Shop</th>
                <th className="py-3 px-6">Owner</th>
                <th className="py-3 px-6">Products</th>
                <th className="py-3 px-6">Orders</th>
                <th className="py-3 px-6">Rating</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${vendor.avatarColor}`}>
                        {vendor.initials}
                      </span>
                      <div>
                        <Link href={`/admin/vendors/${vendor.id}`} className="font-bold text-slate-900 text-xs hover:text-blue-600">
                          {vendor.shopName}
                        </Link>
                        <p className="text-[11px] text-slate-500">{vendor.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-700">{vendor.ownerName}</td>
                  <td className="py-3.5 px-6 text-slate-900 font-semibold">{vendor.products.toLocaleString()}</td>
                  <td className="py-3.5 px-6 text-slate-900 font-semibold">{vendor.orders.toLocaleString()}</td>
                  <td className="py-3.5 px-6">
                    <span className="font-bold text-slate-900">★ {vendor.rating}</span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        vendor.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : vendor.status === 'Under review'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          vendor.status === 'Active'
                            ? 'bg-emerald-500'
                            : vendor.status === 'Under review'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {vendor.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/vendors/${vendor.id}`}
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        title="View Details"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        type="button"
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        title="Edit Shop"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        type="button"
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Suspend"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          <p>Showing 1–{filtered.length} of 1,842</p>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg border border-slate-200 px-2.5 py-1 hover:bg-slate-50">‹</button>
            <button type="button" className="rounded-lg bg-blue-600 px-2.5 py-1 font-semibold text-white">1</button>
            <button type="button" className="rounded-lg border border-slate-200 px-2.5 py-1 hover:bg-slate-50">2</button>
            <button type="button" className="rounded-lg border border-slate-200 px-2.5 py-1 hover:bg-slate-50">3</button>
            <span className="px-1 text-slate-400">...</span>
            <button type="button" className="rounded-lg border border-slate-200 px-2.5 py-1 hover:bg-slate-50">24</button>
            <button type="button" className="rounded-lg border border-slate-200 px-2.5 py-1 hover:bg-slate-50">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
