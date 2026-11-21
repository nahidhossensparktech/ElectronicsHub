import { Search } from 'lucide-react'
import Link from 'next/link'

/** Light-blue bar: query, result counts and "Did you mean" suggestions. */
export function SearchSummary({ query, total, shopCount, suggestions }: { query: string; total: number; shopCount: number; suggestions: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-50 px-5 py-4">
      <p className="flex items-center gap-2.5 text-sm text-muted">
        <Search className="size-[18px] text-brand" />
        Results for <span className="ml-1 text-base font-bold text-ink">&ldquo;{query}&rdquo;</span>
        <span>· {total} products in {shopCount} shops</span>
      </p>
      <div className="flex items-center gap-2 text-[13px] text-muted">
        Did you mean:
        {suggestions.map((s) => (
          <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="inline-flex h-7 items-center rounded-full bg-white px-3 text-xs font-semibold text-brand">
            {s}
          </Link>
        ))}
      </div>
    </div>
  )
}
