'use client'

import {
  ArrowLeft,
  CheckCircle2,
  Edit,
  ExternalLink,
  MapPin,
  Package,
  ShieldCheck,
  Star,
  Store,
  Trash2,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { adminProducts } from '../data/mock-admin'

export function AdminProductDetailView({ id }: { id: string }) {
  const product = adminProducts.find((p) => p.id === id) ?? adminProducts[0]!
  const [status, setStatus] = useState(product.status)

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back button */}
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Products Catalog</span>
        </Link>
      </div>

      {/* Main Product Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="size-20 rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-center shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={64}
              height={64}
              className="object-contain max-h-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-xl font-bold text-slate-900">{product.name}</h1>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : status === 'Pending approval'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                {status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              SKU: <span className="font-mono font-semibold text-slate-700">{product.sku}</span> · Category:{' '}
              <strong className="text-slate-700">{product.category}</strong>
            </p>
            <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
              <Store className="size-3.5 text-blue-600" />
              <span>Listed by: <strong>{product.shop}</strong></span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status !== 'Active' ? (
            <button
              type="button"
              onClick={() => setStatus('Active')}
              className="h-9 px-4 rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="size-4" />
              <span>Approve Listing</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStatus('Rejected')}
              className="h-9 px-3 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
            >
              <XCircle className="size-4" />
              <span>Suspend Listing</span>
            </button>
          )}

          <Link
            href="/products/esp32-devkit"
            className="h-9 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <span>Public Storefront</span>
            <ExternalLink className="size-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pricing & Stock Stats */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Package className="size-4 text-blue-600" />
            <span>Pricing & Stock</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Retail Unit Price</span>
              <span className="font-bold text-slate-900 text-sm">{product.price}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Wholesale Tier (50+)</span>
              <span className="font-semibold text-slate-900">৳395 (-12%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Warehouse Stock</span>
              <span className="font-semibold text-slate-900">{product.stock} units</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Platform Commission</span>
              <span className="font-semibold text-emerald-600">5.0% (৳22.50 / unit)</span>
            </div>
          </div>
        </div>

        {/* Specifications & Compliance */}
        <div className="md:col-span-2 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-600" />
            <span>Technical Specifications & Compliance</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Operating Voltage</span>
              <span className="font-semibold text-slate-800">3.3V (5V USB input)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Clock Speed</span>
              <span className="font-semibold text-slate-800">240 MHz Dual Core</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Connectivity</span>
              <span className="font-semibold text-slate-800">Wi-Fi 802.11 b/g/n + BT 4.2 BR/EDR</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Origin / Importer</span>
              <span className="font-semibold text-slate-800">Verified OEM Bangladesh Import</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
