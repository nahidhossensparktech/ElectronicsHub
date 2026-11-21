'use client'

import { ChevronRight, LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@repo/types'
import { cn } from '@repo/utils'
import { useTranslation } from '@/lib/i18n'

/** Modern left category navigation menu in the hero section. */
export function CategoryMenu({ categories, activeSlug }: { categories: Category[]; activeSlug?: string }) {
  const { t } = useTranslation()

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col rounded-2xl border border-line/80 bg-white p-2.5 shadow-xs lg:flex">
      {/* Header Link */}
      <Link
        href="/categories"
        className="group flex h-11 items-center justify-between rounded-xl bg-brand px-3.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-brand-700 active:scale-[0.99]"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-6.5 items-center justify-center rounded-lg bg-white/20 backdrop-blur-xs">
            <LayoutGrid className="size-3.5 text-white" />
          </span>
          <span>{t('nav.allCategories')}</span>
        </div>
        <ChevronRight className="size-4 opacity-75 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </Link>

      {/* Category List */}
      <ul className="mt-2 space-y-1">
        {categories.map((category) => {
          const active = category.slug === activeSlug
          return (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                className={cn(
                  'group flex h-10 items-center gap-2.5 rounded-xl px-2.5 text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-brand-50 font-semibold text-brand shadow-xs'
                    : 'text-ink/90 hover:bg-canvas hover:text-brand',
                )}
              >
                <span
                  className={cn(
                    'relative inline-flex size-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-150 group-hover:scale-105',
                    active ? 'bg-white shadow-xs' : 'bg-canvas group-hover:bg-white group-hover:shadow-xs',
                  )}
                >
                  <Image unoptimized src={category.icon} alt="" fill sizes="28px" className="object-contain p-1" />
                </span>
                <span className="flex-1 truncate">{category.name}</span>
                <ChevronRight
                  className={cn(
                    'size-3.5 transition-all duration-150',
                    active
                      ? 'text-brand'
                      : 'text-subtle/50 opacity-60 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100',
                  )}
                />
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Footer Link */}
      <div className="mt-auto border-t border-line/60 pt-2.5">
        <Link
          href="/categories"
          className="group flex h-9.5 items-center justify-between rounded-xl px-2.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-50"
        >
          <span>{t('nav.viewAllCategories')}</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            <ChevronRight className="size-3" />
          </span>
        </Link>
      </div>
    </aside>
  )
}
