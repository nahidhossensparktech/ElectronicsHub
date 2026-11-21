import type { Product } from '@repo/types'
import { categories } from '@/lib/mock-db/categories'
import { allProducts } from '@/lib/mock-db/products'
import { shops } from '@/lib/mock-db/shops'

export type SortKey = 'relevant' | 'price-asc' | 'price-desc' | 'newest' | 'popular'
export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'relevant', label: 'Most relevant' },
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export interface ProductQuery {
  q?: string
  categories: string[]
  brands: string[]
  minPrice?: number
  maxPrice?: number
  inStock: boolean
  wholesale: boolean
  district?: string
  verified: boolean
  shop?: string
  sort: SortKey
  page: number
  view: 'grid' | 'list'
}

export type SearchParams = Record<string, string | string[] | undefined>

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)
const list = (v: string | string[] | undefined) => (first(v) ? first(v)!.split(',').filter(Boolean) : [])
const num = (v: string | string[] | undefined) => {
  const n = Number(first(v))
  return first(v) && Number.isFinite(n) ? n : undefined
}

/** Parse URL search params into a typed query (unknown values fall back to defaults). */
export function parseProductQuery(params: SearchParams, defaults: Partial<ProductQuery> = {}): ProductQuery {
  const sort = first(params.sort) as SortKey | undefined
  return {
    q: first(params.q)?.trim() || defaults.q,
    categories: params.category ? list(params.category) : (defaults.categories ?? []),
    brands: list(params.brand),
    minPrice: num(params.min),
    maxPrice: num(params.max),
    inStock: first(params.stock) === '1',
    wholesale: first(params.wholesale) === '1' || Boolean(defaults.wholesale),
    district: first(params.district) || undefined,
    verified: first(params.verified) === '1',
    shop: defaults.shop,
    sort: sort && sortOptions.some((o) => o.value === sort) ? sort : (defaults.sort ?? 'relevant'),
    page: Math.max(1, num(params.page) ?? 1),
    view: first(params.view) === 'list' ? 'list' : 'grid',
  }
}

const districtOf = new Map(shops.map((s) => [s.slug, s.district]))

function matchesText(product: Product, q: string): boolean {
  const hay = `${product.name} ${product.spec} ${product.brand ?? ''} ${product.shop.name}`.toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((term) => hay.includes(term))
}

function relevance(product: Product, q?: string): number {
  if (!q) return product.popularity ?? 0
  const name = product.name.toLowerCase()
  return (name.startsWith(q.toLowerCase()) ? 100 : 0) + (product.popularity ?? 0)
}

/** Wholesale listings: every in-stock part gets a bulk unit price and an MOQ. */
export function toWholesale(product: Product): Product {
  const price = product.price < 20 ? Math.round(product.price * 0.64 * 10) / 10 : Math.round(product.price * 0.8)
  return { ...product, price, priceNote: 'MOQ 100', badge: 'wholesale' }
}

export interface Facet {
  value: string
  label: string
  count: number
}

export interface ProductResult {
  items: Product[]
  total: number
  page: number
  pageCount: number
  pageSize: number
  facets: { categories: Facet[]; brands: Facet[] }
}

/** Filter, sort and paginate the mock catalogue. */
export function queryProducts(query: ProductQuery, pageSize = 12): ProductResult {
  let base = allProducts
  if (query.shop) base = base.filter((p) => p.shop.slug === query.shop)
  if (query.q) base = base.filter((p) => matchesText(p, query.q!))
  if (query.wholesale) base = base.filter((p) => p.stock >= 100).map(toWholesale)

  const filtered = base.filter(
    (p) =>
      (query.categories.length === 0 || query.categories.includes(p.categorySlug)) &&
      (query.brands.length === 0 || query.brands.includes(p.brand ?? 'Generic')) &&
      (query.minPrice === undefined || p.price >= query.minPrice) &&
      (query.maxPrice === undefined || p.price <= query.maxPrice) &&
      (!query.inStock || p.stock > 0) &&
      (!query.district || districtOf.get(p.shop.slug)?.toLowerCase() === query.district.toLowerCase()) &&
      (!query.verified || p.shop.verified),
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (query.sort) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'newest':
        return (a.addedDaysAgo ?? 0) - (b.addedDaysAgo ?? 0)
      case 'popular':
        return (b.popularity ?? 0) - (a.popularity ?? 0)
      default:
        return relevance(b, query.q) - relevance(a, query.q)
    }
  })

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const page = Math.min(query.page, pageCount)

  // Facet counts ignore their own dimension so users can widen a selection.
  const count = (key: 'categorySlug' | 'brand') => {
    const map = new Map<string, number>()
    for (const p of base) {
      const v = key === 'brand' ? (p.brand ?? 'Generic') : p.categorySlug
      map.set(v, (map.get(v) ?? 0) + 1)
    }
    return map
  }
  const catCounts = count('categorySlug')
  const brandCounts = count('brand')

  return {
    items: sorted.slice((page - 1) * pageSize, page * pageSize),
    total: sorted.length,
    page,
    pageCount,
    pageSize,
    facets: {
      categories: categories
        .map((c) => ({ value: c.slug, label: c.name, count: catCounts.get(c.slug) ?? 0 }))
        .filter((f) => f.count > 0),
      brands: [...brandCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([value, n]) => ({ value, label: value, count: n })),
    },
  }
}

/** Build a URL for the same page with some params changed (null removes). */
export function withParams(pathname: string, params: SearchParams, changes: Record<string, string | null>): string {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    const value = first(v)
    if (value) sp.set(k, value)
  }
  for (const [k, v] of Object.entries(changes)) {
    if (v === null || v === '') sp.delete(k)
    else sp.set(k, v)
  }
  const s = sp.toString()
  return s ? `${pathname}?${s}` : pathname
}
