'use client'

import { Container, LinkButton } from '@repo/ui'
import { useTranslation } from '@/lib/i18n'

export function VendorCta() {
  const { t } = useTranslation()

  const stats = [
    { value: '1,800+', label: t('vendorCta.stat1') },
    { value: '৳0', label: t('vendorCta.stat2') },
    { value: '10 min', label: t('vendorCta.stat3') },
  ]

  return (
    <section className="bg-white pb-12 sm:pb-16">
      <Container>
        <div className="flex flex-col gap-8 rounded-3xl bg-brand px-6 py-8 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div className="max-w-[560px]">
            <p className="text-xs font-semibold tracking-[0.06em] text-brand-100 uppercase">{t('vendorCta.tag')}</p>
            <h2 className="mt-3 font-display text-2xl leading-tight font-bold text-white sm:text-[32px] sm:leading-10">
              {t('vendorCta.title')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-100 sm:mt-4 sm:text-base sm:leading-[26px]">
              {t('vendorCta.desc')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/about" variant="dark" size="xl" className="w-full sm:w-44">
                {t('vendorCta.btn')}
              </LinkButton>
              <LinkButton href="/help" variant="secondary" size="xl" className="w-full sm:w-[142px]">
                {t('vendorCta.howItWorks')}
              </LinkButton>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <li key={stat.label} className="flex h-20 flex-col justify-center rounded-2xl bg-brand-700 px-3 sm:h-24 sm:px-[23px] lg:w-[150px]">
                <span className="font-display text-xl font-bold text-white sm:text-2xl">{stat.value}</span>
                <span className="mt-0.5 text-xs text-brand-200 sm:mt-1 sm:text-[13px]">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
