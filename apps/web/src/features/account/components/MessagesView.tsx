'use client'

import { useEffect, useState } from 'react'
import { markConversationRead, openConversation, useAppStore } from '@/lib/store'
import { ChatWindow } from './ChatWindow'
import { ConversationList } from './ConversationList'

/** Two-pane inbox. On mobile, smoothly toggles between conversation list and active chat view. */
export function MessagesView({ shop }: { shop?: string }) {
  const storeConversations = useAppStore((s) => s.conversations)
  const storeMessages = useAppStore((s) => s.messages)
  const conversations = Array.isArray(storeConversations) ? storeConversations : []
  const messages = storeMessages && typeof storeMessages === 'object' ? storeMessages : {}
  const [activeId, setActiveId] = useState<string | undefined>(undefined)
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')

  useEffect(() => {
    if (shop) {
      try {
        const id = openConversation(shop)
        setActiveId(id)
        setMobileView('chat')
        window.history.replaceState(null, '', '/account/messages')
      } catch (err) {
        console.error('Failed to open conversation:', err)
      }
    }
  }, [shop])

  const active = (conversations.find((c) => c?.id === activeId) ?? conversations[0]) as typeof conversations[number] | undefined

  useEffect(() => {
    if (active?.id && active.unread) {
      markConversationRead(active.id)
    }
  }, [active?.id, active?.unread])

  const handleSelectConversation = (id: string) => {
    setActiveId(id)
    setMobileView('chat')
  }

  const handleBackToList = () => {
    setMobileView('list')
  }

  if (!active || conversations.length === 0) {
    return (
      <div className="rounded-2xl bg-canvas p-10 md:p-16 text-center">
        <p className="text-base font-semibold text-ink">No conversations yet</p>
        <p className="mt-1 text-sm text-muted">Message a seller from any product or shop page to start chatting.</p>
      </div>
    )
  }

  const activeMessages = (active.id && messages[active.id]) || []
  const shopSlug = active.shopSlug || 'tech-electronics'

  return (
    <div className="flex h-[calc(100dvh-175px)] min-h-[480px] max-h-[740px] w-full flex-col overflow-hidden rounded-[20px] border border-line/70 bg-canvas md:h-[680px] md:flex-row shadow-2xs">
      <ConversationList
        conversations={conversations}
        activeId={active.id}
        onSelect={handleSelectConversation}
        className={mobileView === 'chat' ? 'hidden md:flex' : 'flex'}
      />
      <ChatWindow
        key={active.id}
        conversation={active}
        shopSlug={shopSlug}
        messages={activeMessages}
        onBack={handleBackToList}
        className={mobileView === 'list' ? 'hidden md:flex' : 'flex'}
      />
    </div>
  )
}
