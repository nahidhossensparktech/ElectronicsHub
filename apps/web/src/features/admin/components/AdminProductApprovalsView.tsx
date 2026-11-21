'use client'

import {
  CheckCircle2,
  Clock,
  Eye,
  Layers,
  Package,
  Search,
  Store,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface PendingProduct {
  id: string
  name: string
  category: string
  shop: string
  price: string
  wholesalePrice: string
  stock: number
  submittedDate: string
  image: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const initialPending: PendingProduct[] = [
  {
    id: 'PRD-A4',
    name: 'Raspberry Pi 5 Model B 8GB RAM',
    category: 'Microcontrollers',
    shop: 'Tech Electronics',
    price: '৳10,800',
    wholesalePrice: '৳9,900 (10+ pcs)',
    stock: 45,
    submittedDate: 'Today, 10:30 AM',
    image: '/products/esp32-devkit.svg',
    status: 'Pending',
  },
  {
    id: 'PRD-P2',
    name: 'STM32F401 Black Pill Development Board',
    category: 'Microcontrollers',
    shop: 'RoboTech BD',
    price: '৳520',
    wholesalePrice: '৳460 (20+ pcs)',
    stock: 150,
    submittedDate: 'Today, 09:15 AM',
    image: '/products/arduino-uno.svg',
    status: 'Pending',
  },
  {
    id: 'PRD-P3',
    name: 'MPU-6050 3-Axis Gyroscope & Accelerometer',
    category: 'Sensors & Modules',
    shop: 'Circuit Bazar',
    price: '৳140',
    wholesalePrice: '৳115 (50+ pcs)',
    stock: 600,
    submittedDate: 'Yesterday',
    image: '/products/hc-sr04.svg',
    status: 'Pending',
  },
]

export function AdminProductApprovalsView() {
  const [items, setItems] = useState(initialPending)
  const [search, setSearch] = useState('')

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
  }

  const filtered = items.filter((item) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      return item.name.toLowerCase().includes(q) || item.shop.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Product Approval Queue</h1>
          <p className="text-xs text-slate-500 mt-1">Review vendor component listings and datasheet accuracy before publishing</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products or shops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Product / Component</th>
                <th className="py-3 px-6">Vendor Shop</th>
                <th className="py-3 px-6">Retail / Wholesale Price</th>
                <th className="py-3 px-6">Initial Stock</th>
                <th className="py-3 px-6">Submitted Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-lg bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={36}
                          height={36}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{item.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Store className="size-3.5 text-blue-600" />
                      <span>{item.shop}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900">{item.price}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.wholesalePrice}</p>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{item.stock} pcs</td>
                  <td className="py-4 px-6 text-slate-500">{item.submittedDate}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        item.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : item.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          item.status === 'Pending'
                            ? 'bg-amber-500'
                            : item.status === 'Approved'
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {item.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAction(item.id, 'Approved')}
                          className="h-8 px-3 rounded-lg bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAction(item.id, 'Rejected')}
                          className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Listing {item.status}</span>
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
