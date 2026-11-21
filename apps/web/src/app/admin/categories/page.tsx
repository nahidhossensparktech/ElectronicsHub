import type { Metadata } from 'next'
import { AdminCategoriesView, AdminHeader } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Categories Management - Admin Panel',
}

export default function AdminCategoriesPage() {
  return (
    <>
      <AdminHeader
        title="Categories"
        subtitle="Organize electronics hierarchy, component classifications, and storefront filters"
      />
      <main className="p-4 sm:p-8">
        <AdminCategoriesView />
      </main>
    </>
  )
}
