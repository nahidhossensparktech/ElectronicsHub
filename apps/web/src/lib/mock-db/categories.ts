import type { Category } from '@repo/types'
import { img } from './images'

export const categories: Category[] = [
  { slug: 'microcontrollers', name: 'Microcontrollers', icon: img.esp32, itemCount: 2585 },
  { slug: 'arduino-dev-boards', name: 'Arduino & Dev Boards', icon: img.uno, itemCount: 1960 },
  { slug: 'sensors-modules', name: 'Sensors & Modules', icon: img.sr04, itemCount: 4810 },
  { slug: 'ic-semiconductors', name: 'IC & Semiconductors', icon: img.ne555, itemCount: 9870 },
  { slug: 'resistors-capacitors', name: 'Resistors & Capacitors', icon: img.resistor, itemCount: 30730 },
  { slug: 'power-supply', name: 'Power Supply', icon: img.battery, itemCount: 3330 },
  { slug: 'connectors-cables', name: 'Connectors & Cables', icon: img.header, itemCount: 6140 },
  { slug: 'tools-equipment', name: 'Tools & Equipment', icon: img.multimeter, itemCount: 1420 },
]
