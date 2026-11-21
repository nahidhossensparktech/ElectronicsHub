'use client'

import type { Shop } from '@repo/types'
import { Section, SectionHeader, ShopCard } from '@repo/ui'
import { useTranslation } from '@/lib/i18n'

export function PopularShops({ shops }: { shops: Shop[] }) {
  const { t } = useTranslation()

  return (
    <Section>
      <SectionHeader
        title={t('section.popularShops')}
        subtitle={t('section.popularShopsSub')}
        action={{ label: t('section.viewAll'), href: '/shops' }}
      />
      <div className="mt-5 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {shops.map((shop) => (
          <ShopCard key={shop.slug} shop={shop} />
        ))}
      </div>
    </Section>
  )
}
