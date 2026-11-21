'use client'

import {
  CheckCircle2,
  CreditCard,
  DollarSign,
  Globe,
  Lock,
  Percent,
  Save,
  Server,
  Shield,
  Sliders,
  Truck,
} from 'lucide-react'
import { useState } from 'react'

export function AdminSettingsView() {
  const [commissionRate, setCommissionRate] = useState('5.0')
  const [wholesaleCommission, setWholesaleCommission] = useState('3.5')
  const [insideDhakaFee, setInsideDhakaFee] = useState('60')
  const [outsideDhakaFee, setOutsideDhakaFee] = useState('120')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Platform Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Configure commission cuts, delivery matrices, gateways, and platform policies</p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="h-9.5 px-4 rounded-xl bg-blue-600 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5"
        >
          {saved ? <CheckCircle2 className="size-4" /> : <Save className="size-4" />}
          <span>{saved ? 'Saved Platform Settings' : 'Save Platform Settings'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Marketplace Commission */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Percent className="size-5 text-blue-600" />
            <h2 className="font-display text-base font-bold text-slate-900">Platform Commission Rates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Standard Retail Commission (%)</label>
              <input
                type="text"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
              <p className="text-[11px] text-slate-400 mt-1">Deducted from vendor payout per completed order</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Wholesale / RFQ Commission (%)</label>
              <input
                type="text"
                value={wholesaleCommission}
                onChange={(e) => setWholesaleCommission(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
              <p className="text-[11px] text-slate-400 mt-1">Applied on bulk institutional transactions above ৳25,000</p>
            </div>
          </div>
        </div>

        {/* Standard Delivery Rates */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Truck className="size-5 text-blue-600" />
            <h2 className="font-display text-base font-bold text-slate-900">Default Shipping Fee Matrix (BDT)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Inside Dhaka City Delivery (৳)</label>
              <input
                type="text"
                value={insideDhakaFee}
                onChange={(e) => setInsideDhakaFee(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Outside Dhaka Nationwide Delivery (৳)</label>
              <input
                type="text"
                value={outsideDhakaFee}
                onChange={(e) => setOutsideDhakaFee(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Bangladesh Payment Gateway APIs */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <CreditCard className="size-5 text-blue-600" />
            <h2 className="font-display text-base font-bold text-slate-900">Connected Payment Gateways</h2>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">bKash Payment Gateway (PGW V1.2.0-beta)</span>
                <span className="text-[11px] text-slate-500">Live Merchant Account: 01712-345678 (Auto-settlement active)</span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">Connected</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Nagad Direct Checkout API</span>
                <span className="text-[11px] text-slate-500">Production public key verified</span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">Connected</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">SSLCOMMERZ Multi-Card & Internet Banking</span>
                <span className="text-[11px] text-slate-500">Visa, Mastercard, Rocket, DBBL Nexus</span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
