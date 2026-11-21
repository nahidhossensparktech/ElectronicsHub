'use client'

import { Lock, ShieldCheck } from 'lucide-react'
import { Avatar, LinkButton, StatusPill } from '@repo/ui'
import { useAppStore } from '@/lib/store'
import { AccountPanel } from './AccountPanel'
import { InfoField } from './InfoField'

export function ProfileView() {
  const profile = useAppStore((s) => s.profile)
  const addresses = useAppStore((s) => s.addresses)
  const twoStep = useAppStore((s) => s.settings.twoStep)
  const home = addresses.find((a) => a.isDefault) ?? addresses[0]
  return (
    <>
      <AccountPanel>
        <div className="flex flex-wrap items-center gap-6">
          <Avatar initials={profile.initials} color="slate" round className="size-24 text-[28px]" />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-ink">{profile.name}</h2>
            <p className="mt-1 text-sm text-muted">Member since {profile.memberSince} · {profile.location}</p>
            <div className="mt-2.5 flex gap-2"><StatusPill tone="success">Phone verified</StatusPill><StatusPill>Maker</StatusPill></div>
          </div>
          <LinkButton href="/account/profile/edit" size="lg">Edit Profile</LinkButton>
        </div>
      </AccountPanel>
      <AccountPanel title="Personal information">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
          <InfoField label="Full name" value={profile.name} />
          <InfoField label="Phone" value={profile.phone} />
          <InfoField label="Email" value={profile.email} />
          <InfoField label="Date of birth" value={profile.dateOfBirth} />
          <InfoField label="Gender" value={profile.gender} />
          <InfoField label="Occupation" value={profile.occupation} />
        </dl>
      </AccountPanel>
      <div className="grid gap-6 md:grid-cols-2">
        <AccountPanel title="Default address" link={{ label: 'Manage', href: '/account/addresses' }}>
          {home ? (<><p className="text-sm text-ink">{home.line}</p><p className="mt-3 text-[13px] text-muted">Phone: {home.phone}</p></>) : <p className="text-sm text-muted">No address yet.</p>}
        </AccountPanel>
        <AccountPanel title="Security" link={{ label: 'Settings', href: '/account/settings' }}>
          <p className="flex items-center gap-2 text-sm text-ink"><Lock className="size-4 text-muted" />Password last changed 2 months ago</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink"><ShieldCheck className={twoStep ? 'size-4 text-success' : 'size-4 text-subtle'} />Two-step verification is {twoStep ? 'on' : 'off'}</p>
        </AccountPanel>
      </div>
    </>
  )
}
