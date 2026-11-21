'use client'

import { Camera, MapPin, Upload } from 'lucide-react'

export function VendorShopInfoView() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Branding Section */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
        <h3 className="font-display text-base font-bold text-slate-900">Branding</h3>

        {/* Cover image */}
        <div className="relative mt-4 h-44 rounded-2xl bg-[#2563EB] flex items-end justify-end p-4 shadow-xs">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-md hover:bg-slate-50 transition-colors"
          >
            <Camera className="size-3.5" />
            <span>Change cover</span>
          </button>
        </div>

        {/* Logo avatar */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-md">
            TE
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Upload className="size-3.5" />
              <span>Upload logo</span>
            </button>
            <p className="mt-1 text-[11px] text-slate-400">Square PNG or JPG, at least 512×512</p>
          </div>
        </div>
      </div>

      {/* Shop Details Form */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
        <h3 className="font-display text-base font-bold text-slate-900">Shop details</h3>

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
            <label className="text-xs font-semibold text-slate-700 block mb-1">Shop URL</label>
            <input
              type="text"
              defaultValue="electronichub.bd/shops/tech-electronics"
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
          <textarea
            rows={3}
            defaultValue="Family-run component house in Patuatuli supplying resistors, capacitors, diodes and transistors since 2004."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Business type</label>
            <select className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white">
              <option>Retail & Wholesale</option>
              <option>Retail only</option>
              <option>Wholesale only</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Categories</label>
            <input
              type="text"
              defaultValue="Passive parts, Semiconductors"
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
        <h3 className="font-display text-base font-bold text-slate-900">Location & contact</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Phone</label>
            <input
              type="text"
              defaultValue="+880 1711-000000"
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
            <input
              type="text"
              defaultValue="sales@techelectronics.bd"
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
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

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            className="h-10 px-6 rounded-xl bg-blue-600 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
