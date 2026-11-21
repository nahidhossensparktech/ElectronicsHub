import type { Address, AppNotification, CartLine, ChatMessage, Conversation, CustomerProfile, Order } from '@repo/types'
import { addresses, chatMessages, conversations, notifications, orderLines, orders, profile } from '@/lib/mock-db/account'
import { img } from '@/lib/mock-db/images'

export type NotificationEntry = AppNotification & { group: 'today' | 'earlier' }

export interface Settings {
  twoStep: boolean
  orderUpdates: boolean
  sellerMessages: boolean
  deals: boolean
  language: 'en' | 'bn'
}

export interface AppState {
  cart: CartLine[]
  couponCode: string | null
  wishlist: string[]
  orders: Order[]
  addresses: Address[]
  profile: CustomerProfile
  conversations: (Conversation & { shopSlug: string })[]
  messages: Record<string, ChatMessage[]>
  notifications: NotificationEntry[]
  settings: Settings
}

const line = (slug: string, name: string, spec: string, image: string, unitPrice: number, stock: number, quantity: number, shopSlug: string, shopName: string): CartLine => ({
  slug, name, spec, image, unitPrice, stock, quantity, shopSlug, shopName, selected: true,
})

const address = { recipient: 'Nahid Hossen', phone: '+880 1712-345678', line: 'House 12, Road 7, Section 10, Mirpur, Dhaka 1216' }

const seedLines: Record<string, Order['lines']> = {
  'EH-20481': orderLines,
  'EH-20479': [{ name: 'DT-830D Digital Multimeter', spec: 'DC/AC · continuity buzzer', image: img.multimeter, quantity: 1, unitPrice: 450, total: 450 }],
  'EH-20462': [{ name: 'ESP32 DevKit V1 (WROOM-32)', spec: 'Wi-Fi + Bluetooth · 30-pin', image: img.esp32, quantity: 1, unitPrice: 520, total: 520 }],
  'EH-20437': [
    { name: 'Arduino Uno R3 (CH340 USB)', spec: 'ATmega328P · 5V logic', image: img.uno, quantity: 2, unitPrice: 780, total: 1560 },
    { name: 'HC-SR04 Ultrasonic Distance Sensor', spec: '2–400 cm · 5V', image: img.sr04, quantity: 2, unitPrice: 95, total: 190 },
    { name: '5V 1-Channel Relay Module', spec: '10A 250VAC', image: img.relay, quantity: 2, unitPrice: 85, total: 170 },
    { name: '2.54mm Male Pin Header 40-pin', spec: 'Single row', image: img.header, quantity: 4, unitPrice: 15, total: 60 },
  ],
}

const shopSlugs: Record<string, string> = {
  'Tech Electronics': 'tech-electronics', 'Volt & Ampere': 'volt-ampere', 'RoboTech BD': 'robotech-bd', 'Maker Store': 'maker-store',
  'Power House BD': 'power-house-bd', 'Circuit Bazar': 'circuit-bazar',
}

export function createSeed(): AppState {
  return {
    cart: [
      line('10k-carbon-resistor', '10K Ohm Carbon Film Resistor 1/4W', 'CFR-25JB · ±5%', img.resistor, 2.5, 12000, 500, 'tech-electronics', 'Tech Electronics'),
      line('100uf-25v-capacitor--tech-electronics', '100µF 25V Electrolytic Capacitor', '105°C · radial', img.capacitor, 5, 4500, 50, 'tech-electronics', 'Tech Electronics'),
      line('esp32-devkit-v1', 'ESP32 DevKit V1 (WROOM-32)', 'Wi-Fi + Bluetooth', img.esp32, 520, 140, 1, 'robotech-bd', 'RoboTech BD'),
      line('hc-sr04-ultrasonic', 'HC-SR04 Ultrasonic Distance Sensor', '2–400 cm · 5V', img.sr04, 95, 600, 2, 'robotech-bd', 'RoboTech BD'),
    ],
    couponCode: 'TECH50',
    wishlist: ['esp32-devkit-v1', 'arduino-uno-r3', 'dt-830d-multimeter', '18650-li-ion-cell', 'dht11-sensor', '5v-relay-module', 'esp8266-nodemcu-v3', 'ne555-timer-ic'],
    orders: orders.map((o) => ({
      ...o,
      shopSlug: shopSlugs[o.shopName],
      lines: seedLines[o.id],
      subtotal: o.total,
      deliveryFee: 60,
      discount: o.id === 'EH-20481' ? 60 : 60,
      couponCode: o.id === 'EH-20481' ? 'TECH50' : undefined,
      paymentMethod: o.id === 'EH-20479' ? 'Cash on Delivery' : 'bKash',
      deliveryMethod: 'Pathao courier',
      address,
    })),
    addresses,
    profile,
    conversations: conversations.map((c) => ({ ...c, shopSlug: shopSlugs[c.shopName] ?? 'tech-electronics' })),
    messages: { cv1: chatMessages },
    notifications: [
      ...notifications.today.map((n) => ({ ...n, group: 'today' as const })),
      ...notifications.earlier.map((n) => ({ ...n, group: 'earlier' as const })),
    ],
    settings: { twoStep: true, orderUpdates: true, sellerMessages: true, deals: false, language: 'en' },
  }
}
