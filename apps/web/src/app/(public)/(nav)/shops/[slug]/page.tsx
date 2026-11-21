import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Search } from 'lucide-react'
import { Breadcrumb, Container, Pagination } from '@repo/ui'
import { cn } from '@repo/utils'
import { ProductGrid } from '@/components/product'
import { SortSelect } from '@/components/url/SortSelect'
import { parseProductQuery, queryProducts, type SearchParams, sortOptions, withParams } from '@/features/catalog'
import { getShop, getShopReviews, ShopAboutCard, ShopCategoryNav, ShopProfileHeader, ShopReviews } from '@/features/shops'
import { categories } from '@/lib/mock-db/categories'
import { allProducts } from '@/lib/mock-db/products'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shop = await getShop((await params).slug)
  return { title: shop?.name ?? 'Shop' }
}

const tabs = ['products', 'categories', 'about', 'reviews'] as const

export default async function ShopPage({ params, searchParams }: Props) {
  const shop = await getShop((await params).slug)
  if (!shop) notFound()
  const sp = await searchParams
  const path = `/shops/${shop.slug}`
  const tab = tabs.find((t) => t === sp.tab) ?? 'products'
  const reviews = await getShopReviews()
  const query = parseProductQuery(sp, { shop: shop.slug, sort: 'popular' })
  const result = queryProducts(query, 8)
  const shopProducts = allProducts.filter((p) => p.shop.slug === shop.slug)
  const activeCat = query.categories[0]
  const catLinks = [
    { label: 'All products', count: shopProducts.length, href: withParams(path, sp, { category: null, page: null }), active: !activeCat },
    ...categories
      .map((c) => ({ c, count: shopProducts.filter((p) => p.categorySlug === c.slug).length }))
      .filter((x) => x.count > 0)
      .map(({ c, count }) => ({ label: c.name, count, href: withParams(path, sp, { category: c.slug, page: null }), active: activeCat === c.slug })),
  ]
  const about = (
    <ShopAboutCard
      about={`${shop.description} Visit us at ${shop.location} or order online — we ship across Bangladesh.`}
      phone="+880 1711-000000"
      email={`sales@${shop.slug.replace(/-/g, '')}.bd`}
    />
  )
  return (
    <>
      <Container className="pt-[26px] pb-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shops', href: '/shops' }, { label: shop.name }]} />
        <ShopProfileHeader shop={shop} />
      </Container>
      <section className="bg-canvas pt-8 pb-16">
        <Container>
          <nav className="inline-flex rounded-xl bg-surface p-1" aria-label="Shop sections">
            {tabs.map((t) => (
              <Link key={t} href={withParams(path, {}, { tab: t === 'products' ? null : t })} scroll={false} aria-current={t === tab ? 'page' : undefined}
                className={cn('inline-flex h-10 items-center rounded-[10px] px-[19px] text-sm capitalize', t === tab ? 'bg-white font-semibold text-ink shadow-card' : 'font-medium text-muted hover:text-ink')}>
                {t === 'reviews' ? `Reviews (${shop.reviewCount})` : t}
              </Link>
            ))}
          </nav>

          {tab === 'products' ? (
            <div className="mt-7 flex gap-8">
              <div className="hidden w-[272px] shrink-0 space-y-4 lg:block">
                <ShopCategoryNav categories={catLinks} />
                {about}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <form action={path} className="relative w-full max-w-[420px]">
                    {activeCat ? <input type="hidden" name="category" value={activeCat} /> : null}
                    <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
                    <input name="q" defaultValue={query.q} placeholder={`Search in ${shop.name}`} className="h-[50px] w-full rounded-xl bg-surface pr-4 pl-11 text-sm outline-none placeholder:text-subtle focus:ring-2 focus:ring-brand/30" />
                  </form>
                  <SortSelect options={sortOptions} defaultValue="popular" params={sp} />
                </div>
                <ProductGrid products={result.items} columns={4} className="mt-6" />
                <Pagination page={result.page} totalPages={result.pageCount} hrefForPage={(p) => withParams(path, sp, { page: p === 1 ? null : String(p) })} className="mt-12" />
                <ShopReviews rating={shop.rating} count={shop.reviewCount} reviews={reviews} />
              </div>
            </div>
          ) : null}

          {tab === 'categories' ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {catLinks.slice(1).map((c) => (
                <Link key={c.label} href={withParams(path, {}, { category: c.href.split('category=')[1]?.split('&')[0] ?? null })} className="rounded-2xl bg-white p-5 hover:ring-1 hover:ring-brand-200">
                  <p className="text-base font-semibold text-ink">{c.label}</p>
                  <p className="mt-1 text-sm text-muted">{c.count} products</p>
                </Link>
              ))}
            </div>
          ) : null}

          {tab === 'about' ? <div className="mt-7 max-w-[560px]">{about}</div> : null}

          {tab === 'reviews' ? <ShopReviews rating={shop.rating} count={shop.reviewCount} reviews={reviews} /> : null}
        </Container>
      </section>
    </>
  )
}
