import type { Metadata } from 'next'
import { AccountPageHeader, EditProfileForm } from '@/features/account'

export const metadata: Metadata = { title: 'Edit Profile' }

export default function EditProfilePage() {
  return (
    <div className="space-y-6">
      <AccountPageHeader title="Edit Profile" subtitle="Update your personal information" />
      <EditProfileForm />
    </div>
  )
}
