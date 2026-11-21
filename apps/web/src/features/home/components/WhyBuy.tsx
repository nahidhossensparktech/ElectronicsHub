'use client'

import { MessageCircle, Search, Tag, Truck } from 'lucide-react'
import { FeatureCard, Section, SectionHeader } from '@repo/ui'
import { useTranslation } from '@/lib/i18n'

export function WhyBuy() {
  const { t } = useTranslation()

  const reasons = [
    { icon: <Search />, title: t('whyBuy.parts'), description: t('whyBuy.partsDesc') },
    { icon: <Tag />, title: t('whyBuy.prices'), description: t('whyBuy.pricesDesc') },
    { icon: <MessageCircle />, title: t('whyBuy.talk'), description: t('whyBuy.talkDesc') },
    { icon: <Truck />, title: t('whyBuy.delivery'), description: t('whyBuy.deliveryDesc') },
  ]

  return (
    <Section className="pt-0">
      <SectionHeader title={t('section.whyBuy')} subtitle={t('section.whyBuySub')} />
      <div className="mt-5 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {reasons.map((reason) => (
          <FeatureCard key={reason.title} layout="stack" iconStyle="soft" className="h-full min-h-[170px]" {...reason} />
        ))}
      </div>
    </Section>
  )
}
