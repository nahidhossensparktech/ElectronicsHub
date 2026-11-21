import type { Metadata } from 'next'
import { Container } from '@repo/ui'
import { ChipBar, parseProductQuery, ProductListing, queryProducts, type SearchParams, withParams } from '@/features/catalog'
import { QuoteCta, WholesaleHero } from '@/features/wholesale'

export const metadata: Metadata = { title: 'Wholesale' }

const groups = [
  { label: 'All', category: null },
  { label: 'Passive parts', category: 'resistors-capacitors' },
  { label: 'Semiconductors', category: 'ic-semiconductors' },
  { label: 'Modules', category: 'sensors-modules' },
  { label: 'Connectors', category: 'connectors-cables' },
  { label: 'Power', category: 'power-supply' },
]

export default async function WholesalePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const query = parseProductQuery(params, { wholesale: true, sort: 'price-asc' })
  const result = queryProducts(query)
  const current = query.categories[0] ?? null
  return (
    <>
      <WholesaleHero />
      <Container className="pt-8 pb-16">
        <ChipBar items={groups.map((g) => ({ label: g.label, href: withParams('/wholesale', params, { category: g.category, page: null }), active: current === g.category }))} />
        <div className="mt-7">
          <ProductListing result={result} query={query} params={params} pathname="/wholesale" noun="wholesale listings" defaultSort="price-asc" />
        </div>
      </Container>
      <QuoteCta />
      <div className="pb-11" />
    </>
  )
}
