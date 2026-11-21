'use client'

import {
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  Download,
  Filter,
  Layers,
  Package,
  Plus,
  RefreshCw,
  Search,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { vendorProducts } from '../data/mock-vendor'

export function VendorInventoryView() {
  const [activeTab, setActiveTab] = useState<'all' | 'low' | 'out'>('all')
  const [search, setSearch] = useState('')
  const [stockLevels, setStockLevels] = useState<Record<string, number>>(() =>
    vendorProducts.reduce((acc, p) => ({ ...acc, [p.id]: p.stock }), {})
  )

  const handleStockChange = (id: string, delta: number) => {
    setStockLevels((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) + delta),
    }))
  }

  const filtered = vendorProducts.filter((p) => {
    const currentStock = stockLevels[p.id] ?? p.stock
    if (activeTab === 'low' && (currentStock > 50 || currentStock === 0)) return false
    if (activeTab === 'out' && currentStock > 0) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    }
    return true
  })

  const lowStockCount = vendorProducts.filter((p) => {
    const s = stockLevels[p.id] ?? p.stock
    return s > 0 && s <= 50
  }).length

  const outOfStockCount = vendorProducts.filter((p) => {
    const s = stockLevels[p.id] ?? p.stock
    return s === 0
  }).length

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Tracked SKUs</span>
            <Layers className="size-4 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{vendorProducts.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Across 4 primary categories</p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Units In Stock</span>
            <Package className="size-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {Object.values(stockLevels).reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">All verified warehouse items</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-amber-700 text-xs font-medium">
            <span>Low Stock Alert</span>
            <AlertTriangle className="size-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-900">{lowStockCount} items</p>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">Under 50 units remaining</p>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-rose-700 text-xs font-medium">
            <span>Out of Stock</span>
            <AlertTriangle className="size-4 text-rose-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-900">{outOfStockCount} items</p>
          <p className="text-[11px] text-rose-700 font-semibold mt-1">Halted from storefront buyers</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Inventory
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('low')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'low'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Low Stock ({lowStockCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('out')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'out'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Out of Stock ({outOfStockCount})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search SKU or product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
              />
            </div>
            <Link
              href="/vendor/products/new"
              className="h-9 px-3 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Plus className="size-4" />
              <span>Add SKU</span>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Product / Component</th>
                <th className="py-3 px-6">SKU</th>
                <th className="py-3 px-6">Unit Price</th>
                <th className="py-3 px-6 text-center">Stock Level</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const stock = stockLevels[item.id] ?? item.stock
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-[11px] text-slate-500">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-slate-600">{item.sku}</td>
                    <td className="py-3.5 px-6 font-semibold text-slate-900">{item.price}</td>
                    <td className="py-3.5 px-6 text-center font-bold text-slate-800 text-sm">
                      {stock.toLocaleString()} <span className="text-[11px] font-normal text-slate-500">pcs</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          stock === 0
                            ? 'bg-rose-50 text-rose-700'
                            : stock <= 50
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            stock === 0
                              ? 'bg-rose-500'
                              : stock <= 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        {stock === 0 ? 'Out of stock' : stock <= 50 ? 'Low stock' : 'In stock'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="inline-flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-white">
                        <button
                          type="button"
                          onClick={() => handleStockChange(item.id, -10)}
                          className="size-6 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-bold"
                          title="Reduce 10"
                        >
                          -10
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStockChange(item.id, 10)}
                          className="size-6 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-bold"
                          title="Add 10"
                        >
                          +10
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStockChange(item.id, 100)}
                          className="h-6 px-1.5 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] font-bold"
                          title="Restock +100"
                        >
                          +100
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
