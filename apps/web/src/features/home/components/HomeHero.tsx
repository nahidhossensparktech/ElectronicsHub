import type { Category } from '@repo/types'
import { Container } from '@repo/ui'
import { CategoryMenu } from './CategoryMenu'
import { HeroBanner } from './HeroBanner'

export function HomeHero({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-white">
      <Container className="flex gap-5 pt-6 pb-8">
        <CategoryMenu categories={categories} />
        <HeroBanner />
      </Container>
    </section>
  )
}
