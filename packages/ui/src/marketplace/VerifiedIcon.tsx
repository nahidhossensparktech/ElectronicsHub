import { cn } from '@repo/utils'

/** Filled scalloped badge with a check mark, used after verified shop names. */
export function VerifiedIcon({ className, size = 12 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      role="img"
      aria-label="Verified"
      className={cn('shrink-0 text-verified', className)}
    >
      <path
        fill="currentColor"
        d="M8 0.6l1.9 1.45 2.38-.21.73 2.28 2.05 1.32-.73 2.28.73 2.28-2.05 1.32-.73 2.28-2.38-.21L8 15.4l-1.9-1.45-2.38.21-.73-2.28L.94 10.56l.73-2.28-.73-2.28 2.05-1.32.73-2.28 2.38.21z"
      />
      <path d="M5.2 8.2l1.9 1.9 3.7-3.7" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
