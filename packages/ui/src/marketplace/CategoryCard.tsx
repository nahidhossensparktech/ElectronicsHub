import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@repo/types'
import { cn, formatNumber } from '@repo/utils'

/** Popular category tile: illustration, name and item count. */
export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        'flex h-[200px] flex-col items-center justify-between rounded-2xl bg-canvas px-3 pt-7 pb-4 text-center transition-colors hover:bg-brand-50',
        className,
      )}
    >
      <span className="relative size-14 shrink-0">
        <Image unoptimized src={category.icon} alt="" fill sizes="56px" className="object-contain" />
      </span>
      <div className="flex w-full flex-col items-center">
        <span className="flex h-10 items-center justify-center text-center text-sm leading-5 font-semibold text-ink line-clamp-2">
          {category.name}
        </span>
        <span className="mt-1 text-xs text-muted">{formatNumber(category.itemCount)} items</span>
      </div>
    </Link>
  )
}
