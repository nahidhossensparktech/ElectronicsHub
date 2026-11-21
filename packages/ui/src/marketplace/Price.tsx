import { cn, formatBDT } from '@repo/utils'

export interface PriceProps {
  amount: number
  unit?: string
  /** Extra text after the unit, e.g. "500+". */
  suffix?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const amountSize = { sm: 'text-base', md: 'text-lg', lg: 'text-[32px] leading-10' } as const

/** ৳520 /pc */
export function Price({ amount, unit, suffix, size = 'md', className }: PriceProps) {
  return (
    <span className={cn('inline-flex items-baseline gap-1', className)}>
      <span className={cn('font-display font-bold text-ink', amountSize[size])}>{formatBDT(amount)}</span>
      {unit ? (
        <span className="text-[13px] text-muted">
          /{unit}
          {suffix ? ` · ${suffix}` : null}
        </span>
      ) : null}
    </span>
  )
}
