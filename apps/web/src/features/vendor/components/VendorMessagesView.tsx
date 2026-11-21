'use client'

import {
  Clock,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  User,
} from 'lucide-react'
import { useState } from 'react'

interface MessageThread {
  id: string
  buyerName: string
  buyerPhone: string
  initials: string
  avatarColor: string
  lastMessage: string
  time: string
  unread: boolean
  messages: Array<{
    id: string
    sender: 'buyer' | 'vendor'
    text: string
    time: string
  }>
}

const mockThreads: MessageThread[] = [
  {
    id: 'th-1',
    buyerName: 'Rafi Hasan',
    buyerPhone: '+880 1712-345678',
    initials: 'RH',
    avatarColor: 'bg-slate-700',
    lastMessage: 'Bhai, is the ESP32 devkit original Espressif chip?',
    time: '10:45 AM',
    unread: true,
    messages: [
      { id: 'm-1', sender: 'buyer', text: 'Salam bhai, do you have ESP32 NodeMCU in stock?', time: '10:40 AM' },
      { id: 'm-2', sender: 'vendor', text: 'Wa alaikum assalam. Yes, ready in our Patuatuli warehouse.', time: '10:42 AM' },
      { id: 'm-3', sender: 'buyer', text: 'Bhai, is the ESP32 devkit original Espressif chip?', time: '10:45 AM' },
    ],
  },
  {
    id: 'th-2',
    buyerName: 'Tanvir Ahmed',
    buyerPhone: '+880 1611-555210',
    initials: 'TA',
    avatarColor: 'bg-amber-600',
    lastMessage: 'Thanks, received the package safely!',
    time: 'Yesterday',
    unread: false,
    messages: [
      { id: 'm-4', sender: 'buyer', text: 'Did you dispatch my order #EH-48919?', time: 'Yesterday 3:15 PM' },
      { id: 'm-5', sender: 'vendor', text: 'Yes brother, handed over to courier. Tracking code EH-EXP-88910.', time: 'Yesterday 3:30 PM' },
      { id: 'm-6', sender: 'buyer', text: 'Thanks, received the package safely!', time: 'Yesterday 7:00 PM' },
    ],
  },
  {
    id: 'th-3',
    buyerName: 'Sadia Akter',
    buyerPhone: '+880 1819-220011',
    initials: 'SA',
    avatarColor: 'bg-emerald-600',
    lastMessage: 'Can you provide 1000 pcs LM7805 wholesale quotation?',
    time: '19 Nov',
    unread: false,
    messages: [
      { id: 'm-7', sender: 'buyer', text: 'Can you provide 1000 pcs LM7805 wholesale quotation?', time: '19 Nov 11:20 AM' },
    ],
  },
]

export function VendorMessagesView() {
  const [threads, setThreads] = useState(mockThreads)
  const [activeId, setActiveId] = useState('th-1')
  const [inputText, setInputText] = useState('')

  const activeThread = threads.find((t) => t.id === activeId) ?? threads[0]!

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'vendor' as const,
      text: inputText.trim(),
      time: 'Just now',
    }

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeId) {
          return {
            ...t,
            lastMessage: newMsg.text,
            time: 'Just now',
            unread: false,
            messages: [...t.messages, newMsg],
          }
        }
        return t
      })
    )
    setInputText('')
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden h-[calc(100vh-160px)] min-h-[550px] flex">
      {/* Left Chat Threads List */}
      <div className="w-80 shrink-0 border-r border-slate-100 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-100 bg-white">
          <h2 className="font-display text-base font-bold text-slate-900 mb-3">Customer Messages</h2>
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full h-8.5 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none bg-slate-50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {threads.map((thread) => {
            const isSelected = thread.id === activeId
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => {
                  setActiveId(thread.id)
                  setThreads((prev) =>
                    prev.map((t) => (t.id === thread.id ? { ...t, unread: false } : t))
                  )
                }}
                className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 ${
                  isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-100/60'
                }`}
              >
                <div
                  className={`size-10 rounded-xl font-bold text-white text-xs flex items-center justify-center shrink-0 ${thread.avatarColor}`}
                >
                  {thread.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900 truncate">{thread.buyerName}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{thread.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{thread.lastMessage}</p>
                </div>
                {thread.unread && (
                  <span className="size-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right Conversation Window */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`size-10 rounded-xl font-bold text-white text-xs flex items-center justify-center ${activeThread.avatarColor}`}
            >
              {activeThread.initials}
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900">{activeThread.buyerName}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Phone className="size-3" />
                <span>{activeThread.buyerPhone}</span>
              </p>
            </div>
          </div>
          <button type="button" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50">
            <MoreVertical className="size-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]/50">
          {activeThread.messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'vendor' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  m.sender === 'vendor'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              title="Attach File / Datasheet"
            >
              <Paperclip className="size-4" />
            </button>
            <input
              type="text"
              placeholder="Type your message to customer..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 px-3.5 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Send className="size-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
