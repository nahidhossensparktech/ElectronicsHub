import { CircleCheck } from 'lucide-react'
import type { ReactNode } from 'react'

/** Checkout step card. `complete` shows a green check; `action` renders on the right. */
export function CheckoutSection({ title, complete, action, children }: { title: string; complete?: boolean; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-canvas p-6">
      <header className="flex items-center gap-2.5">
        {complete ? <CircleCheck className="size-5 text-success" /> : null}
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
        {action ? <div className="ml-auto">{action}</div> : null}
      </header>
      <div className="mt-5">{children}</div>
    </section>
  )
}
