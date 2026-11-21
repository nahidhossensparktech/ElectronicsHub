import type { AvatarColor } from '@repo/types'
import { cn } from '@repo/utils'

const colorClass: Record<AvatarColor, string> = {
  blue: 'bg-avatar-blue',
  navy: 'bg-avatar-navy',
  sky: 'bg-avatar-sky',
  green: 'bg-avatar-green',
  violet: 'bg-avatar-violet',
  orange: 'bg-avatar-orange',
  red: 'bg-avatar-red',
  teal: 'bg-avatar-teal',
  slate: 'bg-avatar-slate',
}

const sizeClass = {
  xs: 'size-7 rounded-md text-[11px]',
  sm: 'size-9 rounded-lg text-[13px]',
  md: 'size-10 rounded-[10px] text-sm',
  lg: 'size-[52px] rounded-xl text-base',
  xl: 'size-24 rounded-2xl text-[28px]',
} as const

export interface AvatarProps {
  initials: string
  color?: AvatarColor
  size?: keyof typeof sizeClass
  round?: boolean
  className?: string
}

/** Initials avatar used for shops and people. */
export function Avatar({ initials, color = 'blue', size = 'md', round, className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-semibold text-white',
        colorClass[color],
        sizeClass[size],
        round && 'rounded-full',
        className,
      )}
    >
      {initials}
    </span>
  )
}
