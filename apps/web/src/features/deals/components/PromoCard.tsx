import Image from 'next/image'
import { LinkButton } from '@repo/ui'
import { cn } from '@repo/utils'

const tones = {
  brand: { card: 'bg-brand', title: 'text-white', text: 'text-brand-100', button: 'white' as const },
  soft: { card: 'bg-brand-50', title: 'text-ink', text: 'text-muted', button: 'primary' as const },
  dark: { card: 'bg-ink', title: 'text-white', text: 'text-footer-text', button: 'white' as const },
}

export interface PromoCardProps {
  title: string
  description: string
  image: string
  tone: keyof typeof tones
  href?: string
}

/** Campaign card with a CTA and a cropped product illustration on the right edge. */
export function PromoCard({ title, description, image, tone, href = '/products' }: PromoCardProps) {
  const t = tones[tone]
  return (
    <article className={cn('relative overflow-hidden rounded-[20px] px-7 py-10', t.card)}>
      <div className="relative z-10 max-w-[300px]">
        <h3 className={cn('font-display text-2xl leading-8 font-bold', t.title)}>{title}</h3>
        <p className={cn('mt-2 text-[13px] leading-5', t.text)}>{description}</p>
        <LinkButton href={href} variant={t.button} size="lg" className="mt-5 w-[104px]">
          Shop now
        </LinkButton>
      </div>
      <span className="absolute top-1/2 -right-6 h-[72px] w-[104px] -translate-y-1/2">
        <Image unoptimized src={image} alt="" fill className="object-contain" />
      </span>
    </article>
  )
}
