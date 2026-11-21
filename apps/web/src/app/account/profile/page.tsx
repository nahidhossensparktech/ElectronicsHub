import type { Metadata } from 'next'
import { AccountPageHeader, ProfileView } from '@/features/account'

export const metadata: Metadata = { title: 'My Profile' }

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <AccountPageHeader title="My Profile" subtitle="Your personal details and account summary" />
      <ProfileView />
    </div>
  )
}
