import { cn, initials } from '@repo/utils'

const tones = { blue: 'bg-brand', navy: 'bg-ink', sky: 'bg-brand-400', slate: 'bg-avatar-slate' } as const

export function TeamCard({ name, role, tone }: { name: string; role: string; tone: keyof typeof tones }) {
  return (
    <article>
      <div className={cn('flex h-[220px] items-center justify-center rounded-2xl font-display text-[44px] font-bold text-white', tones[tone])}>
        {initials(name)}
      </div>
      <p className="mt-4 text-base font-semibold text-ink">{name}</p>
      <p className="text-[13px] text-muted">{role}</p>
    </article>
  )
}
