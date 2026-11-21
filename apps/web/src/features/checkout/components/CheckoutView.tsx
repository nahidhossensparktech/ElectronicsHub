'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Button, LinkButton, Radio, Textarea, Thumb } from '@repo/ui'
import { formatBDT } from '@repo/utils'
import { OrderSummaryCard } from '@/features/cart'
import { computeTotals, DELIVERY_PER_SHOP, placeOrder, useAppStore } from '@/lib/store'
import { CheckoutSection } from './CheckoutSection'
import { CheckoutSteps } from './CheckoutSteps'
import { OptionCard } from './OptionCard'

const payments = [
  { value: 'bKash', note: 'Pay instantly with your bKash wallet' },
  { value: 'Nagad', note: 'Pay with your Nagad wallet' },
  { value: 'Credit / Debit card', note: 'Visa, Mastercard, Amex' },
  { value: 'Cash on Delivery', note: 'Pay the courier when it arrives', fee: 20 },
]

/** Address, per-shop delivery, payment, note and order placement. */
export function CheckoutView() {
  const router = useRouter()
  const cart = useAppStore((s) => s.cart)
  const couponCode = useAppStore((s) => s.couponCode)
  const addresses = useAppStore((s) => s.addresses)
  const selected = useMemo(() => cart.filter((l) => l.selected), [cart])
  const shopsInOrder = useMemo(() => [...new Map(selected.map((l) => [l.shopSlug, l.shopName])).entries()], [selected])
  const totals = useMemo(() => computeTotals(cart, couponCode), [cart, couponCode])
  const [delivery, setDelivery] = useState<Record<string, 'courier' | 'pickup'>>({})
  const [payment, setPayment] = useState('bKash')
  const [note, setNote] = useState('')
  const [addressId, setAddressId] = useState<string | null>(null)
  const [changingAddress, setChangingAddress] = useState(false)
  const address = addresses.find((a) => a.id === addressId) ?? addresses.find((a) => a.isDefault) ?? addresses[0]

  if (selected.length === 0) {
    return (
      <div className="mt-6 rounded-2xl bg-canvas px-6 py-20 text-center">
        <h2 className="font-display text-xl font-bold text-ink">Nothing to check out</h2>
        <p className="mt-2 text-sm text-muted">Select items in your cart first.</p>
        <LinkButton href="/cart" size="lg" className="mt-6">Go to cart</LinkButton>
      </div>
    )
  }

  const deliveryFee = shopsInOrder.reduce((sum, [slug]) => sum + ((delivery[slug] ?? 'courier') === 'courier' ? DELIVERY_PER_SHOP : 0), 0)
  const codFee = payments.find((p) => p.value === payment)?.fee ?? 0
  const freeDelivery = totals.coupon?.kind === 'free-delivery'
  const discount = freeDelivery ? deliveryFee : totals.discount
  const total = Math.max(0, totals.subtotal + deliveryFee + codFee - discount)

  const submit = () => {
    const deliveryByShop = Object.fromEntries(
      shopsInOrder.map(([slug, name]) => [slug, (delivery[slug] ?? 'courier') === 'courier' ? { label: `Courier — ${name}`, fee: DELIVERY_PER_SHOP } : { label: 'Pickup from shop', fee: 0 }]),
    )
    const ids = placeOrder({ paymentMethod: payment, deliveryByShop, paymentFee: codFee, note })
    router.push(`/checkout/success?orders=${ids.join(',')}`)
  }

  return (
    <>
      <div className="-mt-10 mb-4 flex justify-end">
        <CheckoutSteps steps={['Address', 'Delivery', 'Payment', 'Review']} current={2} />
      </div>
      <div className="mt-6 flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-5">
          <CheckoutSection
            title="Delivery address"
            complete={Boolean(address)}
            action={<button type="button" onClick={() => setChangingAddress(!changingAddress)} className="text-[13px] font-semibold text-brand">{changingAddress ? 'Done' : 'Change'}</button>}
          >
            {changingAddress ? (
              <div className="space-y-3">
                {addresses.map((a) => (
                  <label key={a.id} className="flex cursor-pointer items-start gap-3 rounded-xl bg-white p-4 has-checked:bg-brand-50">
                    <Radio name="address" checked={a.id === address?.id} onChange={() => setAddressId(a.id)} className="mt-0.5" />
                    <span className="text-sm"><span className="block font-semibold text-ink">{a.label} · {a.recipient}</span><span className="text-muted">{a.line}</span></span>
                  </label>
                ))}
                <Link href="/account/addresses" className="inline-block text-[13px] font-semibold text-brand">+ Add a new address</Link>
              </div>
            ) : address ? (
              <>
                <p className="text-sm font-semibold text-ink">{address.recipient} · {address.phone}</p>
                <p className="mt-2 text-sm text-muted">{address.line}</p>
              </>
            ) : (
              <Link href="/account/addresses" className="text-sm font-semibold text-brand">Add a delivery address</Link>
            )}
          </CheckoutSection>
          <CheckoutSection title="Delivery method" complete>
            <div className="space-y-5">
              {shopsInOrder.map(([slug, name]) => (
                <div key={slug} className="space-y-3">
                  {shopsInOrder.length > 1 ? <p className="text-xs font-semibold tracking-wide text-subtle uppercase">{name}</p> : null}
                  <OptionCard name={`delivery-${slug}`} value="courier" title={`Courier — ${name}`} note="Pathao · 1–2 days" aside={formatBDT(DELIVERY_PER_SHOP)} checked={(delivery[slug] ?? 'courier') === 'courier'} onSelect={() => setDelivery({ ...delivery, [slug]: 'courier' })} />
                  <OptionCard name={`delivery-${slug}`} value="pickup" title="Pickup from shop" note="Free · ready in 2 hours" aside="Free" checked={delivery[slug] === 'pickup'} onSelect={() => setDelivery({ ...delivery, [slug]: 'pickup' })} />
                </div>
              ))}
            </div>
          </CheckoutSection>
          <CheckoutSection title="Payment method">
            <div className="space-y-3">
              {payments.map((p) => (
                <OptionCard key={p.value} name="payment" value={p.value} title={p.value} note={p.note} aside={p.fee ? `+${formatBDT(p.fee)}` : undefined} checked={payment === p.value} onSelect={setPayment} />
              ))}
            </div>
          </CheckoutSection>
          <CheckoutSection title="Order note (optional)">
            <Textarea tone="white" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. call before delivery" />
          </CheckoutSection>
        </div>
        <OrderSummaryCard
          title="Your order"
          totals={{ ...totals, discount }}
          deliveryOverride={deliveryFee}
          extraRows={codFee ? [{ label: 'Cash on delivery fee', value: formatBDT(codFee) }] : []}
          totalOverride={total}
          action={<Button size="xl" block disabled={!address} onClick={submit}>Place Order · {formatBDT(total)}</Button>}
        >
          <ul className="mt-5 space-y-3 border-t border-line pt-5">
            {selected.map((l) => (
              <li key={l.slug} className="flex items-center gap-3 text-[13px]">
                <Thumb src={l.image} alt={l.name} size={36} className="bg-white" />
                <span className="flex-1 truncate text-ink">{l.name}</span>
                <span className="text-muted">× {l.quantity}</span>
                <span className="w-16 text-right font-semibold text-ink">{formatBDT(Math.round(l.unitPrice * l.quantity * 100) / 100)}</span>
              </li>
            ))}
          </ul>
        </OrderSummaryCard>
      </div>
    </>
  )
}
