'use client'

import { Check, ChevronRight, Upload } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@repo/ui'

export default function VendorOnboardingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top minimal bar */}
      <div className="border-b border-slate-200 bg-white">
        <Container className="h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-bold text-blue-600">
            Electronic Hub<span className="text-slate-900">.bd</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>Already registered?</span>
            <Link href="/vendor" className="font-bold text-blue-600 hover:text-blue-700">
              Sign in to Vendor Center
            </Link>
          </div>
        </Container>
      </div>

      <Container className="pt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-slate-700 font-semibold">Become a Vendor</span>
        </div>

        {/* Header & Stepper */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Open your shop on Electronic Hub
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Takes about 10 minutes. Approval within 24–48 hours.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-600 text-white text-[11px]">
              ✓
            </span>
            <span className="text-slate-900 font-bold">Account</span>
            <span className="h-0.5 w-6 bg-blue-600" />

            <span className="flex size-6 items-center justify-center rounded-full bg-[#14213D] text-white text-[11px]">
              2
            </span>
            <span className="text-slate-900 font-bold">Shop details</span>
            <span className="h-0.5 w-6 bg-slate-200" />

            <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-[11px]">
              3
            </span>
            <span className="text-slate-400">Documents</span>
            <span className="h-0.5 w-6 bg-slate-200" />

            <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-[11px]">
              4
            </span>
            <span className="text-slate-400">Review</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form (2 cols) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xs space-y-5">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">Shop details</h2>
              <p className="text-xs text-slate-400 mt-0.5">Tell buyers about your shop. You can edit this later.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Shop name</label>
                <input
                  type="text"
                  defaultValue="Tech Electronics"
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Business type</label>
                <select className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white">
                  <option>Retail & Wholesale</option>
                  <option>Retail only</option>
                  <option>Wholesale only</option>
                </select>
              </div>
            </div>

            {/* Logo and Cover Upload Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer">
                <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
                  <Upload className="size-4.5" />
                </span>
                <p className="text-xs font-bold text-slate-800">Shop logo</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PNG/JPG · 512×512</p>
              </div>
              <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer">
                <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
                  <Upload className="size-4.5" />
                </span>
                <p className="text-xs font-bold text-slate-800">Cover image</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PNG/JPG · 1600×400</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Shop description</label>
              <textarea
                rows={3}
                defaultValue="Passive components and semiconductors since 2004..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Owner name</label>
                <input
                  type="text"
                  defaultValue="Md. Kamrul Hasan"
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Contact number</label>
                <input
                  type="text"
                  defaultValue="+880 1711-000000"
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">District</label>
                <select className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white">
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                  <option>Khulna</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Area / Upazila</label>
                <select className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white">
                  <option>Kotwali (Patuatuli / Islampur)</option>
                  <option>Motijheel (Stadium Market)</option>
                  <option>New Market (Elephant Road)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full shop address</label>
              <input
                type="text"
                defaultValue="Shop 14, 2nd floor, Patuatuli Road, Dhaka 1100"
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Link
                href="/vendor"
                className="h-11 px-8 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-xs hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                Continue to Documents ›
              </Link>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Why sell on Electronic Hub */}
            <div className="rounded-2xl bg-[#2563EB] p-6 text-white shadow-md space-y-4">
              <h3 className="font-display text-base font-bold">Why sell on Electronic Hub?</h3>
              <ul className="space-y-3.5 text-xs">
                {[
                  { title: 'Free storefront', desc: 'Your own shop page and link' },
                  { title: '25,000+ buyers', desc: 'Students, makers and factories' },
                  { title: 'Retail + wholesale', desc: 'Set tier prices per product' },
                  { title: 'Direct messages', desc: 'Talk to buyers before they order' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white mt-0.5">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-blue-100 text-[11px]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need help */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 text-xs text-slate-600 shadow-2xs">
              <p className="font-bold text-slate-900 text-sm">Need help?</p>
              <p className="mt-1 text-slate-500 leading-relaxed">
                Call vendor support on <strong className="text-slate-800">+880 9612-000001</strong> (Sat–Thu, 10 am – 7 pm).
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
