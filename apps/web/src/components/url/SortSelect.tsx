'use client'

import { ChevronDown } from 'lucide-react'
import { type ParamRecord, useUrlParams } from '@/hooks/useUrlParams'

/** "Sort by: X" pill backed by a native select that writes `?sort=`. */
export function SortSelect({ options, defaultValue, params: current }: { options: { value: string; label: string }[]; defaultValue: string; params: ParamRecord }) {
  const { params, update } = useUrlParams(current)
  const value = params.get('sort') ?? defaultValue
  return (
    <label className="relative flex h-[46px] shrink-0 items-center gap-2 rounded-[10px] bg-surface px-4 text-sm">
      <span className="text-muted">Sort by:</span>
      <span className="font-semibold text-ink">{options.find((o) => o.value === value)?.label}</span>
      <ChevronDown className="ml-2 size-4 text-muted" />
      <select aria-label="Sort by" value={value} onChange={(e) => update({ sort: e.target.value === defaultValue ? null : e.target.value })} className="absolute inset-0 cursor-pointer opacity-0">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )
}
