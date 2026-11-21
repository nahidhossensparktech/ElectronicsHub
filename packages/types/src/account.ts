import type { AvatarColor } from './catalog'

export interface Conversation {
  id: string
  shopSlug?: string
  shopName: string
  initials: string
  color: AvatarColor
  lastMessage: string
  time: string
  unread: number
}

export interface ChatMessage {
  id: string
  from: 'me' | 'shop'
  body: string
  time: string
}

export type NotificationKind = 'order' | 'message' | 'offer' | 'delivered' | 'security' | 'deal'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  body: string
  time: string
  unread: boolean
}

export interface CustomerProfile {
  name: string
  initials: string
  memberSince: string
  location: string
  phone: string
  email: string
  dateOfBirth: string
  gender: string
  occupation: string
  bio: string
}
