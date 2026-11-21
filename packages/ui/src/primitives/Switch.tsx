'use client'

import { useState } from 'react'
import { cn } from '@repo/utils'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  label: string
  onChange?: (checked: boolean) => void
}

/** 44×24 toggle (controlled or uncontrolled). */
export function Switch({ checked, defaultChecked = false, label, onChange }: SwitchProps) {
  const [local, setLocal] = useState(defaultChecked)
  const on = checked ?? local
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => {
        if (checked === undefined) setLocal(!on)
        onChange?.(!on)
      }}
      className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', on ? 'bg-brand' : 'bg-line')}
    >
      <span className={cn('absolute top-[3px] size-[18px] rounded-full bg-white shadow-sm transition-all', on ? 'left-[23px]' : 'left-[3px]')} />
    </button>
  )
}
