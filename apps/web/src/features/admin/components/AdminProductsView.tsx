'use client'

import {
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  Filter,
  Package,
  Plus,
  Search,
  Store,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { adminProducts } from '../data/mock-admin'

export function AdminProductsView() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'outofstock'>('all')
  const [search, setSearch] = useState('')

  const filtered = adminProducts.filter((p) => {
    if (activeTab === 'active' && p.status !== 'Active') return false
    if (activeTab === 'pending' && p.status !== 'Pending approval') return false
    if (activeTab === 'outofstock' && p.status !== 'Out of stock') return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shop.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Products ({adminProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('active')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'active' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pending Approval (1)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search product, SKU, shop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Vendor Shop</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={32}
                          height={32}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-bold text-slate-900 text-xs hover:text-blue-600 transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 font-medium text-slate-600">{product.category}</td>
                  <td className="py-3.5 px-6">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Store className="size-3.5 text-slate-400" />
                      <span>{product.shop}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{product.price}</td>
                  <td className="py-3.5 px-6 font-medium text-slate-700">
                    {product.stock > 0 ? (
                      `${product.stock} pcs`
                    ) : (
                      <span className="text-rose-600 font-semibold">Out of stock</span>
                    )}
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        product.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : product.status === 'Pending approval'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          product.status === 'Active'
                            ? 'bg-emerald-500'
                            : product.status === 'Pending approval'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        title="View / Edit Product"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        type="button"
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Take down / Remove"
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
      </div>
    </div>
  )
}
