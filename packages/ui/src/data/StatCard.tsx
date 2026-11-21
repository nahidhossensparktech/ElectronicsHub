import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

export interface StatCardProps {
  label: string
  value: ReactNode
  icon?: ReactNode
  footer?: ReactNode
  className?: string
}

/** Dashboard metric tile: label + icon on top, big value below. */
export function StatCard({ label, value, icon, footer, className }: StatCardProps) {
  return (
    <div className={cn('rounded-2xl bg-canvas p-5', className)}>
      <div className="flex items-start justify-between">
        <p className="pt-2 text-sm font-medium text-muted">{label}</p>
        {icon ? (
          <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-brand-50 text-brand [&_svg]:size-[18px]">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-[32px] leading-10 font-bold text-ink">{value}</p>
      {footer ? <div className="mt-3">{footer}</div> : null}
    </div>
  )
}
