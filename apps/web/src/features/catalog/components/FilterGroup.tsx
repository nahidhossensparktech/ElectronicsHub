'use client'

import { ChevronDown } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { cn } from '@repo/utils'

/** Collapsible filter section with a title row and chevron. */
export function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <section>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <ChevronDown className={cn('size-4 text-muted transition-transform', !open && '-rotate-90')} />
      </button>
      {open ? <div className="mt-3">{children}</div> : null}
    </section>
  )
}
