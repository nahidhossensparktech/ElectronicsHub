import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Panel, PanelTitle } from '@repo/ui'
import { cn } from '@repo/utils'

/** Canvas panel with title and an optional right link. */
export function AccountPanel({
  title,
  link,
  children,
  className,
}: {
  title?: string
  link?: { label: string; href: string }
  children: ReactNode
  className?: string
}) {
  return (
    <Panel className={cn('rounded-[20px] p-6', className)}>
      {title ? (
        <div className="mb-5 flex items-center justify-between">
          <PanelTitle>{title}</PanelTitle>
          {link ? (
            <Link href={link.href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
              {link.label} <ChevronRight className="size-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
      {children}
    </Panel>
  )
}
