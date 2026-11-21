import Link from 'next/link'
import { cn } from '@repo/utils'

/** Vertical topic list (FAQ). */
export function TopicNav({ topics, active }: { topics: { label: string; href: string; slug: string }[]; active?: string }) {
  return (
    <nav className="hidden w-[272px] shrink-0 space-y-2 self-start lg:block" aria-label="FAQ topics">
      {topics.map((t) => (
        <Link key={t.slug} href={t.href} scroll={false} aria-current={t.slug === active ? 'page' : undefined}
          className={cn('flex h-10 items-center rounded-[10px] px-3.5 text-[13px] font-semibold', t.slug === active ? 'bg-brand text-white' : 'bg-canvas text-ink hover:bg-brand-50')}>
          {t.label}
        </Link>
      ))}
    </nav>
  )
}
