'use client'

import { useEffect, useState } from 'react'

const MAX = 2000

/** Min/max price inputs; applies on Enter or when a field loses focus. */
export function PriceRangeFilter({ min, max, onApply }: { min?: number; max?: number; onApply: (min: string, max: string) => void }) {
  const [lo, setLo] = useState(min?.toString() ?? '')
  const [hi, setHi] = useState(max?.toString() ?? '')
  useEffect(() => {
    setLo(min?.toString() ?? '')
    setHi(max?.toString() ?? '')
  }, [min, max])
  const left = Math.min(100, ((Number(lo) || 0) / MAX) * 100)
  const right = Math.min(100, ((Number(hi) || MAX) / MAX) * 100)
  const apply = () => onApply(lo, hi)
  const field = 'h-10 w-full rounded-[10px] bg-surface px-3 text-sm text-ink outline-none placeholder:text-subtle focus:ring-2 focus:ring-brand/30'
  return (
    <div>
      <div className="relative mt-5 h-1 rounded-full bg-line">
        <span className="absolute inset-y-0 rounded-full bg-brand" style={{ left: `${left}%`, right: `${100 - right}%` }} />
        <span className="absolute top-1/2 size-4 -translate-1/2 rounded-full border-2 border-white bg-brand shadow" style={{ left: `${left}%` }} />
        <span className="absolute top-1/2 size-4 -translate-1/2 rounded-full border-2 border-white bg-brand shadow" style={{ left: `${right}%` }} />
      </div>
      <div className="mt-5 flex items-center gap-2" onKeyDown={(e) => e.key === 'Enter' && apply()}>
        <input aria-label="Minimum price" inputMode="numeric" placeholder="৳ Min" value={lo} onChange={(e) => setLo(e.target.value.replace(/\D/g, ''))} onBlur={apply} className={field} />
        <span className="h-px w-2 shrink-0 bg-muted" />
        <input aria-label="Maximum price" inputMode="numeric" placeholder="৳ Max" value={hi} onChange={(e) => setHi(e.target.value.replace(/\D/g, ''))} onBlur={apply} className={field} />
      </div>
    </div>
  )
}
