import type { Metadata } from 'next'
import { Container } from '@repo/ui'
import { OrderSuccessView } from '@/features/checkout'

export const metadata: Metadata = { title: 'Order placed' }

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ orders?: string }> }) {
  const { orders = '' } = await searchParams
  return (
    <Container>
      <OrderSuccessView orderIds={orders.split(',').filter(Boolean)} />
    </Container>
  )
}
