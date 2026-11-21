import type { PriceTier } from '@repo/types'
import { cn, formatBDT } from '@repo/utils'

function rangeLabel(t: PriceTier): string {
  return t.maxQty === null ? `${t.minQty}+ pcs` : `${t.minQty} – ${t.maxQty} pcs`
}

/** Wholesale tier grid; the tier matching the chosen quantity is highlighted. */
export function PriceTiers({ tiers, quantity }: { tiers: PriceTier[]; quantity?: number }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">Wholesale pricing</h3>
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {tiers.map((tier) => {
          const active = quantity !== undefined && quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
          return (
            <div key={tier.minQty} className={cn('rounded-xl px-[15px] py-2.5 transition-colors', active ? 'bg-brand-50 ring-1 ring-brand-200' : 'bg-canvas')}>
              <p className="text-xs text-muted">{rangeLabel(tier)}</p>
              <p className={cn('mt-1 text-sm font-bold', active ? 'text-brand' : 'text-ink')}>{formatBDT(tier.price)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
