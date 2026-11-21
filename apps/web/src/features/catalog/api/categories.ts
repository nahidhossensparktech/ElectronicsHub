import type { Category } from '@repo/types'
import { categories } from '@/lib/mock-db/categories'

export async function getCategories(): Promise<Category[]> {
  return categories
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return categories.find((category) => category.slug === slug)
}
