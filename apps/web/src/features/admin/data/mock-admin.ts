import type { AdminCustomer, AdminMetric, AdminVendor, AdminActivity } from '../types'

export const adminMetrics: AdminMetric[] = [
  { title: 'Total Customers', value: '25,482', change: '+8.2%', trend: 'up' },
  { title: 'Total Vendors', value: '1,842', change: '+46 this month', trend: 'up' },
  { title: 'Pending Approvals', value: '27' },
  { title: 'Total Products', value: '120,482', change: '+3.1%', trend: 'up' },
  { title: 'Total Orders', value: '48,920', change: '+12.6%', trend: 'up' },
  { title: 'Active Shops', value: '1,716' },
  { title: 'GMV (30 days)', value: '৳ 3.2 Cr', change: '+15.4%', trend: 'up' },
  { title: 'Open Reports', value: '9' },
]

export const adminCustomers: AdminCustomer[] = [
  {
    id: 'CUST-001',
    name: 'Rafi Hasan',
    phone: '+880 1712-345678',
    location: 'Mirpur, Dhaka',
    orders: 24,
    totalSpent: '৳18,420',
    joined: 'Mar 2025',
    status: 'Active',
    avatarColor: 'bg-slate-700',
  },
  {
    id: 'CUST-002',
    name: 'Sadia Akter',
    phone: '+880 1819-220011',
    location: 'Uttara, Dhaka',
    orders: 11,
    totalSpent: '৳6,210',
    joined: 'Jun 2025',
    status: 'Active',
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'CUST-003',
    name: 'Tanvir Ahmed',
    phone: '+880 1611-555210',
    location: 'Chattogram',
    orders: 38,
    totalSpent: '৳64,900',
    joined: 'Jan 2025',
    status: 'Active',
    avatarColor: 'bg-amber-600',
  },
  {
    id: 'CUST-004',
    name: 'Nusrat Jahan',
    phone: '+880 1913-882001',
    location: 'Dhanmondi',
    orders: 3,
    totalSpent: '৳1,140',
    joined: 'Nov 2026',
    status: 'New',
    avatarColor: 'bg-pink-600',
  },
  {
    id: 'CUST-005',
    name: 'Unknown Buyer 42',
    phone: '+880 1500-000042',
    location: 'Gazipur',
    orders: 0,
    totalSpent: '৳0',
    joined: 'Oct 2026',
    status: 'Blocked',
    avatarColor: 'bg-indigo-900',
  },
  {
    id: 'CUST-006',
    name: 'Mahin Rahman',
    phone: '+880 1722-114455',
    location: 'Khulna',
    orders: 7,
    totalSpent: '৳3,980',
    joined: 'Aug 2025',
    status: 'Active',
    avatarColor: 'bg-purple-600',
  },
]

export const adminVendors: AdminVendor[] = [
  {
    id: 'VEN-01',
    shopName: 'Tech Electronics',
    ownerName: 'Md. Kamrul Hasan',
    location: 'Patuatuli, Dhaka',
    initials: 'TE',
    avatarColor: 'bg-blue-600',
    products: 1240,
    orders: 4820,
    rating: 4.8,
    status: 'Active',
  },
  {
    id: 'VEN-02',
    shopName: 'RoboTech BD',
    ownerName: 'Arif Chowdhury',
    location: 'Elephant Road, Dhaka',
    initials: 'RB',
    avatarColor: 'bg-slate-900',
    products: 412,
    orders: 2110,
    rating: 4.9,
    status: 'Active',
  },
  {
    id: 'VEN-03',
    shopName: 'Circuit Bazar',
    ownerName: 'Jamal Uddin',
    location: 'Riazuddin Bazar, Chattogram',
    initials: 'CB',
    avatarColor: 'bg-cyan-600',
    products: 530,
    orders: 1940,
    rating: 4.7,
    status: 'Active',
  },
  {
    id: 'VEN-04',
    shopName: 'Maker Store',
    ownerName: 'Mitu Rahman',
    location: 'Mirpur 10, Dhaka',
    initials: 'MS',
    avatarColor: 'bg-emerald-600',
    products: 340,
    orders: 1580,
    rating: 4.8,
    status: 'Active',
  },
  {
    id: 'VEN-05',
    shopName: 'Power House BD',
    ownerName: 'Hasan Ali',
    location: 'KDA Avenue, Khulna',
    initials: 'PH',
    avatarColor: 'bg-amber-600',
    products: 210,
    orders: 620,
    rating: 4.7,
    status: 'Under review',
  },
  {
    id: 'VEN-06',
    shopName: 'Volt & Ampere',
    ownerName: 'Sabbir Hossain',
    location: 'Agargaon, Dhaka',
    initials: 'V&',
    avatarColor: 'bg-red-600',
    products: 274,
    orders: 980,
    rating: 3.9,
    status: 'Suspended',
  },
]

export const adminActivities: AdminActivity[] = [
  {
    id: 'ACT-1',
    title: 'New vendor registration submitted',
    subtitle: 'Silicon Electro from Stadium Market submitted trade license',
    time: '12m ago',
    type: 'vendor',
  },
  {
    id: 'ACT-2',
    title: 'Product listing approved',
    subtitle: 'Raspberry Pi 5 8GB by RoboTech BD marked active',
    time: '45m ago',
    type: 'product',
  },
  {
    id: 'ACT-3',
    title: 'High value wholesale inquiry',
    subtitle: 'Order #EH-99824 valued at ৳ 1,45,000 for 500x ESP32',
    time: '2h ago',
    type: 'order',
  },
  {
    id: 'ACT-4',
    title: 'Dispute report resolved',
    subtitle: 'Damaged item complaint between buyer and Circuit Bazar closed',
    time: '4h ago',
    type: 'report',
  },
]

export interface AdminOrder {
  id: string
  orderNumber: string
  customer: string
  shop: string
  date: string
  items: number
  total: string
  commission: string
  paymentMethod: string
  status: 'Delivered' | 'Processing' | 'Pending' | 'Cancelled'
}

export const adminOrders: AdminOrder[] = [
  {
    id: 'ORD-101',
    orderNumber: '#EH-48920',
    customer: 'Rafi Hasan',
    shop: 'Tech Electronics',
    date: '21 Nov 2026, 11:30',
    items: 4,
    total: '৳ 3,450',
    commission: '৳ 172.50 (5%)',
    paymentMethod: 'bKash',
    status: 'Processing',
  },
  {
    id: 'ORD-102',
    orderNumber: '#EH-48919',
    customer: 'Tanvir Ahmed',
    shop: 'RoboTech BD',
    date: '21 Nov 2026, 10:15',
    items: 12,
    total: '৳ 14,800',
    commission: '৳ 740.00 (5%)',
    paymentMethod: 'Card',
    status: 'Delivered',
  },
  {
    id: 'ORD-103',
    orderNumber: '#EH-48918',
    customer: 'Sadia Akter',
    shop: 'Circuit Bazar',
    date: '21 Nov 2026, 09:20',
    items: 2,
    total: '৳ 980',
    commission: '৳ 49.00 (5%)',
    paymentMethod: 'COD',
    status: 'Pending',
  },
  {
    id: 'ORD-104',
    orderNumber: '#EH-48917',
    customer: 'Mahin Rahman',
    shop: 'Maker Store',
    date: '20 Nov 2026, 18:45',
    items: 1,
    total: '৳ 2,400',
    commission: '৳ 120.00 (5%)',
    paymentMethod: 'Nagad',
    status: 'Delivered',
  },
  {
    id: 'ORD-105',
    orderNumber: '#EH-48916',
    customer: 'Nusrat Jahan',
    shop: 'Power House BD',
    date: '20 Nov 2026, 15:10',
    items: 6,
    total: '৳ 5,600',
    commission: '৳ 280.00 (5%)',
    paymentMethod: 'bKash',
    status: 'Cancelled',
  },
]

export interface AdminProduct {
  id: string
  name: string
  category: string
  shop: string
  price: string
  stock: number
  sku: string
  status: 'Active' | 'Pending approval' | 'Out of stock' | 'Rejected'
  image: string
}

export const adminProducts: AdminProduct[] = [
  {
    id: 'PRD-A1',
    name: 'ESP32-WROOM-32 Wi-Fi + Bluetooth DevKit',
    category: 'Microcontrollers',
    shop: 'Tech Electronics',
    price: '৳450',
    stock: 450,
    sku: 'EH-ESP32-01',
    status: 'Active',
    image: '/products/esp32-devkit.svg',
  },
  {
    id: 'PRD-A2',
    name: 'Arduino Uno R3 DIP ATmega328P with USB Cable',
    category: 'Microcontrollers',
    shop: 'RoboTech BD',
    price: '৳680',
    stock: 220,
    sku: 'EH-ARD-02',
    status: 'Active',
    image: '/products/arduino-uno.svg',
  },
  {
    id: 'PRD-A3',
    name: 'HC-SR04 Ultrasonic Distance Sensor Module',
    category: 'Sensors & Modules',
    shop: 'Circuit Bazar',
    price: '৳95',
    stock: 1200,
    sku: 'EH-SR04-03',
    status: 'Active',
    image: '/products/hc-sr04.svg',
  },
  {
    id: 'PRD-A4',
    name: 'Raspberry Pi 5 Model B 8GB RAM',
    category: 'Microcontrollers',
    shop: 'Tech Electronics',
    price: '৳10,800',
    stock: 45,
    sku: 'EH-RPI5-08',
    status: 'Pending approval',
    image: '/products/esp32-devkit.svg',
  },
  {
    id: 'PRD-A5',
    name: '10K Ohm 1/4W Metal Film Resistor (Pack of 100)',
    category: 'Passive Components',
    shop: 'Maker Store',
    price: '৳120',
    stock: 8500,
    sku: 'EH-RES-10K',
    status: 'Active',
    image: '/products/resistor.svg',
  },
  {
    id: 'PRD-A6',
    name: '18650 3.7V 2600mAh Li-ion Rechargeable Battery',
    category: 'Power Supply',
    shop: 'Power House BD',
    price: '৳280',
    stock: 0,
    sku: 'EH-BAT-1865',
    status: 'Out of stock',
    image: '/products/battery-18650.svg',
  },
]

