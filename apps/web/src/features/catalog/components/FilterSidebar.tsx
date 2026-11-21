'use client'

import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { Checkbox, Select } from '@repo/ui'
import { formatNumber } from '@repo/utils'
import type { Facet } from '../api/query'
import { FilterGroup } from './FilterGroup'
import { PriceRangeFilter } from './PriceRangeFilter'
import { type ParamRecord, useUrlParams } from '@/hooks/useUrlParams'

const districts = ['Dhaka', 'Chattogram', 'Khulna', 'Sylhet']

export interface FilterSidebarProps {
  categoryFacets: Facet[]
  brandFacets: Facet[]
  /** Hide the category group (e.g. on a category page). */
  hideCategories?: boolean
  /** Current URL search params (from the server page). */
  params: ParamRecord
}

/** URL-driven filter panel shared by every product listing. */
export function FilterSidebar({ categoryFacets, brandFacets, hideCategories, params: current }: FilterSidebarProps) {
  const { params, pathname, update, toggleInList } = useUrlParams(current)
  const [showAll, setShowAll] = useState(false)
  const selected = (key: string) => (params.get(key) ?? '').split(',').filter(Boolean)
  const cats = selected('category')
  const brands = selected('brand')
  const visibleCats = showAll ? categoryFacets : categoryFacets.slice(0, 4)
  const num = (k: string) => (params.get(k) ? Number(params.get(k)) : undefined)

  return (
    <aside className="hidden w-[272px] shrink-0 self-start rounded-2xl bg-canvas p-5 lg:block">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink">Filters</h2>
        <button
          type="button"
          className="text-sm font-semibold text-brand"
          onClick={() => update({ category: hideCategories ? params.get('category') : null, brand: null, min: null, max: null, stock: null, wholesale: null, district: null, verified: null })}
        >
          Reset
        </button>
      </div>
      <div className="mt-6 space-y-6">
        {!hideCategories && categoryFacets.length > 0 ? (
          <FilterGroup title="Category">
            <div className="space-y-3.5">
              {visibleCats.map((f) => (
                <Checkbox key={f.value} label={f.label} meta={formatNumber(f.count)} checked={cats.includes(f.value)} onChange={() => toggleInList('category', f.value)} />
              ))}
            </div>
            {categoryFacets.length > 4 ? (
              <button type="button" onClick={() => setShowAll(!showAll)} className="mt-3 text-sm font-semibold text-brand">
                {showAll ? 'Show less' : 'Show more'}
              </button>
            ) : null}
          </FilterGroup>
        ) : null}
        <FilterGroup title="Price range (৳)">
          <PriceRangeFilter min={num('min')} max={num('max')} onApply={(min, max) => update({ min: min || null, max: max || null })} />
        </FilterGroup>
        {brandFacets.length > 0 ? (
          <FilterGroup title="Brand">
            <div className="space-y-3.5">
              {brandFacets.slice(0, 6).map((f) => (
                <Checkbox key={f.value} label={f.label} meta={f.count} checked={brands.includes(f.value)} onChange={() => toggleInList('brand', f.value)} />
              ))}
            </div>
          </FilterGroup>
        ) : null}
        <FilterGroup title="Availability">
          <div className="space-y-3.5">
            <Checkbox label="In stock" checked={params.get('stock') === '1'} onChange={(e) => update({ stock: e.target.checked ? '1' : null })} />
            {pathname !== '/wholesale' ? (
              <Checkbox label="Wholesale available" checked={params.get('wholesale') === '1'} onChange={(e) => update({ wholesale: e.target.checked ? '1' : null })} />
            ) : null}
          </div>
        </FilterGroup>
        <FilterGroup title="Shop location">
          <div className="relative">
            <MapPin className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 text-muted" />
            <Select
              aria-label="Shop location"
              options={['All districts', ...districts]}
              value={params.get('district') ?? 'All districts'}
              onChange={(e) => update({ district: e.target.value === 'All districts' ? null : e.target.value })}
              size="sm"
              tone="white"
              className="[&_select]:pl-10"
            />
          </div>
          <Checkbox label="Verified sellers only" checked={params.get('verified') === '1'} onChange={(e) => update({ verified: e.target.checked ? '1' : null })} className="mt-4" />
        </FilterGroup>
      </div>
    </aside>
  )
}
