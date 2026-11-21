import {
  getHomePageData,
  HomeHero,
  NewsletterBand,
  PopularShops,
  ProductSection,
  ValueProps,
  VendorCta,
  WhyBuy,
} from '@/features/home'

export default async function HomePage() {
  const data = await getHomePageData()
  return (
    <>
      <HomeHero categories={data.categories} />
      <ValueProps />
      <ProductSection title="Featured Products" subtitle="Hand-picked components from verified shops" products={data.featured} />
      <PopularShops shops={data.popularShops} />
      <ProductSection
        title="Trending Products"
        subtitle="What makers and engineers are searching for right now"
        products={data.trending}
        filters={[
          { label: 'All', category: null },
          { label: 'Microcontrollers', category: 'microcontrollers' },
          { label: 'Sensors', category: 'sensors-modules' },
          { label: 'Power', category: 'power-supply' },
          { label: 'Tools', category: 'tools-equipment' },
        ]}
      />
      <ProductSection title="Best Selling Products" subtitle="Top sellers across all shops" products={data.bestSelling} />
      <ProductSection
        title="Wholesale Products"
        subtitle="Bulk tier pricing for repair shops, labs and factories"
        products={data.wholesale}
        href="/wholesale"
      />
      <ProductSection title="Recently Added Products" subtitle="New listings from the last 24 hours" products={data.recent} />
      <VendorCta />
      <WhyBuy />
      <NewsletterBand />
    </>
  )
}
