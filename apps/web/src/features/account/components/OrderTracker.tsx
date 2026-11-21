import { Check } from 'lucide-react'
import { Fragment } from 'react'
import { cn } from '@repo/utils'

export interface TrackStep {
  label: string
  time: string
}

/** Horizontal progress: done steps (check), current (dot), upcoming (grey). */
export function OrderTracker({ steps, current }: { steps: TrackStep[]; current: number }) {
  return (
    <ol className="flex">
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <Fragment key={step.label}>
            <li className="relative flex-1">
              <div className="flex items-center">
                <span className={cn('relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full', done ? 'bg-brand text-white' : active ? 'bg-brand-100' : 'bg-line')}>
                  {done ? <Check className="size-4" strokeWidth={3} /> : <span className={cn('size-2.5 rounded-full', active ? 'bg-brand' : 'bg-subtle')} />}
                </span>
                {i < steps.length - 1 ? <span className={cn('h-[3px] flex-1', done ? 'bg-brand' : 'bg-line')} /> : null}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{step.label}</p>
              <p className="mt-0.5 text-xs text-muted">{step.time}</p>
            </li>
          </Fragment>
        )
      })}
    </ol>
  )
}
