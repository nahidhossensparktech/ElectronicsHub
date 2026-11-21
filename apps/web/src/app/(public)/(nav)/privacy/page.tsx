import type { Metadata } from 'next'
import { LegalPage, privacySections } from '@/features/content'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function Page() {
  return <LegalPage title="Privacy Policy" sections={privacySections} />
}
