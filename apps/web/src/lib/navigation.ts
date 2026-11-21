export const footerColumns = [
  {
    title: 'Marketplace',
    links: [
      { href: '/products', label: 'All Products' },
      { href: '/categories', label: 'All Categories' },
      { href: '/shops', label: 'Popular Shops' },
      { href: '/wholesale', label: 'Wholesale Products' },
      { href: '/deals', label: 'Deals & Offers' },
      { href: '/about', label: 'Become a Vendor' },
    ],
  },
  {
    title: 'Customer Support',
    links: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/help', label: 'Help Center' },
      { href: '/faq', label: 'FAQ' },
      { href: '/account/orders', label: 'Order Tracking' },
      { href: '/returns', label: 'Return & Refund Policy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
    ],
  },
] as const

export const paymentMethods = ['bKash', 'Nagad', 'Rocket', 'VISA', 'Mastercard', 'COD'] as const
