'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import type { Conversation } from '@repo/types'
import { Avatar, CountBadge } from '@repo/ui'
import { cn } from '@repo/utils'

export function ConversationList({
  conversations = [],
  activeId,
  onSelect,
  className,
}: {
  conversations?: Conversation[]
  activeId?: string
  onSelect: (id: string) => void
  className?: string
}) {
  const [q, setQ] = useState('')
  const list = Array.isArray(conversations) ? conversations : []
  const visible = list.filter((c) => {
    if (!c) return false
    const name = c.shopName ?? ''
    const msg = c.lastMessage ?? ''
    return `${name} ${msg}`.toLowerCase().includes((q ?? '').toLowerCase().trim())
  })

  return (
    <aside
      className={cn(
        'h-full w-full shrink-0 flex-col border-r border-line/70 bg-canvas p-3.5 md:w-[330px] md:p-4',
        className,
      )}
    >
      <div className="shrink-0">
        <label className="relative block">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search conversations"
            className="h-10.5 w-full rounded-xl bg-white pr-3 pl-10 text-xs outline-none placeholder:text-subtle shadow-2xs focus:ring-2 focus:ring-brand/20 md:h-11 md:text-sm"
          />
        </label>
      </div>
      <ul className="mt-3 flex-1 space-y-1 overflow-y-auto pr-0.5">
        {visible.map((c) => {
          if (!c || !c.id) return null
          const isSelected = c.id === activeId
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                aria-current={isSelected ? 'true' : undefined}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all',
                  isSelected ? 'bg-white shadow-2xs font-semibold' : 'hover:bg-white/70 active:bg-white/90',
                )}
              >
                <Avatar initials={c.initials ?? 'SH'} color={c.color ?? 'blue'} size="md" className="size-10 shrink-0 md:size-11" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-ink">{c.shopName ?? 'Shop'}</span>
                    <span className={cn('shrink-0 text-[11px] md:text-xs', c.unread ? 'font-semibold text-brand' : 'text-muted')}>
                      {c.time ?? ''}
                    </span>
                  </span>
                  <span className="mt-0.5 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-muted md:text-[13px]">{c.lastMessage ?? ''}</span>
                    {c.unread ? <CountBadge count={c.unread} /> : null}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
        {visible.length === 0 ? (
          <li className="px-2 py-8 text-center text-xs text-muted md:text-sm">No conversations found</li>
        ) : null}
      </ul>
    </aside>
  )
}
