'use client'

import { type ReactNode, useEffect } from 'react'
import { hydrateStore } from './store'

/** Loads persisted client state after the first render (avoids hydration mismatches). */
export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    hydrateStore()
  }, [])
  return <>{children}</>
}
