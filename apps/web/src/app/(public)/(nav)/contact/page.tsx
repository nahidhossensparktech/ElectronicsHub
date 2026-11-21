import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Store } from 'lucide-react'
import { Container, FeatureCard, PageHeader } from '@repo/ui'
import { ContactForm } from '@/features/content'

export const metadata: Metadata = { title: 'Contact Us' }

const channels = [
  { icon: <Phone />, title: 'Call us', value: '+880 9612-000000', note: 'Sat–Thu, 9 am – 8 pm' },
  { icon: <Mail />, title: 'Email', value: 'support@electronichub.bd', note: 'Replies within 24 hours' },
  { icon: <MapPin />, title: 'Office', value: 'Level 5, 22 Patuatuli Road', note: 'Kotwali, Dhaka 1100' },
  { icon: <Store />, title: 'Vendor support', value: 'vendors@electronichub.bd', note: 'For shop owners and wholesalers' },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        title="Contact Us"
        subtitle="Questions about an order, a shop or selling on Electronic Hub? We're here to help."
      />
      <Container className="grid gap-10 pt-8 pb-16 lg:grid-cols-[720px_1fr]">
        <ContactForm />
        <div className="space-y-4">
          {channels.map((c) => (
            <FeatureCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              className="items-start py-5 [&>span]:size-[46px]"
              description={<><span className="block text-sm font-medium text-ink">{c.value}</span><span className="mt-0.5 block">{c.note}</span></>}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
