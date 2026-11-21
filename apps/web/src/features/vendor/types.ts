export interface VendorProduct {
  id: string
  name: string
  category: string
  sku: string
  price: string
  stock: number
  status: 'Active' | 'Low stock' | 'Out of stock' | 'Draft'
  image: string
}

export interface VendorOrder {
  id: string
  orderNumber: string
  customerName: string
  customerLocation: string
  customerInitials: string
  avatarColor: string
  date: string
  itemsCount: number
  total: string
  paymentMethod: 'bKash' | 'COD' | 'Nagad' | 'Card' | 'Rocket'
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
}

export interface VendorMetric {
  title: string
  value: string | number
  change?: string
  unit?: string
}
