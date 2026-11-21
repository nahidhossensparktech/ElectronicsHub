import type { ReactNode } from 'react'
import { Pagination } from '@repo/ui'
import { formatNumber } from '@repo/utils'
import { ProductGrid } from '@/components/product'
import { type ProductQuery, type ProductResult, type SearchParams, type SortKey, withParams } from '../api/query'
import { ActiveFilters } from './ActiveFilters'
import { FilterSidebar } from './FilterSidebar'
import { ResultsToolbar } from './ResultsToolbar'

export interface ProductListingProps {
  result: ProductResult
  query: ProductQuery
  params: SearchParams
  pathname: string
  /** Noun used in the summary ("products", "wholesale listings"). */
  noun?: string
  defaultSort?: SortKey
  lockedCategory?: string
  summary?: ReactNode
}

/** Filter sidebar + toolbar + grid/list + pagination, all driven by the URL. */
export function ProductListing({ result, query, params, pathname, noun = 'products', defaultSort, lockedCategory, summary }: ProductListingProps) {
  const from = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1
  const to = Math.min(result.total, result.page * result.pageSize)
  return (
    <div className="flex gap-8">
      <FilterSidebar categoryFacets={result.facets.categories} brandFacets={result.facets.brands} hideCategories={Boolean(lockedCategory)} params={params} />
      <div className="min-w-0 flex-1">
        <ResultsToolbar params={params} defaultSort={defaultSort} summary={summary ?? `Showing ${from}–${to} of ${formatNumber(result.total)} ${noun}`} />
        <ActiveFilters query={query} params={params} pathname={pathname} lockedCategory={lockedCategory} />
        <ProductGrid products={result.items} columns={4} view={query.view} className="mt-6" />
        <Pagination
          page={result.page}
          totalPages={result.pageCount}
          hrefForPage={(page) => withParams(pathname, params, { page: page === 1 ? null : String(page) })}
          className="mt-12"
        />
      </div>
    </div>
  )
}
