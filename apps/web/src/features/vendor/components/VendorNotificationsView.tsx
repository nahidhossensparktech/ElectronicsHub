'use client'

import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  DollarSign,
  Info,
  Package,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface VendorNotification {
  id: string
  type: 'order' | 'inventory' | 'payout' | 'system'
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: VendorNotification[] = [
  {
    id: 'n-1',
    type: 'order',
    title: 'New Order Received (#EH-20490)',
    description: 'Rafi Hasan placed an order for 3 items worth ৳1,500 via bKash.',
    time: '12 minutes ago',
    read: false,
  },
  {
    id: 'n-2',
    type: 'inventory',
    title: 'Low Stock Alert: 220 Ohm Resistors',
    description: 'Only 48 pieces remaining in Patuatuli inventory. Please restock soon.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n-3',
    type: 'payout',
    title: 'Weekly Payout Disbursed',
    description: '৳ 42,500.00 has been transferred to your bKash Merchant account (01712-345678).',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'n-4',
    type: 'system',
    title: 'ElectronicsHub Platform Update',
    description: 'Wholesale quotation requests can now be responded with custom tiered pricing.',
    time: '3 days ago',
    read: true,
  },
]

export function VendorNotificationsView() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true))

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Notifications & Alerts</h1>
          <p className="text-xs text-slate-500 mt-1">Stay updated with orders, inventory alerts, and payouts</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={markAllRead}
            className="h-9 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Check className="size-3.5 text-slate-500" />
            <span>Mark all read</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            filter === 'unread' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Bell className="size-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No notifications</p>
            <p className="text-xs text-slate-400 mt-0.5">You are completely up to date!</p>
          </div>
        ) : (
          filtered.map((item) => {
            const iconMap = {
              order: <ShoppingBag className="size-4 text-blue-600" />,
              inventory: <AlertTriangle className="size-4 text-amber-600" />,
              payout: <DollarSign className="size-4 text-emerald-600" />,
              system: <Info className="size-4 text-purple-600" />,
            }

            const bgMap = {
              order: 'bg-blue-50',
              inventory: 'bg-amber-50',
              payout: 'bg-emerald-50',
              system: 'bg-purple-50',
            }

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                  !item.read ? 'bg-blue-50/20' : 'hover:bg-slate-50/60'
                }`}
              >
                <div
                  className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                    bgMap[item.type]
                  }`}
                >
                  {iconMap[item.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h3>
                    <span className="text-[11px] text-slate-400 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteNotification(item.id)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
