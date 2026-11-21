import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe, ShieldCheck, Store } from 'lucide-react'
import { Breadcrumb, Container, MetricTile, Section, SectionHeader } from '@repo/ui'
import { TeamCard } from '@/features/content'

export const metadata: Metadata = { title: 'About Us' }

const values = [
  { icon: Globe, title: 'Access for everyone', text: 'Students, repair technicians and factories get the same visibility of stock and price.' },
  { icon: Store, title: 'Growth for local shops', text: 'Every shop — big or small — gets its own storefront at no cost.' },
  { icon: ShieldCheck, title: 'Trust by default', text: 'Shops are verified and reviewed so buyers can deal with confidence.' },
]
const team = [
  { name: 'Nahid Hossen', role: 'Product Lead', tone: 'blue' },
  { name: 'Farhana Islam', role: 'Head of Vendor Success', tone: 'navy' },
  { name: 'Arif Chowdhury', role: 'Engineering', tone: 'sky' },
  { name: 'Mitu Rahman', role: 'Customer Support', tone: 'slate' },
] as const

export default function AboutPage() {
  return (
    <>
      <section className="bg-canvas">
        <Container className="pt-[26px] pb-14">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
          <div className="mt-8 flex flex-col items-center gap-10 lg:flex-row">
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.06em] text-brand uppercase">About Electronic Hub.bd</p>
              <h1 className="mt-3 max-w-[600px] font-display text-[32px] leading-10 font-bold text-ink">
                Connecting every electronics shop in Bangladesh with the people who need their parts.
              </h1>
              <p className="mt-4 max-w-[560px] text-[15px] leading-6 text-muted">
                We started in Patuatuli, where finding the right component meant walking from shop to shop. Today buyers search 120,000+ components from 1,842 shops in one place.
              </p>
            </div>
            <div className="relative h-[280px] w-full rounded-3xl bg-brand-50 lg:w-[560px]">
              <Image unoptimized src="/products/esp32-devkit.svg" alt="" fill className="object-contain p-20" />
            </div>
          </div>
        </Container>
      </section>
      <Section className="py-10">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[['1,842', 'Verified shops'], ['120K+', 'Components listed'], ['64', 'Districts'], ['25,000+', 'Monthly buyers']].map(([v, l]) => (
            <MetricTile key={l} value={v!} label={l!} size="lg" />
          ))}
        </div>
      </Section>
      <Section tone="canvas">
        <SectionHeader title="What we stand for" />
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-brand text-white"><Icon className="size-5" /></span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-[22px] text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader title="The team" subtitle="Engineers and shop owners building the hub together" />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => <TeamCard key={m.name} {...m} />)}
        </div>
      </Section>
    </>
  )
}
