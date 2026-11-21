'use client'

import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Package,
  Phone,
  Printer,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { vendorOrders } from '../data/mock-vendor'

export function VendorOrderDetailView({ id }: { id: string }) {
  const order = vendorOrders.find((o) => o.id === id || o.orderNumber.includes(id)) ?? vendorOrders[0]!
  const [currentStatus, setCurrentStatus] = useState(order.status)

  const items = [
    {
      id: 'it-1',
      title: '10K Ohm Carbon Film Resistor 1/4W (Pack of 100)',
      sku: 'EH-10293',
      price: '৳250.00',
      quantity: 2,
      total: '৳500.00',
      image: '/products/resistor.svg',
    },
    {
      id: 'it-2',
      title: '1N4007 Rectifier Diode 1A (Pack of 50)',
      sku: 'EH-10417',
      price: '৳75.00',
      quantity: 4,
      total: '৳300.00',
      image: '/products/diode.svg',
    },
    {
      id: 'it-3',
      title: 'LM7805 5V Voltage Regulator TO-220',
      sku: 'EH-10552',
      price: '৳70.00',
      quantity: 10,
      total: '৳700.00',
      image: '/products/transistor.svg',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top back & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/vendor/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Orders</span>
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-slate-900">{order.orderNumber}</h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                currentStatus === 'Pending'
                  ? 'bg-amber-50 text-amber-700'
                  : currentStatus === 'Processing'
                  ? 'bg-blue-50 text-blue-700'
                  : currentStatus === 'Shipped'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  currentStatus === 'Pending'
                    ? 'bg-amber-500'
                    : currentStatus === 'Processing'
                    ? 'bg-blue-500'
                    : currentStatus === 'Shipped'
                    ? 'bg-indigo-500'
                    : 'bg-emerald-500'
                }`}
              />
              {currentStatus}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Placed on {order.date} · Payment Method: <strong className="text-slate-700">{order.paymentMethod}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentStatus === 'Pending' && (
            <button
              type="button"
              onClick={() => setCurrentStatus('Processing')}
              className="h-9.5 px-4 rounded-xl bg-blue-600 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="size-4" />
              <span>Accept & Prepare Order</span>
            </button>
          )}
          {currentStatus === 'Processing' && (
            <button
              type="button"
              onClick={() => setCurrentStatus('Shipped')}
              className="h-9.5 px-4 rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <Truck className="size-4" />
              <span>Dispatch / Mark Shipped</span>
            </button>
          )}
          <button
            type="button"
            className="h-9.5 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Printer className="size-4 text-slate-500" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* Grid: Order details & Customer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
            <h2 className="font-display text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Package className="size-4 text-blue-600" />
              <span>Ordered Items ({items.length})</span>
            </h2>

            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                  <div className="size-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={44}
                      height={44}
                      className="object-contain max-h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">SKU: {item.sku}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {item.price} × {item.quantity} pcs
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-sm">{item.total}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Summary */}
            <div className="mt-6 border-t border-slate-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900">৳1,500.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee (Paid by buyer)</span>
                <span className="font-semibold text-slate-900">৳60.00</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Platform Commission (5%)</span>
                <span className="font-semibold">-৳75.00</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Payment Processing Fee (1.5%)</span>
                <span className="font-semibold">-৳22.50</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-bold text-slate-900">
                <span>Estimated Vendor Payout</span>
                <span className="text-blue-600 text-base">৳1,402.50</span>
              </div>
            </div>
          </div>

          {/* Delivery & Tracking Timeline */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
            <h2 className="font-display text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Truck className="size-4 text-blue-600" />
              <span>Fulfillment & Delivery Progress</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Order Placed & Payment Confirmed</p>
                  <p className="text-[11px] text-slate-500">{order.date} via {order.paymentMethod}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`size-6 rounded-full ${currentStatus !== 'Pending' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                  <CheckCircle2 className="size-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Packing & Processing</p>
                  <p className="text-[11px] text-slate-500">Warehouse prepared parts in anti-static bag</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`size-6 rounded-full ${currentStatus === 'Shipped' || currentStatus === 'Delivered' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Truck className="size-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Handed to Courier Partner</p>
                  <p className="text-[11px] text-slate-500">Steadfast / RedX tracking code: EH-EXP-88910</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Customer & Payout Info */}
        <div className="space-y-6">
          {/* Customer details */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
            <h2 className="font-display text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="size-4 text-blue-600" />
              <span>Customer Information</span>
            </h2>

            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-bold text-white text-sm ${order.avatarColor}`}>
                {order.customerInitials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{order.customerName}</p>
                <p className="text-xs text-slate-500">Verified Buyer</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Phone Number:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Phone className="size-3.5 text-slate-400" />
                  +880 1712-345678
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Delivery Address:</span>
                <span className="text-slate-700 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                  House 42, Road 11, Block C, {order.customerLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Support / Note card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Order Notes</h3>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
              &quot;Please pack the delicate ICs with sufficient bubble wrap. Thank you.&quot;
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <span>Escrow protected payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
