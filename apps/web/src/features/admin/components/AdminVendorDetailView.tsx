'use client'

import { ArrowLeft, CheckCircle2, Edit, FileText, MapPin, Package, Phone, ShieldCheck, Star, Store, User, XCircle } from 'lucide-react'
import Link from 'next/link'
import { adminProducts, adminVendors } from '../data/mock-admin'

export function AdminVendorDetailView({ id }: { id: string }) {
  const vendor = adminVendors.find((v) => v.id === id) ?? adminVendors[0]!
  const products = adminProducts.slice(0, 3)

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back button */}
      <div>
        <Link
          href="/admin/vendors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Vendors</span>
        </Link>
      </div>

      {/* Vendor Header Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`flex size-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md ${vendor.avatarColor}`}>
            {vendor.initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-xl font-bold text-slate-900">{vendor.shopName}</h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {vendor.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Owner: <strong className="text-slate-700">{vendor.ownerName}</strong> · Vendor ID: <span className="font-mono">{vendor.id}</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin className="size-3" />
              <span>{vendor.location}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9.5 px-4 rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="size-3.5" />
            <span>Approve / Verify</span>
          </button>
          <button
            type="button"
            className="h-9.5 px-4 rounded-xl border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <XCircle className="size-3.5" />
            <span>Suspend</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Products Listed</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{vendor.products.toLocaleString()}</p>
          <p className="mt-1 text-xs text-blue-600 font-medium">98% in stock</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Orders</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{vendor.orders.toLocaleString()}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">+12% this month</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Rating</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">★ {vendor.rating}</p>
          <p className="mt-1 text-xs text-slate-400">Based on 320 reviews</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Commission Earned</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">৳ 1,42,800</p>
          <p className="mt-1 text-xs text-purple-600 font-medium">5% marketplace cut</p>
        </div>
      </div>

      {/* Verification Documents & Bank */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900">Submitted verification documents</h3>
          <div className="space-y-3">
            {[
              { name: 'Trade Licence (Dhaka City Corp)', file: 'TL-2024-88421.pdf', status: 'Verified' },
              { name: 'Owner National ID (NID Card)', file: 'nid-kamrul-hasan.pdf', status: 'Verified' },
              { name: 'Physical Storefront Photo', file: 'patuatuli-store.jpg', status: 'Verified' },
            ].map((doc) => (
              <div key={doc.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="size-4.5 text-blue-600" />
                  <div>
                    <p className="font-bold text-slate-900">{doc.name}</p>
                    <p className="text-[11px] text-slate-400">{doc.file}</p>
                  </div>
                </div>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">
                  ✓ {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900">Payout & Settlement</h3>
          <div className="text-xs space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 font-medium">Payout Method</p>
              <p className="text-slate-900 font-bold text-sm mt-0.5">bKash Merchant Account</p>
              <p className="text-slate-500 font-mono mt-0.5">01711-•••••0</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 font-medium">Next Scheduled Settlement</p>
              <p className="text-slate-900 font-bold text-sm mt-0.5">Sunday, 24 Nov 2026 (৳ 38,400)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products from this shop */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-slate-900">Featured products from {vendor.shopName}</h3>
          <Link href="/admin/products" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
            View all products ›
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {products.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/60">
              <div>
                <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                <p className="text-slate-500 mt-0.5">{p.category} · SKU: {p.sku}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 text-sm">{p.price}</p>
                <p className="text-emerald-600 font-semibold">{p.stock} in stock</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
