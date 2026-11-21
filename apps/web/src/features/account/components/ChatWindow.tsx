'use client'

import { ArrowLeft, ImageIcon, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ChatMessage, Conversation } from '@repo/types'
import { Avatar, LinkButton, ShopName, Thumb } from '@repo/ui'
import { cn } from '@repo/utils'
import { img } from '@/lib/mock-db/images'
import { sendMessage } from '@/lib/store'
import { ChatBubble } from './ChatBubble'

export function ChatWindow({
  conversation,
  shopSlug,
  messages = [],
  onBack,
  className,
}: {
  conversation: Conversation
  shopSlug?: string
  messages?: ChatMessage[]
  onBack?: () => void
  className?: string
}) {
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const list = Array.isArray(messages) ? messages : []

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [list.length])

  return (
    <section className={cn('flex h-full flex-1 flex-col overflow-hidden bg-white', className)}>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2.5 border-b border-line/60 bg-canvas px-3.5 py-3 md:h-[72px] md:gap-3 md:px-5 md:py-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversations"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-ink shadow-2xs transition-colors hover:bg-line/50 md:hidden"
          >
            <ArrowLeft className="size-4.5" />
          </button>
        ) : null}
        <Avatar
          initials={conversation.initials ?? 'SH'}
          color={conversation.color ?? 'blue'}
          size="md"
          className="size-9 shrink-0 md:size-11"
        />
        <div className="min-w-0 flex-1">
          <ShopName
            name={conversation.shopName ?? 'Shop'}
            iconSize={14}
            className="truncate text-sm font-semibold text-ink md:text-base"
          />
          <p className="flex items-center gap-1.5 text-[11px] text-muted md:text-xs">
            <span className="size-2 shrink-0 rounded-full bg-success" />
            <span>Online</span>
            <span className="hidden sm:inline"> · replies in ~20 min</span>
          </p>
        </div>
        <LinkButton
          href={shopSlug ? `/shops/${shopSlug}` : '/shops'}
          size="sm"
          variant="secondary"
          className="shrink-0 bg-line/60 px-2.5 py-1.5 text-xs md:px-3 md:py-2 md:text-sm"
        >
          View Shop
        </LinkButton>
      </header>

      {/* Message History */}
      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-3.5 py-4 md:gap-4 md:px-5 md:py-6">
        <div className="flex-1" />
        {conversation.id === 'cv1' ? (
          <div className="ml-auto flex w-full max-w-[420px] shrink-0 items-center gap-2.5 rounded-2xl bg-canvas p-3 md:gap-3 md:p-3.5">
            <Thumb src={img.resistor} alt="" size={42} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-[0.06em] text-brand uppercase md:text-[11px]">Asking about</p>
              <p className="truncate text-xs font-semibold text-ink md:text-sm">10K Ohm Carbon Film Resistor 1/4W</p>
              <p className="text-[11px] text-muted md:text-xs">৳2.50/pc · 12,000 in stock</p>
            </div>
            <a href="/products/10k-carbon-resistor" className="shrink-0 text-xs font-semibold text-brand md:text-sm">View</a>
          </div>
        ) : null}
        {list.length === 0 ? (
          <p className="text-center text-xs text-muted md:text-sm">Say hello to {conversation.shopName ?? 'the seller'} — ask about stock, price or pickup.</p>
        ) : null}
        {list.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Message Input Form */}
      <form
        className="flex shrink-0 gap-2 border-t border-line/60 bg-white p-2.5 md:gap-3 md:p-4"
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(conversation.id, text)
          setText('')
        }}
      >
        <button
          type="button"
          aria-label="Attach image"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-muted transition-colors hover:bg-line/60 md:size-11"
        >
          <ImageIcon className="size-4.5 md:size-5" />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Message"
          placeholder="Write a message..."
          className="h-10 flex-1 rounded-xl bg-surface px-3 text-xs outline-none placeholder:text-subtle focus:ring-2 focus:ring-brand/30 md:h-11 md:px-4 md:text-sm"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-brand px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50 md:h-11 md:w-[98px] md:gap-2 md:text-sm"
        >
          <Send className="size-3.5 md:size-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </section>
  )
}
