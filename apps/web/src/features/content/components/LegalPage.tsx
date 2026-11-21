import { PageHeader } from '@repo/ui'
import { LegalDocument, type LegalSection } from './LegalDocument'

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: title }]}
        title={title}
        subtitle="Last updated: 21 November 2026 · Applies to all customers and vendors on Electronic Hub.bd"
      />
      <LegalDocument sections={sections} />
    </>
  )
}
