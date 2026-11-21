'use client'

import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { Avatar, Button, Field, Input, LinkButton, Select, Textarea } from '@repo/ui'
import { updateProfile, useAppStore } from '@/lib/store'
import { AccountPanel } from './AccountPanel'

export function EditProfileForm() {
  const router = useRouter()
  const profile = useAppStore((s) => s.profile)
  const [error, setError] = useState('')
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const get = (k: string) => String(d.get(k) ?? '').trim()
    if (get('name').length < 2) return setError('Name is required.')
    if (!/^\S+@\S+\.\S+$/.test(get('email'))) return setError('Enter a valid email address.')
    updateProfile({ name: get('name'), email: get('email'), phone: get('phone'), dateOfBirth: get('dob'), gender: get('gender'), occupation: get('occupation'), bio: get('bio') })
    router.push('/account/profile')
  }
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" key={profile.email}>
      <AccountPanel title="Profile photo">
        <div className="flex items-center gap-5">
          <Avatar initials={profile.initials} color="slate" round className="size-20 text-2xl" />
          <div>
            <div className="flex gap-2.5"><Button variant="soft" size="sm" onClick={() => alert('Photo upload arrives with the media API (P1-16).')}>Upload new photo</Button><Button variant="secondary" size="sm" className="bg-line/60">Remove</Button></div>
            <p className="mt-2 text-xs text-muted">JPG or PNG, max 2 MB.</p>
          </div>
        </div>
      </AccountPanel>
      <AccountPanel title="Personal information">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full name"><Input name="name" tone="white" defaultValue={profile.name} /></Field>
          <Field label="Email"><Input name="email" tone="white" type="email" defaultValue={profile.email} /></Field>
          <Field label="Phone"><Input name="phone" tone="white" defaultValue={profile.phone} /></Field>
          <Field label="Date of birth"><Input name="dob" tone="white" defaultValue={profile.dateOfBirth} /></Field>
          <Field label="Gender"><Select name="gender" tone="white" options={['Male', 'Female', 'Other']} defaultValue={profile.gender} /></Field>
          <Field label="Occupation"><Input name="occupation" tone="white" defaultValue={profile.occupation} /></Field>
          <Field label="Bio" className="md:col-span-2"><Textarea name="bio" tone="white" rows={3} defaultValue={profile.bio} /></Field>
        </div>
      </AccountPanel>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex justify-end gap-3">
        <LinkButton href="/account/profile" variant="secondary" size="lg">Cancel</LinkButton>
        <Button type="submit" size="lg">Save Changes</Button>
      </div>
    </form>
  )
}
