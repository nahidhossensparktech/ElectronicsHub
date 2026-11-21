import type { Metadata } from 'next'
import { AccountPageHeader, MessagesView } from '@/features/account'

export const metadata: Metadata = { title: 'Messages' }

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ shop?: string }> }) {
  const { shop } = await searchParams
  return (
    <div className="space-y-6">
      <AccountPageHeader title="Messages" subtitle="Conversations with sellers" />
      <MessagesView shop={shop} />
    </div>
  )
}
