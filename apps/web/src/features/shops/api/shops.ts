import type { District, Review, Shop } from '@repo/types'
import { districts, shops } from '@/lib/mock-db/shops'

export async function getPopularShops(): Promise<Shop[]> {
  return shops.slice(0, 4)
}

export type ShopFilter = 'all' | 'verified' | 'wholesale' | 'open' | 'new'
export type ShopSort = 'popular' | 'rating' | 'products' | 'name'

export interface ShopDirectoryQuery {
  q?: string
  district?: string
  filter: ShopFilter
  sort: ShopSort
  page: number
}

const newShops = new Set(['power-house-bd', 'sylhet-circuit-house'])
const closedNow = new Set(['sylhet-circuit-house'])

/** Search, filter, sort and paginate the shop directory (8 per page). */
export async function getShopDirectory(query: ShopDirectoryQuery, pageSize = 8) {
  const q = query.q?.toLowerCase().trim()
  let list = shops.filter(
    (s) =>
      (!q || `${s.name} ${s.location} ${s.description}`.toLowerCase().includes(q)) &&
      (!query.district || s.district.toLowerCase() === query.district.toLowerCase()) &&
      (query.filter !== 'verified' || s.verified) &&
      (query.filter !== 'wholesale' || s.productCount >= 400) &&
      (query.filter !== 'open' || !closedNow.has(s.slug)) &&
      (query.filter !== 'new' || newShops.has(s.slug)),
  )
  list = [...list].sort((a, b) =>
    query.sort === 'rating' ? b.rating - a.rating : query.sort === 'products' ? b.productCount - a.productCount : query.sort === 'name' ? a.name.localeCompare(b.name) : b.reviewCount - a.reviewCount,
  )
  const pageCount = Math.max(1, Math.ceil(list.length / pageSize))
  const page = Math.min(query.page, pageCount)
  return { shops: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page, pageCount }
}

export async function getShop(slug: string): Promise<Shop | undefined> {
  return shops.find((shop) => shop.slug === slug)
}

export async function getDistricts(): Promise<District[]> {
  return districts
}

export async function getShopReviews(): Promise<Review[]> {
  return [
    { id: 'r1', author: 'Sadia Akter', rating: 5, date: '2 days ago', body: 'Ordered 500 resistors — exact count, well packed, delivered next day.' },
    { id: 'r2', author: 'Tamvir Ahmed', rating: 5, date: '1 week ago', body: 'Good wholesale price. Owner replied within minutes on chat.' },
    { id: 'r3', author: 'Mahin Rahman', rating: 4, date: '2 weeks ago', body: 'Stock was accurate. Pickup from the shop was quick.' },
  ]
}
