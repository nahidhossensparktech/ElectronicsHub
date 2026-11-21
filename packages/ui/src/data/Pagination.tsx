import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

export interface PaginationProps {
  page: number
  totalPages: number
  /** Builds the URL for a page. Without it, buttons call `onPageChange`. */
  hrefForPage?: (page: number) => string
  onPageChange?: (page: number) => void
  className?: string
}

function pageList(page: number, total: number): (number | 'gap')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, 2, 3, page, total].filter((p) => p >= 1 && p <= total))
  const sorted = [...pages].sort((a, b) => a - b)
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1]! > 1 ? ['gap' as const, p] : [p]))
}

const cell = 'inline-flex size-10 items-center justify-center rounded-[10px] text-sm font-medium'

/** ‹ 1 2 3 … 24 › — hidden when there is a single page. */
export function Pagination({ page, totalPages, hrefForPage, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null
  const item = (target: number, content: ReactNode, cls: string, label?: string, disabled?: boolean) => {
    if (disabled) return <span aria-hidden className={cn(cls, 'opacity-40')}>{content}</span>
    return hrefForPage ? (
      <Link key={label ?? target} href={hrefForPage(target)} aria-label={label} scroll={false} className={cls} aria-current={target === page && !label ? 'page' : undefined}>
        {content}
      </Link>
    ) : (
      <button key={label ?? target} type="button" aria-label={label} onClick={() => onPageChange?.(target)} className={cls} aria-current={target === page && !label ? 'page' : undefined}>
        {content}
      </button>
    )
  }
  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-1.5', className)}>
      {item(page - 1, <ChevronLeft className="size-4" />, cn(cell, 'bg-surface text-ink hover:bg-line'), 'Previous page', page <= 1)}
      {pageList(page, totalPages).map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className={cn(cell, 'text-ink')}>…</span>
        ) : (
          <span key={p}>{item(p, p, cn(cell, p === page ? 'bg-brand font-semibold text-white' : 'text-ink hover:bg-surface'))}</span>
        ),
      )}
      {item(page + 1, <ChevronRight className="size-4" />, cn(cell, 'bg-surface text-ink hover:bg-line'), 'Next page', page >= totalPages)}
    </nav>
  )
}
