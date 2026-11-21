import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { inter, jetbrains, manrope } from '@/lib/fonts'
import { StoreProvider } from '@/lib/store'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'Electronic Hub.bd — Every Component. Every Store. One Hub.', template: '%s · Electronic Hub.bd' },
  description: "Discover electronics components, compare shops and connect directly with trusted sellers across Bangladesh.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
