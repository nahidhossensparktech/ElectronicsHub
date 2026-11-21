import { Plus } from 'lucide-react'

export function AddAddressTile({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl bg-canvas p-6 text-center hover:bg-brand-50">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand text-white"><Plus className="size-5" /></span>
      <span className="mt-3 text-base font-semibold text-ink">Add new address</span>
      <span className="mt-1.5 text-[13px] text-muted">Home, office or a pickup point</span>
    </button>
  )
}
