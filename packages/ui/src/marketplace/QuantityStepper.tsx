'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@repo/utils'

export interface QuantityStepperProps {
  /** Controlled value; omit for an uncontrolled stepper. */
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'lg'
  className?: string
}

/** − 5 + quantity control. The number can also be typed. */
export function QuantityStepper({ value, defaultValue = 1, onChange, min = 1, max = 99999, size = 'sm', className }: QuantityStepperProps) {
  const [local, setLocal] = useState(defaultValue)
  const current = value ?? local
  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, Number.isFinite(next) ? next : min))
    if (value === undefined) setLocal(clamped)
    onChange?.(clamped)
  }
  const btn = cn('inline-flex shrink-0 items-center justify-center text-ink hover:text-brand disabled:opacity-40', size === 'lg' ? 'size-11' : 'size-8')
  return (
    <div className={cn('inline-flex items-center rounded-[10px] bg-surface', className)}>
      <button type="button" aria-label="Decrease" className={btn} disabled={current <= min} onClick={() => set(current - 1)}>
        <Minus className="size-3.5" />
      </button>
      <input
        aria-label="Quantity"
        inputMode="numeric"
        value={current}
        onChange={(e) => set(Number(e.target.value.replace(/\D/g, '')) || min)}
        className="w-12 bg-transparent text-center text-sm font-semibold text-ink tabular-nums outline-none"
      />
      <button type="button" aria-label="Increase" className={btn} disabled={current >= max} onClick={() => set(current + 1)}>
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
