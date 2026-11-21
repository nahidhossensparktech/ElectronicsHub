'use client'

import { ArrowLeft, CheckCircle2, Clock, MapPin, Package, Printer, Store, User } from 'lucide-react'
import Link from 'next/link'
import { adminOrders } from '../data/mock-admin'

export function AdminOrderDetailView({ id }: { id: string }) {
  const order = adminOrders.find((o) => o.id === id) ?? adminOrders[0]!

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back button */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Orders</span>
        </Link>
      </div>

      {/* Order Header Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">{order.orderNumber}</h2>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              {order.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Placed on {order.date} · Payment: <strong className="text-slate-800">{order.paymentMethod}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Printer className="size-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* Customer & Vendor Info 2-Col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Customer Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <User className="size-4 text-blue-600" />
            <span>Customer Information</span>
          </div>
          <div className="text-xs space-y-1.5 text-slate-600">
            <p className="font-bold text-slate-900 text-sm">{order.customer}</p>
            <p>Phone: +880 1712-345678</p>
            <p className="text-slate-400">Shipping: House 14, Road 5, Mirpur, Dhaka</p>
          </div>
        </div>

        {/* Vendor Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Store className="size-4 text-blue-600" />
            <span>Fulfilling Shop</span>
          </div>
          <div className="text-xs space-y-1.5 text-slate-600">
            <p className="font-bold text-slate-900 text-sm">{order.shop}</p>
            <p>Location: Patuatuli Road, Dhaka</p>
            <p className="text-emerald-600 font-semibold">Platform Commission: {order.commission}</p>
          </div>
        </div>
      </div>

      {/* Ordered Items Breakdown */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-display text-base font-bold text-slate-900">Order items breakdown</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { name: 'ESP32-WROOM-32 Wi-Fi + Bluetooth DevKit', sku: 'EH-ESP32-01', qty: 2, price: '৳ 450', total: '৳ 900' },
            { name: 'HC-SR04 Ultrasonic Distance Sensor Module', sku: 'EH-SR04-03', qty: 4, price: '৳ 95', total: '৳ 380' },
            { name: 'Arduino Uno R3 DIP ATmega328P with USB Cable', sku: 'EH-ARD-02', qty: 1, price: '৳ 680', total: '৳ 680' },
            { name: '10K Ohm 1/4W Metal Film Resistor (Pack of 100)', sku: 'EH-RES-10K', qty: 2, price: '৳ 120', total: '৳ 240' },
          ].map((item) => (
            <div key={item.sku} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/60">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Package className="size-4" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-slate-400 text-[11px]">SKU: {item.sku} · Qty: {item.qty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{item.total}</p>
                <p className="text-[11px] text-slate-400">{item.price} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="p-6 bg-slate-50/80 rounded-b-2xl border-t border-slate-100 flex flex-col items-end gap-1.5 text-xs">
          <div className="flex justify-between w-64 text-slate-600">
            <span>Items Subtotal:</span>
            <span>৳ 2,200</span>
          </div>
          <div className="flex justify-between w-64 text-slate-600">
            <span>Courier Delivery:</span>
            <span>৳ 80</span>
          </div>
          <div className="flex justify-between w-64 text-slate-600">
            <span>Marketplace Fee (5%):</span>
            <span className="text-emerald-600 font-semibold">৳ 110</span>
          </div>
          <div className="flex justify-between w-64 text-sm font-bold text-slate-900 border-t border-slate-200 pt-2 mt-1">
            <span>Total Amount:</span>
            <span className="text-blue-600 font-extrabold">{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
