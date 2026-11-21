import type { Metadata } from 'next'
import { Container, PageHeader, Pagination, ShopCard } from '@repo/ui'
import { SortSelect } from '@/components/url/SortSelect'
import { ChipBar, type SearchParams, withParams } from '@/features/catalog'
import { getShopDirectory, type ShopFilter, type ShopSort, ShopSearchBar } from '@/features/shops'

export const metadata: Metadata = { title: 'Shops' }

const filters: { value: ShopFilter; label: string }[] = [
  { value: 'all', label: 'All shops' },
  { value: 'verified', label: 'Verified' },
  { value: 'wholesale', label: 'Wholesale sellers' },
  { value: 'open', label: 'Open now' },
  { value: 'new', label: 'New this month' },
]
const sorts = [
  { value: 'popular', label: 'Most popular' },
  { value: 'rating', label: 'Top rated' },
  { value: 'products', label: 'Most products' },
  { value: 'name', label: 'Name A–Z' },
]

export default async function ShopsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const str = (k: string) => (typeof params[k] === 'string' ? (params[k] as string) : undefined)
  const filter = (filters.find((f) => f.value === str('filter'))?.value ?? 'all') as ShopFilter
  const sort = (sorts.find((s) => s.value === str('sort'))?.value ?? 'popular') as ShopSort
  const result = await getShopDirectory({ q: str('q'), district: str('district'), filter, sort, page: Number(str('page')) || 1 })
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Shops' }]}
        title="All Shops"
        subtitle={`${result.total} verified electronics shop${result.total === 1 ? '' : 's'}${str('district') ? ` in ${str('district')}` : ' across Bangladesh'}`}
        aside={<ShopSearchBar q={str('q')} district={str('district')} />}
      />
      <Container className="pt-8 pb-16">
        <div className="flex items-center justify-between gap-4">
          <ChipBar items={filters.map((f) => ({ label: f.label, href: withParams('/shops', params, { filter: f.value === 'all' ? null : f.value, page: null }), active: f.value === filter }))} />
          <SortSelect options={sorts} defaultValue="popular" params={params} />
        </div>
        {result.shops.length ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {result.shops.map((shop) => <ShopCard key={shop.slug} shop={shop} />)}
          </div>
        ) : (
          <div className="mt-7 rounded-2xl bg-canvas px-6 py-16 text-center">
            <p className="text-base font-semibold text-ink">No shops found</p>
            <p className="mt-1 text-sm text-muted">Try another name or district.</p>
          </div>
        )}
        <Pagination page={result.page} totalPages={result.pageCount} hrefForPage={(p) => withParams('/shops', params, { page: p === 1 ? null : String(p) })} className="mt-12" />
      </Container>
    </>
  )
}
