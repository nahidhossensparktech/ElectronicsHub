'use client'

import { Clock, Download, Eye, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { adminOrders } from '../data/mock-admin'

const tabs = ['All', 'Processing', 'Delivered', 'Pending', 'Cancelled'] as const

export function AdminOrdersView() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [search, setSearch] = useState('')

  const filtered = adminOrders.filter((o) => {
    if (activeTab !== 'All' && o.status !== activeTab) return false
    if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Orders</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">48,920</p>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">+12.6% vs last month</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Pending Fulfillment</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">314</p>
          <p className="mt-1 text-xs text-slate-400">Needs vendor attention</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Marketplace GMV</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">৳ 3.2 Cr</p>
          <p className="mt-1 text-xs text-blue-600 font-semibold">Last 30 days</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Platform Commission</p>
          <p className="mt-2 text-2xl font-bold text-purple-600">৳ 16.0 L</p>
          <p className="mt-1 text-xs text-slate-400">Average 5.0% take rate</p>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100/80 p-1">
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
                placeholder="Search order # or customer"
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
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/60">
              <tr>
                <th className="py-3 px-6">Order</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Vendor / Shop</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Commission</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-blue-600">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">{order.customer}</td>
                  <td className="py-3.5 px-6 text-slate-700">{order.shop}</td>
                  <td className="py-3.5 px-6 text-slate-500">{order.date}</td>
                  <td className="py-3.5 px-6 text-slate-900 font-semibold">{order.items}</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{order.total}</td>
                  <td className="py-3.5 px-6 text-emerald-600 font-semibold">{order.commission}</td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : order.status === 'Processing'
                          ? 'bg-blue-50 text-blue-700'
                          : order.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500'
                            : order.status === 'Processing'
                            ? 'bg-blue-500'
                            : order.status === 'Pending'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      title="View Order Details"
                    >
                      <Eye className="size-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          <p>Showing 1–{filtered.length} of 48,920</p>
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
