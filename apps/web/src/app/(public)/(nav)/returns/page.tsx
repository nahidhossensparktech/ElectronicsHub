import type { Metadata } from 'next'
import { LegalPage, returnsSections } from '@/features/content'

export const metadata: Metadata = { title: 'Return & Refund Policy' }

export default function Page() {
  return <LegalPage title="Return & Refund Policy" sections={returnsSections} />
}
