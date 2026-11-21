'use client'

import {
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MessageSquare,
  Search,
  User,
} from 'lucide-react'
import { useState } from 'react'

interface SupportTicket {
  id: string
  userName: string
  userType: 'Customer' | 'Vendor'
  subject: string
  priority: 'High' | 'Normal' | 'Low'
  status: 'Open' | 'Pending Reply' | 'Closed'
  date: string
  messagesCount: number
}

const initialTickets: SupportTicket[] = [
  {
    id: 'TCK-201',
    userName: 'Md. Kamrul Hasan (Tech Electronics)',
    userType: 'Vendor',
    subject: 'Requesting bKash merchant auto-disbursement schedule adjustment',
    priority: 'Normal',
    status: 'Open',
    date: 'Today, 12:10 PM',
    messagesCount: 3,
  },
  {
    id: 'TCK-202',
    userName: 'Nusrat Jahan',
    userType: 'Customer',
    subject: 'Need VAT invoice breakdown for university research grant reimbursement',
    priority: 'High',
    status: 'Pending Reply',
    date: 'Yesterday, 06:40 PM',
    messagesCount: 5,
  },
  {
    id: 'TCK-203',
    userName: 'Arif Chowdhury (RoboTech BD)',
    userType: 'Vendor',
    subject: 'Inquiry regarding bulk API sync for warehouse inventory CSV upload',
    priority: 'Normal',
    status: 'Closed',
    date: '19 Nov 2026',
    messagesCount: 4,
  },
]

export function AdminSupportView() {
  const [tickets, setTickets] = useState(initialTickets)
  const [search, setSearch] = useState('')

  const filtered = tickets.filter((t) => {
    if (search.trim()) {
      return (
        t.userName.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase())
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Support & Help Desk</h1>
          <p className="text-xs text-slate-500 mt-1">Manage inquiries from both customers and verified vendor shops</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets, names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((t) => (
          <div key={t.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-slate-500">{t.id}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    t.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t.priority} priority
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    t.status === 'Open'
                      ? 'bg-blue-50 text-blue-700'
                      : t.status === 'Pending Reply'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{t.subject}</h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>From: <strong className="text-slate-800">{t.userName}</strong> ({t.userType})</span>
                <span>·</span>
                <span>{t.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-3 text-slate-400" />
                  <span>{t.messagesCount} replies</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="h-8.5 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Mail className="size-3.5 text-slate-500" />
                <span>Reply Ticket</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
