import type { Product, ShopRef } from '@repo/types'
import { img } from './images'

const shop = (slug: string, name: string): ShopRef => ({ slug, name, verified: true })
export const shopRefs = {
  tech: shop('tech-electronics', 'Tech Electronics'),
  robo: shop('robotech-bd', 'RoboTech BD'),
  circuit: shop('circuit-bazar', 'Circuit Bazar'),
  maker: shop('maker-store', 'Maker Store'),
  bismillah: shop('bismillah-electronics', 'Bismillah Electronics'),
  power: shop('power-house-bd', 'Power House BD'),
  volt: shop('volt-ampere', 'Volt & Ampere'),
  sylhet: shop('sylhet-circuit-house', 'Sylhet Circuit House'),
}
const S = shopRefs

type Base = Omit<Product, 'unit'> & { unit?: string }
const p = (base: Base): Product => ({ unit: 'pc', ...base })

/** Canonical catalogue entries (one per part), keyed for reuse across sections. */
export const catalog = {
  esp32: p({ slug: 'esp32-devkit-v1', name: 'ESP32 DevKit V1 (WROOM-32)', spec: 'Wi-Fi + Bluetooth · 30-pin', image: img.esp32, price: 520, stock: 140, shop: S.robo, categorySlug: 'microcontrollers', brand: 'Espressif', popularity: 98, addedDaysAgo: 40 }),
  uno: p({ slug: 'arduino-uno-r3', name: 'Arduino Uno R3 (CH340 USB)', spec: 'ATmega328P · 5V logic', image: img.uno, price: 780, stock: 85, shop: S.maker, categorySlug: 'arduino-dev-boards', brand: 'Arduino', popularity: 95, addedDaysAgo: 90 }),
  sr04: p({ slug: 'hc-sr04-ultrasonic', name: 'HC-SR04 Ultrasonic Distance Sensor', spec: '2–400 cm · 5V', image: img.sr04, price: 95, stock: 600, shop: S.robo, categorySlug: 'sensors-modules', brand: 'Generic', popularity: 90, addedDaysAgo: 120 }),
  ne555: p({ slug: 'ne555-timer-ic', name: 'NE555 Precision Timer IC DIP-8', spec: 'NE555P · 4.5–16V', image: img.ne555, price: 12, stock: 3500, shop: S.circuit, categorySlug: 'ic-semiconductors', brand: 'Texas Instruments', popularity: 80, addedDaysAgo: 200 }),
  relay: p({ slug: '5v-relay-module', name: '5V 1-Channel Relay Module', spec: '10A 250VAC · opto-isolated', image: img.relay, price: 85, stock: 420, shop: S.maker, categorySlug: 'sensors-modules', brand: 'Songle', popularity: 78, addedDaysAgo: 30 }),
  nano: p({ slug: 'arduino-nano-v3', name: 'Arduino Nano V3 (Type-C)', spec: 'ATmega328P · CH340', image: img.uno, price: 480, stock: 210, shop: S.robo, categorySlug: 'arduino-dev-boards', brand: 'Arduino', popularity: 88, addedDaysAgo: 15 }),
  dht11: p({ slug: 'dht11-sensor', name: 'DHT11 Temperature & Humidity Sensor', spec: '0–50°C · digital', image: img.sr04, price: 120, stock: 350, shop: S.maker, categorySlug: 'sensors-modules', brand: 'Aosong', popularity: 86, addedDaysAgo: 1 }),
  resistor: p({ slug: '10k-carbon-resistor', name: '10K Ohm Carbon Film Resistor 1/4W', spec: 'CFR-25JB · ±5%', image: img.resistor, price: 2.5, stock: 12000, shop: S.tech, categorySlug: 'resistors-capacitors', brand: 'Generic', popularity: 99, addedDaysAgo: 300 }),
  cell: p({ slug: '18650-li-ion-cell', name: '18650 Li-ion Cell 2600mAh', spec: 'Samsung 26J · 3.7V', image: img.battery, price: 320, stock: 300, shop: S.power, categorySlug: 'power-supply', brand: 'Samsung', popularity: 84, addedDaysAgo: 60 }),
  header: p({ slug: 'male-pin-header-40', name: '2.54mm Male Pin Header 40-pin', spec: 'Single row · straight', image: img.header, price: 15, stock: 9000, shop: S.circuit, categorySlug: 'connectors-cables', brand: 'Generic', popularity: 82, addedDaysAgo: 150 }),
  bc547: p({ slug: 'bc547-transistor', name: 'BC547 NPN Transistor TO-92', spec: '45V · 100mA', image: img.transistor, price: 3, stock: 8000, shop: S.circuit, categorySlug: 'ic-semiconductors', brand: 'ON Semi', popularity: 92, addedDaysAgo: 250 }),
  diode: p({ slug: '1n4007-diode', name: '1N4007 Rectifier Diode 1A', spec: '1000V · DO-41', image: img.diode, price: 1.5, stock: 20000, shop: S.tech, categorySlug: 'ic-semiconductors', brand: 'Vishay', popularity: 91, addedDaysAgo: 280 }),
  cap: p({ slug: '100uf-25v-capacitor', name: '100µF 25V Electrolytic Capacitor', spec: '105°C · radial', image: img.capacitor, price: 5, stock: 4500, shop: S.bismillah, categorySlug: 'resistors-capacitors', brand: 'Nichicon', popularity: 89, addedDaysAgo: 180 }),
  lm7805: p({ slug: 'lm7805-regulator', name: 'LM7805 5V Voltage Regulator', spec: '1.5A · TO-220', image: img.transistor, price: 10, stock: 2800, shop: S.tech, categorySlug: 'ic-semiconductors', brand: 'Texas Instruments', popularity: 87, addedDaysAgo: 220 }),
  multimeter: p({ slug: 'dt-830d-multimeter', name: 'DT-830D Digital Multimeter', spec: 'DC/AC · continuity buzzer', image: img.multimeter, price: 450, stock: 60, shop: S.volt, categorySlug: 'tools-equipment', brand: 'Generic', popularity: 75, addedDaysAgo: 2 }),
  esp8266: p({ slug: 'esp8266-nodemcu-v3', name: 'ESP8266 NodeMCU V3', spec: 'Wi-Fi · CP2102', image: img.esp32, price: 390, stock: 0, shop: S.circuit, categorySlug: 'microcontrollers', brand: 'Espressif', popularity: 83, addedDaysAgo: 3 }),
  esp32cam: p({ slug: 'esp32-cam', name: 'ESP32-CAM with OV2640 Camera', spec: 'Wi-Fi · 2MP camera', image: img.esp32, price: 690, stock: 45, shop: S.maker, categorySlug: 'microcontrollers', brand: 'Espressif', popularity: 79, addedDaysAgo: 20 }),
  esp32s3: p({ slug: 'esp32-s3-devkitc', name: 'ESP32-S3 DevKitC-1 N8R8', spec: 'Dual-core · 8MB PSRAM', image: img.esp32, price: 1150, stock: 30, shop: S.robo, categorySlug: 'microcontrollers', brand: 'Espressif', popularity: 70, addedDaysAgo: 5 }),
  esp32c3: p({ slug: 'esp32-c3-super-mini', name: 'ESP32-C3 Super Mini', spec: 'RISC-V · USB-C', image: img.esp32, price: 420, stock: 200, shop: S.circuit, categorySlug: 'microcontrollers', brand: 'Espressif', popularity: 76, addedDaysAgo: 8 }),
  expansion: p({ slug: 'esp32-expansion-board', name: 'ESP32 38-pin Expansion Board', spec: 'Screw terminals · 5V', image: img.relay, price: 180, stock: 120, shop: S.tech, categorySlug: 'arduino-dev-boards', brand: 'Generic', popularity: 60, addedDaysAgo: 25 }),
  pir: p({ slug: 'pir-hc-sr501', name: 'PIR Motion Sensor HC-SR501', spec: '3–7 m range · 5–20V', image: img.sr04, price: 110, stock: 600, shop: S.robo, categorySlug: 'sensors-modules', brand: 'Generic', popularity: 74, addedDaysAgo: 45 }),
  mq2: p({ slug: 'mq-2-gas-sensor', name: 'MQ-2 Gas & Smoke Sensor', spec: 'LPG · smoke · 5V', image: img.sr04, price: 140, stock: 300, shop: S.circuit, categorySlug: 'sensors-modules', brand: 'Winsen', popularity: 68, addedDaysAgo: 70 }),
  l298n: p({ slug: 'l298n-driver', name: 'L298N Motor Driver Module', spec: 'Dual H-bridge · 2A', image: img.relay, price: 220, stock: 420, shop: S.robo, categorySlug: 'sensors-modules', brand: 'ST', popularity: 81, addedDaysAgo: 100 }),
  ir: p({ slug: 'ir-obstacle-sensor', name: 'IR Obstacle Sensor Module', spec: '2–30 cm · adjustable', image: img.sr04, price: 60, stock: 600, shop: S.tech, categorySlug: 'sensors-modules', brand: 'Generic', popularity: 66, addedDaysAgo: 110 }),
  ds18b20: p({ slug: 'ds18b20-probe', name: 'DS18B20 Waterproof Probe', spec: '−55 to 125°C · 1 m', image: img.sr04, price: 180, stock: 300, shop: S.volt, categorySlug: 'sensors-modules', brand: 'Maxim', popularity: 64, addedDaysAgo: 130 }),
  r1k: p({ slug: '1k-carbon-resistor', name: '1K Ohm Carbon Film Resistor 1/4W', spec: 'CFR-25JB · ±5%', image: img.resistor, price: 2.5, stock: 12000, shop: S.tech, categorySlug: 'resistors-capacitors', brand: 'Generic', popularity: 85, addedDaysAgo: 300 }),
  r4k7: p({ slug: '4k7-carbon-resistor', name: '4.7K Ohm Carbon Film Resistor 1/4W', spec: 'CFR-25JB · ±5%', image: img.resistor, price: 2.5, stock: 12000, shop: S.tech, categorySlug: 'resistors-capacitors', brand: 'Generic', popularity: 72, addedDaysAgo: 300 }),
  r220: p({ slug: '220-carbon-resistor', name: '220 Ohm Carbon Film Resistor 1/4W', spec: 'CFR-25JB · ±5%', image: img.resistor, price: 2.5, stock: 12000, shop: S.tech, categorySlug: 'resistors-capacitors', brand: 'Generic', popularity: 77, addedDaysAgo: 300 }),
  r100k: p({ slug: '100k-metal-resistor', name: '100K Ohm Metal Film Resistor 1%', spec: 'MFR-25 · ±1%', image: img.resistor, price: 3, stock: 12000, shop: S.tech, categorySlug: 'resistors-capacitors', brand: 'Yageo', popularity: 58, addedDaysAgo: 300 }),
  pot: p({ slug: '10k-potentiometer', name: '10K Potentiometer B10K', spec: 'Linear · 3-pin', image: img.resistor, price: 18, stock: 2000, shop: S.tech, categorySlug: 'resistors-capacitors', brand: 'Alpha', popularity: 62, addedDaysAgo: 160 }),
  rkit: p({ slug: 'resistor-kit-600', name: 'Resistor Kit 600 pcs (30 values)', spec: '1/4W · ±1%', image: img.resistor, price: 450, stock: 40, shop: S.tech, categorySlug: 'resistors-capacitors', brand: 'Generic', popularity: 69, addedDaysAgo: 12 }),
  schottky: p({ slug: '1n5819-schottky', name: '1N5819 Schottky Diode 1A 40V', spec: '40V · DO-41', image: img.diode, price: 3, stock: 20000, shop: S.tech, categorySlug: 'ic-semiconductors', brand: 'Vishay', popularity: 63, addedDaysAgo: 210 }),
  jumper: p({ slug: 'jumper-wires-40', name: 'Jumper Wires M-M 40 pcs 20cm', spec: 'Dupont · 2.54mm', image: img.header, price: 90, stock: 800, shop: S.maker, categorySlug: 'connectors-cables', brand: 'Generic', popularity: 80, addedDaysAgo: 35 }),
  charger: p({ slug: 'tp4056-charger', name: 'TP4056 Li-ion Charger Module', spec: 'USB-C · 1A', image: img.relay, price: 35, stock: 900, shop: S.power, categorySlug: 'power-supply', brand: 'Generic', popularity: 73, addedDaysAgo: 18 }),
  iron: p({ slug: 'soldering-iron-60w', name: 'Soldering Iron 60W Adjustable', spec: '200–450°C · 220V', image: img.multimeter, price: 650, stock: 50, shop: S.volt, categorySlug: 'tools-equipment', brand: 'Generic', popularity: 71, addedDaysAgo: 4 }),
} satisfies Record<string, Product>

export type CatalogKey = keyof typeof catalog

/** Copy a catalogue entry with overrides (different shop price, badge, etc.). */
export function variant(key: CatalogKey, overrides: Partial<Product> = {}): Product {
  return { ...catalog[key], ...overrides }
}

export function pick(...keys: CatalogKey[]): Product[] {
  return keys.map((key) => catalog[key])
}

/** Other shops that also list a part, with their price factor. */
const resellers: Partial<Record<CatalogKey, [ShopRef, number][]>> = {
  esp32: [[S.circuit, 0.95], [S.maker, 1.06], [S.volt, 1.08]],
  uno: [[S.robo, 0.97], [S.circuit, 1.03]],
  sr04: [[S.maker, 1.05], [S.circuit, 0.95]],
  ne555: [[S.tech, 1.1], [S.sylhet, 1.2]],
  relay: [[S.robo, 1.05], [S.bismillah, 0.95]],
  nano: [[S.maker, 1.04]],
  resistor: [[S.circuit, 1.2], [S.bismillah, 1.2], [S.sylhet, 1.4]],
  cell: [[S.bismillah, 1.06]],
  header: [[S.tech, 1.0], [S.maker, 1.2]],
  bc547: [[S.tech, 1.0], [S.sylhet, 1.3]],
  diode: [[S.circuit, 1.0], [S.bismillah, 1.3]],
  cap: [[S.tech, 1.0], [S.circuit, 1.2]],
  lm7805: [[S.circuit, 0.9], [S.power, 1.2]],
  multimeter: [[S.tech, 1.1]],
}

function round(price: number): number {
  return price < 20 ? Math.round(price * 10) / 10 : Math.round(price)
}

/** Every listing on the marketplace: canonical entries plus reseller copies. */
export const allProducts: Product[] = [
  ...Object.values(catalog),
  ...(Object.entries(resellers) as [CatalogKey, [ShopRef, number][]][]).flatMap(([key, list]) =>
    list.map(([ref, factor], i) => {
      const base = catalog[key]
      return {
        ...base,
        slug: `${base.slug}--${ref.slug}`,
        shop: ref,
        price: round(base.price * factor),
        stock: Math.max(0, Math.round(base.stock * (0.4 + i * 0.25))),
        popularity: (base.popularity ?? 50) - 5 - i * 3,
        addedDaysAgo: (base.addedDaysAgo ?? 30) + 7 * (i + 1),
      }
    }),
  ),
]

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug)
}
