import { Search } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@repo/ui'

/** Help search submits to the FAQ search. */
export function HelpHero({ popular }: { popular: { label: string; q: string }[] }) {
  return (
    <section className="bg-brand">
      <Container className="flex flex-col items-center py-14 text-center">
        <p className="text-xs font-semibold tracking-[0.06em] text-brand-100 uppercase">Help center</p>
        <h1 className="mt-3 font-display text-[32px] leading-10 font-bold text-white">How can we help you today?</h1>
        <form action="/faq" className="mt-6 flex h-[56px] w-full max-w-[640px] items-center rounded-xl bg-white pr-1.5 pl-5">
          <Search className="size-[18px] text-muted" />
          <input name="q" placeholder='Search for answers, e.g. "track my order"' className="h-full flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-subtle" />
          <button type="submit" className="h-11 rounded-[10px] bg-brand px-5 text-sm font-semibold text-white">Search</button>
        </form>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-brand-100">
          Popular:
          {popular.map((p) => (
            <Link key={p.label} href={`/faq?q=${encodeURIComponent(p.q)}`} className="inline-flex h-7 items-center rounded-full bg-brand-700 px-3 font-semibold text-white">{p.label}</Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
