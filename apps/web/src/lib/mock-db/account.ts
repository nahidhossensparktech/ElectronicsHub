import type { Address, AppNotification, ChatMessage, Conversation, CustomerProfile, Order, OrderLine } from '@repo/types'
import { img } from './images'

export const profile: CustomerProfile = {
  name: 'Nahid Hossen', initials: 'NH', memberSince: 'March 2025', location: 'Mirpur, Dhaka', phone: '+880 1712-345678',
  email: 'nahid.hossen@example.com', dateOfBirth: '14 Aug 1998', gender: 'Male', occupation: 'Electronics student, BUET',
  bio: 'I build IoT and robotics projects.',
}

export const orders: Order[] = [
  { id: 'EH-20481', date: '21 Nov 2026', shopName: 'Tech Electronics', status: 'shipped', total: 1240, itemCount: 3, thumbnails: [img.resistor, img.capacitor, img.diode] },
  { id: 'EH-20479', date: '20 Nov 2026', shopName: 'Volt & Ampere', status: 'pending', total: 450, itemCount: 1, thumbnails: [img.multimeter] },
  { id: 'EH-20462', date: '18 Nov 2026', shopName: 'RoboTech BD', status: 'delivered', total: 520, itemCount: 1, thumbnails: [img.esp32] },
  { id: 'EH-20437', date: '12 Nov 2026', shopName: 'Maker Store', status: 'delivered', total: 2180, itemCount: 5, thumbnails: [img.uno, img.sr04, img.relay, img.header] },
]

export const orderLines: OrderLine[] = [
  { name: '10K Ohm Carbon Film Resistor 1/4W', spec: 'CFR-25JB · ±5%', image: img.resistor, quantity: 500, unitPrice: 1.6, total: 800 },
  { name: '100µF 25V Electrolytic Capacitor', spec: '105°C · radial', image: img.capacitor, quantity: 50, unitPrice: 3.4, total: 170 },
  { name: '1N4007 Rectifier Diode 1A', spec: '1000V · DO-41', image: img.diode, quantity: 180, unitPrice: 1.5, total: 270 },
]

export const addresses: Address[] = [
  { id: 'a1', label: 'Home', kind: 'home', recipient: 'Nahid Hossen', line: 'House 12, Road 7, Section 10, Mirpur, Dhaka 1216', phone: '+880 1712-345678', isDefault: true },
  { id: 'a2', label: 'Office', kind: 'office', recipient: 'Nahid Hossen', line: 'Level 4, 22 Kazi Nazrul Islam Ave, Karwan Bazar, Dhaka 1215', phone: '+880 1712-345678', isDefault: false },
  { id: 'a3', label: 'Parents', kind: 'other', recipient: 'Abdul Hasan', line: 'Holding 45, Ward 3, Sadar, Cumilla 3500', phone: '+880 1819-000000', isDefault: false },
]

export const conversations: Conversation[] = [
  { id: 'cv1', shopSlug: 'tech-electronics', shopName: 'Tech Electronics', initials: 'TE', color: 'blue', lastMessage: 'Yes, 500 pcs available. Pickup to...', time: '2:41 PM', unread: 2 },
  { id: 'cv2', shopSlug: 'robotech-bd', shopName: 'RoboTech BD', initials: 'RT', color: 'navy', lastMessage: 'ESP32 DevKit V1 is back in stock', time: '11:05 AM', unread: 1 },
  { id: 'cv3', shopSlug: 'maker-store', shopName: 'Maker Store', initials: 'MS', color: 'green', lastMessage: 'You: Do you deliver to Cumilla?', time: 'Yesterday', unread: 0 },
  { id: 'cv4', shopSlug: 'power-house-bd', shopName: 'Power House BD', initials: 'PH', color: 'orange', lastMessage: 'We ship via Sundarban to Sylhet', time: 'Mon', unread: 0 },
  { id: 'cv5', shopSlug: 'circuit-bazar', shopName: 'Circuit Bazar', initials: 'CB', color: 'sky', lastMessage: '1,000 pcs BC547 at ৳1.80/pc', time: '18 Nov', unread: 0 },
]

export const chatMessages: ChatMessage[] = [
  { id: 'm1', from: 'me', body: 'Hi, I need 500 pcs of this resistor. Best price?', time: '2:31 PM · Seen' },
  { id: 'm2', from: 'shop', body: 'For 500+ pcs it’s ৳1.60/pc — ৳800 total.', time: '2:36 PM' },
  { id: 'm3', from: 'me', body: 'Can I pick up from Patuatuli today after 5 pm?', time: '2:40 PM · Seen' },
  { id: 'm4', from: 'shop', body: 'Yes, 500 pcs available. Pickup today? Shop 14, 2nd floor.', time: '2:41 PM' },
]

export const notifications: { today: AppNotification[]; earlier: AppNotification[] } = {
  today: [
    { id: 'n1', kind: 'order', title: 'Order #EH-20481 has shipped', body: 'Pathao tracking PTH-8812-AA · arriving tomorrow', time: '2h ago', unread: true },
    { id: 'n2', kind: 'message', title: 'Tech Electronics replied', body: '“Yes, 500 pcs available. Pickup today?”', time: '3h ago', unread: true },
    { id: 'n3', kind: 'offer', title: 'Price drop on your wishlist', body: 'Arduino Uno R3 is now ৳690 (was ৳780)', time: '5h ago', unread: true },
  ],
  earlier: [
    { id: 'n4', kind: 'delivered', title: 'Order #EH-20462 delivered', body: 'Rate your experience with RoboTech BD', time: 'Yesterday', unread: false },
    { id: 'n5', kind: 'security', title: 'New sign-in to your account', body: 'Chrome on Windows · Dhaka', time: '2 days ago', unread: false },
    { id: 'n6', kind: 'deal', title: 'Weekend deals are live', body: 'Up to 30% off dev boards', time: '3 days ago', unread: false },
  ],
}
