'use client'

import {
  ExternalLink,
  Eye,
  MapPin,
  MoreVertical,
  Package,
  Search,
  Star,
  Store,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { adminVendors } from '../data/mock-admin'

export function AdminShopsView() {
  const [search, setSearch] = useState('')

  const filtered = adminVendors.filter((v) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      return v.shopName.toLowerCase().includes(q) || v.ownerName.toLowerCase().includes(q) || v.location.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Active Vendor Shops</h1>
          <p className="text-xs text-slate-500 mt-1">Manage public storefronts, review catalog sizes and performance</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search shops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Shops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((shop) => (
          <div
            key={shop.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-12 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-sm ${shop.avatarColor}`}
                  >
                    {shop.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{shop.shopName}</h3>
                    <p className="text-xs text-slate-500">{shop.ownerName}</p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                  {shop.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Package className="size-3.5 text-blue-600" />
                  <strong>{shop.products}</strong> products
                </span>
                <span className="flex items-center gap-1">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <strong>{shop.rating}</strong> (480 reviews)
                </span>
              </div>

              <p className="mt-2.5 text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="size-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{shop.location}</span>
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href={`/admin/vendors/${shop.id}`}
                className="h-8.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Eye className="size-3.5 text-slate-500" />
                <span>Vendor Details</span>
              </Link>

              <Link
                href={`/shops/tech-electronics`}
                className="h-8.5 px-3 rounded-xl bg-blue-50 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
              >
                <span>Storefront</span>
                <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
