'use client'

import {
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  MapPin,
  Search,
  ShieldAlert,
  UserCheck,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface VendorApplication {
  id: string
  shopName: string
  ownerName: string
  phone: string
  location: string
  tradeLicense: string
  nid: string
  date: string
  category: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const initialApplications: VendorApplication[] = [
  {
    id: 'APP-101',
    shopName: 'Silicon Electro BD',
    ownerName: 'Moklesur Rahman',
    phone: '+880 1711-998877',
    location: 'Stadium Market, Dhaka',
    tradeLicense: 'TRAD/DNCC/092182/2024',
    nid: '19922612345678901',
    date: 'Today, 02:15 PM',
    category: 'Sensors & Microcontrollers',
    status: 'Pending',
  },
  {
    id: 'APP-102',
    shopName: 'RoboSpark Labs',
    ownerName: 'Fahim Faisal',
    phone: '+880 1822-443322',
    location: 'Agrabad, Chattogram',
    tradeLicense: 'TRAD/CCC/114920/2023',
    nid: '19891599887766554',
    date: 'Today, 11:40 AM',
    category: 'Robotics & DIY Kits',
    status: 'Pending',
  },
  {
    id: 'APP-103',
    shopName: 'Power & Voltage Mart',
    ownerName: 'Md. Shahidul Islam',
    phone: '+880 1914-556677',
    location: 'Patuatuli, Dhaka',
    tradeLicense: 'TRAD/DSCC/049821/2024',
    nid: '19952677889900112',
    date: 'Yesterday',
    category: 'Power Supplies & Solar',
    status: 'Pending',
  },
  {
    id: 'APP-104',
    shopName: 'MicroChip Zone',
    ownerName: 'Tanveer Anjum',
    phone: '+880 1612-887766',
    location: 'Zindabazar, Sylhet',
    tradeLicense: 'TRAD/SCC/084912/2024',
    nid: '19932644332211009',
    date: '20 Nov 2026',
    category: 'Integrated Circuits & SMD',
    status: 'Pending',
  },
]

export function AdminVendorApprovalsView() {
  const [applications, setApplications] = useState(initialApplications)
  const [search, setSearch] = useState('')

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    )
  }

  const filtered = applications.filter((app) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        app.shopName.toLowerCase().includes(q) ||
        app.ownerName.toLowerCase().includes(q) ||
        app.tradeLicense.toLowerCase().includes(q)
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
            <span>Pending Review</span>
            <Clock className="size-4 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-950">
            {applications.filter((a) => a.status === 'Pending').length} Applications
          </p>
          <p className="text-[11px] text-blue-700 mt-1">Requires Trade License & NID verification</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Approved This Week</span>
            <CheckCircle2 className="size-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-950">18 Vendors</p>
          <p className="text-[11px] text-emerald-700 mt-1">Live shops on ElectronicsHub</p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Avg. Verification Time</span>
            <FileCheck className="size-4 text-slate-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">4.2 Hours</p>
          <p className="text-[11px] text-slate-500 mt-1">Target turnaround under 24 hours</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-100">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Vendor Applications Queue</h2>
            <p className="text-xs text-slate-500 mt-0.5">Review Trade License and National ID before granting store privileges</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search shop, owner, license..."
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
                <th className="py-3 px-6">Shop & Applicant</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Trade License / NID</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Submitted</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900 text-sm">{app.shopName}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{app.ownerName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{app.phone}</p>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-slate-400 shrink-0" />
                      <span>{app.location}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[11px] text-slate-700 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100 w-fit">
                        <FileText className="size-3 text-blue-600" />
                        <span>{app.tradeLicense}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">NID: {app.nid}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">{app.category}</td>
                  <td className="py-4 px-6 text-slate-500">{app.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        app.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : app.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          app.status === 'Pending'
                            ? 'bg-amber-500'
                            : app.status === 'Approved'
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {app.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAction(app.id, 'Approved')}
                          className="h-8 px-3 rounded-lg bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAction(app.id, 'Rejected')}
                          className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Action recorded</span>
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
