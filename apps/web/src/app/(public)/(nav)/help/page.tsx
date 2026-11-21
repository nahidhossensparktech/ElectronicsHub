import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Layers, MessageCircle, Percent, RefreshCw, ShoppingCart, Store, Truck, UserRound } from 'lucide-react'
import { FeatureCard, Section, SectionHeader } from '@repo/ui'
import { ArticleList, HelpHero, SupportCard } from '@/features/content'

export const metadata: Metadata = { title: 'Help Center' }

const topics = [
  { icon: <ShoppingCart />, title: 'Orders & checkout', description: 'Placing orders, multiple shops, order status', href: '/faq?topic=buying' },
  { icon: <Percent />, title: 'Payments', description: 'bKash, Nagad, cards and cash on delivery', href: '/faq?topic=payments' },
  { icon: <Truck />, title: 'Delivery & tracking', description: 'Courier times, pickup and tracking', href: '/faq?topic=delivery' },
  { icon: <RefreshCw />, title: 'Returns & refunds', description: 'Return window, refund timelines', href: '/faq?topic=returns' },
  { icon: <UserRound />, title: 'Account & security', description: 'Login, OTP, password and profile', href: '/faq?topic=account' },
  { icon: <Store />, title: 'Selling on the Hub', description: 'Open a shop, list products, get verified', href: '/faq?topic=selling' },
  { icon: <Layers />, title: 'Wholesale', description: 'Tier pricing, MOQ and quotes', href: '/faq?q=wholesale' },
  { icon: <MessageCircle />, title: 'Messaging sellers', description: 'Contact shops and get replies', href: '/faq?q=contact' },
]

export default function HelpPage() {
  return (
    <>
      <HelpHero popular={[{ label: 'Track order', q: 'track' }, { label: 'Return an item', q: 'return' }, { label: 'Change phone number', q: 'phone number' }, { label: 'Become a vendor', q: 'open a shop' }]} />
      <Section>
        <SectionHeader title="Browse by topic" />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <FeatureCard key={t.title} layout="stack" iconStyle="soft" iconSize="md" icon={t.icon} title={t.title} description={t.description} className="p-5">
              <Link href={t.href} className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand">Browse articles <ChevronRight className="size-3.5" /></Link>
            </FeatureCard>
          ))}
        </div>
      </Section>
      <Section tone="canvas">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">Popular articles</h2>
            <div className="mt-5"><ArticleList articles={[{ title: 'How to track your order', q: 'track' }, { title: 'Ordering from more than one shop', q: 'more than one shop' }, { title: 'How to request a return', q: 'return' }, { title: 'Setting up your vendor storefront', q: 'open a shop' }, { title: 'Paying with bKash or cash on delivery', q: 'payment' }]} /></div>
          </div>
          <div className="lg:pt-12"><SupportCard /></div>
        </div>
      </Section>
    </>
  )
}
