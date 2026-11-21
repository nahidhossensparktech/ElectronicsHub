import { ChevronDown, MapPin } from 'lucide-react'

export function LocationPicker({ district = 'Dhaka' }: { district?: string }) {
  return (
    <button type="button" className="flex shrink-0 items-center gap-2.5 text-left">
      <MapPin className="size-[18px] text-brand" strokeWidth={1.75} />
      <span className="leading-tight">
        <span className="block text-xs text-muted">Location</span>
        <span className="flex items-center gap-1 text-sm font-semibold text-ink">
          {district}
          <ChevronDown className="size-3.5 text-muted" />
        </span>
      </span>
    </button>
  )
}
