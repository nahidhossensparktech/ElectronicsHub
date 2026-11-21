'use client'

import type { Address, CartLine, ChatMessage, CustomerProfile, Order, OrderLine, Product } from '@repo/types'
import { initials } from '@repo/utils'
import { shops } from '@/lib/mock-db/shops'
import { computeTotals, DELIVERY_PER_SHOP } from './pricing'
import type { Settings } from './seed'
import { getState, setState } from './store'

// ---------- Cart ----------
export function addToCart(product: Product, quantity = 1) {
  setState((s) => {
    const existing = s.cart.find((l) => l.slug === product.slug)
    if (existing) {
      return { cart: s.cart.map((l) => (l.slug === product.slug ? { ...l, quantity: Math.min(l.stock || 99999, l.quantity + quantity), selected: true } : l)) }
    }
    const line: CartLine = {
      slug: product.slug, name: product.name, spec: product.spec, image: product.image, unitPrice: product.price,
      stock: product.stock, quantity, selected: true, shopSlug: product.shop.slug, shopName: product.shop.name,
    }
    return { cart: [...s.cart, line] }
  })
}

export function setQuantity(slug: string, quantity: number) {
  setState((s) => ({ cart: s.cart.map((l) => (l.slug === slug ? { ...l, quantity: Math.max(1, quantity) } : l)) }))
}

export function removeFromCart(slug: string) {
  setState((s) => ({ cart: s.cart.filter((l) => l.slug !== slug) }))
}

export function toggleSelected(slug: string) {
  setState((s) => ({ cart: s.cart.map((l) => (l.slug === slug ? { ...l, selected: !l.selected } : l)) }))
}

export function setAllSelected(selected: boolean) {
  setState((s) => ({ cart: s.cart.map((l) => ({ ...l, selected })) }))
}

export function removeSelected() {
  setState((s) => ({ cart: s.cart.filter((l) => !l.selected) }))
}

export function applyCoupon(code: string) {
  setState(() => ({ couponCode: code.trim().toUpperCase() || null }))
}

export function removeCoupon() {
  setState(() => ({ couponCode: null }))
}

// ---------- Wishlist ----------
export function toggleWishlist(slug: string) {
  setState((s) => ({ wishlist: s.wishlist.includes(slug) ? s.wishlist.filter((x) => x !== slug) : [slug, ...s.wishlist] }))
}

// ---------- Orders ----------
export interface PlaceOrderInput {
  paymentMethod: string
  deliveryByShop: Record<string, { label: string; fee: number }>
  /** Payment surcharge (e.g. cash-on-delivery fee), charged once on the first order. */
  paymentFee?: number
  note?: string
}

/** Turn the selected cart lines into one order per shop and remove them from the cart. */
export function placeOrder(input: PlaceOrderInput): string[] {
  const s = getState()
  const selected = s.cart.filter((l) => l.selected)
  if (selected.length === 0) return []
  const totals = computeTotals(s.cart, s.couponCode)
  const address = s.addresses.find((a) => a.isDefault) ?? s.addresses[0]
  const byShop = new Map<string, CartLine[]>()
  for (const l of selected) byShop.set(l.shopSlug, [...(byShop.get(l.shopSlug) ?? []), l])
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  let seq = 20490 + s.orders.length
  const newOrders: Order[] = [...byShop.entries()].map(([shopSlug, lines], index) => {
    const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
    const delivery = input.deliveryByShop[shopSlug] ?? { label: 'Courier', fee: DELIVERY_PER_SHOP }
    const freeDelivery = totals.coupon?.kind === 'free-delivery'
    const discount = index === 0 ? (freeDelivery ? Object.values(input.deliveryByShop).reduce((n, d) => n + d.fee, 0) : totals.discount) : 0
    const paymentFee = index === 0 ? (input.paymentFee ?? 0) : 0
    const orderLines: OrderLine[] = lines.map((l) => ({ name: l.name, spec: l.spec, image: l.image, quantity: l.quantity, unitPrice: l.unitPrice, total: l.unitPrice * l.quantity }))
    return {
      id: `EH-${seq++}`, date, shopName: lines[0]!.shopName, shopSlug, status: 'pending', itemCount: lines.length,
      thumbnails: lines.map((l) => l.image), lines: orderLines, subtotal, deliveryFee: delivery.fee + paymentFee, discount,
      couponCode: index === 0 ? totals.coupon?.code : undefined, total: Math.max(0, subtotal + delivery.fee + paymentFee - discount),
      paymentMethod: input.paymentMethod, deliveryMethod: delivery.label,
      address: address ? { recipient: address.recipient, phone: address.phone, line: address.line } : undefined,
    }
  })
  setState((st) => ({
    orders: [...newOrders, ...st.orders],
    cart: st.cart.filter((l) => !l.selected),
    couponCode: null,
    notifications: [
      { id: `n-${newOrders[0]!.id}`, kind: 'order', title: `Order #${newOrders[0]!.id} placed`, body: `${newOrders.length} shipment(s) awaiting shop confirmation`, time: 'Just now', unread: true, group: 'today' },
      ...st.notifications,
    ],
  }))
  return newOrders.map((o) => o.id)
}

export function cancelOrder(id: string) {
  setState((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status: 'cancelled' } : o)) }))
}

// ---------- Addresses ----------
export function saveAddress(address: Omit<Address, 'id'> & { id?: string }) {
  setState((s) => {
    const id = address.id ?? `a${Date.now()}`
    const next = { ...address, id } as Address
    let list = s.addresses.some((a) => a.id === id) ? s.addresses.map((a) => (a.id === id ? next : a)) : [...s.addresses, next]
    if (next.isDefault || list.length === 1) list = list.map((a) => ({ ...a, isDefault: a.id === id }))
    return { addresses: list }
  })
}

export function deleteAddress(id: string) {
  setState((s) => {
    const list = s.addresses.filter((a) => a.id !== id)
    if (list.length && !list.some((a) => a.isDefault)) list[0] = { ...list[0]!, isDefault: true }
    return { addresses: list }
  })
}

export function setDefaultAddress(id: string) {
  setState((s) => ({ addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })) }))
}

// ---------- Profile & settings ----------
export function updateProfile(patch: Partial<CustomerProfile>) {
  setState((s) => {
    const profile = { ...s.profile, ...patch }
    return { profile: { ...profile, initials: initials(profile.name) } }
  })
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  setState((s) => ({ settings: { ...s.settings, [key]: value } }))
}

// ---------- Messages ----------
/** Open (or start) a conversation with a shop; returns its id. */
export function openConversation(shopSlug: string): string {
  const s = getState()
  const existing = s.conversations.find((c) => c.shopSlug === shopSlug)
  if (existing) {
    markConversationRead(existing.id)
    return existing.id
  }
  const shop = shops.find((x) => x.slug === shopSlug)
  const id = `cv-${shopSlug}`
  setState((st) => ({
    conversations: [
      { id, shopSlug, shopName: shop?.name ?? shopSlug, initials: shop?.initials ?? 'SH', color: shop?.color ?? 'blue', lastMessage: 'Start the conversation', time: 'Now', unread: 0 },
      ...st.conversations,
    ],
    messages: { ...st.messages, [id]: [] },
  }))
  return id
}

export function markConversationRead(id: string) {
  setState((s) => ({ conversations: s.conversations.map((c) => (c.id === id ? { ...c, unread: 0 } : c)) }))
}

const replies = [
  'Thanks for your message! Let me check stock and get back to you.',
  'Yes, available. You can order online or pick up from the shop.',
  'We can offer a better price for bulk quantity.',
]

export function sendMessage(conversationId: string, body: string) {
  const text = body.trim()
  if (!text) return
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const push = (msg: ChatMessage, preview: string) =>
    setState((s) => ({
      messages: { ...s.messages, [conversationId]: [...(s.messages[conversationId] ?? []), msg] },
      conversations: s.conversations.map((c) => (c.id === conversationId ? { ...c, lastMessage: preview, time } : c)),
    }))
  push({ id: `m${Date.now()}`, from: 'me', body: text, time: `${time} · Sent` }, `You: ${text}`)
  // Simulated shop reply so the chat feels alive with mock data.
  setTimeout(() => {
    const reply = replies[Math.floor(Math.random() * replies.length)]!
    push({ id: `m${Date.now()}r`, from: 'shop', body: reply, time }, reply)
  }, 1200)
}

// ---------- Notifications ----------
export function markAllNotificationsRead() {
  setState((s) => ({ notifications: s.notifications.map((n) => ({ ...n, unread: false })) }))
}

export function markNotificationRead(id: string) {
  setState((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, unread: false } : n)) }))
}
