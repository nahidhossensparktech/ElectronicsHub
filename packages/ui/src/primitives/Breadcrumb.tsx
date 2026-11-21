import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { cn } from '@repo/utils'

export interface Crumb {
  label: string
  href?: string
}

/** Home › Shops › Tech Electronics — last crumb is the current page. */
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-3 text-[13px]', className)}>
      {items.map((item, index) => {
        const last = index === items.length - 1
        return (
          <Fragment key={item.label}>
            {item.href && !last ? (
              <Link href={item.href} className="text-muted hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined} className="font-semibold text-ink">
                {item.label}
              </span>
            )}
            {!last ? <ChevronRight className="size-3.5 text-subtle" /> : null}
          </Fragment>
        )
      })}
    </nav>
  )
}
