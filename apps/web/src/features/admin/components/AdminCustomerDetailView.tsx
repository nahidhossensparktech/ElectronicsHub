'use client'

import { ArrowLeft, Ban, CheckCircle2, Mail, MapPin, Package, Phone, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { adminCustomers, adminOrders } from '../data/mock-admin'

export function AdminCustomerDetailView({ id }: { id: string }) {
  const customer = adminCustomers.find((c) => c.id === id) ?? adminCustomers[0]!
  const initials = customer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
  const orders = adminOrders.slice(0, 3)

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back button */}
      <div>
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Customers</span>
        </Link>
      </div>

      {/* Customer Header Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`flex size-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md ${customer.avatarColor || 'bg-slate-700'}`}>
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-xl font-bold text-slate-900">{customer.name}</h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {customer.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Customer ID: <span className="font-mono">{customer.id}</span> · Joined {customer.joined}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Mail className="size-3.5" />
            <span>Send Message</span>
          </button>
          <button
            type="button"
            className="h-9.5 px-4 rounded-xl border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <Ban className="size-3.5" />
            <span>Block</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Spent</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{customer.totalSpent}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Average ৳ 767 / order</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Orders</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{customer.orders}</p>
          <p className="mt-1 text-xs text-slate-400">100% completion rate</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Reward Points</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">420 pts</p>
          <p className="mt-1 text-xs text-blue-600 font-medium">Gold Tier Member</p>
        </div>
      </div>

      {/* Info & Addresses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900">Contact details</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="size-4 text-slate-400" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Mail className="size-4 text-slate-400" />
              <span>{customer.name.toLowerCase().replace(/\s+/g, '')}@gmail.com</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <MapPin className="size-4 text-slate-400" />
              <span>{customer.location}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900">Default shipping address</h3>
          <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-900">{customer.name}</p>
            <p className="mt-1">House 14, Road 5, Block C</p>
            <p>{customer.location}, Bangladesh</p>
            <p className="mt-1 text-slate-500">{customer.phone}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-slate-900">Order history</h3>
          <span className="text-xs text-slate-400">{orders.length} orders shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Order</th>
                <th className="py-3 px-6">Shop</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-6 font-bold text-blue-600">{o.orderNumber}</td>
                  <td className="py-3 px-6 text-slate-800 font-medium">{o.shop}</td>
                  <td className="py-3 px-6 text-slate-500">{o.date}</td>
                  <td className="py-3 px-6 text-slate-900">{o.items}</td>
                  <td className="py-3 px-6 font-bold text-slate-900">{o.total}</td>
                  <td className="py-3 px-6">
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <Link href={`/admin/orders/${o.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                      View ›
                    </Link>
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
