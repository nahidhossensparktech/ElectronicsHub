import type { ReactNode } from 'react'
import { AccountSidebar } from '@/features/account'

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      <AccountSidebar />
      <main className="min-w-0 flex-1 px-3.5 pt-4 pb-10 sm:px-6 sm:pt-6 md:px-8">{children}</main>
    </div>
  )
}
