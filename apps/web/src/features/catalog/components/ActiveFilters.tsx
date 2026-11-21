import { X } from 'lucide-react'
import Link from 'next/link'
import { formatBDT } from '@repo/utils'
import { categories } from '@/lib/mock-db/categories'
import { type ProductQuery, type SearchParams, withParams } from '../api/query'

/** Removable tags for the filters currently applied + Clear all. */
export function ActiveFilters({ query, params, pathname, lockedCategory }: { query: ProductQuery; params: SearchParams; pathname: string; lockedCategory?: string }) {
  const tags: { label: string; href: string }[] = []
  const without = (key: string, value?: string) => {
    if (!value) return withParams(pathname, params, { [key]: null, page: null })
    const rest = String(params[key] ?? '').split(',').filter((v) => v && v !== value)
    return withParams(pathname, params, { [key]: rest.join(',') || null, page: null })
  }
  for (const c of query.categories) {
    if (c === lockedCategory) continue
    tags.push({ label: categories.find((x) => x.slug === c)?.name ?? c, href: without('category', c) })
  }
  for (const b of query.brands) tags.push({ label: b, href: without('brand', b) })
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    tags.push({ label: `${query.minPrice !== undefined ? formatBDT(query.minPrice) : '৳0'} – ${query.maxPrice !== undefined ? formatBDT(query.maxPrice) : 'any'}`, href: withParams(pathname, params, { min: null, max: null, page: null }) })
  }
  if (query.inStock) tags.push({ label: 'In stock', href: without('stock') })
  if (params.wholesale === '1') tags.push({ label: 'Wholesale', href: without('wholesale') })
  if (query.district) tags.push({ label: query.district, href: without('district') })
  if (query.verified) tags.push({ label: 'Verified sellers', href: without('verified') })
  if (tags.length === 0) return null
  const clear = withParams(pathname, params, { category: lockedCategory ? String(params.category ?? '') || null : null, brand: null, min: null, max: null, stock: null, wholesale: null, district: null, verified: null, page: null })
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {tags.map((t) => (
        <Link key={t.label} href={t.href} scroll={false} className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-brand-50 px-3 text-xs font-semibold text-brand hover:bg-brand-100">
          {t.label}
          <X className="size-3" />
        </Link>
      ))}
      <Link href={clear} scroll={false} className="ml-1 text-sm text-muted hover:text-ink">Clear all</Link>
    </div>
  )
}
