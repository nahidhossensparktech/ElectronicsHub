'use client'

import {
  CheckCircle2,
  EyeOff,
  Filter,
  Search,
  Star,
  Store,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface ReviewItem {
  id: string
  buyerName: string
  productName: string
  shopName: string
  rating: number
  comment: string
  date: string
  status: 'Published' | 'Flagged' | 'Hidden'
}

const initialReviews: ReviewItem[] = [
  {
    id: 'REV-1',
    buyerName: 'Rafi Hasan',
    productName: 'ESP32-WROOM-32 Wi-Fi + Bluetooth DevKit',
    shopName: 'Tech Electronics',
    rating: 5,
    comment: 'Authentic Espressif module! Worked right out of the box with ESP-IDF and Arduino IDE. Patuatuli delivery took just 24 hours.',
    date: '21 Nov 2026',
    status: 'Published',
  },
  {
    id: 'REV-2',
    buyerName: 'Tanvir Ahmed',
    productName: 'Arduino Uno R3 DIP ATmega328P with USB Cable',
    shopName: 'RoboTech BD',
    rating: 5,
    comment: 'Original 16U2 USB chip, not the cheap CH340 clone. Perfect for university laboratory experiments.',
    date: '20 Nov 2026',
    status: 'Published',
  },
  {
    id: 'REV-3',
    buyerName: 'Sadia Akter',
    productName: 'HC-SR04 Ultrasonic Distance Sensor Module',
    shopName: 'Circuit Bazar',
    rating: 4,
    comment: 'Working fine up to 3.5 meters. Good packaging with bubble wrap.',
    date: '19 Nov 2026',
    status: 'Published',
  },
  {
    id: 'REV-4',
    buyerName: 'Anonymous Buyer',
    productName: '18650 3.7V 2600mAh Li-ion Battery',
    shopName: 'Power House BD',
    rating: 1,
    comment: 'Scam call center promo link: visit bit.ly/free-electronics now!',
    date: '18 Nov 2026',
    status: 'Flagged',
  },
]

export function AdminReviewsView() {
  const [reviews, setReviews] = useState(initialReviews)
  const [filter, setFilter] = useState<'all' | 'flagged'>('all')

  const handleStatus = (id: string, newStatus: 'Published' | 'Hidden') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
  }

  const filtered = reviews.filter((r) => (filter === 'flagged' ? r.status === 'Flagged' : true))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Reviews & Ratings Moderation</h1>
          <p className="text-xs text-slate-500 mt-1">Monitor buyer feedback, detect spam links, and maintain marketplace trust</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Reviews
          </button>
          <button
            type="button"
            onClick={() => setFilter('flagged')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === 'flagged' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Flagged / Spam (1)
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((rev) => (
          <div key={rev.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">{rev.buyerName}</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">· {rev.date}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    rev.status === 'Published'
                      ? 'bg-emerald-50 text-emerald-700'
                      : rev.status === 'Flagged'
                      ? 'bg-rose-50 text-rose-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {rev.status}
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Product: <strong className="text-slate-800">{rev.productName}</strong> · Shop:{' '}
                <strong className="text-blue-600">{rev.shopName}</strong>
              </p>

              <p className="text-xs text-slate-800 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {rev.status !== 'Published' ? (
                <button
                  type="button"
                  onClick={() => handleStatus(rev.id, 'Published')}
                  className="h-8 px-3 rounded-lg bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                >
                  Approve
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleStatus(rev.id, 'Hidden')}
                  className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1"
                >
                  <EyeOff className="size-3.5" />
                  <span>Hide</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
