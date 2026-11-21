'use client'

import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react'

export function VendorProfileView() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Profile Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-md">
            KH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-slate-900">Md. Kamrul Hasan</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Owner · Tech Electronics · Vendor since March 2025</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Verified vendor
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                <span className="size-1.5 rounded-full bg-blue-500" />
                Top seller
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="h-10 px-5 rounded-xl bg-blue-600 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 self-start sm:self-auto"
        >
          Edit Profile
        </button>
      </div>

      {/* Personal Information */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
        <h3 className="font-display text-base font-bold text-slate-900">Personal information</h3>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Full name</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">Md. Kamrul Hasan</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Phone</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">+880 1711-000000</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Email</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">kamrul@techelectronics.bd</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">NID</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">•••• •••• 4821</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Role</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">Owner</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Language</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">বাংলা, English</p>
          </div>
        </div>
      </div>

      {/* Verification Documents */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
        <h3 className="font-display text-base font-bold text-slate-900">Verification documents</h3>
        <div className="mt-4 space-y-3">
          {[
            { title: 'Trade licence', file: 'TL-DHK-2024-88213.pdf' },
            { title: 'National ID (NID)', file: 'nid-front-back.jpg' },
            { title: 'Shop photo', file: 'storefront.jpg' },
          ].map((doc) => (
            <div
              key={doc.title}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FileText className="size-4.5" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">{doc.title}</p>
                  <p className="text-[11px] text-slate-400">{doc.file}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="size-3 text-emerald-600" />
                Approved
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Account */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-slate-900">Payout account</h3>
          <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Change ›</button>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Method</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">bKash Merchant</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Account</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">01711-•••••0</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Payout schedule</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">Weekly, every Sunday</p>
          </div>
        </div>
      </div>
    </div>
  )
}
