'use client'

import {
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  FileSpreadsheet,
  Package,
  Search,
  Tag,
} from 'lucide-react'
import { useState } from 'react'

interface WholesaleRFQ {
  id: string
  buyerName: string
  organization: string
  component: string
  quantity: number
  targetPrice: string
  offeredPrice: string
  vendor: string
  date: string
  status: 'In Review' | 'Quotation Sent' | 'Accepted' | 'Declined'
}

const initialRFQs: WholesaleRFQ[] = [
  {
    id: 'RFQ-892',
    buyerName: 'Dr. Rafiqul Islam',
    organization: 'BUET IoT & Embedded Systems Lab',
    component: 'ESP32-WROOM-32 DevKit V1',
    quantity: 500,
    targetPrice: '৳380 / pc',
    offeredPrice: '৳395 / pc',
    vendor: 'Tech Electronics',
    date: 'Today, 11:30 AM',
    status: 'In Review',
  },
  {
    id: 'RFQ-891',
    buyerName: 'Engr. S. K. Roy',
    organization: 'Walton Microtech R&D',
    component: '1N4007 Rectifier Diode (Tape Reel)',
    quantity: 25000,
    targetPrice: '৳0.85 / pc',
    offeredPrice: '৳0.90 / pc',
    vendor: 'RoboTech BD',
    date: 'Yesterday',
    status: 'Quotation Sent',
  },
  {
    id: 'RFQ-890',
    buyerName: 'Tanveer Ahmed',
    organization: 'RoboBazaar Wholesale BD',
    component: 'SG90 Micro Servo Motors 9g',
    quantity: 1200,
    targetPrice: '৳110 / pc',
    offeredPrice: '৳115 / pc',
    vendor: 'Circuit Bazar',
    date: '19 Nov 2026',
    status: 'Accepted',
  },
]

export function AdminWholesaleView() {
  const [rfqs, setRfqs] = useState(initialRFQs)
  const [search, setSearch] = useState('')

  const filtered = rfqs.filter((r) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        r.buyerName.toLowerCase().includes(q) ||
        r.organization.toLowerCase().includes(q) ||
        r.component.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
            <span>Pending RFQs</span>
            <Clock className="size-4 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-950">14 Inquiries</p>
          <p className="text-[11px] text-blue-700 mt-1">Total volume: ~৳ 18.5 Lakhs</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Closed Bulk Deals (30d)</span>
            <CheckCircle2 className="size-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-950">৳ 48.2 Lakhs</p>
          <p className="text-[11px] text-emerald-700 mt-1">Walton, BUET, MIST orders fulfilled</p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Wholesale Commission</span>
            <DollarSign className="size-4 text-slate-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">3.5% Flat</p>
          <p className="text-[11px] text-slate-500 mt-1">High-volume negotiated escrow fee</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-100">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Enterprise & Wholesale RFQs</h2>
            <p className="text-xs text-slate-500 mt-0.5">Bulk procurement inquiries submitted by institutions and manufacturers</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search RFQs, organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Buyer & Organization</th>
                <th className="py-3 px-6">Requested Component</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Target / Offered</th>
                <th className="py-3 px-6">Assigned Vendor</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900 text-sm">{rfq.buyerName}</p>
                    <p className="text-xs text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                      <Building2 className="size-3" />
                      <span>{rfq.organization}</span>
                    </p>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{rfq.component}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{rfq.quantity.toLocaleString()} pcs</td>
                  <td className="py-4 px-6">
                    <p className="text-slate-500 line-through text-[11px]">{rfq.targetPrice}</p>
                    <p className="font-bold text-slate-900">{rfq.offeredPrice}</p>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">{rfq.vendor}</td>
                  <td className="py-4 px-6 text-slate-500">{rfq.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        rfq.status === 'Accepted'
                          ? 'bg-emerald-50 text-emerald-700'
                          : rfq.status === 'Quotation Sent'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          rfq.status === 'Accepted'
                            ? 'bg-emerald-500'
                            : rfq.status === 'Quotation Sent'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      {rfq.status}
                    </span>
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
