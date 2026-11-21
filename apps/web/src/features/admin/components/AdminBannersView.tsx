'use client'

import {
  CheckCircle2,
  Edit,
  Eye,
  Image as ImageIcon,
  Plus,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface BannerItem {
  id: string
  title: string
  subtitle: string
  ctaText: string
  targetUrl: string
  position: string
  status: 'Active' | 'Scheduled' | 'Expired'
}

const initialBanners: BannerItem[] = [
  {
    id: 'BAN-1',
    title: 'Original ESP32 & IoT DevKits Direct from Patuatuli',
    subtitle: '100% Genuine Espressif modules with verified serial numbers.',
    ctaText: 'Explore DevKits',
    targetUrl: '/categories/microcontrollers',
    position: 'Homepage Hero Slide #1',
    status: 'Active',
  },
  {
    id: 'BAN-2',
    title: 'Bulk Wholesale for Universities & Hardware Labs',
    subtitle: 'Flat 5-15% discount on reels of resistors, capacitors, and ICs.',
    ctaText: 'Request Wholesale RFQ',
    targetUrl: '/wholesale',
    position: 'Homepage Hero Slide #2',
    status: 'Active',
  },
  {
    id: 'BAN-3',
    title: 'Fast Delivery Across Bangladesh via Steadfast & RedX',
    subtitle: 'Guaranteed 24-48 hour delivery to Dhaka, Chattogram, Sylhet, and Khulna.',
    ctaText: 'Track Order',
    targetUrl: '/account/orders',
    position: 'Storefront Announcement Strip',
    status: 'Active',
  },
]

export function AdminBannersView() {
  const [banners, setBanners] = useState(initialBanners)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Banners & Promotions</h1>
          <p className="text-xs text-slate-500 mt-1">Manage storefront carousel hero slides, promotional cards, and announcement banners</p>
        </div>

        <button
          type="button"
          className="h-9 px-3.5 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="size-4" />
          <span>Create Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {banners.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-mono text-slate-400">{b.position}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {b.status}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-slate-900 text-sm">{b.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{b.subtitle}</p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Target:</span>
                  <span className="font-mono text-blue-600 font-semibold">{b.targetUrl}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Button: &ldquo;{b.ctaText}&rdquo;</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Edit className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
