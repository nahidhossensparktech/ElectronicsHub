export type AvatarColor =
  | 'blue'
  | 'navy'
  | 'sky'
  | 'green'
  | 'violet'
  | 'orange'
  | 'red'
  | 'teal'
  | 'slate'

export interface PriceTier {
  /** Inclusive lower bound of the quantity range. */
  minQty: number
  /** Inclusive upper bound; `null` means "and above". */
  maxQty: number | null
  price: number
}

export interface ShopRef {
  slug: string
  name: string
  verified: boolean
}

export type ProductBadge = 'wholesale' | 'new' | 'best-seller' | { discountPercent: number }

export interface Product {
  slug: string
  name: string
  /** Short spec line, e.g. "Wi-Fi + Bluetooth · 30-pin". */
  spec: string
  image: string
  price: number
  /** Unit label shown after the price ("pc"). */
  unit: string
  stock: number
  shop: ShopRef
  categorySlug: string
  /** Note after the unit, e.g. "500+" or "MOQ 100" for wholesale listings. */
  priceNote?: string
  badge?: ProductBadge
  compareAtPrice?: number
  brand?: string
  /** Mock ranking signals used for sorting. */
  popularity?: number
  addedDaysAgo?: number
}

export interface ProductDetail extends Product {
  brand: string
  model: string
  sku: string
  rating: number
  reviewCount: number
  soldCount: string
  gallery: string[]
  priceTiers: PriceTier[]
  minOrder: number
  delivery: string
  specs: { label: string; value: string }[]
  description: string
}

export interface Category {
  slug: string
  name: string
  icon: string
  itemCount: number
}

export interface Shop {
  slug: string
  name: string
  initials: string
  color: AvatarColor
  location: string
  district: string
  description: string
  productCount: number
  rating: number
  reviewCount: number
  verified: boolean
}

export interface District {
  name: string
  shopCount: number
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  body: string
}
