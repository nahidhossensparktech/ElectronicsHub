import type { ReactNode } from 'react'
import { cn } from '@repo/utils'
import { Breadcrumb, type Crumb } from '../primitives/Breadcrumb'
import { Container } from '../primitives/Container'

export interface PageHeaderProps {
  breadcrumb: Crumb[]
  title: string
  subtitle?: string
  aside?: ReactNode
  children?: ReactNode
  tone?: 'canvas' | 'white'
  className?: string
}

/** Canvas band with breadcrumb, page title and subtitle (all inner pages). */
export function PageHeader({ breadcrumb, title, subtitle, aside, children, tone = 'canvas', className }: PageHeaderProps) {
  return (
    <section className={cn(tone === 'canvas' ? 'bg-canvas' : 'bg-white', className)}>
      <Container className="pt-[26px] pb-[34px]">
        <Breadcrumb items={breadcrumb} />
        <div className="mt-6 flex items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-[32px] leading-10 font-bold text-ink">{title}</h1>
            {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
          </div>
          {aside}
        </div>
        {children}
      </Container>
    </section>
  )
}
