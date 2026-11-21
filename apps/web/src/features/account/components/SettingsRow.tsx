import type { ReactNode } from 'react'

export function SettingsRow({ title, description, control }: { title: string; description: string; control: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] text-muted">{description}</p>
      </div>
      {control}
    </div>
  )
}
