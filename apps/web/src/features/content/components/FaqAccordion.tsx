'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@repo/utils'

export interface FaqItem {
  question: string
  answer: string
}

/** Single-open accordion; first item open by default. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0)
  if (items.length === 0) {
    return <p className="rounded-[14px] bg-canvas px-5 py-10 text-center text-sm text-muted">No questions match your search. Try other words or contact support.</p>
  }
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.question} className={cn('rounded-[14px] px-5', isOpen ? 'bg-brand-50' : 'bg-canvas')}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)} className="flex h-14 w-full items-center justify-between text-left text-sm font-semibold text-ink">
              {item.question}
              {isOpen ? <Minus className="size-4 text-brand" /> : <Plus className="size-4 text-muted" />}
            </button>
            {isOpen ? <p className="-mt-1 pb-5 text-[13px] leading-5 text-muted">{item.answer}</p> : null}
          </div>
        )
      })}
    </div>
  )
}
