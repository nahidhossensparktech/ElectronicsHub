import { MessageSquareQuote, Package, Percent } from 'lucide-react'
import { Breadcrumb, Container } from '@repo/ui'

const stats = [
  { icon: Package, title: '40,000+ parts', note: 'with bulk pricing' },
  { icon: Percent, title: 'Up to 45% off', note: 'vs. retail price' },
  { icon: MessageSquareQuote, title: 'Request a quote', note: 'for 1,000+ pcs' },
]

export function WholesaleHero() {
  return (
    <section className="bg-canvas">
      <Container className="pt-[26px] pb-10">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wholesale' }]} />
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-[600px] lg:pt-10">
            <p className="text-xs font-semibold tracking-[0.06em] text-brand uppercase">Wholesale</p>
            <h1 className="mt-3 font-display text-[32px] leading-10 font-bold text-ink">Buy in bulk, pay less per piece</h1>
            <p className="mt-3 text-[15px] leading-6 text-muted">
              Tiered pricing from verified wholesalers — for repair shops, university labs and manufacturers.
            </p>
          </div>
          <ul className="space-y-3 lg:w-[248px]">
            {stats.map(({ icon: Icon, title, note }) => (
              <li key={title} className="flex items-center gap-3 rounded-2xl bg-white p-3.5">
                <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-brand-50 text-brand">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{title}</span>
                  <span className="block text-xs text-muted">{note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
