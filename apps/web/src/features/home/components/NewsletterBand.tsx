'use client'

import { Mail } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Container } from '@repo/ui'
import { useTranslation } from '@/lib/i18n'

export function NewsletterBand() {
  const { t } = useTranslation()
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section className="bg-canvas">
      <Container className="flex flex-col gap-6 py-8 sm:py-[52px] lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-xl leading-7 font-bold text-ink sm:text-2xl sm:leading-8">
            {t('newsletter.title')}
          </h2>
          <p className="mt-1 text-xs text-muted sm:text-sm">{t('newsletter.desc')}</p>
        </div>
        {done ? (
          <p className="text-sm font-semibold text-success sm:text-base lg:w-[512px] lg:text-right">
            {t('newsletter.subscribed')}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-2.5 sm:flex-row w-full lg:w-[512px]">
            <label className="relative flex-1">
              <span className="sr-only">Email address</span>
              <Mail className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted" />
              <input
                type="email"
                required
                placeholder={t('newsletter.placeholder')}
                className="h-[48px] sm:h-[52px] w-full rounded-xl bg-white pr-4 pl-[45px] text-sm text-ink outline-none placeholder:text-subtle focus:ring-2 focus:ring-brand/30"
              />
            </label>
            <button
              type="submit"
              className="h-[48px] sm:h-[52px] w-full sm:w-[122px] rounded-[10px] bg-brand text-sm sm:text-[15px] font-semibold text-white hover:bg-brand-700"
            >
              {t('newsletter.btn')}
            </button>
          </form>
        )}
      </Container>
    </section>
  )
}
