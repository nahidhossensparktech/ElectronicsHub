import type { Metadata } from 'next'
import { AccountPageHeader, DashboardView } from '@/features/account'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <AccountPageHeader title="Dashboard" subtitle="Welcome back to Electronic Hub.bd" />
      <DashboardView />
    </div>
  )
}
