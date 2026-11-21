'use client'

import { Package, ShieldCheck, Store } from 'lucide-react'
import { Container, FeatureCard } from '@repo/ui'
import { useTranslation } from '@/lib/i18n'

export function ValueProps() {
  const { t } = useTranslation()

  const items = [
    {
      icon: <Store />,
      title: t('vp.shopDiscovery'),
      description: t('vp.shopDiscoveryDesc'),
    },
    {
      icon: <Package />,
      title: t('vp.liveStock'),
      description: t('vp.liveStockDesc'),
    },
    {
      icon: <ShieldCheck />,
      title: t('vp.trustedSellers'),
      description: t('vp.trustedSellersDesc'),
    },
  ]

  return (
    <section className="bg-white">
      <Container className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-3 sm:gap-5 sm:py-8">
        {items.map((item) => (
          <FeatureCard key={item.title} className="h-full min-h-[104px]" {...item} />
        ))}
      </Container>
    </section>
  )
}
