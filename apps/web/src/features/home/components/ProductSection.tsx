'use client'

import type { Product } from '@repo/types'
import { Section, SectionHeader } from '@repo/ui'
import { ProductGrid } from '@/components/product'
import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { TrendingFilters } from './TrendingFilters'

export interface ProductSectionProps {
  title: string
  subtitle: string
  products: Product[]
  href?: string
  /** Chip label → category slug (null = all). Chips filter the row client-side. */
  filters?: { label: string; category: string | null }[]
}

const titleKeyMap: Record<string, { titleKey: TranslationKey; subKey: TranslationKey }> = {
  'Featured Products': { titleKey: 'section.featuredProducts', subKey: 'section.featuredProductsSub' },
  'Trending Products': { titleKey: 'section.trendingProducts', subKey: 'section.trendingProductsSub' },
  'Best Selling Products': { titleKey: 'section.bestSelling', subKey: 'section.bestSellingSub' },
  'Wholesale Products': { titleKey: 'section.wholesale', subKey: 'section.wholesaleSub' },
  'Recently Added Products': { titleKey: 'section.recentlyAdded', subKey: 'section.recentlyAddedSub' },
}

/** Titled 5-up product row, optionally with filter chips (Trending). */
export function ProductSection({ title, subtitle, products, href = '/products', filters }: ProductSectionProps) {
  const { t } = useTranslation()

  const mapping = titleKeyMap[title]
  const displayTitle = mapping ? t(mapping.titleKey) : title
  const displaySubtitle = mapping ? t(mapping.subKey) : subtitle

  return (
    <Section>
      <SectionHeader title={displayTitle} subtitle={displaySubtitle} action={{ label: t('section.viewAll'), href }} />
      {filters ? (
        <TrendingFilters filters={filters} products={products} />
      ) : (
        <ProductGrid products={products} className="mt-5 sm:mt-7" />
      )}
    </Section>
  )
}
