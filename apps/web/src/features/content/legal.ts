import type { LegalSection } from './components/LegalDocument'

export const termsSections: LegalSection[] = [
  { title: 'Using Electronic Hub.bd', body: 'By creating an account you agree to these terms. You must provide accurate information and keep your login details secure.' },
  { title: 'Marketplace role', body: 'Electronic Hub.bd is a marketplace. Products are listed and sold by independent shops, which are responsible for their listings, prices and stock.' },
  { title: 'Orders and pricing', body: 'Prices are set by each shop. An order is confirmed once the shop accepts it. Shops may cancel orders for items that are out of stock.' },
  { title: 'Vendor obligations', body: 'Vendors must list genuine products, keep quantities accurate, respond to customers and ship within the stated time.' },
  { title: 'Prohibited items', body: 'Counterfeit, stolen or unsafe products and items restricted by Bangladeshi law may not be listed.' },
  { title: 'Limitation of liability', body: 'We are not liable for indirect losses arising from transactions between buyers and shops, beyond what the law requires.' },
]

export const privacySections: LegalSection[] = [
  { title: 'Information we collect', body: 'We collect the details you give us when you create an account — your name, phone number, email and delivery addresses — along with order history and messages you send to sellers.' },
  { title: 'How we use your information', body: 'We use your information to process orders, connect you with shops, send order and account notifications, prevent fraud and improve search results.' },
  { title: 'Sharing with sellers', body: 'When you place an order or message a shop, we share your name, phone number and delivery address with that shop only so it can fulfil your order.' },
  { title: 'Data security', body: 'Passwords are encrypted, OTP is used for sign-in, and access to personal data is limited to staff who need it.' },
  { title: 'Your rights', body: 'You can view, update or delete your account information at any time from Account Settings, or contact us to request a copy of your data.' },
  { title: 'Contact', body: 'Questions about privacy? Email privacy@electronichub.bd.' },
]

export const returnsSections: LegalSection[] = [
  { title: 'Return window', body: 'You can request a return within 7 days of delivery for items that are damaged, defective or not as described.' },
  { title: 'Non-returnable items', body: 'Components that have been soldered, programmed or physically modified cannot be returned unless they were defective on arrival.' },
  { title: 'How to request a return', body: 'Go to My Orders, open the order and choose Request Return. Add photos and a short description; the shop responds within 48 hours.' },
  { title: 'Refunds', body: 'Approved refunds are sent to the original payment method (bKash, Nagad, card) within 5–7 working days. Cash-on-delivery orders are refunded by bKash or bank transfer.' },
  { title: 'Disputes', body: 'If you and the shop cannot agree, our support team will review the case and make a final decision.' },
]
