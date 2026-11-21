export const faqTopics = [
  { slug: 'buying', label: 'Buying & orders' },
  { slug: 'payments', label: 'Payments' },
  { slug: 'delivery', label: 'Delivery' },
  { slug: 'returns', label: 'Returns & refunds' },
  { slug: 'selling', label: 'Selling on Electronic Hub' },
  { slug: 'account', label: 'Account & security' },
] as const

export type FaqTopic = (typeof faqTopics)[number]['slug']

export const faqs: { topic: FaqTopic; question: string; answer: string }[] = [
  { topic: 'buying', question: 'How do I place an order?', answer: 'Add products to your cart from any shop and check out. If your cart has items from several shops, each shop receives its own order and arranges its own delivery.' },
  { topic: 'buying', question: 'Can I buy from more than one shop at once?', answer: 'Yes. Your cart groups items by shop and each shop ships separately.' },
  { topic: 'buying', question: 'How do wholesale prices work?', answer: 'Shops set tiered prices by quantity. The unit price drops automatically when your quantity reaches a tier.' },
  { topic: 'buying', question: 'How can I contact a seller before ordering?', answer: 'Use Message Seller on any product or shop page.' },
  { topic: 'buying', question: 'How are shops verified?', answer: 'We check trade licence, NID and the physical shop address before a shop goes live.' },
  { topic: 'payments', question: 'Which payment methods are supported?', answer: 'bKash, Nagad, Rocket, Visa, Mastercard and cash on delivery, depending on the shop.' },
  { topic: 'payments', question: 'Is cash on delivery available everywhere?', answer: 'Most shops offer COD inside Dhaka and major cities. A ৳20 COD fee may apply.' },
  { topic: 'payments', question: 'How do coupons work?', answer: 'Enter a coupon code in your cart. It applies when your order meets the minimum amount.' },
  { topic: 'delivery', question: 'How long does delivery take?', answer: 'Usually 1–3 days by courier. Many shops also offer same-day pickup.' },
  { topic: 'delivery', question: 'How do I track my order?', answer: 'Open My Orders and choose Track on the order to see each step.' },
  { topic: 'returns', question: 'What if a product arrives damaged or wrong?', answer: 'Request a return within 7 days from My Orders.' },
  { topic: 'returns', question: 'When will I get my refund?', answer: 'Approved refunds reach your original payment method within 5–7 working days.' },
  { topic: 'selling', question: 'How do I open a shop?', answer: 'Choose Become a Vendor, submit your trade licence and shop details, and our team verifies you within 48 hours.' },
  { topic: 'selling', question: 'Does it cost anything to list products?', answer: 'No. Listing is free for verified shops.' },
  { topic: 'account', question: 'How do I change my phone number?', answer: 'Go to Account Settings → Login & security → Phone number → Change.' },
  { topic: 'account', question: 'How do I turn on two-step verification?', answer: 'Go to Account Settings and switch on Two-step verification.' },
]
