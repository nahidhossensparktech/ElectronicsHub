import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: { label: string; href: string }
  children?: ReactNode
  className?: string
}

/** Section title + subtitle with an optional "View All ›" link on the right. */
export function SectionHeader({ title, subtitle, action, children, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div>
        <h2 className="font-display text-2xl leading-8 font-bold text-ink">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:text-brand-700"
        >
          {action.label}
          <ChevronRight className="size-4" />
        </Link>
      ) : null}
      {children}
    </div>
  )
}
