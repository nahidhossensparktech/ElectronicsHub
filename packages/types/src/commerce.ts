import type { AvatarColor } from './catalog'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderLine {
  name: string
  spec: string
  image: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Order {
  id: string
  date: string
  shopName: string
  shopSlug?: string
  status: OrderStatus
  total: number
  itemCount: number
  thumbnails: string[]
  lines?: OrderLine[]
  subtotal?: number
  deliveryFee?: number
  discount?: number
  couponCode?: string
  paymentMethod?: string
  deliveryMethod?: string
  address?: { recipient: string; phone: string; line: string }
}

export interface CartItem {
  id: string
  name: string
  spec: string
  image: string
  unitPrice: number
  stock: number
  quantity: number
}

/** A cart line as stored on the client (product snapshot + quantity). */
export interface CartLine {
  slug: string
  name: string
  spec: string
  image: string
  unitPrice: number
  stock: number
  quantity: number
  selected: boolean
  shopSlug: string
  shopName: string
}

export interface CartShopGroup {
  shopSlug: string
  shopName: string
  shopInitials: string
  shopColor: AvatarColor
  location: string
  deliveryNote: string
  items: CartItem[]
}

export interface Address {
  id: string
  label: string
  kind: 'home' | 'office' | 'other'
  recipient: string
  line: string
  phone: string
  isDefault: boolean
}

export interface Coupon {
  title: string
  condition: string
  code: string
  shopName: string
  /** Flat amount off, percent off, or free delivery. */
  kind?: 'flat' | 'percent' | 'free-delivery'
  value?: number
  minSubtotal?: number
}
