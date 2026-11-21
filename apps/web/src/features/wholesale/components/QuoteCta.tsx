import { Container, LinkButton } from '@repo/ui'

export function QuoteCta() {
  return (
    <section className="bg-white pb-5">
      <Container>
        <div className="flex flex-col gap-6 rounded-[20px] bg-brand px-10 py-9 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl leading-8 font-bold text-white">Need 1,000+ pieces?</h2>
            <p className="mt-1 text-[15px] text-brand-100">Send one request and get quotes from multiple wholesalers.</p>
          </div>
          <LinkButton href="/contact" variant="dark" size="xl">
            Request a Quote
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
