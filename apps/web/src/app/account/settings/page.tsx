import type { Metadata } from 'next'
import { AccountPageHeader, SettingsView } from '@/features/account'

export const metadata: Metadata = { title: 'Account Settings' }

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <AccountPageHeader title="Account Settings" subtitle="Security, notifications and preferences" />
      <SettingsView />
    </div>
  )
}
