import type { Metadata } from 'next'
import { PageHeader, Section, SectionHeader } from '@repo/ui'
import { ProductGrid } from '@/components/product'
import { coupons } from '@/lib/mock-db/coupons'
import { Countdown, CouponCard, PromoCard } from '@/features/deals'
import { variant } from '@/lib/mock-db/products'
import { img } from '@/lib/mock-db/images'

export const metadata: Metadata = { title: 'Deals & Offers' }

const flash = [
  variant('esp32', { price: 468, compareAtPrice: 520, badge: { discountPercent: 10 } }),
  variant('uno', { price: 690, badge: { discountPercent: 12 } }),
  variant('sr04', { price: 79, badge: { discountPercent: 17 } }),
  variant('cell', { price: 280, badge: { discountPercent: 13 } }),
  variant('multimeter', { price: 399, badge: { discountPercent: 11 } }),
]


export default function DealsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Deals & Offers' }]}
        title="Deals & Offers"
        subtitle="Limited-time prices from verified shops"
        aside={<Countdown />}
        tone="white"
        className="[&>div]:pb-10"
      >
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <PromoCard tone="brand" title="Up to 30% off dev boards" description="ESP32, Arduino and Raspberry Pi accessories." image={img.esp32} href="/categories/microcontrollers" />
          <PromoCard tone="soft" title="Sensor week" description="Buy 3 sensor modules, get 1 free at Maker Store." image={img.sr04} href="/categories/sensors-modules" />
          <PromoCard tone="dark" title="Free delivery in Dhaka" description="On orders over ৳1,000 from Tech Electronics." image={img.resistor} href="/shops/tech-electronics" />
        </div>
      </PageHeader>
      <Section tone="canvas" className="pt-6">
        <SectionHeader title="Flash Deals" subtitle="Prices drop for the next few hours" action={{ label: 'View All', href: '/products' }} />
        <ProductGrid products={flash} className="mt-7" />
      </Section>
      <Section>
        <SectionHeader title="Shop Coupons" subtitle="Apply at checkout with the same shop" />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coupons.map((c) => <CouponCard key={c.code} coupon={c} />)}
        </div>
      </Section>
    </>
  )
}
