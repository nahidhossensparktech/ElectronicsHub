import { getCategories } from '@/features/catalog/api/categories'
import {
  getBestSellingProducts,
  getFeaturedProducts,
  getRecentlyAddedProducts,
  getTrendingProducts,
  getWholesaleProducts,
} from '@/features/products/api/products'
import { getPopularShops } from '@/features/shops/api/shops'

/** Everything the home page renders, fetched in parallel. */
export async function getHomePageData() {
  const [categories, featured, trending, bestSelling, wholesale, recent, popularShops] =
    await Promise.all([
      getCategories(),
      getFeaturedProducts(),
      getTrendingProducts(),
      getBestSellingProducts(),
      getWholesaleProducts(),
      getRecentlyAddedProducts(),
      getPopularShops(),
    ])
  return { categories, featured, trending, bestSelling, wholesale, recent, popularShops }
}
