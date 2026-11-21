'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Switch } from '@repo/ui'
import { cn } from '@repo/utils'
import { resetStore, setSetting, useAppStore } from '@/lib/store'
import { AccountPanel } from './AccountPanel'
import { SettingsRow } from './SettingsRow'

export function SettingsView() {
  const router = useRouter()
  const settings = useAppStore((s) => s.settings)
  const phone = useAppStore((s) => s.profile.phone)
  const [note, setNote] = useState('')
  const info = (text: string) => { setNote(text); setTimeout(() => setNote(''), 2500) }
  return (
    <>
      {note ? <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand">{note}</p> : null}
      <AccountPanel title="Login & security">
        <SettingsRow title="Phone number" description={`${phone} · verified`} control={<Button size="xs" variant="secondary" className="bg-line/60" onClick={() => router.push('/account/profile/edit')}>Change</Button>} />
        <SettingsRow title="Password" description="Last changed 2 months ago" control={<Button size="xs" variant="secondary" className="bg-line/60" onClick={() => info('We sent a password reset link to your phone (mock).')}>Update</Button>} />
        <SettingsRow title="Two-step verification" description="Ask for an OTP on new devices" control={<Switch label="Two-step verification" checked={settings.twoStep} onChange={(v) => setSetting('twoStep', v)} />} />
      </AccountPanel>
      <AccountPanel title="Notifications">
        <SettingsRow title="Order updates" description="SMS and in-app" control={<Switch label="Order updates" checked={settings.orderUpdates} onChange={(v) => setSetting('orderUpdates', v)} />} />
        <SettingsRow title="Messages from sellers" description="Push notifications" control={<Switch label="Messages from sellers" checked={settings.sellerMessages} onChange={(v) => setSetting('sellerMessages', v)} />} />
        <SettingsRow title="Deals & offers" description="Weekly email" control={<Switch label="Deals & offers" checked={settings.deals} onChange={(v) => setSetting('deals', v)} />} />
      </AccountPanel>
      <AccountPanel title="Preferences">
        <SettingsRow
          title="Language"
          description="Choose your display language"
          control={
            <div className="inline-flex rounded-[10px] bg-white p-1 text-[13px] font-semibold" role="radiogroup" aria-label="Language">
              {(['en', 'bn'] as const).map((lang) => (
                <button key={lang} type="button" role="radio" aria-checked={settings.language === lang} onClick={() => setSetting('language', lang)} className={cn('h-8 rounded-lg px-3.5', settings.language === lang ? 'bg-brand text-white' : 'text-ink')}>
                  {lang === 'en' ? 'English' : 'বাংলা'}
                </button>
              ))}
            </div>
          }
        />
        <SettingsRow title="Default location" description="Used to show nearby shops" control={<span className="text-sm font-semibold text-ink">Dhaka</span>} />
      </AccountPanel>
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-danger-50 p-6">
        <div>
          <h2 className="text-base font-semibold text-danger">Delete account</h2>
          <p className="mt-1 text-[13px] text-muted">Permanently remove your account and order history. (Demo: resets all mock data.)</p>
        </div>
        <button type="button" className="text-sm font-semibold text-danger" onClick={() => { if (confirm('Delete your account? This resets all demo data.')) { resetStore(); router.push('/') } }}>
          Delete Account
        </button>
      </section>
    </>
  )
}
