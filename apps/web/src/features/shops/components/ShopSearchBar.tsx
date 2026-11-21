import { ChevronDown, MapPin, Search } from 'lucide-react'
import { districts } from '@/lib/mock-db/shops'

/** GET form: shop name + district → /shops?q=&district= */
export function ShopSearchBar({ q, district }: { q?: string; district?: string }) {
  return (
    <form action="/shops" className="flex flex-wrap gap-2.5">
      <label className="relative">
        <span className="sr-only">Search shops</span>
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
        <input name="q" defaultValue={q} placeholder="Search shop name or market" className="h-12 w-[300px] rounded-xl bg-white pr-4 pl-11 text-sm outline-none placeholder:text-subtle focus:ring-2 focus:ring-brand/30" />
      </label>
      <label className="relative flex h-12 items-center rounded-xl bg-white">
        <span className="sr-only">District</span>
        <MapPin className="pointer-events-none absolute left-4 size-4 text-brand" />
        <select name="district" defaultValue={district ?? ''} className="h-full cursor-pointer appearance-none bg-transparent pr-10 pl-10 text-sm font-semibold text-ink outline-none">
          <option value="">All districts</option>
          {districts.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 size-4 text-muted" />
      </label>
      <button type="submit" className="h-12 rounded-xl bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700">Search</button>
    </form>
  )
}
