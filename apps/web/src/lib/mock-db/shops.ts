import type { District, Shop } from '@repo/types'

export const shops: Shop[] = [
  { slug: 'tech-electronics', name: 'Tech Electronics', initials: 'TE', color: 'blue', location: 'Patuatuli, Dhaka', district: 'Dhaka', description: 'Passive components & semiconductors since 2004.', productCount: 1240, rating: 4.8, reviewCount: 126, verified: true },
  { slug: 'robotech-bd', name: 'RoboTech BD', initials: 'RT', color: 'navy', location: 'Elephant Road, Dhaka', district: 'Dhaka', description: 'Dev boards, sensors and robotics kits for makers.', productCount: 412, rating: 4.9, reviewCount: 88, verified: true },
  { slug: 'circuit-bazar', name: 'Circuit Bazar', initials: 'CB', color: 'sky', location: 'Riazuddin Bazar, Chattogram', district: 'Chattogram', description: 'Wholesale ICs, transistors and diodes.', productCount: 530, rating: 4.7, reviewCount: 64, verified: true },
  { slug: 'maker-store', name: 'Maker Store', initials: 'MS', color: 'green', location: 'Mirpur 10, Dhaka', district: 'Dhaka', description: 'Arduino, Raspberry Pi and maker tools.', productCount: 340, rating: 4.8, reviewCount: 97, verified: true },
  { slug: 'bismillah-electronics', name: 'Bismillah Electronics', initials: 'BE', color: 'violet', location: 'Stadium Market, Dhaka', district: 'Dhaka', description: 'Capacitors, relays and power parts.', productCount: 860, rating: 4.6, reviewCount: 51, verified: true },
  { slug: 'power-house-bd', name: 'Power House BD', initials: 'PH', color: 'orange', location: 'KDA Avenue, Khulna', district: 'Khulna', description: 'Li-ion cells, BMS boards and chargers.', productCount: 210, rating: 4.7, reviewCount: 40, verified: true },
  { slug: 'volt-ampere', name: 'Volt & Ampere', initials: 'VA', color: 'red', location: 'Agargaon, Dhaka', district: 'Dhaka', description: 'Multimeters, soldering stations and tools.', productCount: 274, rating: 4.8, reviewCount: 72, verified: true },
  { slug: 'sylhet-circuit-house', name: 'Sylhet Circuit House', initials: 'SC', color: 'teal', location: 'Zindabazar, Sylhet', district: 'Sylhet', description: 'Repair parts, SMD components and ICs.', productCount: 188, rating: 4.5, reviewCount: 23, verified: true },
]

export const districts: District[] = [
  { name: 'Dhaka', shopCount: 942 },
  { name: 'Chattogram', shopCount: 318 },
  { name: 'Khulna', shopCount: 121 },
  { name: 'Rajshahi', shopCount: 96 },
  { name: 'Sylhet', shopCount: 74 },
  { name: 'Rangpur', shopCount: 58 },
  { name: 'Mymensingh', shopCount: 47 },
  { name: 'Barishal', shopCount: 41 },
]
