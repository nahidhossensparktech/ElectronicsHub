import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, Container, Section, SectionHeader } from '@repo/ui'
import { ProductGrid } from '@/components/product'
import {
  getMoreFromShop,
  getProductDetail,
  getSimilarProducts,
  ProductDetailsPanel,
  ProductGallery,
  ProductSummary,
  SellerCard,
} from '@/features/product-detail'
import { getShop, getShopReviews } from '@/features/shops'
import { categories } from '@/lib/mock-db/categories'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductDetail((await params).slug)
  return { title: product?.name ?? 'Product not found' }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductDetail((await params).slug)
  if (!product) notFound()
  const [shop, more, similar, reviews] = await Promise.all([getShop(product.shop.slug), getMoreFromShop(product), getSimilarProducts(product), getShopReviews()])
  const category = categories.find((c) => c.slug === product.categorySlug)
  return (
    <>
      <Container className="pt-[26px] pb-16">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: category?.name ?? 'Products', href: category ? `/categories/${category.slug}` : '/products' }, { label: product.name.split(' (')[0]! }]} />
        <div className="mt-[30px] flex flex-col gap-20 lg:flex-row">
          <ProductGallery images={product.gallery} alt={product.name} />
          <ProductSummary product={product} categoryName={category?.name ?? 'Components'} />
        </div>
      </Container>
      <section className="bg-canvas py-14">
        <Container className="flex flex-col gap-10 lg:flex-row">
          <ProductDetailsPanel product={product} reviews={reviews} />
          {shop ? <SellerCard shop={shop} /> : null}
        </Container>
      </section>
      {more.length > 0 ? (
        <Section>
          <SectionHeader title={`More from ${product.shop.name}`} subtitle="Other products from the same shop" action={{ label: 'Visit Shop', href: `/shops/${product.shop.slug}` }} />
          <ProductGrid products={more} className="mt-7" />
        </Section>
      ) : null}
      {similar.length > 0 ? (
        <Section tone="canvas">
          <SectionHeader title="Similar Products" subtitle="Compare the same part across other shops" action={{ label: 'View All', href: `/categories/${product.categorySlug}` }} />
          <ProductGrid products={similar} className="mt-7" />
        </Section>
      ) : null}
    </>
  )
}
