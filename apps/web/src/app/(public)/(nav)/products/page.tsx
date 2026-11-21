import type { Metadata } from 'next'
import { Container, PageHeader } from '@repo/ui'
import { formatNumber } from '@repo/utils'
import { ChipBar, parseProductQuery, ProductListing, queryProducts, type SearchParams, withParams } from '@/features/catalog'
import { categories } from '@/lib/mock-db/categories'
import { allProducts } from '@/lib/mock-db/products'
import { shops } from '@/lib/mock-db/shops'

export const metadata: Metadata = { title: 'All Products' }

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const query = parseProductQuery(params)
  const result = queryProducts(query)
  const active = query.categories.length === 1 ? query.categories[0] : query.categories.length === 0 ? 'all' : null
  const chips = [
    { label: 'All', href: withParams('/products', params, { category: null, page: null }), active: active === 'all' },
    ...categories.map((c) => ({ label: c.name, href: withParams('/products', params, { category: c.slug, page: null }), active: active === c.slug })),
  ]
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'All Products' }]}
        title="All Products"
        subtitle={`${formatNumber(allProducts.length)} components from ${shops.length} verified shops`}
      />
      <Container className="pt-8 pb-16">
        <ChipBar items={chips} />
        <div className="mt-7">
          <ProductListing result={result} query={query} params={params} pathname="/products" />
        </div>
      </Container>
    </>
  )
}
