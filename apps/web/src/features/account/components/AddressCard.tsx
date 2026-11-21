'use client'

import { Building2, House, MapPin, Pencil, Trash2 } from 'lucide-react'
import type { Address } from '@repo/types'
import { StatusPill } from '@repo/ui'
import { cn } from '@repo/utils'
import { deleteAddress, setDefaultAddress } from '@/lib/store'

const icons = { home: House, office: Building2, other: MapPin }

export function AddressCard({ address, onEdit }: { address: Address; onEdit: (a: Address) => void }) {
  const Icon = icons[address.kind]
  return (
    <article className={cn('rounded-2xl p-6', address.isDefault ? 'bg-brand-50' : 'bg-canvas')}>
      <header className="flex items-center gap-2.5">
        <Icon className="size-[18px] text-brand" strokeWidth={1.75} />
        <h3 className="text-base font-semibold text-ink">{address.label}</h3>
        {address.isDefault ? <StatusPill className="bg-transparent px-1">Default</StatusPill> : null}
        <div className="ml-auto flex gap-2">
          <button type="button" aria-label={`Edit ${address.label}`} onClick={() => onEdit(address)} className="inline-flex size-8 items-center justify-center rounded-lg bg-white text-ink hover:text-brand"><Pencil className="size-3.5" /></button>
          <button type="button" aria-label={`Delete ${address.label}`} onClick={() => confirm(`Delete "${address.label}" address?`) && deleteAddress(address.id)} className="inline-flex size-8 items-center justify-center rounded-lg bg-white text-danger"><Trash2 className="size-3.5" /></button>
        </div>
      </header>
      <p className="mt-4 text-sm font-semibold text-ink">{address.recipient}</p>
      <p className="mt-2.5 text-sm text-muted">{address.line}</p>
      <p className="mt-2.5 text-[13px] text-muted">{address.phone}</p>
      {!address.isDefault ? <button type="button" onClick={() => setDefaultAddress(address.id)} className="mt-3 text-sm font-semibold text-brand">Set as default</button> : null}
    </article>
  )
}
