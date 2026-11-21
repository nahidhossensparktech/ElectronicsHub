import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, PageHeader } from '@repo/ui'
import { CategoryBanner, getCategory, parseProductQuery, ProductListing, queryProducts, type SearchParams, SubcategoryList, withParams } from '@/features/catalog'
import { allProducts } from '@/lib/mock-db/products'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory((await params).slug)
  return { title: category?.name ?? 'Category' }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) notFound()
  const sp = await searchParams
  const query = { ...parseProductQuery(sp), categories: [slug] }
  const result = queryProducts(query)
  const inCategory = allProducts.filter((p) => p.categorySlug === slug)
  const images = [...new Set(inCategory.map((p) => p.image))].slice(0, 3)
  const pathname = `/categories/${slug}`
  // Sub-categories = the distinct part families in this category (search within it).
  const families = [...new Map(inCategory.map((p) => [p.name.split(' ')[0]!, p.image])).entries()].slice(0, 7)
  const subcategories = families.map(([term, icon]) => ({
    label: term,
    icon,
    href: withParams(pathname, sp, { q: query.q === term ? null : term, page: null }),
    active: query.q === term,
  }))
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'All Categories', href: '/categories' }, { label: category.name }]}
        title={category.name}
        subtitle="Browse by sub-category or filter by brand, price and location"
      />
      <Container className="pt-8 pb-16">
        <CategoryBanner
          title={category.name}
          description={`${inCategory.length} listings from ${new Set(inCategory.map((p) => p.shop.slug)).size} verified shops. Compare prices and stock before you buy.`}
          images={images}
        />
        {subcategories.length > 1 ? <div className="mt-6"><SubcategoryList items={subcategories} /></div> : null}
        <div className="mt-6">
          <ProductListing result={result} query={query} params={sp} pathname={pathname} lockedCategory={slug} />
        </div>
      </Container>
    </>
  )
}
