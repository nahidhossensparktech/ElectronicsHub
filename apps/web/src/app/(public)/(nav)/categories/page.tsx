import type { Metadata } from 'next'
import { CategoryCard, Container, PageHeader } from '@repo/ui'
import { getCategories } from '@/features/catalog/api/categories'

export const metadata: Metadata = {
  title: 'All Categories | Electronic Hub',
  description: 'Browse all electronics components, sensors, microcontrollers and parts by category.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'All Categories' }]}
        title="All Categories"
        subtitle={`Browse ${categories.length} component categories across verified shops in Bangladesh`}
      />
      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>
    </>
  )
}
