'use client'

import { ChevronDown, LayoutGrid, List } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@repo/utils'
import { type SortKey, sortOptions } from '../api/query'
import { type ParamRecord, useUrlParams } from '@/hooks/useUrlParams'

/** Result summary + sort select + grid/list toggle (all URL-driven). */
export function ResultsToolbar({ summary, defaultSort = 'relevant', params: current }: { summary: ReactNode; defaultSort?: SortKey; params: ParamRecord }) {
  const { params, update } = useUrlParams(current)
  const sort = (params.get('sort') as SortKey | null) ?? defaultSort
  const view = params.get('view') === 'list' ? 'list' : 'grid'
  const label = sortOptions.find((o) => o.value === sort)?.label ?? 'Most relevant'

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-sm text-muted">{summary}</p>
      <div className="flex items-center justify-between sm:justify-end gap-2.5">
        <label className="relative flex h-[38px] sm:h-[42px] items-center gap-2 rounded-[10px] bg-surface px-3 sm:px-[15px] text-xs sm:text-sm">
          <span className="text-muted">Sort by:</span>
          <span className="font-semibold text-ink">{label}</span>
          <ChevronDown className="ml-1 sm:ml-2 size-3.5 sm:size-4 text-muted" />
          <select
            aria-label="Sort by"
            value={sort}
            onChange={(e) => update({ sort: e.target.value === defaultSort ? null : e.target.value })}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <div className="flex h-9 sm:h-10 items-center gap-1 rounded-[10px] bg-surface p-1">
          {(['grid', 'list'] as const).map((v) => {
            const Icon = v === 'grid' ? LayoutGrid : List
            return (
              <button
                key={v}
                type="button"
                aria-label={`${v} view`}
                aria-pressed={view === v}
                onClick={() => update({ view: v === 'grid' ? null : v, page: params.get('page') })}
                className={cn('inline-flex size-7 sm:size-8 items-center justify-center rounded-lg transition-colors', view === v ? 'bg-white text-brand shadow-2xs' : 'text-muted')}
              >
                <Icon className="size-3.5 sm:size-4" />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
