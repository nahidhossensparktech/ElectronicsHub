'use client'

import type { ReactNode } from 'react'
import { VendorProvider, VendorSidebar, useVendor } from '@/features/vendor'

function VendorLayoutInner({ children }: { children: ReactNode }) {
  const { mobileOpen, closeMenu } = useAdminOrVendorClose()

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      <VendorSidebar mobileOpen={mobileOpen} onClose={closeMenu} />
      <div className="min-w-0 flex-1 flex flex-col overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}

function useAdminOrVendorClose() {
  return useVendor()
}

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <VendorProvider>
      <VendorLayoutInner>{children}</VendorLayoutInner>
    </VendorProvider>
  )
}
