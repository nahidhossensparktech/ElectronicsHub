import { Radio } from '@repo/ui'

export interface OptionCardProps {
  name: string
  value: string
  title: string
  note: string
  aside?: string
  checked: boolean
  onSelect: (value: string) => void
}

/** Selectable row with a radio (delivery & payment methods). */
export function OptionCard({ name, value, title, note, aside, checked, onSelect }: OptionCardProps) {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-xl bg-white px-4 py-3.5 has-checked:bg-brand-50">
      <Radio name={name} value={value} checked={checked} onChange={() => onSelect(value)} />
      <span className="flex-1">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-xs text-muted">{note}</span>
      </span>
      {aside ? <span className="text-sm font-semibold text-ink">{aside}</span> : null}
    </label>
  )
}
