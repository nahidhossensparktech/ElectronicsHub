import { cn } from '@repo/utils'

/** Compact value + label tile (shop stats, about page numbers, order summary). */
export function MetricTile({
  value,
  label,
  size = 'md',
  className,
}: {
  value: string
  label: string
  size?: 'md' | 'lg'
  className?: string
}) {
  return (
    <div className={cn('rounded-2xl bg-canvas', size === 'lg' ? 'p-6' : 'px-5 py-4', className)}>
      <p
        className={cn(
          'font-display font-bold text-ink',
          size === 'lg' ? 'text-[32px] leading-10 text-brand' : 'text-xl leading-7',
        )}
      >
        {value}
      </p>
      <p className={cn('text-muted', size === 'lg' ? 'mt-1 text-sm' : 'text-[13px]')}>{label}</p>
    </div>
  )
}
