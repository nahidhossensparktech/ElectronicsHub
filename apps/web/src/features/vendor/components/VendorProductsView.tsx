'use client'

import { Edit, Filter, Plus, Search, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { vendorProducts } from '../data/mock-vendor'

const productTabs = [
  { key: 'all', label: 'All (1,240)' },
  { key: 'active', label: 'Active (1,180)' },
  { key: 'draft', label: 'Draft (22)' },
  { key: 'out', label: 'Out of stock (38)' },
] as const

export function VendorProductsView() {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = vendorProducts.filter((p) => {
    if (activeTab === 'active' && p.status !== 'Active') return false
    if (activeTab === 'draft' && p.status !== 'Draft') return false
    if (activeTab === 'out' && p.status !== 'Out of stock') return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Products Table Container */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        {/* Toolbar: Filter Pills + Search */}
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100">
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100/80 p-1">
            {productTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
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
                placeholder="Search products or SKU"
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
                <th className="py-3 px-6 w-10">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-6">SKU</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-1 flex items-center justify-center">
                        <Image src={product.image} alt={product.name} width={32} height={32} className="object-contain" />
                      </div>
                      <div>
                        <Link href={`/vendor/products/${product.id}`} className="font-bold text-slate-900 text-xs hover:text-blue-600 transition-colors">
                          {product.name}
                        </Link>
                        <p className="text-[11px] text-slate-400">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-500 font-mono text-[11px]">{product.sku}</td>
                  <td className="py-3.5 px-6 text-slate-900 font-bold">{product.price}</td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`font-semibold ${
                        product.stock === 0
                          ? 'text-rose-600'
                          : product.stock < 100
                          ? 'text-amber-600'
                          : 'text-slate-900'
                      }`}
                    >
                      {product.stock > 0 ? product.stock.toLocaleString() : '—'}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        product.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : product.status === 'Low stock'
                          ? 'bg-amber-50 text-amber-700'
                          : product.status === 'Out of stock'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          product.status === 'Active'
                            ? 'bg-emerald-500'
                            : product.status === 'Low stock'
                            ? 'bg-amber-500'
                            : product.status === 'Out of stock'
                            ? 'bg-rose-500'
                            : 'bg-slate-400'
                        }`}
                      />
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/vendor/products/${product.id}`}
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        title="Edit product"
                      >
                        <Edit className="size-4" />
                      </Link>
                      <button
                        type="button"
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete product"
                      >
                        <Trash2 className="size-4" />
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
          <p>Showing 1–{filtered.length} of 1,240</p>
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
