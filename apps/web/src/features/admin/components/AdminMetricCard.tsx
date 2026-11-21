import { Box } from 'lucide-react'
import type { AdminMetric } from '../types'

export function AdminMetricCard({ metric }: { metric: AdminMetric }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">{metric.title}</span>
        <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Box className="size-4" strokeWidth={2.2} />
        </span>
      </div>

      <div className="mt-3.5">
        <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {metric.value}
        </p>

        {metric.change ? (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-emerald-600">
              {metric.change}
            </span>
            <span className="text-slate-400">vs last month</span>
          </div>
        ) : (
          <div className="mt-2 text-xs text-slate-400">
            Current active count
          </div>
        )}
      </div>
    </div>
  )
}
