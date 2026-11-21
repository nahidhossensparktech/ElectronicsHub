'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface VendorContextType {
  mobileOpen: boolean
  openMenu: () => void
  closeMenu: () => void
}

const VendorContext = createContext<VendorContextType>({
  mobileOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
})

export function VendorProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <VendorContext.Provider
      value={{
        mobileOpen,
        openMenu: () => setMobileOpen(true),
        closeMenu: () => setMobileOpen(false),
      }}
    >
      {children}
    </VendorContext.Provider>
  )
}

export function useVendor() {
  return useContext(VendorContext)
}
