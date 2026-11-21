'use client'

import {
  AlertOctagon,
  CheckCircle2,
  Clock,
  Flag,
  MessageSquare,
  Search,
  ShieldAlert,
} from 'lucide-react'
import { useState } from 'react'

interface ReportItem {
  id: string
  title: string
  reporter: string
  type: 'Counterfeit claim' | 'Damaged delivery' | 'Wrong component' | 'Refund dispute'
  orderNumber: string
  shopName: string
  date: string
  status: 'Open' | 'Under Investigation' | 'Resolved'
  description: string
}

const initialReports: ReportItem[] = [
  {
    id: 'REP-101',
    title: 'Reported counterfeit ATmega328P chip with faulty bootloader',
    reporter: 'Tanvir Ahmed (+880 1611-555210)',
    type: 'Counterfeit claim',
    orderNumber: '#EH-48919',
    shopName: 'RoboTech BD',
    date: 'Today, 01:15 PM',
    status: 'Open',
    description: 'Customer claims the microcontroller markings do not match Microchip OEM laser engraving and fails avrdude flashing.',
  },
  {
    id: 'REP-102',
    title: 'Bent pins on Raspberry Pi 5 40-pin GPIO header',
    reporter: 'Sadia Akter (+880 1819-220011)',
    type: 'Damaged delivery',
    orderNumber: '#EH-48918',
    shopName: 'Circuit Bazar',
    date: 'Yesterday, 04:30 PM',
    status: 'Under Investigation',
    description: 'Parcel arrived crushed due to improper external cardboard box packaging by Steadfast courier.',
  },
  {
    id: 'REP-103',
    title: 'Received 1K Resistors instead of 10K Resistors',
    reporter: 'Mahin Rahman (+880 1722-114455)',
    type: 'Wrong component',
    orderNumber: '#EH-48917',
    shopName: 'Maker Store',
    date: '20 Nov 2026',
    status: 'Resolved',
    description: 'Vendor shipped replacement bag free of charge; customer confirmed reception.',
  },
]

export function AdminReportsView() {
  const [reports, setReports] = useState(initialReports)
  const [search, setSearch] = useState('')

  const handleResolve = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Resolved' } : r))
    )
  }

  const filtered = reports.filter((r) => {
    if (search.trim()) {
      return (
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.shopName.toLowerCase().includes(search.toLowerCase()) ||
        r.orderNumber.toLowerCase().includes(search.toLowerCase())
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-rose-700 text-xs font-semibold">
            <span>Open Urgent Disputes</span>
            <AlertOctagon className="size-4 text-rose-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-950">9 Open Reports</p>
          <p className="text-[11px] text-rose-700 mt-1">Escrow payment held until resolution</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
            <span>In Investigation</span>
            <Clock className="size-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-950">4 Cases</p>
          <p className="text-[11px] text-amber-700 mt-1">Vendor response deadline: 24h</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Resolved This Month</span>
            <CheckCircle2 className="size-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-950">34 Cases</p>
          <p className="text-[11px] text-emerald-700 mt-1">100% Buyer protection satisfaction</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-100">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Buyer & Vendor Dispute Center</h2>
            <p className="text-xs text-slate-500 mt-0.5">Mediate disputes, enforce authenticity guidelines, and process escrow refunds</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search dispute, order, shop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((rep) => (
            <div key={rep.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-500">{rep.id}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      rep.status === 'Open'
                        ? 'bg-rose-50 text-rose-700'
                        : rep.status === 'Under Investigation'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {rep.status}
                  </span>
                  <span className="text-xs text-slate-400">· {rep.date}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{rep.title}</h3>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {rep.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Reporter: <strong className="text-slate-800">{rep.reporter}</strong></span>
                  <span>Order: <strong className="font-mono text-blue-600">{rep.orderNumber}</strong></span>
                  <span>Vendor: <strong className="text-slate-800">{rep.shopName}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {rep.status !== 'Resolved' ? (
                  <button
                    type="button"
                    onClick={() => handleResolve(rep.id)}
                    className="h-8.5 px-3.5 rounded-xl bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="size-4" />
                    <span>Resolve Dispute</span>
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" />
                    <span>Case Closed</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
