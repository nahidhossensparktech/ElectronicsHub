import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@repo/utils'

/** Brand logo. `light` = white wordmark for dark backgrounds. */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Electronic Hub.bd home" className={cn('inline-flex shrink-0', className)}>
      {light ? (
        <Image src="/brand/logo-light.png" alt="Electronic Hub.bd" width={149} height={48} priority />
      ) : (
        <Image src="/brand/logo.png" alt="Electronic Hub.bd" width={176} height={48} priority />
      )}
    </Link>
  )
}
