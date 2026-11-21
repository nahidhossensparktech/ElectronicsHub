'use client'

import { ChevronDown, Search } from 'lucide-react'
import { categories } from '@/lib/mock-db/categories'
import { useTranslation } from '@/lib/i18n'

/** Category select + query input + Search button; a plain GET form to /search. */
export function HeaderSearch() {
  const { t } = useTranslation()

  return (
    <form action="/search" className="flex h-[50px] flex-1 items-center rounded-xl bg-surface pr-1 pl-4">
      <label className="relative flex shrink-0 items-center">
        <span className="sr-only">Category</span>
        <select
          name="category"
          className="w-[128px] cursor-pointer appearance-none truncate bg-transparent pr-6 text-sm font-semibold text-ink outline-none"
        >
          <option value="">{t('nav.allCategories')}</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 size-4 text-muted" />
      </label>
      <span className="mx-3.5 h-[22px] w-px bg-line" aria-hidden />
      <Search className="size-4 shrink-0 text-muted" aria-hidden />
      <input
        name="q"
        type="search"
        placeholder={t('nav.searchPlaceholder')}
        aria-label="Search"
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-subtle"
      />
      <button type="submit" className="h-[42px] shrink-0 rounded-[9px] bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
        {t('nav.searchBtn')}
      </button>
    </form>
  )
}
