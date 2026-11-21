import type { ReactNode } from 'react'
import { cn } from '@repo/utils'

export interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: ReactNode
  /** `solid` = white icon on brand tile; `soft` = brand icon on light tile. */
  iconStyle?: 'solid' | 'soft'
  iconSize?: 'md' | 'lg'
  /** `row` = icon left of text; `stack` = icon above text. */
  layout?: 'row' | 'stack'
  className?: string
  children?: ReactNode
}

/** Icon + title + description block (value props, "Why buy", help topics, contact methods). */
export function FeatureCard({
  icon,
  title,
  description,
  iconStyle = 'solid',
  iconSize = 'lg',
  layout = 'row',
  className,
  children,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-canvas',
        layout === 'row' ? 'flex items-center gap-4 p-5' : 'flex flex-col p-6',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          iconSize === 'lg' ? 'size-12 rounded-xl [&_svg]:size-[22px]' : 'size-10 rounded-[10px] [&_svg]:size-[18px]',
          iconStyle === 'solid' ? 'bg-brand text-white' : 'bg-brand-50 text-brand',
        )}
      >
        {icon}
      </span>
      <div className={cn('min-w-0', layout === 'stack' && 'mt-3')}>
        <h3 className="text-base leading-6 font-semibold text-ink">{title}</h3>
        <div className={cn('text-[13px] leading-5 text-muted', layout === 'stack' ? 'mt-2.5' : 'mt-1')}>
          {description}
        </div>
        {children}
      </div>
    </div>
  )
}
