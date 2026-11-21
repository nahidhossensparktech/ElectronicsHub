import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageHeader } from '@repo/ui'
import { parseProductQuery, ProductListing, queryProducts, type SearchParams } from '@/features/catalog'
import { SearchSummary, ShopOfferCard } from '@/features/search'
import { allProducts } from '@/lib/mock-db/products'
import { shops } from '@/lib/mock-db/shops'

export const metadata: Metadata = { title: 'Search results' }

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const query = parseProductQuery(params)
  const q = query.q ?? ''
  const result = queryProducts(query)
  // Shops selling a match, cheapest first.
  const all = queryProducts({ ...query, page: 1, categories: [], brands: [] }, 1000).items
  const bestByShop = new Map<string, number>()
  for (const p of all) bestByShop.set(p.shop.slug, Math.min(bestByShop.get(p.shop.slug) ?? Infinity, p.price))
  const offers = [...bestByShop.entries()].sort((a, b) => a[1] - b[1]).map(([slug, price]) => ({ shop: shops.find((s) => s.slug === slug)!, price })).filter((o) => o.shop)
  const first = q.split(/\s+/)[0]?.toLowerCase() ?? ''
  const suggestions = [...new Set(allProducts.filter((p) => first && p.name.toLowerCase().includes(first)).map((p) => p.name.split(' (')[0]!))]
    .filter((n) => n.toLowerCase() !== q.toLowerCase())
    .slice(0, 3)
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Search', href: '/search' }, ...(q ? [{ label: q }] : [])]}
        title="Search results"
        subtitle={q ? 'Showing best matches across all shops' : 'Type a part name, value or shop in the search bar'}
      />
      <Container className="pt-8 pb-16">
        <SearchSummary query={q || 'all products'} total={result.total} shopCount={offers.length} suggestions={suggestions} />
        {offers.length > 0 && q ? (
          <>
            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">Shops selling {q.toUpperCase()}</h2>
              <Link href={`/shops?q=${encodeURIComponent(q)}`} className="text-sm font-semibold text-brand">See all {offers.length} shops</Link>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {offers.slice(0, 4).map((o) => <ShopOfferCard key={o.shop.slug} shop={o.shop} price={o.price} />)}
            </div>
          </>
        ) : null}
        <div className="mt-7">
          <ProductListing result={result} query={query} params={params} pathname="/search" summary={`${result.total} results`} />
        </div>
      </Container>
    </>
  )
}
