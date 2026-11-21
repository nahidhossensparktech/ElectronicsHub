import { cn } from '@repo/utils'

export interface SummaryRow {
  label: string
  value: string
  tone?: 'default' | 'success'
}

/** Label/value rows followed by an emphasised total. */
export function SummaryRows({ rows, total, totalLabel = 'Total' }: { rows: SummaryRow[]; total: string; totalLabel?: string }) {
  return (
    <div>
      <dl className="space-y-3 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between">
            <dt className="text-muted">{r.label}</dt>
            <dd className={cn('font-semibold', r.tone === 'success' ? 'text-success' : 'text-ink')}>{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="text-base font-semibold text-ink">{totalLabel}</span>
        <span className="font-display text-[22px] font-bold text-ink">{total}</span>
      </div>
    </div>
  )
}
