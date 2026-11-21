'use client'

import type { Category } from '@repo/types'
import { CategoryCard, Section, SectionHeader } from '@repo/ui'
import { useTranslation } from '@/lib/i18n'

export function PopularCategories({ categories }: { categories: Category[] }) {
  const { t } = useTranslation()

  return (
    <Section className="pt-6 sm:pt-10">
      <SectionHeader
        title={t('section.popularCategories')}
        subtitle={t('section.popularCategoriesSub')}
        action={{ label: t('section.viewAll'), href: '/categories' }}
      />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </Section>
  )
}
