import type { Product } from '@repo/types'
import { catalog, pick, variant } from '@/lib/mock-db/products'

/**
 * Product queries. Backed by the mock DB until `@repo/api-client` exists;
 * keep the signatures when swapping in real endpoints.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return pick('esp32', 'uno', 'sr04', 'ne555', 'relay')
}

export async function getTrendingProducts(): Promise<Product[]> {
  return pick('nano', 'dht11', 'resistor', 'cell', 'header', 'esp32c3', 'pir', 'charger', 'iron', 'multimeter')
}

export async function getBestSellingProducts(): Promise<Product[]> {
  return [variant('resistor', { badge: 'best-seller' }), ...pick('bc547', 'diode', 'cap', 'lm7805')]
}

export async function getWholesaleProducts(): Promise<Product[]> {
  const w = (key: Parameters<typeof variant>[0], price: number, priceNote = '500+') =>
    variant(key, { price, priceNote, badge: 'wholesale' })
  return [w('resistor', 1.6), w('cap', 3.4), w('bc547', 1.9), w('diode', 0.9), w('header', 10)]
}

export async function getRecentlyAddedProducts(): Promise<Product[]> {
  return [
    variant('multimeter', { badge: 'new' }),
    variant('esp8266', { badge: 'new' }),
    variant('dht11', { badge: 'new' }),
    variant('esp32', { badge: 'new' }),
    variant('relay', { badge: 'new' }),
  ]
}
