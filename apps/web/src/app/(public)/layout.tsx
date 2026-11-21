import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer/SiteFooter'
import { SiteHeader } from '@/components/site-header/SiteHeader'
import { demoUser } from '@/lib/session'

/** Guest storefront chrome. */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader user={demoUser} />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
