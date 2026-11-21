export interface AdminMetric {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  badge?: string
}

export interface AdminCustomer {
  id: string
  name: string
  phone: string
  location: string
  orders: number
  totalSpent: string
  joined: string
  status: 'Active' | 'New' | 'Blocked'
  avatarColor?: string
}

export interface AdminVendor {
  id: string
  shopName: string
  ownerName: string
  location: string
  initials: string
  avatarColor: string
  products: number
  orders: number
  rating: number
  status: 'Active' | 'Under review' | 'Suspended' | 'Pending' | 'Rejected'
}

export interface AdminActivity {
  id: string
  title: string
  subtitle: string
  time: string
  type: 'vendor' | 'product' | 'order' | 'report'
}
