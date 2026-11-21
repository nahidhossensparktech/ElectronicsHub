import { Phone } from 'lucide-react'
import { LinkButton } from '@repo/ui'

export function SupportCard() {
  return (
    <aside className="rounded-[20px] bg-ink p-7 text-white">
      <h2 className="font-display text-xl font-bold">Talk to our team</h2>
      <p className="mt-3 text-sm leading-[22px] text-footer-text">Live chat Sat–Thu, 9 am – 8 pm. Average reply under 5 minutes.</p>
      <LinkButton href="/contact" size="lg" className="mt-5">Start live chat</LinkButton>
      <a href="tel:+8809612000000" className="mt-5 flex items-center gap-2 text-sm font-semibold"><Phone className="size-4" />+880 9612-000000</a>
    </aside>
  )
}
