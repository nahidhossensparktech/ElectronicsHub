'use client'

import { type FormEvent, useState } from 'react'
import type { Address } from '@repo/types'
import { Button, Checkbox, Chip, Field, Input, Select } from '@repo/ui'
import { saveAddress } from '@/lib/store'
import { AccountPanel } from './AccountPanel'

const kinds = [
  { value: 'home', label: 'Home' },
  { value: 'office', label: 'Office' },
  { value: 'other', label: 'Other' },
] as const

/** Add or edit an address. Street line is stored as "street, area, district". */
export function AddressForm({ initial, onDone }: { initial?: Address; onDone: () => void }) {
  const [kind, setKind] = useState<Address['kind']>(initial?.kind ?? 'home')
  const [error, setError] = useState('')
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const get = (k: string) => String(d.get(k) ?? '').trim()
    if (get('recipient').length < 2 || !/^(\+?88)?01\d{9}$/.test(get('phone').replace(/[\s-]/g, '')) || get('street').length < 4) {
      setError('Enter a name, a valid BD phone number (01XXXXXXXXX) and the street address.')
      return
    }
    saveAddress({
      id: initial?.id,
      kind,
      label: kind === 'other' ? get('label') || 'Other' : kinds.find((k) => k.value === kind)!.label,
      recipient: get('recipient'),
      phone: get('phone'),
      line: initial && get('street') === initial.line ? initial.line : `${get('street')}, ${get('area')}, ${get('district')}`,
      isDefault: d.get('default') === 'on' || Boolean(initial?.isDefault),
    })
    onDone()
  }
  return (
    <AccountPanel title={initial ? `Edit ${initial.label}` : 'Add new address'}>
      <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-6">
        <Field label="Full name" className="md:col-span-3"><Input name="recipient" tone="white" defaultValue={initial?.recipient} placeholder="Recipient name" /></Field>
        <Field label="Phone" className="md:col-span-3"><Input name="phone" tone="white" defaultValue={initial?.phone} placeholder="01XXXXXXXXX" /></Field>
        <Field label="Division" className="md:col-span-2"><Select name="division" tone="white" options={['Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Sylhet']} /></Field>
        <Field label="District" className="md:col-span-2"><Select name="district" tone="white" options={['Dhaka', 'Gazipur', 'Narayanganj', 'Cumilla', 'Chattogram']} /></Field>
        <Field label="Area / Upazila" className="md:col-span-2"><Select name="area" tone="white" options={['Mirpur', 'Dhanmondi', 'Uttara', 'Gulshan', 'Motijheel']} /></Field>
        <Field label="Street address" className="md:col-span-6"><Input name="street" tone="white" defaultValue={initial?.line} placeholder="House, road, block" /></Field>
        <div className="flex flex-wrap items-center gap-2 md:col-span-6">
          {kinds.map((k) => (
            <Chip key={k.value} active={kind === k.value} className={kind === k.value ? 'bg-brand' : 'bg-transparent'} onClick={() => setKind(k.value)}>{k.label}</Chip>
          ))}
          {kind === 'other' ? <Input name="label" tone="white" size="sm" defaultValue={initial?.kind === 'other' ? initial.label : ''} placeholder="Label (e.g. Parents)" className="ml-2 w-56" /> : null}
          {!initial?.isDefault ? <Checkbox name="default" label="Set as default" className="ml-auto" /> : null}
        </div>
        {error ? <p className="text-sm text-danger md:col-span-6">{error}</p> : null}
        <div className="flex justify-end gap-3 md:col-span-6">
          <Button variant="secondary" className="bg-line/60" onClick={onDone}>Cancel</Button>
          <Button type="submit" size="lg">Save Address</Button>
        </div>
      </form>
    </AccountPanel>
  )
}
