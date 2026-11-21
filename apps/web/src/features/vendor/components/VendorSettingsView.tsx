'use client'

import {
  Bell,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  Lock,
  Save,
  Shield,
  Store,
  Truck,
} from 'lucide-react'
import { useState } from 'react'

export function VendorSettingsView() {
  const [saved, setSaved] = useState(false)
  const [autoAccept, setAutoAccept] = useState(true)
  const [allowWholesale, setAllowWholesale] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [courierRedx, setCourierRedx] = useState(true)
  const [courierSteadfast, setCourierSteadfast] = useState(true)
  const [courierPathao, setCourierPathao] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Shop Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Configure fulfillment, automation, notifications, and payouts</p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="h-9.5 px-4 rounded-xl bg-blue-600 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5"
        >
          {saved ? <CheckCircle2 className="size-4" /> : <Save className="size-4" />}
          <span>{saved ? 'Saved Successfully' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Fulfillment & Order Handling */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Store className="size-5 text-blue-600" />
            <h2 className="font-display text-base font-bold text-slate-900">Order & Fulfillment Preferences</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoAccept}
                onChange={(e) => setAutoAccept(e.target.checked)}
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Auto-accept COD orders below ৳2,000</span>
                <span className="text-xs text-slate-500">Automatically moves standard low-risk orders to Processing without manual click.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowWholesale}
                onChange={(e) => setAllowWholesale(e.target.checked)}
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Accept Bulk / Wholesale RFQ inquiries</span>
                <span className="text-xs text-slate-500">Allows factories, universities, and repair shops to request tiered quotations.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Courier & Shipping Partners */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Truck className="size-5 text-blue-600" />
            <h2 className="font-display text-base font-bold text-slate-900">Supported Courier Partners</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                courierSteadfast ? 'border-blue-500 bg-blue-50/40' : 'border-slate-200'
              }`}
            >
              <input
                type="checkbox"
                checked={courierSteadfast}
                onChange={(e) => setCourierSteadfast(e.target.checked)}
                className="size-4 rounded text-blue-600"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Steadfast Courier</span>
                <span className="text-[11px] text-slate-500">Nationwide 24-48h</span>
              </div>
            </label>

            <label
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                courierRedx ? 'border-blue-500 bg-blue-50/40' : 'border-slate-200'
              }`}
            >
              <input
                type="checkbox"
                checked={courierRedx}
                onChange={(e) => setCourierRedx(e.target.checked)}
                className="size-4 rounded text-blue-600"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">RedX Express</span>
                <span className="text-[11px] text-slate-500">Fast Dhaka pickup</span>
              </div>
            </label>

            <label
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                courierPathao ? 'border-blue-500 bg-blue-50/40' : 'border-slate-200'
              }`}
            >
              <input
                type="checkbox"
                checked={courierPathao}
                onChange={(e) => setCourierPathao(e.target.checked)}
                className="size-4 rounded text-blue-600"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Pathao Courier</span>
                <span className="text-[11px] text-slate-500">Same-day inside Dhaka</span>
              </div>
            </label>
          </div>
        </div>

        {/* Notifications & Alert Channels */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="size-5 text-blue-600" />
            <h2 className="font-display text-base font-bold text-slate-900">Notification Alerts</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">SMS Alert on New High-Value Orders</span>
                <span className="text-xs text-slate-500">Receive instant SMS to +880 1712-345678 for orders above ৳5,000.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Email Daily Sales & Inventory Digest</span>
                <span className="text-xs text-slate-500">Receive a daily summary at 11:00 PM with total revenues and low stock items.</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
