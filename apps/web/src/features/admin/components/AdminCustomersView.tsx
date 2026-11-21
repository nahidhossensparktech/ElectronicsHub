'use client'

import { Eye, Filter, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { adminCustomers } from '../data/mock-admin'

const customerMetrics = [
  { title: 'Total customers', value: '25,482', change: '+8.2% vs last month' },
  { title: 'New this month', value: '1,284' },
  { title: 'Active (30 days)', value: '9,610' },
  { title: 'Blocked', value: '38' },
]

const tabs = ['All', 'Active', 'New', 'Blocked'] as const

export function AdminCustomersView() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [search, setSearch] = useState('')

  const filtered = adminCustomers.filter((c) => {
    if (activeTab === 'Active' && c.status !== 'Active') return false
    if (activeTab === 'New' && c.status !== 'New') return false
    if (activeTab === 'Blocked' && c.status !== 'Blocked') return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search)) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {customerMetrics.map((m) => (
          <div key={m.title} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{m.title}</span>
              <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                📦
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
                placeholder="Name, phone or email"
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
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Orders</th>
                <th className="py-3 px-6">Total spent</th>
                <th className="py-3 px-6">Joined</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((customer) => {
                const initials = customer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
                return (
                  <tr key={customer.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${customer.avatarColor || 'bg-slate-700'}`}>
                          {initials}
                        </span>
                        <div>
                          <Link href={`/admin/customers/${customer.id}`} className="font-bold text-slate-900 text-xs hover:text-blue-600">
                            {customer.name}
                          </Link>
                          <p className="text-[11px] text-slate-500">{customer.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">{customer.location}</td>
                    <td className="py-3.5 px-6 text-slate-900 font-semibold">{customer.orders}</td>
                    <td className="py-3.5 px-6 text-slate-900 font-bold">{customer.totalSpent}</td>
                    <td className="py-3.5 px-6 text-slate-500">{customer.joined}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          customer.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : customer.status === 'New'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            customer.status === 'Active'
                              ? 'bg-emerald-500'
                              : customer.status === 'New'
                              ? 'bg-blue-500'
                              : 'bg-rose-500'
                          }`}
                        />
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          title="View Details"
                        >
                          <Eye className="size-4" />
                        </Link>
                        <button
                          type="button"
                          className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          title="Block / Delete"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          <p>Showing 1–{filtered.length} of 25,482</p>
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
