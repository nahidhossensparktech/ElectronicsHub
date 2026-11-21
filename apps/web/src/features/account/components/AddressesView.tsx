'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { Address } from '@repo/types'
import { Button } from '@repo/ui'
import { useAppStore } from '@/lib/store'
import { AccountPageHeader } from './AccountPageHeader'
import { AddAddressTile } from './AddAddressTile'
import { AddressCard } from './AddressCard'
import { AddressForm } from './AddressForm'

export function AddressesView() {
  const addresses = useAppStore((s) => s.addresses)
  const [editing, setEditing] = useState<Address | 'new' | null>('new')
  const open = (a: Address | 'new') => {
    setEditing(a)
    requestAnimationFrame(() => document.getElementById('address-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  return (
    <>
      <AccountPageHeader title="My Addresses" subtitle="Manage where your orders are delivered" actions={<Button size="lg" onClick={() => open('new')}><Plus className="size-4" />Add Address</Button>} />
      <div className="grid gap-5 md:grid-cols-2">
        {addresses.map((a) => <AddressCard key={a.id} address={a} onEdit={open} />)}
        <AddAddressTile onClick={() => open('new')} />
      </div>
      <div id="address-form">
        {editing ? <AddressForm key={editing === 'new' ? 'new' : editing.id} initial={editing === 'new' ? undefined : editing} onDone={() => setEditing(null)} /> : null}
      </div>
    </>
  )
}
