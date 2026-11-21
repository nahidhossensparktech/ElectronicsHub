import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { Container, LinkButton, PageHeader } from '@repo/ui'
import { type SearchParams, withParams } from '@/features/catalog'
import { FaqAccordion, faqs, faqTopics, TopicNav } from '@/features/content'

export const metadata: Metadata = { title: 'FAQ' }

export default async function FaqPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.trim() : ''
  const topic = faqTopics.find((t) => t.slug === params.topic)?.slug ?? (q ? undefined : 'buying')
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  const items = faqs.filter(
    (f) => (!topic || f.topic === topic) && terms.every((t) => `${f.question} ${f.answer}`.toLowerCase().includes(t)),
  )
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        title="Frequently Asked Questions"
        subtitle="Quick answers about buying, payments, delivery and selling on Electronic Hub.bd."
      >
        <form action="/faq" className="relative mt-6 block max-w-[440px]">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input name="q" defaultValue={q} placeholder="Search questions..." className="h-12 w-full rounded-xl bg-white pr-4 pl-11 text-sm outline-none placeholder:text-subtle focus:ring-2 focus:ring-brand/30" />
        </form>
      </PageHeader>
      <Container className="flex gap-12 pt-12 pb-12">
        <TopicNav active={topic} topics={faqTopics.map((t) => ({ ...t, href: withParams('/faq', {}, { topic: t.slug }) }))} />
        <div className="flex-1">
          {q ? <p className="mb-4 text-sm text-muted">{items.length} result{items.length === 1 ? '' : 's'} for “{q}”{topic ? '' : ' in all topics'}</p> : null}
          <FaqAccordion key={`${topic}-${q}`} items={items} />
        </div>
      </Container>
      <Container className="pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-canvas px-8 py-7">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">Still have questions?</h2>
            <p className="mt-1 text-sm text-muted">Our support team replies within 24 hours.</p>
          </div>
          <LinkButton href="/contact" size="lg">Contact Support</LinkButton>
        </div>
      </Container>
    </>
  )
}
