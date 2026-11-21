'use client'

import type { ReactNode } from 'react'
import { AdminProvider, AdminSidebar, useAdmin } from '@/features/admin'

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const { mobileOpen, closeMenu } = useAdmin()

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      <AdminSidebar mobileOpen={mobileOpen} onClose={closeMenu} />
      <div className="min-w-0 flex-1 flex flex-col overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  )
}
