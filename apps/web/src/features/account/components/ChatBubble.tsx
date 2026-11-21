import type { ChatMessage } from '@repo/types'
import { cn } from '@repo/utils'

export function ChatBubble({ message }: { message: ChatMessage }) {
  const mine = message.from === 'me'
  return (
    <div className={cn('flex flex-col', mine ? 'items-end' : 'items-start')}>
      <p className={cn('max-w-[85%] sm:max-w-[400px] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm leading-5', mine ? 'rounded-br-md bg-brand text-white' : 'rounded-bl-md bg-surface text-ink')}>{message.body}</p>
      <span className="mt-1.5 text-[11px] text-muted">{message.time}</span>
    </div>
  )
}
