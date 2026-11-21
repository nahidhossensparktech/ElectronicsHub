import { Mail, Phone } from 'lucide-react'

export function ShopAboutCard({ about, phone, email }: { about: string; phone: string; email: string }) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <h2 className="text-base font-semibold text-ink">About the shop</h2>
      <p className="mt-3 text-[13px] leading-5 text-muted">{about}</p>
      <p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-ink"><Phone className="size-4 text-brand" />{phone}</p>
      <p className="mt-2.5 flex items-center gap-2 text-[13px] font-medium text-ink"><Mail className="size-4 text-brand" />{email}</p>
    </div>
  )
}
