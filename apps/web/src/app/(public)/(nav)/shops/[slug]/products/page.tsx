import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, Container } from '@repo/ui'
import { ChipBar, parseProductQuery, ProductListing, queryProducts, type SearchParams, withParams } from '@/features/catalog'
import { getShop, ShopMiniHeader } from '@/features/shops'
import { categories } from '@/lib/mock-db/categories'
import { allProducts } from '@/lib/mock-db/products'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> }

export const metadata: Metadata = { title: 'Shop products' }

export default async function ShopProductsPage({ params, searchParams }: Props) {
  const shop = await getShop((await params).slug)
  if (!shop) notFound()
  const sp = await searchParams
  const path = `/shops/${shop.slug}/products`
  const query = parseProductQuery(sp, { shop: shop.slug, sort: 'price-asc' })
  const result = queryProducts(query)
  const own = allProducts.filter((p) => p.shop.slug === shop.slug)
  const active = query.categories[0]
  const chips = [
    { label: `All ${own.length}`, href: withParams(path, sp, { category: null, page: null }), active: !active },
    ...categories
      .map((c) => ({ c, n: own.filter((p) => p.categorySlug === c.slug).length }))
      .filter((x) => x.n > 0)
      .map(({ c, n }) => ({ label: `${c.name} ${n}`, href: withParams(path, sp, { category: c.slug, page: null }), active: active === c.slug })),
  ]
  return (
    <>
      <section className="bg-canvas">
        <Container className="pt-[26px] pb-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shops', href: '/shops' }, { label: shop.name, href: `/shops/${shop.slug}` }, { label: 'Products' }]} />
          <ShopMiniHeader shop={shop} />
        </Container>
      </section>
      <Container className="pt-8 pb-16">
        <ChipBar items={chips} />
        <div className="mt-7">
          <ProductListing result={result} query={query} params={sp} pathname={path} defaultSort="price-asc" summary={`${result.total} products in this shop`} />
        </div>
      </Container>
    </>
  )
}
