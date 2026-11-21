import type { Metadata } from 'next'
import { LegalPage, termsSections } from '@/features/content'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function Page() {
  return <LegalPage title="Terms & Conditions" sections={termsSections} />
}
