import { cn } from '@repo/utils'

/** Striped label/value specification rows. */
export function SpecTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <dl>
      {specs.map((spec, i) => (
        <div key={spec.label} className={cn('grid h-[50px] grid-cols-[260px_1fr] items-center rounded-[10px] px-[19px] text-sm', i % 2 === 0 && 'bg-canvas')}>
          <dt className="text-muted">{spec.label}</dt>
          <dd className="font-semibold text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}
