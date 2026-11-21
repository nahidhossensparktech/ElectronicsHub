'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface AdminContextType {
  mobileOpen: boolean
  openMenu: () => void
  closeMenu: () => void
}

const AdminContext = createContext<AdminContextType>({
  mobileOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
})

export function AdminProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <AdminContext.Provider
      value={{
        mobileOpen,
        openMenu: () => setMobileOpen(true),
        closeMenu: () => setMobileOpen(false),
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
