import type { Product, ProductDetail } from '@repo/types'
import { categories } from '@/lib/mock-db/categories'
import { allProducts, getProductBySlug } from '@/lib/mock-db/products'

const esp32Specs = [
  { label: 'Microcontroller', value: 'ESP32-D0WD (dual-core Xtensa LX6)' },
  { label: 'Clock speed', value: '240 MHz' },
  { label: 'Flash memory', value: '4 MB' },
  { label: 'Wireless', value: 'Wi-Fi 802.11 b/g/n · Bluetooth 4.2 + BLE' },
  { label: 'Operating voltage', value: '3.3 V (5 V via USB)' },
  { label: 'GPIO pins', value: '25 usable · 30-pin layout' },
  { label: 'USB chip', value: 'CP2102' },
  { label: 'Dimensions', value: '51 × 28 mm' },
]

function tierPrices(price: number) {
  const r = (f: number) => (price < 20 ? Math.round(price * f * 100) / 100 : Math.round(price * f))
  return [
    { minQty: 1, maxQty: 9, price },
    { minQty: 10, maxQty: 49, price: r(0.952) },
    { minQty: 50, maxQty: 99, price: r(0.923) },
    { minQty: 100, maxQty: null, price: r(0.894) },
  ]
}

/** Full product page data for any listing slug (undefined when it doesn't exist). */
export async function getProductDetail(slug: string): Promise<ProductDetail | undefined> {
  const base = getProductBySlug(slug)
  if (!base) return undefined
  const category = categories.find((c) => c.slug === base.categorySlug)
  const isEsp32 = base.slug.startsWith('esp32-devkit-v1')
  const [first, second] = base.spec.split(' · ')
  const seed = base.name.length
  return {
    ...base,
    name: isEsp32 ? 'ESP32 DevKit V1 (WROOM-32) Wi-Fi + Bluetooth Development Board' : base.name,
    brand: base.brand ?? 'Generic',
    model: base.slug.toUpperCase().replace(/--.*/, '').slice(0, 18),
    sku: `EH-${10000 + seed * 37}`,
    rating: 4.5 + (seed % 5) / 10,
    reviewCount: 20 + (seed * 7) % 90,
    soldCount: `${(seed % 9) + 1}.${seed % 10}k`,
    compareAtPrice: base.price < 20 ? undefined : Math.round(base.price * 1.115),
    gallery: [base.image, base.image, base.image, base.image],
    priceTiers: tierPrices(base.price),
    minOrder: 1,
    delivery: 'Courier 1–3 days · Pickup available',
    specs: isEsp32
      ? esp32Specs
      : [
          { label: 'Category', value: category?.name ?? '—' },
          { label: 'Brand', value: base.brand ?? 'Generic' },
          { label: 'Key spec', value: first ?? base.spec },
          ...(second ? [{ label: 'Package / range', value: second }] : []),
          { label: 'Unit', value: `Per ${base.unit}` },
          { label: 'Condition', value: 'New, original packaging' },
        ],
    description: isEsp32
      ? "The ESP32 DevKit V1 is a compact development board built around Espressif's ESP32-WROOM-32 module. It combines dual-core processing with Wi-Fi and Bluetooth, making it ideal for IoT projects, home automation and wireless sensor networks. Compatible with Arduino IDE, ESP-IDF and MicroPython."
      : `${base.name} (${base.spec}) from ${base.shop.name}. Genuine stock checked by the seller; bulk pricing applies automatically from 10 pieces. Message the seller for datasheets or larger quantities.`,
  }
}

export async function getMoreFromShop(product: Product): Promise<Product[]> {
  return allProducts.filter((p) => p.shop.slug === product.shop.slug && p.slug !== product.slug).slice(0, 5)
}

export async function getSimilarProducts(product: Product): Promise<Product[]> {
  const base = product.slug.split('--')[0]
  const sameItem = allProducts.filter((p) => p.slug.split('--')[0] === base && p.slug !== product.slug)
  const sameCategory = allProducts.filter((p) => p.categorySlug === product.categorySlug && p.slug.split('--')[0] !== base)
  return [...sameItem, ...sameCategory].slice(0, 5)
}
