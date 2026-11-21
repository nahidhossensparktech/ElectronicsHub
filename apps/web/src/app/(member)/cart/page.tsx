import type { Metadata } from 'next'
import { Breadcrumb, Container, Section, SectionHeader } from '@repo/ui'
import { ProductGrid } from '@/components/product'
import { CartView } from '@/features/cart'
import { pick } from '@/lib/mock-db/products'

export const metadata: Metadata = { title: 'Shopping Cart' }

export default function CartPage() {
  return (
    <>
      <Container className="pt-[26px] pb-16">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shopping Cart' }]} />
        <h1 className="mt-6 font-display text-[32px] leading-10 font-bold text-ink">Shopping Cart</h1>
        <CartView />
      </Container>
      <Section tone="canvas">
        <SectionHeader title="You may also need" subtitle="Frequently bought together" action={{ label: 'View All', href: '/products' }} />
        <ProductGrid products={pick('header', 'lm7805', 'relay', 'dht11', 'diode')} className="mt-7" />
      </Section>
    </>
  )
}
