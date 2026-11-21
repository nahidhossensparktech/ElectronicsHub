'use client'

import {
  Box,
  ChevronDown,
  ChevronRight,
  Eye,
  Layers,
  MessageSquare,
  Plus,
  ShoppingBag,
} from 'lucide-react'
import Link from 'next/link'
import { vendorDashboardMetrics, vendorOrders } from '../data/mock-vendor'

const quickActionItems = [
  { href: '/vendor/products/new', label: 'Add new product', icon: Plus, color: 'text-blue-600 bg-blue-50' },
  { href: '/vendor/inventory', label: 'Update stock', icon: Layers, color: 'text-indigo-600 bg-indigo-50' },
  { href: '/vendor/orders', label: 'Process orders (14)', icon: ShoppingBag, color: 'text-amber-600 bg-amber-50' },
  { href: '/vendor/messages', label: 'Reply to messages (3)', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
  { href: '/shops/tech-electronics', label: 'Preview my shop', icon: Eye, color: 'text-slate-600 bg-slate-100' },
]

export function VendorDashboardView() {
  const recentOrders = vendorOrders.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vendorDashboardMetrics.map((metric) => (
          <div key={metric.title} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{metric.title}</span>
              <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Box className="size-4" strokeWidth={2.2} />
              </span>
            </div>
            <div className="mt-3.5">
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {metric.value}
              </p>
              {metric.change ? (
                <p className="mt-2 text-xs font-semibold text-emerald-600">
                  {metric.change}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-400">Current active count</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Section: Sales Overview + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Overview Line / Area Chart */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">Sales overview</h2>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 cursor-pointer">
              <span>This year</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-8">
            <div>
              <p className="text-xs text-slate-500 font-medium">This month</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-0.5">৳ 2,48,600</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Orders</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-0.5">118</p>
            </div>
          </div>

          {/* Area Chart Visualization */}
          <div className="mt-6 relative h-48 w-full pt-4">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="vendorSalesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              {/* Area */}
              <path
                d="M0,130 C50,120 100,125 150,105 C200,98 250,110 300,95 C350,85 400,90 450,75 C500,65 550,55 600,40 L600,160 L0,160 Z"
                fill="url(#vendorSalesGrad)"
              />
              {/* Line */}
              <path
                d="M0,130 C50,120 100,125 150,105 C200,98 250,110 300,95 C350,85 400,90 450,75 C500,65 550,55 600,40"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Active dot */}
              <circle cx="600" cy="40" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* Months labels */}
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-400 px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <h2 className="font-display text-lg font-bold text-slate-900">Quick actions</h2>

          <div className="mt-4 space-y-2.5 flex-1 flex flex-col justify-center">
            {quickActionItems.map(({ href, label, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs font-semibold text-slate-800 transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-700"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex size-8 items-center justify-center rounded-lg ${color}`}>
                    <Icon className="size-4" />
                  </span>
                  <span>{label}</span>
                </div>
                <ChevronRight className="size-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Orders */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-display text-base font-bold text-slate-900">Recent orders</h3>
          <Link href="/vendor/orders" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
            <span>View all</span>
            <ChevronRight className="size-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/60">
              <tr>
                <th className="py-3 px-6">Order</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-blue-600">{order.orderNumber}</td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex size-7.5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${order.avatarColor}`}>
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
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        order.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : order.status === 'Processing'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          order.status === 'Pending'
                            ? 'bg-amber-500'
                            : order.status === 'Processing'
                            ? 'bg-blue-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    {order.status === 'Pending' ? (
                      <button
                        type="button"
                        className="rounded-lg bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        Accept
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        ...
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
