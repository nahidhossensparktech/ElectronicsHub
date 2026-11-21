import { Check } from 'lucide-react'
import { Fragment } from 'react'
import { cn } from '@repo/utils'

/** Address ✓ — Delivery ✓ — 3 Payment — 4 Review */
export function CheckoutSteps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-3">
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <Fragment key={step}>
            {i > 0 ? <span className={cn('h-0.5 w-12', i <= current ? 'bg-brand' : 'bg-line')} /> : null}
            <li className="flex items-center gap-2 text-sm font-semibold">
              <span className={cn('inline-flex size-7 items-center justify-center rounded-full text-xs', done ? 'bg-brand text-white' : active ? 'bg-ink text-white' : 'bg-line text-muted')}>
                {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn(done || active ? 'text-ink' : 'text-muted')}>{step}</span>
            </li>
          </Fragment>
        )
      })}
    </ol>
  )
}
