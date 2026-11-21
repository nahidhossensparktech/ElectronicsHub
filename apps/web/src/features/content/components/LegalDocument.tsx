import { Container } from '@repo/ui'
import { cn } from '@repo/utils'

export interface LegalSection {
  title: string
  body: string
}

/** Sticky "On this page" table of contents + numbered sections. */
export function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <Container className="flex gap-24 pt-12 pb-20">
      <nav className="sticky top-6 hidden w-[272px] shrink-0 self-start rounded-2xl bg-canvas p-4 lg:block" aria-label="On this page">
        <p className="px-2 text-[11px] font-semibold tracking-[0.06em] text-subtle uppercase">On this page</p>
        <ol className="mt-2 space-y-1">
          {sections.map((s, i) => (
            <li key={s.title}>
              <a href={`#s${i + 1}`} className={cn('block rounded-lg px-2 py-2 text-[13px] font-semibold', i === 0 ? 'bg-white text-brand' : 'text-ink hover:text-brand')}>
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <article className="max-w-[820px] space-y-8">
        {sections.map((s, i) => (
          <section key={s.title} id={`s${i + 1}`}>
            <h2 className="font-display text-xl font-bold text-ink">
              {i + 1}. {s.title}
            </h2>
            <p className="mt-2.5 text-[15px] leading-[26px] text-muted">{s.body}</p>
          </section>
        ))}
      </article>
    </Container>
  )
}
