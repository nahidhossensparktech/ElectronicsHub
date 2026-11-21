'use client'

import { Box, ChevronDown, Clock, Eye, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { vendorOrderMetrics, vendorOrders } from '../data/mock-vendor'

const orderTabs = [
  { key: 'all', label: 'All (386)' },
  { key: 'pending', label: 'Pending (14)' },
  { key: 'processing', label: 'Processing (9)' },
  { key: 'shipped', label: 'Shipped (21)' },
  { key: 'delivered', label: 'Delivered (330)' },
  { key: 'cancelled', label: 'Cancelled (12)' },
] as const

export function VendorOrdersView() {
  const [activeTab, setActiveTab] = useState<string>('pending')
  const [search, setSearch] = useState('')

  const filtered = vendorOrders.filter((o) => {
    if (activeTab === 'pending' && o.status !== 'Pending') return false
    if (activeTab === 'processing' && o.status !== 'Processing') return false
    if (activeTab === 'shipped' && o.status !== 'Shipped') return false
    if (activeTab === 'delivered' && o.status !== 'Delivered') return false
    if (activeTab === 'cancelled' && o.status !== 'Cancelled') return false
    if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vendorOrderMetrics.map((m) => (
          <div key={m.title} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{m.title}</span>
              <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Box className="size-4" strokeWidth={2.2} />
              </span>
            </div>
            <p className="mt-3.5 font-display text-2xl sm:text-3xl font-bold text-slate-900">{m.value}</p>
            {m.change && (
              <p className="mt-2 text-xs font-semibold text-emerald-600">{m.change}</p>
            )}
          </div>
        ))}
      </div>

      {/* Orders Table Container */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100/80 p-1">
            {orderTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab.key ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Order ID or customer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9.5 w-52 sm:w-60 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <Clock className="size-3.5 text-slate-400" />
              <span className="hidden sm:inline">Last 30 days</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/60">
              <tr>
                <th className="py-3 px-6">Order</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Payment</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-blue-600">
                    <Link href={`/vendor/orders/${order.id}`} className="hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${order.avatarColor}`}>
                        {order.customerInitials}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{order.customerName}</p>
                        <p className="text-[11px] text-slate-400">{order.customerLocation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">{order.date}</td>
                  <td className="py-3.5 px-6 text-slate-900 font-semibold">{order.itemsCount}</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{order.total}</td>
                  <td className="py-3.5 px-6">
                    <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        order.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : order.status === 'Processing'
                          ? 'bg-blue-50 text-blue-700'
                          : order.status === 'Shipped'
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          order.status === 'Pending'
                            ? 'bg-amber-500'
                            : order.status === 'Processing'
                            ? 'bg-blue-500'
                            : order.status === 'Shipped'
                            ? 'bg-indigo-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    {order.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    ) : order.status === 'Processing' ? (
                      <button
                        type="button"
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        Mark shipped
                      </button>
                    ) : (
                      <Link
                        href={`/vendor/orders/${order.id}`}
                        className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        View
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          <p>Showing 1–{filtered.length} of 14</p>
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
