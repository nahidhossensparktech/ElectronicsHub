'use client'

import { Heart, Plus, Sparkles, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { vendorProducts } from '../data/mock-vendor'

export function VendorAddProductView({ productId }: { productId?: string }) {
  const existingProduct = productId ? vendorProducts.find((p) => p.id === productId) : null
  const [productName, setProductName] = useState(existingProduct?.name ?? 'ESP32 DevKit V1 (WROOM-32)')
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Inactive'>('Published')
  const [wholesale, setWholesale] = useState(true)
  const [featured, setFeatured] = useState(true)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
      {/* Left 2 Cols: Form fields */}
      <div className="lg:col-span-2 space-y-6">
        {/* Basic Information */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900">Basic information</h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Product name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">SKU</label>
              <input
                type="text"
                defaultValue="EH-11020"
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Manufacturer part number</label>
              <input
                type="text"
                defaultValue="ESP32-DEVKITC-32D"
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Brand</label>
              <select className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white">
                <option>Espressif</option>
                <option>Arduino</option>
                <option>Raspberry Pi</option>
                <option>Texas Instruments</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Model</label>
              <input
                type="text"
                defaultValue="DevKit V1"
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
            <textarea
              rows={3}
              defaultValue="Compact development board built around the ESP32-WROOM-32 module with Wi-Fi and Bluetooth capabilities..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Product Images */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
          <h3 className="font-display text-base font-bold text-slate-900">Product images</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="relative size-20 rounded-2xl border border-slate-200 bg-slate-100 p-2 flex items-center justify-center">
                <Image src="/products/esp32-devkit.svg" alt="Preview" width={56} height={56} className="object-contain" />
              </div>
            ))}
            <div className="size-20 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 flex flex-col items-center justify-center cursor-pointer transition-colors text-slate-500 hover:text-blue-600">
              <Plus className="size-5" />
              <span className="text-[10px] font-semibold mt-1">Add image</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">The first image is used as the cover on product cards.</p>
        </div>

        {/* Technical Specifications */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-3">
          <h3 className="font-display text-base font-bold text-slate-900">Technical specifications</h3>
          <p className="text-[11px] text-slate-400">Fields change by category. Microcontrollers template loaded.</p>
          <div className="grid grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <p className="font-medium text-slate-500">Microcontroller</p>
              <input type="text" defaultValue="ESP32-D0WD" className="w-full h-9 mt-1 rounded-lg border border-slate-200 px-3 bg-slate-50" />
            </div>
            <div>
              <p className="font-medium text-slate-500">Clock speed</p>
              <input type="text" defaultValue="240 MHz" className="w-full h-9 mt-1 rounded-lg border border-slate-200 px-3 bg-slate-50" />
            </div>
            <div>
              <p className="font-medium text-slate-500">Wireless</p>
              <input type="text" defaultValue="Wi-Fi 802.11 b/g/n, BT 4.2" className="w-full h-9 mt-1 rounded-lg border border-slate-200 px-3 bg-slate-50" />
            </div>
            <div>
              <p className="font-medium text-slate-500">Operating voltage</p>
              <input type="text" defaultValue="3.3V (5V via USB)" className="w-full h-9 mt-1 rounded-lg border border-slate-200 px-3 bg-slate-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Status, Category & Live Card Preview */}
      <div className="space-y-6">
        {/* Status Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900">Status</h3>

          {/* Pills */}
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            {(['Published', 'Draft', 'Inactive'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`py-1.5 rounded-lg text-center transition-all ${
                  status === s ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-700">Show in wholesale section</span>
              <input
                type="checkbox"
                checked={wholesale}
                onChange={(e) => setWholesale(e.target.checked)}
                className="size-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-700">Featured in shop</span>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="size-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Category Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-3">
          <h3 className="font-display text-base font-bold text-slate-900">Category</h3>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Category</label>
            <select className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-900">
              <option>Microcontrollers</option>
              <option>Sensors & Modules</option>
              <option>Power Supply</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Sub-category</label>
            <select className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-900">
              <option>ESP32 boards</option>
              <option>Arduino boards</option>
              <option>STM32 boards</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {['esp32', 'wifi', 'iot', 'devkit'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Live Preview */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Card preview</p>
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50">
            <div className="relative aspect-square w-full rounded-xl bg-white p-4 flex items-center justify-center">
              <Image src="/products/esp32-devkit.svg" alt="Product" width={110} height={110} className="object-contain" />
              <button type="button" className="absolute top-2.5 right-2.5 size-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Heart className="size-3.5" />
              </button>
            </div>
            <div className="mt-3">
              <p className="text-[11px] font-semibold text-slate-400">Tech Electronics ✓</p>
              <p className="font-bold text-slate-900 text-xs mt-0.5 truncate">{productName}</p>
              <p className="text-[11px] text-slate-500 mt-1">Dual-Core 240MHz Wi-Fi+BT</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">৳450</span>
                <span className="text-[11px] font-semibold text-emerald-600">140 in stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
