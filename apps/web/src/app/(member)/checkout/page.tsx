import type { Metadata } from 'next'
import { Breadcrumb, Container } from '@repo/ui'
import { CheckoutView } from '@/features/checkout'

export const metadata: Metadata = { title: 'Checkout' }

export default function CheckoutPage() {
  return (
    <Container className="pt-[26px] pb-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="mt-6 font-display text-[32px] leading-10 font-bold text-ink">Checkout</h1>
      <CheckoutView />
    </Container>
  )
}
