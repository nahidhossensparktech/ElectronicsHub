'use client'

import { type FormEvent, useState } from 'react'
import { cn } from '@repo/utils'
import { useTranslation } from '@/lib/i18n'

/** Inline email + Subscribe with a confirmation message (mock). */
export function NewsletterForm({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const { t } = useTranslation()
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDone(true)
    e.currentTarget.reset()
  }

  if (done) {
    return (
      <p className={cn('flex h-[46px] items-center text-sm font-semibold', tone === 'dark' ? 'text-white' : 'text-success', className)}>
        {t('newsletter.subscribed')}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className={cn('flex h-[46px] items-center rounded-[10px] pr-1 pl-3.5', tone === 'dark' ? 'bg-ink-800' : 'bg-white', className)}>
      <input
        type="email"
        required
        placeholder={t('footer.emailPlaceholder')}
        aria-label="Email address"
        className={cn('h-full min-w-0 flex-1 bg-transparent text-sm outline-none', tone === 'dark' ? 'text-white placeholder:text-footer-placeholder' : 'text-ink placeholder:text-subtle')}
      />
      <button type="submit" className="h-[38px] shrink-0 rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-700">
        {t('footer.subscribe')}
      </button>
    </form>
  )
}
